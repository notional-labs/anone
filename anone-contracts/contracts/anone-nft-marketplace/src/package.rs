use cosmwasm_std::Timestamp;
use cw20::{Cw20Coin};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct ContractInfoResponse {
    pub name: String,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct QueryOfferingsResult {
    pub id: String,
    pub token_id: String,
    pub list_price: Cw20Coin,
    pub contract_addr: String,
    pub seller: String,
    pub listing_time: Timestamp,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OfferingsResponse {
    pub offerings: Vec<QueryOfferingsResult>,
    pub size: usize,
    pub index: usize,
    pub total: usize,
}


use std::{cmp::min, marker::PhantomData};

pub struct Paged<'a, T, V> {
    vec: &'a V,
    page_length: usize,
    phantom: PhantomData<&'a T>,
}

impl<'a, T, V> Paged<'a, T, V>
where
    V: AsRef<[T]>,
{
    pub fn new(vec: &'a V, page_length: usize) -> Paged<'a, T, V> {
        Paged {
            vec,
            page_length,
            phantom: PhantomData,
        }
    }

    pub fn page(&self, index: usize) -> Option<(usize, &'a [T])> {
        let slice = self.vec.as_ref();
        let len = slice.len();

        if index < len {
            let page_index = index % self.page_length;
            let start = index - page_index;
            let end = min(len, start + self.page_length);

            slice.get(start..end).map(|s| (page_index, s))
        } else {
            None
        }
    }
}
// THIS FILE SHOULD BE EXTRACTED TO ITS OWN PACKAGE PROJECT LIKE CW20 OR CW721
