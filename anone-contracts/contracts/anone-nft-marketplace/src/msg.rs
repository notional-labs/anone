use cosmwasm_std::Uint128;
use cw20::{Cw20Coin, Cw20ReceiveMsg};
use cw721::Cw721ReceiveMsg;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    WithdrawNft { offering_id: String },
    Receive(Cw20ReceiveMsg),
    ReceiveNft(Cw721ReceiveMsg),
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct SellNft {
    pub list_price: Cw20Coin,
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct BuyNft {
    pub offering_id: String,
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetOfferings {
        sort_listing: String,
        index: Uint128,
        size: Uint128,
    },
}
