import { SigningCosmosClient, LcdClient, setupBankExtension } from "@cosmjs/launchpad";
import { anoneChain, ethChain } from '../chainObj';
import {
    SigningStargateClient,
    StargateClient,
} from "@cosmjs/stargate";
// import { MsgDelegate } from "@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/tx";

export const getKeplr = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Keplr Wallet not detected, please install extension");
        return undefined
    } else {
        await window.keplr.experimentalSuggestChain(anoneChain)
        await window.keplr.enable(process.env.REACT_APP_CHAIN_ID)
        const offlineSigner = window.keplr.getOfflineSigner(process.env.REACT_APP_CHAIN_ID);
        const accounts = await offlineSigner.getAccounts();
        accounts.chain = process.env.REACT_APP_CHAIN_ID
        return {
            accounts,
            offlineSigner,
        };
    }
}

export const addDig = async () => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Keplr Wallet not detected, please install extension");
        return undefined
    } else {
        await window.keplr.experimentalSuggestChain(digChain)
    }
}

export const getCosmosClient = (address, offlineSigner) => {
    const URL = process.env.REACT_APP_API
    const cosmJS = new SigningCosmosClient(
        URL,
        address,
        offlineSigner,
    );
    return cosmJS;
}

export const getStargateClient = async (signer) => {
    const rpcEndpoint = process.env.REACT_APP_RPC;
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer);
    return client
} 
