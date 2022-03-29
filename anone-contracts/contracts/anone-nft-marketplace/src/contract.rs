use std::cmp::Ordering;
use std::str::from_utf8;

#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    from_binary, to_binary, Api, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Order, Record,
    Response, StdError, StdResult, Uint128, WasmMsg,
};
use cw2::set_contract_version;
use cw20::{Cw20ExecuteMsg, Cw20ReceiveMsg};
use cw721::{Cw721ExecuteMsg, Cw721ReceiveMsg};

use crate::error::ContractError;
use crate::msg::{BuyNft, ExecuteMsg, InstantiateMsg, QueryMsg, SellNft};
use crate::package::{ContractInfoResponse, OfferingsResponse, Paged, QueryOfferingsResult};
use crate::state::{increment_offerings, Offering, CONTRACT_INFO, OFFERINGS};

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
        ExecuteMsg::WithdrawNft { offering_id } => execute_withdraw(deps, env, info, offering_id),
        ExecuteMsg::Receive(msg) => execute_receive(deps, env, info, msg),
        ExecuteMsg::ReceiveNft(msg) => execute_receive_nft(deps, env, info, msg),
    }
}

pub fn execute_receive(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    rcv_msg: Cw20ReceiveMsg,
) -> Result<Response, ContractError> {
    let msg: BuyNft = from_binary(&rcv_msg.msg)?;

    let off = OFFERINGS.load(deps.storage, &msg.offering_id)?;

    // check for enough coins
    if rcv_msg.amount < off.list_price.amount {
        return Err(ContractError::InsufficientFunds {});
    }

    // create transfer cw20 msg
    let transfer_cw20_msg = Cw20ExecuteMsg::Transfer {
        recipient: (&off.seller).to_string(),
        amount: rcv_msg.amount,
    };

    let exec_cw20_transfer = WasmMsg::Execute {
        contract_addr: info.sender.clone().into_string(),
        msg: to_binary(&transfer_cw20_msg)?,
        funds: vec![],
    };

    // create transfer cw721 msg
    let transfer_cw721_msg = Cw721ExecuteMsg::TransferNft {
        recipient: rcv_msg.sender.clone(),
        token_id: off.token_id.clone(),
    };

    let exec_cw721_transfer = WasmMsg::Execute {
        contract_addr: (&off.contract_addr).to_string(),
        msg: to_binary(&transfer_cw721_msg)?,
        funds: vec![],
    };

    // if everything is fine transfer cw20 to seller
    let cw20_transfer_cosmos_msg: CosmosMsg = exec_cw20_transfer.into();
    // transfer nft to buyer
    let cw721_transfer_cosmos_msg: CosmosMsg = exec_cw721_transfer.into();

    let cosmos_msgs = vec![cw20_transfer_cosmos_msg, cw721_transfer_cosmos_msg];

    //delete offering
    OFFERINGS.remove(deps.storage, &msg.offering_id);

    let price_string = format!("{} {}", rcv_msg.amount, info.sender);

    Ok(Response::new()
        .add_messages(cosmos_msgs)
        .add_attribute("action", "buy_nft")
        .add_attribute("seller", off.seller.to_string())
        .add_attribute("buyer", rcv_msg.sender)
        .add_attribute("paid_price", price_string)
        .add_attribute("token_id", off.token_id)
        .add_attribute("contract_addr", off.contract_addr.to_string()))
}

pub fn execute_receive_nft(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    rcv_msg: Cw721ReceiveMsg,
) -> Result<Response, ContractError> {
    let msg: SellNft = from_binary(&rcv_msg.msg)?;

    // check if same token Id form same original contract is already on sale
    // get OFFERING_COUNT
    let id = increment_offerings(deps.storage)?.to_string();

    // save Offering
    let off = Offering {
        contract_addr: info.sender.clone(),
        token_id: rcv_msg.clone().token_id,
        seller: deps.api.addr_validate(&rcv_msg.sender.clone())?,
        list_price: msg.list_price.clone(),
        listing_time: env.block.time,
    };

    OFFERINGS.save(deps.storage, &id, &off)?;

    let price_string = format!("{} {}", msg.list_price.amount, msg.list_price.address);

    Ok(Response::new()
        
        .add_attribute("action", "sell_nft")
        .add_attribute("original_contract", info.sender)
        .add_attribute("seller", off.seller.to_string())
        .add_attribute("list_price", price_string)
        .add_attribute("token_id", off.token_id))
}

