use cw20::Cw20Coin;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::{CanonicalAddr, StdResult, Storage, Timestamp};
use cw_storage_plus::{Index, IndexList, IndexedMap, Item, Map, MultiIndex};
use crate::package::ContractInfoResponse;

pub static CONFIG_KEY: &str = "config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Offering {
    pub token_id: String,
    pub contract_addr: CanonicalAddr,
    pub seller: CanonicalAddr,
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

pub struct OfferingIndexes<'a> {
    pub seller: MultiIndex<'a, (Vec<u8>, Vec<u8>), Offering>,
    pub contract: MultiIndex<'a, (Vec<u8>, Vec<u8>), Offering>,
}

impl<'a> IndexList<Offering> for OfferingIndexes<'a> {
    fn get_indexes(&'_ self) -> Box<dyn Iterator<Item = &'_ dyn Index<Offering>> + '_> {
        let v: Vec<&dyn Index<Offering>> = vec![&self.seller, &self.contract];
        Box::new(v.into_iter())
    }
}

pub fn offerings<'a>() -> IndexedMap<'a, &'a str, Offering, OfferingIndexes<'a>> {
    let indexes = OfferingIndexes {
        seller: MultiIndex::new(
            |o,k| (o.seller.to_vec(), k),
            "offerings",
            "offerings__seller",
        ),
        contract: MultiIndex::new(
            |o,k| (o.contract_addr.to_vec(), k),
            "offerings",
            "offerings__contract",
        ),
    };
    IndexedMap::new("offerings", indexes)
}
