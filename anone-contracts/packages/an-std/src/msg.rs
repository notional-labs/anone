use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::route::AnoneRoute;
use cosmwasm_std::{Coin, CosmosMsg, CustomMsg};
use cw721::CustomMsg as Cw721CustomMsg;
static MSG_DATA_VERSION: &str = "1.0.0";

/// AnoneMsg is an override of CosmosMsg::Custom to add support for Anone's custom message types
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct AnoneMsgWrapper {
    pub route: AnoneRoute,
    pub msg_data: AnoneMsg,
    pub version: String,
}

impl From<AnoneMsgWrapper> for CosmosMsg<AnoneMsgWrapper> {
    fn from(original: AnoneMsgWrapper) -> Self {
        CosmosMsg::Custom(original)
    }
}

impl CustomMsg for AnoneMsgWrapper {}
impl Cw721CustomMsg for AnoneMsgWrapper {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum AnoneMsg {
    ClaimFor {
        address: String,
        action: ClaimAction,
    },
    FundCommunityPool {
        amount: Vec<Coin>,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ClaimAction {
    #[serde(rename = "mint_nft")]
    MintNFT,
    #[serde(rename = "bid_nft")]
    BidNFT,
}

pub fn create_claim_for_msg(address: String, action: ClaimAction) -> CosmosMsg<AnoneMsgWrapper> {
    AnoneMsgWrapper {
        route: AnoneRoute::Claims,
        msg_data: AnoneMsg::ClaimFor { address, action },
        version: MSG_DATA_VERSION.to_owned(),
    }
    .into()
}

pub fn create_fund_community_pool_msg(amount: Vec<Coin>) -> CosmosMsg<AnoneMsgWrapper> {
    AnoneMsgWrapper {
        route: AnoneRoute::Distribution,
        msg_data: AnoneMsg::FundCommunityPool { amount },
        version: MSG_DATA_VERSION.to_owned(),
    }
    .into()
}

