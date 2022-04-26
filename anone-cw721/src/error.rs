use cosmwasm_std::StdError;
use cw721_base::ContractError as BaseError;
use cw_utils::PaymentError;
use thiserror::Error;
use url::ParseError;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("InvalidCreationFee")]
    InvalidCreationFee {},

    #[error("token_id already claimed")]
    Claimed {},

    #[error("Cannot set approval that is already expired")]
    Expired {},

    #[error("Approval not found for: {spender}")]
    ApprovalNotFound { spender: String },

    #[error("Invalid Royalities")]
    InvalidRoyalities {},

    #[error("Description too long")]
    DescriptionTooLong {},

    #[error("{0}")]
    Payment(#[from] PaymentError),

    #[error("{0}")]
    Parse(#[from] ParseError),
}

impl From<ContractError> for BaseError {
    fn from(err: ContractError) -> BaseError {
        match err {
            ContractError::Unauthorized {} => BaseError::Unauthorized {},
            ContractError::Claimed {} => BaseError::Claimed {},
            ContractError::Expired {} => BaseError::Expired {},
            _ => unreachable!("cannot convert {:?} to Cw721ContractError", err),
        }
    }
}