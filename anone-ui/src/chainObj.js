export const anoneChain = {
  chainId: "anone-testnet-1",
  chainName: "anone-testnet",
  rpc: "http://65.108.128.139:2281",
  rest: "http://65.108.128.139:2284",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "one",
    bech32PrefixAccPub: "one" + "pub",
    bech32PrefixValAddr: "one" + "valoper",
    bech32PrefixValPub: "one" + "valoperpub",
    bech32PrefixConsAddr: "one" + "valcons",
    bech32PrefixConsPub: "one" + "valconspub",
  },
  currencies: [
    {
      coinDenom: "an1",
      coinMinimalDenom: "uan1",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "an1",
      coinMinimalDenom: "uan1",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: "an1",
      coinMinimalDenom: "uan1",
      coinDecimals: 6,
  },
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03,
  },
}
