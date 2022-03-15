use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cw721::Expiration;
use cosmwasm_std::Binary;


#[derive(Serialize, Deserialize, Clone, Debug, JsonSchema)]
pub struct InstantiateMsg {
    
}

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

    Mint(MintMsg<T>),

    Burn { token_id: String },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MintMsg<T> {
    pub token_id: String,
    pub owner: String,
    pub token_uri: Option<String>,
    pub extension: T,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    
}