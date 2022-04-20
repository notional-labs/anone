use std::cmp::Ordering;
use std::str::from_utf8;

#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    coin, to_binary, Addr, Api, BankMsg, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Order,
    Record, Response, StdError, StdResult, WasmMsg
};

use anone_cw721::msg::{CollectionInfoResponse, QueryMsg as an721QueryMsg};
use cw2::set_contract_version;
use cw721::Cw721ExecuteMsg;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::package::{ContractInfoResponse, OfferingsResponse, QueryOfferingsResult};
use crate::state::{increment_offerings, Offering, CONTRACT_INFO, OFFERINGS};

pub const NATIVE_DENOM: &str = "uan1";

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:anone-nft-marketplace";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let info = ContractInfoResponse { name: msg.name };

    CONTRACT_INFO.save(deps.storage, &info)?;
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    Ok(Response::new()
        .add_attribute("action", "instantiate")
        .add_attribute("name", info.name))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CancelSale { offering_id } => execute_cancel_sale(deps, env, info, offering_id),
        ExecuteMsg::MakeOrder { offering_id } => execute_make_order(deps, env, info, offering_id),
        ExecuteMsg::CreateSale {
            token_id,
            contract_addr,
            list_price,
        } => execute_create_sale(deps, env, info, token_id, contract_addr, list_price),
        ExecuteMsg::UpdatePrice {
            offering_id,
            update_price,
        } => execute_update_price(deps, env, info, offering_id, update_price),
    }
}

pub fn execute_make_order(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    offering_id: String,
) -> Result<Response, ContractError> {
    let off = OFFERINGS.load(deps.storage, &offering_id)?;
    let price = off.list_price;
    let price_an1 = coin(price, NATIVE_DENOM);

    // send price to seller
    let transfer_coin_msg = CosmosMsg::Bank(BankMsg::Send {
        to_address: (&off.seller).to_string(),
        amount: vec![price_an1],
    });

    // create transfer cw721 msg
    let transfer_cw721_msg = Cw721ExecuteMsg::TransferNft {
        recipient: info.sender.to_string(),
        token_id: off.token_id.clone(),
    };

    let exec_cw721_transfer = WasmMsg::Execute {
        contract_addr: (&off.contract_addr).to_string(),
        msg: to_binary(&transfer_cw721_msg)?,
        funds: vec![],
    };

    // transfer nft to buyer
    let cw721_transfer_cosmos_msg: CosmosMsg = exec_cw721_transfer.into();

    let cosmos_msgs = vec![transfer_coin_msg, cw721_transfer_cosmos_msg];

    //delete offering
    OFFERINGS.remove(deps.storage, &offering_id);

    let price_string = format!("{} {}", price, info.sender);

    Ok(Response::new()
        .add_messages(cosmos_msgs)
        .add_attribute("action", "make_order")
        .add_attribute("seller", off.seller.to_string())
        .add_attribute("buyer", info.sender)
        .add_attribute("paid_price", price_string)
        .add_attribute("token_id", off.token_id)
        .add_attribute("contract_addr", off.contract_addr.to_string()))
}

pub fn execute_create_sale(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    token_id: String,
    contract_addr: Addr,
    list_price: u128,
) -> Result<Response, ContractError> {
    // get OFFERING_COUNT
    let id = increment_offerings(deps.storage)?.to_string();
    // query collection info
    let collection_info: CollectionInfoResponse = deps
        .querier
        .query_wasm_smart(info.sender.clone(), &an721QueryMsg::CollectionInfo {})?;

    let royalty_info = collection_info.royalty_info;
    let royalty_info_clone = royalty_info.clone();

    if list_price == 0 {
        return Err(ContractError::PriceMustBePosiTive {});
    }

    // grant permission cw721 to nft-marketplace
    let approve_cw721_msg = Cw721ExecuteMsg::Approve {
        spender: env.contract.address.to_string(),
        token_id: token_id.clone(),
        expires: None,
    };
    let approve_cw721_cosmos_msg = WasmMsg::Execute {
        contract_addr: contract_addr.to_string(),
        msg: to_binary(&approve_cw721_msg)?,
        funds: vec![],
    };
    let msg : Vec<CosmosMsg> = vec![approve_cw721_cosmos_msg.into()];

    // save Offering
    let off = Offering {
        contract_addr: contract_addr,
        royalty_info: royalty_info.clone(),
        token_id: token_id,
        seller: info.sender.clone(),
        list_price: list_price,
        listing_time: env.block.time,
    };

    OFFERINGS.save(deps.storage, &id, &off)?;

    let price_string = format!("{} {}", list_price, NATIVE_DENOM);
    let royalty_info_string = format!(
        "{} {}",
        royalty_info_clone.unwrap().payment_address,
        royalty_info.unwrap().share
    );

    Ok(Response::new()
        .add_messages(msg)
        .add_attribute("action", "create_sale")
        .add_attribute("original_contract", off.contract_addr.to_string())
        .add_attribute("royalty_info", royalty_info_string)
        .add_attribute("seller", off.seller.to_string())
        .add_attribute("list_price", price_string)
        .add_attribute("token_id", off.token_id))
}

