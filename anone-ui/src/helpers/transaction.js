import {
  coin,
  StdFee
} from "@cosmjs/stargate";
import {makeDelegateMsg, makeSendMsg, makeVoteMsg, makeUndelegateMsg, makeWithDrawMsg} from "../helpers/ethereum/lib/eth-transaction/Msg"

export const transfer = async (client, address, amount, recipient, gas) => {
  let fee = {
    amount: [],
    gas: `${gas}`,
  };
  const denom = process.env.REACT_APP_DENOM
  const msg = makeSendMsg(address, recipient, amount, denom)

  const result = await client.signAndBroadcast(
    address,
    [msg],
    fee,
  );
  return result
}

export const delegate = async (client, address, amount, recipient, gas) => {
  let fee = {
    amount: [],
    gas: `${gas}`,
  };

  const denom = process.env.REACT_APP_DENOM
  const msg = makeDelegateMsg(address, recipient, amount, denom)

  const result = await client.signAndBroadcast(
    address,
    [msg],
    fee,
  );
  return result

}

export const unbonding = async (client, address, amount, recipient, gas) => {
  let fee = {
    amount: [],
    gas: `${gas}`,
  };
  const denom = process.env.REACT_APP_DENOM
  const msg = makeUndelegateMsg(address, recipient, amount, denom)

  const result = await client.signAndBroadcast(
    address,
    [msg],
    fee,
  );
  return result
}

export const withDraw = async (client, address, validatorAddress, gas) => {
  let fee = {
    amount: [],
    gas: `${gas}`,
  };
  const msg = makeWithDrawMsg(address, validatorAddress)

  const result = await client.signAndBroadcast(
    address,
    [msg],
    fee,
  );
  return result
}

export const vote = async (client, option, proposal_id, voter, gas) => {
  let fee = {
    amount: [],
    gas: `${gas}`,
  }
  const msg = makeVoteMsg(option, proposal_id, voter)

  const result = await client.signAndBroadcast(
    voter,
    [msg],
    fee,
  )
  return result
}