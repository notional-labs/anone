use cosmwasm_std::{
    to_binary, Addr, BlockInfo, CosmosMsg, Deps, Env, MessageInfo, StdError, StdResult, Uint128,
    WasmMsg,
};
use cw20::Cw20ExecuteMsg;

use stake_cw20::msg::{
    QueryMsg as StakingContractQueryMsg, StakedBalanceAtHeightResponse, TotalStakedAtHeightResponse,
};

use crate::{
    query::ProposalResponse,
    state::{parse_id, Proposal, STAKING_CONTRACT},
    ContractError,
};

pub fn get_deposit_message(
    env: &Env,
    info: &MessageInfo,
    amount: &Uint128,
    gov_token: &Addr,
) -> StdResult<Vec<CosmosMsg>> {
    if *amount == Uint128::zero() {
        return Ok(vec![]);
    }
    let transfer_cw20_msg = Cw20ExecuteMsg::TransferFrom {
        owner: info.sender.clone().into(),
        recipient: env.contract.address.clone().into(),
        amount: *amount,
    };
    let exec_cw20_transfer = WasmMsg::Execute {
        contract_addr: gov_token.into(),
        msg: to_binary(&transfer_cw20_msg)?,
        funds: vec![],
    };
    let cw20_transfer_cosmos_msg: CosmosMsg = exec_cw20_transfer.into();
    Ok(vec![cw20_transfer_cosmos_msg])
}

pub fn get_proposal_deposit_refund_message(
    proposer: &Addr,
    amount: &Uint128,
    gov_token: &Addr,
) -> StdResult<Vec<CosmosMsg>> {
    if *amount == Uint128::zero() {
        return Ok(vec![]);
    }
    let transfer_cw20_msg = Cw20ExecuteMsg::Transfer {
        recipient: proposer.into(),
        amount: *amount,
    };
    let exec_cw20_transfer = WasmMsg::Execute {
        contract_addr: gov_token.into(),
        msg: to_binary(&transfer_cw20_msg)?,
        funds: vec![],
    };
    let cw20_transfer_cosmos_msg: CosmosMsg = exec_cw20_transfer.into();
    Ok(vec![cw20_transfer_cosmos_msg])
}

pub fn get_total_staked_supply(deps: Deps) -> StdResult<Uint128> {
    let staking_contract = STAKING_CONTRACT.load(deps.storage)?;

    // Get total supply
    let total: TotalStakedAtHeightResponse = deps.querier.query_wasm_smart(
        staking_contract,
        &StakingContractQueryMsg::TotalStakedAtHeight { height: None },
    )?;
    Ok(total.total)
}

pub fn get_staked_balance(deps: Deps, address: Addr) -> StdResult<Uint128> {
    let staking_contract = STAKING_CONTRACT.load(deps.storage)?;

    // Get current staked balance
    let res: StakedBalanceAtHeightResponse = deps.querier.query_wasm_smart(
        staking_contract,
        &StakingContractQueryMsg::StakedBalanceAtHeight {
            address: address.to_string(),
            height: None,
        },
    )?;
    Ok(res.balance)
}

pub fn get_voting_power_at_height(deps: Deps, address: Addr, height: u64) -> StdResult<Uint128> {
    let staking_contract = STAKING_CONTRACT.load(deps.storage)?;

    // Get voting power at height
    let balance: StakedBalanceAtHeightResponse = deps.querier.query_wasm_smart(
        staking_contract,
        &StakingContractQueryMsg::StakedBalanceAtHeight {
            address: address.to_string(),
            height: Some(height),
        },
    )?;
    Ok(balance.balance)
}

pub fn map_proposal(
    block: &BlockInfo,
    item: StdResult<(Vec<u8>, Proposal)>,
) -> StdResult<ProposalResponse> {
    let (key, prop) = item?;
    let status = prop.current_status(block);
    let threshold = prop.threshold.to_response(prop.total_weight);
    Ok(ProposalResponse {
        id: parse_id(&key)?,
        title: prop.title,
        description: prop.description,
        proposer: prop.proposer,
        msgs: prop.msgs,
        status,
        expires: prop.expires,
        threshold,
        deposit_amount: prop.deposit,
        start_height: prop.start_height,
    })
}

pub fn get_and_check_limit(limit: Option<u32>, max: u32, default: u32) -> StdResult<u32> {
    match limit {
        Some(l) => {
            if l <= max {
                Ok(l)
            } else {
                Err(StdError::GenericErr {
                    msg: ContractError::OversizedRequest {
                        size: l as u64,
                        max: max as u64,
                    }
                    .to_string(),
                })
            }
        }
        None => Ok(default),
    }
}
