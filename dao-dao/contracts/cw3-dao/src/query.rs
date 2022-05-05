use crate::state::{Config, Votes};
use cosmwasm_std::{Addr, CosmosMsg, Decimal, Empty, Uint128};
use cw20::Cw20CoinVerified;
use cw3::{Status, Vote};
use cw_utils::Expiration;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::fmt;

/// This defines the different ways tallies can happen.
/// Every contract should support a subset of these, ideally all.
///
/// The total_weight used for calculating success as well as the weights of each
/// individual voter used in tallying should be snapshotted at the beginning of
/// the block at which the proposal starts (this is likely the responsibility of a
/// correct cw4 implementation).
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ThresholdResponse {
    /// Declares that a fixed weight of yes votes is needed to pass.
    /// It does not matter how many no votes are cast, or how many do not vote,
    /// as long as `weight` yes votes are cast.
    ///
    /// This is the simplest format and usually suitable for small multisigs of trusted parties,
    /// like 3 of 5. (weight: 3, total_weight: 5)
    ///
    /// A proposal of this type can pass early as soon as the needed weight of yes votes has been cast.
    AbsoluteCount {
        weight: Uint128,
        total_weight: Uint128,
    },

    /// Declares a percentage of the total weight that must cast Yes votes, in order for
    /// a proposal to pass. The passing weight is computed over the total weight minus the weight of the
    /// abstained votes.
    ///
    /// This is useful for similar circumstances as `AbsoluteCount`, where we have a relatively
    /// small set of voters, and participation is required.
    /// It is understood that if the voting set (group) changes between different proposals that
    /// refer to the same group, each proposal will work with a different set of voter weights
    /// (the ones snapshotted at proposal creation), and the passing weight for each proposal
    /// will be computed based on the absolute percentage, times the total weights of the members
    /// at the time of each proposal creation.
    ///
    /// Example: we set `percentage` to 51%. Proposal 1 starts when there is a `total_weight` of 5.
    /// This will require 3 weight of Yes votes in order to pass. Later, the Proposal 2 starts but the
    /// `total_weight` of the group has increased to 9. That proposal will then automatically
    /// require 5 Yes of 9 to pass, rather than 3 yes of 9 as would be the case with `AbsoluteCount`.
    AbsolutePercentage {
        percentage: Decimal,
        total_weight: Uint128,
    },

    /// In addition to a `threshold`, declares a `quorum` of the total votes that must participate
    /// in the election in order for the vote to be considered at all. Within the votes that
    /// were cast, it requires `threshold` votes in favor. That is calculated by ignoring
    /// the Abstain votes (they count towards `quorum`, but do not influence `threshold`).
    /// That is, we calculate `Yes / (Yes + No + Veto)` and compare it with `threshold` to consider
    /// if the proposal was passed.
    ///
    /// It is rather difficult for a proposal of this type to pass early. That can only happen if
    /// the required quorum has been already met, and there are already enough Yes votes for the
    /// proposal to pass.
    ///
    /// 30% Yes votes, 10% No votes, and 20% Abstain would pass early if quorum <= 60%
    /// (who has cast votes) and if the threshold is <= 37.5% (the remaining 40% voting
    /// no => 30% yes + 50% no). Once the voting period has passed with no additional votes,
    /// that same proposal would be considered successful if quorum <= 60% and threshold <= 75%
    /// (percent in favor if we ignore abstain votes).
    ///
    /// This type is more common in general elections, where participation is often expected to
    /// be low, and `AbsolutePercentage` would either be too high to pass anything,
    /// or allow low percentages to pass, independently of if there was high participation in the
    /// election or not.
    ThresholdQuorum {
        threshold: Decimal,
        quorum: Decimal,
        total_weight: Uint128,
    },
}

/// Note, if you are storing custom messages in the proposal,
/// the querier needs to know what possible custom message types
/// those are in order to parse the response
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct ProposalResponse<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    pub id: u64,
    pub title: String,
    pub description: String,
    pub proposer: Addr,
    pub msgs: Vec<CosmosMsg<T>>,
    pub status: Status,
    pub expires: Expiration,
    /// This is the threshold that is applied to this proposal. Both the rules of the voting contract,
    /// as well as the total_weight of the voting group may have changed since this time. That means
    /// that the generic `Threshold{}` query does not provide valid information for existing proposals.
    pub threshold: ThresholdResponse,
    pub deposit_amount: Uint128,
    /// The block height the proposal was created at. This can be
    /// cross referenced with staked_balance_at_height queries to
    /// determine an addresses's voting power for this proposal.
    pub start_height: u64,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct ProposalListResponse {
    pub proposals: Vec<ProposalResponse>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoteListResponse {
    pub votes: Vec<VoteInfo>,
}

/// Information about the current status of a proposal.
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoteTallyResponse {
    /// Current proposal status
    pub status: Status,
    /// Required passing criteria
    pub threshold: ThresholdResponse,
    /// Current percentage turnout
    pub quorum: Decimal,
    /// Total number of votes for the proposal
    pub total_votes: Uint128,
    /// Total number of votes possible for the proposal
    pub total_weight: Uint128,
    /// Tally of the different votes
    pub votes: Votes,
}

/// Returns the vote (opinion as well as weight counted) as well as
/// the address of the voter who submitted it
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoteInfo {
    pub voter: String,
    pub vote: Vote,
    pub weight: Uint128,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoteResponse {
    pub vote: Option<VoteInfo>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoterResponse {
    pub weight: Option<Uint128>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoterListResponse {
    pub voters: Vec<VoterDetail>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct VoterDetail {
    pub addr: String,
    pub weight: Uint128,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct ConfigResponse {
    pub config: Config,
    pub gov_token: Addr,
    pub staking_contract: Addr,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct Cw20BalancesResponse {
    pub cw20_balances: Vec<Cw20CoinVerified>,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct TokenListResponse {
    pub token_list: Vec<Addr>,
}
