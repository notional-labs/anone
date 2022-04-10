import { CosmWasmClient } from 'cosmwasm';
import { toAnone } from '../src/utils';

const config = require('../config');

async function queryInfo() {
  const client = await CosmWasmClient.connect(config.rpcEndpoint);
  const account = toAnone(config.account);
  const minter = toAnone(config.minter);

  const balance = await client.getBalance(account, 'uan1');
  console.log('account balance:', balance);

  const configResponse = await client.queryContractSmart(minter, {
    config: {},
  });
  console.log('minter configResponse: ', configResponse);

  const an721 = configResponse.an721_address;
  const whitelistContract = configResponse.whitelist;

  const numTokens = await client.queryContractSmart(an721, { num_tokens: {} });
  console.log('num tokens:', numTokens);

  const collectionInfo = await client.queryContractSmart(an721, {
    collection_info: {},
  });
  console.log('collection info:', collectionInfo);

  if (whitelistContract) {
    const whitelistConfig = await client.queryContractSmart(whitelistContract, {
      config: {},
    });
    console.log('whitelist config:', whitelistConfig);

    const whitelistMembers = await client.queryContractSmart(
      whitelistContract,
      {
        members: { limit: 5000 },
      }
    );
    console.log('whitelist members:', whitelistMembers);
  }

  const nfts = await client.queryContractSmart(an721, {
    tokens: { owner: account, limit: 30 },
  });
  for (let id of nfts.tokens) {
    const tokenInfo = await client.queryContractSmart(an721, {
      all_nft_info: { token_id: id },
    });
    console.log('tokenInfo:', tokenInfo);
  }
}
queryInfo();
