pub mod fees;
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

pub use fees::burn_and_distribute_fee;
pub use query::AnoneQuery;
pub use route::AnoneRoute;

// This export is added to all contracts that import this package, signifying that they require
// "anone" support on the chain they run on.
#[no_mangle]
extern "C" fn requires_anone() {}