pub fn execute_withdraw(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    offering_id: String,
) -> Result<Response, ContractError> {
    // check if token_id is currently sold by the requesting address
    let off = OFFERINGS.load(deps.storage, &offering_id)?;
    if off.seller == info.sender {
        // transfer token back to original owner
        let transfer_cw721_msg = Cw721ExecuteMsg::TransferNft {
            recipient: off.seller.clone().into_string(),
            token_id: off.token_id.clone(),
        };

        let exec_cw721_transfer = WasmMsg::Execute {
            contract_addr: off.contract_addr.clone().into_string(),
            msg: to_binary(&transfer_cw721_msg)?,
            funds: vec![],
        };

        let cw721_transfer_cosmos_msg: Vec<CosmosMsg> = vec![exec_cw721_transfer.into()];

        // remove offering
        OFFERINGS.remove(deps.storage, &offering_id);

        return Ok(Response::new()
            .add_messages(cw721_transfer_cosmos_msg)
            .add_attribute("action", "withdraw_nft")
            .add_attribute("seller", info.sender)
            .add_attribute("offering_id", offering_id));
    }
    Err(ContractError::Unauthorized {})
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetOfferings {
            sort_listing,
            index,
            size,
        } => to_binary(&query_offerings(deps, &sort_listing, index, size)?),
    }
}

fn query_offerings(
    deps: Deps,
    sort_listing: &str,
    q_index: Uint128,
    q_size: Uint128,
) -> StdResult<OfferingsResponse> {
    let res: StdResult<Vec<QueryOfferingsResult>> = OFFERINGS
        .range_raw(deps.storage, None, None, Order::Ascending)
        .map(|kv_item| parse_offering(deps.api, kv_item))
        .collect();

    let mut offerings_clone = res?.clone();

    let index = q_index.u128() as usize;
    let size = q_size.u128() as usize;

    if offerings_clone.len() == 0 {
        return Ok(OfferingsResponse {
            total: offerings_clone.len(),
            size: size,
            index: index,
            offerings: offerings_clone,
        });
    }

    match sort_listing {
        "price_lowest" => {
            offerings_clone.sort_by(|a, b| {
                if a.list_price.amount < b.list_price.amount {
                    Ordering::Less
                } else if a.list_price.amount == b.list_price.amount {
                    Ordering::Equal
                } else {
                    Ordering::Greater
                }
            });

            let paged = Paged::new(&offerings_clone, size);
            let (_, offerings_paginated) = paged.page(index).unwrap();

            Ok(OfferingsResponse {
                total: offerings_clone.len(),
                size: size,
                index: index,
                offerings: offerings_paginated.to_vec(),
            })
        }
        "price_highest" => {
            offerings_clone.sort_by(|a, b| {
                if a.list_price.amount < b.list_price.amount {
                    Ordering::Greater
                } else if a.list_price.amount == b.list_price.amount {
                    Ordering::Equal
                } else {
                    Ordering::Less
                }
            });

            let paged = Paged::new(&offerings_clone, size);
            let (_, offerings_paginated) = paged.page(index).unwrap();

            Ok(OfferingsResponse {
                total: offerings_clone.len(),
                size: size,
                index: index,
                offerings: offerings_paginated.to_vec(),
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

            let paged = Paged::new(&offerings_clone, size);
            let (_, offerings_paginated) = paged.page(index).unwrap();

            Ok(OfferingsResponse {
                total: offerings_clone.len(),
                size: size,
                index: index,
                offerings: offerings_paginated.to_vec(),
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

            let paged = Paged::new(&offerings_clone, size);
            let (_, offerings_paginated) = paged.page(index).unwrap();

            Ok(OfferingsResponse {
                total: offerings_clone.len(),
                size: size,
                index: index,
                offerings: offerings_paginated.to_vec(),
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
            contract_addr: offering.contract_addr.clone().into_string(),
            seller: offering.seller.clone().into_string(),
            listing_time: offering.listing_time,
        })
    })
}


#[cfg(test)]
mod tests {
    use cosmwasm_std::attr;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use crate::contract::{instantiate, execute_withdraw}; 
    use crate::msg::InstantiateMsg; 

    pub const ADDR1: &str = "ADDR1";
    #[test]
    fn test_instantiate() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = mock_info(ADDR1, &[]);
        let msg = InstantiateMsg { name: "Anone NFT Marketplace".to_string() };
        // Call instantiate, unwrap to assert success
        let res = instantiate(deps.as_mut(), env, info, msg).unwrap();

        assert_eq!(
            res.attributes,
            vec![attr("action", "instantiate"), attr("name", "Anone NFT Marketplace")]
        )
    }

    #[test]
    fn test_withdraw_nft() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let res = execute_withdraw(deps.as_mut(), env, info , offering_id).unwrap();

    }
}