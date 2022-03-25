use cw20::Cw20Coin;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, StdResult, Storage, Timestamp};
use cw_storage_plus::{Index, IndexList, IndexedMap, Item, Map, MultiIndex};

use crate::package::ContractInfoResponse;

pub static CONFIG_KEY: &str = "config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Offering {
    pub token_id: String,
    pub contract_addr: Addr,
    pub seller: Addr,
    pub list_price: Cw20Coin,
    pub listing_time: Timestamp,
}

pub const OFFERINGS: Map<&str, Offering> = Map::new("offerings");
pub const OFFERINGS_COUNT: Item<u64> = Item::new("num_offerings");
pub const CONTRACT_INFO: Item<ContractInfoResponse> = Item::new("marketplace_info");

pub fn num_offerings(storage: &dyn Storage) -> StdResult<u64> {
    Ok(OFFERINGS_COUNT.may_load(storage)?.unwrap_or_default())
}

pub fn increment_offerings(storage: &mut dyn Storage) -> StdResult<u64> {
    let val = num_offerings(storage)? + 1;
    
    OFFERINGS_COUNT.save(storage, &val)?;

    Ok(val)
}