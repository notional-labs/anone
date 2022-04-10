import {
  SigningCosmWasmClient,
  DirectSecp256k1HdWallet,
  GasPrice,
} from 'cosmwasm';
import { isValidHttpUrl } from './utils';

const config = require('../config');

export const gasPrice = GasPrice.fromString('0uan1');

export async function getClient() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(config.mnemonic, {
    prefix: 'one',
  });

  if (!isValidHttpUrl(config.rpcEndpoint)) {
    throw new Error('Invalid RPC endpoint');
  }
  return await SigningCosmWasmClient.connectWithSigner(
    config.rpcEndpoint,
    wallet,
    { gasPrice }
  );
}
