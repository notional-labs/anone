use cosmwasm_std::{Addr, StdError};
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),
    #[error("{0}")]
    Cw20Error(#[from] cw20_base::ContractError),
    #[error("Nothing to claim")]
    NothingToClaim {},
    #[error("Invalid token")]
    InvalidToken { received: Addr, expected: Addr },
    #[error("Unauthorized")]
    Unauthorized {},
    #[error("Too many outstanding claims. Claim some tokens before unstaking more.")]
    TooManyClaims {},
    #[error("No admin configured")]
    NoAdminConfigured {},
    #[error("{0}")]
    HookError(#[from] cw_controllers::HookError),
    #[error("Only owner can change owner")]
    OnlyOwnerCanChangeOwner {},
}