pub fn execute_cancel_sale(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    offering_id: String,
) -> Result<Response, ContractError> {
    // check if token_id is currently sold by the requesting address
    let off = OFFERINGS.load(deps.storage, &offering_id)?;
    if off.seller == info.sender {
        // revoke cw721 marketplace's permission
        let revoke_cw721_msg = Cw721ExecuteMsg::Revoke {
            spender: env.contract.address.to_string(),
            token_id: off.token_id,
        };
        let revoke_cw721_cosmos_msg = WasmMsg::Execute {
            contract_addr: off.contract_addr.to_string(),
            msg: to_binary(&revoke_cw721_msg)?,
            funds: vec![],
        };
        let msg : Vec<CosmosMsg> = vec![revoke_cw721_cosmos_msg.into()];
        
        // remove offering
        OFFERINGS.remove(deps.storage, &offering_id);

        return Ok(Response::new()
            .add_messages(msg)
            .add_attribute("action", "cancel_sale")
            .add_attribute("seller", info.sender)
            .add_attribute("offering_id", offering_id));
    }
    Err(ContractError::Unauthorized {})
}

pub fn execute_update_price(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    offering_id: String,
    update_price: u128,
) -> Result<Response, ContractError> {
    // check if token_id is currently sold by the requesting address
    let mut off = OFFERINGS.load(deps.storage, &offering_id)?;
    if info.sender != off.seller {
        return Err(ContractError::Unauthorized {});
    }
    if update_price == 0 {
        return Err(ContractError::PriceMustBePosiTive {});
    }
    off.list_price = update_price;
    OFFERINGS.save(deps.storage, &offering_id, &off)?;

    let price_string = format!("{} {}", off.list_price, NATIVE_DENOM);

    Ok(Response::new()
        .add_attribute("action", "update_price")
        .add_attribute("sender", info.sender)
        .add_attribute("offering_id", offering_id)
        .add_attribute("update_price", price_string))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetOfferings { sort_listing } => {
            to_binary(&query_offerings(deps, &sort_listing)?)
        }
    }
}

fn query_offerings(deps: Deps, sort_listing: &str) -> StdResult<OfferingsResponse> {
    let res: StdResult<Vec<QueryOfferingsResult>> = OFFERINGS
        .range_raw(deps.storage, None, None, Order::Ascending)
        .map(|kv_item| parse_offering(deps.api, kv_item))
        .collect();

    let mut offerings_clone = res?.clone();

    if offerings_clone.len() == 0 {
        return Ok(OfferingsResponse {
            offerings: offerings_clone,
        });
    }

    match sort_listing {
        "price_lowest" => {
            offerings_clone.sort_by(|a, b| {
                if a.list_price < b.list_price {
                    Ordering::Less
                } else if a.list_price == b.list_price {
                    Ordering::Equal
                } else {
                    Ordering::Greater
                }
            });

            Ok(OfferingsResponse {
                offerings: offerings_clone,
            })
        }
        "price_highest" => {
            offerings_clone.sort_by(|a, b| {
                if a.list_price < b.list_price {
                    Ordering::Greater
                } else if a.list_price == b.list_price {
                    Ordering::Equal
                } else {
                    Ordering::Less
                }
            });

            Ok(OfferingsResponse {
                offerings: offerings_clone,
            })
        }
        "newest_listed" => {
            offerings_clone.sort_by(|a, b| {
                let a_id: u128 = a.id.parse().unwrap();
                let b_id: u128 = b.id.parse().unwrap();

                if a_id < b_id {
                    Ordering::Less
                } else if a_id == b_id {
                    Ordering::Equal
                } else {
                    Ordering::Greater
                }
            });

            Ok(OfferingsResponse {
                offerings: offerings_clone,
            })
        }
        "oldest_listed" => {
            offerings_clone.sort_by(|a, b| {
                let a_id: u128 = a.id.parse().unwrap();
                let b_id: u128 = b.id.parse().unwrap();

                if a_id < b_id {
                    Ordering::Greater
                } else if a_id == b_id {
                    Ordering::Equal
                } else {
                    Ordering::Less
                }
            });

            Ok(OfferingsResponse {
                offerings: offerings_clone,
            })
        }

        _ => Err(StdError::NotFound {
            kind: "Sort must be one of (price_lowest, price_highest, newest_listed, oldest_listed)"
                .to_string(),
        }),
    }
}

fn parse_offering(
    _api: &dyn Api,
    item: StdResult<Record<Offering>>,
) -> StdResult<QueryOfferingsResult> {
    item.and_then(|(k, offering)| {
        let id = from_utf8(&k)?;
        Ok(QueryOfferingsResult {
            id: id.to_string(),
            token_id: offering.token_id,
            list_price: offering.list_price,
            royalty_info: offering.royalty_info,
            contract_addr: offering.contract_addr.clone().into_string(),
            seller: offering.seller.clone().into_string(),
            listing_time: offering.listing_time,
        })
    })
}

#[cfg(test)]
mod tests {
    use crate::contract::instantiate;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::attr;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};

    pub const ADDR1: &str = "ADDR1";
    #[test]
    fn test_instantiate() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = mock_info(ADDR1, &[]);
        let msg = InstantiateMsg {
            name: "Anone NFT Marketplace".to_string(),
        };
        // Call instantiate, unwrap to assert success
        let res = instantiate(deps.as_mut(), env, info, msg).unwrap();

        assert_eq!(
            res.attributes,
            vec![
                attr("action", "instantiate"),
                attr("name", "Anone NFT Marketplace")
            ]
        )
    }
}
