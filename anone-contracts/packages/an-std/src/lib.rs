mod fees;
mod msg;
mod query;
mod route;

pub const NATIVE_DENOM: &str = "uan1";
// 3/11/2022 16:00:00 ET
pub const GENESIS_MINT_START_TIME: u64 = 1647032400000000000;

pub use msg::{
    create_claim_for_msg, create_fund_community_pool_msg, ClaimAction, AnoneMsg,
    AnoneMsgWrapper,
};

pub type Response = cosmwasm_std::Response<AnoneMsgWrapper>;
pub type SubMsg = cosmwasm_std::SubMsg<AnoneMsgWrapper>;
pub type CosmosMsg = cosmwasm_std::CosmosMsg<AnoneMsgWrapper>;

pub use fees::{checked_fair_burn, fair_burn, FeeError};
pub use query::AnoneQuery;
pub use route::AnoneRoute;
