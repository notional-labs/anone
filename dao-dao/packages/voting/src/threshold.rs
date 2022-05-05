use cosmwasm_std::Decimal;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use thiserror::Error;

#[derive(Error, Debug)]
pub enum ThresholdError {
    #[error("Required threshold cannot be zero")]
    ZeroThreshold {},

    #[error("Not possible to reach required (passing) threshold")]
    UnreachableThreshold {},
}

/// A percentage of voting power that must vote yes for a proposal to
/// pass. An example of why this is needed:
///
/// If a user specifies a 60% passing threshold, and there are 10
/// voters they likely expect that proposal to pass when there are 6
/// yes votes. This implies that the condition for passing should be
/// `yes_votes >= total_votes * threshold`.
///
/// With this in mind, how should a user specify that they would like
/// proposals to pass if the majority of voters choose yes? Selecting
/// a 50% passing threshold with those rules doesn't properly cover
/// that case as 5 voters voting yes out of 10 would pass the
/// proposal. Selecting 50.0001% or or some variation of that also
/// does not work as a very small yes vote which technically makes the
/// majority yes may not reach that threshold.
///
/// To handle these cases we provide both a majority and percent
/// option for all percentages. If majority is selected passing will
/// be determined by `yes > total_votes * 0.5`. If percent is selected
/// passing is determined by `yes >= total_votes * percent`.
///
/// In both of these cases a proposal with only abstain votes must
/// fail. This requires a special case passing logic.
#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum PercentageThreshold {
    /// The majority of voters must vote yes for the proposal to pass.
    Majority {},
    /// A percentage of voting power >= percent must vote yes for the
    /// proposal to pass.
    Percent(Decimal),
}

/// The ways a proposal may reach its passing / failing threshold.
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Threshold {
    /// Declares a percentage of the total weight that must cast Yes
    /// votes in order for a proposal to pass.  See
    /// `ThresholdResponse::AbsolutePercentage` in the cw3 spec for
    /// details.
    AbsolutePercentage { percentage: PercentageThreshold },

    /// Declares a `quorum` of the total votes that must participate
    /// in the election in order for the vote to be considered at all.
    /// See `ThresholdResponse::ThresholdQuorum` in the cw3 spec for
    /// details.
    ThresholdQuorum {
        threshold: PercentageThreshold,
        quorum: PercentageThreshold,
    },
}

/// Asserts that the 0.0 < percent <= 1.0
fn validate_percentage(percent: &PercentageThreshold) -> Result<(), ThresholdError> {
    if let PercentageThreshold::Percent(percent) = percent {
        if percent.is_zero() {
            Err(ThresholdError::ZeroThreshold {})
        } else if *percent > Decimal::one() {
            Err(ThresholdError::UnreachableThreshold {})
        } else {
            Ok(())
        }
    } else {
        Ok(())
    }
}

/// Asserts that a quorum <= 1. Quorums may be zero.
fn validate_quorum(quorum: &PercentageThreshold) -> Result<(), ThresholdError> {
    if let PercentageThreshold::Percent(quorum) = quorum {
        if *quorum > Decimal::one() {
            Err(ThresholdError::UnreachableThreshold {})
        } else {
            Ok(())
        }
    } else {
        Ok(())
    }
}

impl Threshold {
    /// returns error if this is an unreachable value,
    /// given a total weight of all members in the group
    pub fn validate(&self) -> Result<(), ThresholdError> {
        match self {
            Threshold::AbsolutePercentage {
                percentage: percentage_needed,
            } => validate_percentage(percentage_needed),
            Threshold::ThresholdQuorum { threshold, quorum } => {
                validate_percentage(threshold)?;
                validate_quorum(quorum)
            }
        }
    }
}
