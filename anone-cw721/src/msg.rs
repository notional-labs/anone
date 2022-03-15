pub use cw721_base::ExecuteMsg as Cw721ExecuteMsg;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::Binary;
use cw721::Expiration;

#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]

pub struct MigrateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg<T> {
    TransferNft { recipient: String, token_id: String },
    SendNft {
        contract: String,
        token_id: String,
        msg: Binary,
    },
    Approve {
        spender: String,
        token_id: String,
        expires: Option<Expiration>,
    },
    Revoke { spender: String, token_id: String },
    ApproveAll {
        operator: String,
        expires: Option<Expiration>,
    },
    RevokeAll { operator: String },
    Burn { token_id: String },
    MintFor(MintForMsg<T>),
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MintForMsg<T> {
    pub token_id: String,
    pub recipient: String,
    pub token_uri: Option<String>,
    pub extension: T,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {}
