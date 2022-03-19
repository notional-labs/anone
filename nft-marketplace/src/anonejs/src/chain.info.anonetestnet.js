export const AnoneTestnetInfo = {
    chainId: "anone-testnet-1",
    chainName: "Anone Testnet",
    rpc: "https://rpc-anone.notional.ventures",
    rest: "https://api-anone.notional.ventures",
  
    stakeCurrency: {
      coinDenom: "AN1",
      coinMinimalDenom: "uan1",
      coinDecimals: 6,
      coinGeckoId: "fuck",
    },
  
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
        coinDenom: "AN1",
        coinMinimalDenom: "uan1",
        coinDecimals: 6,
        coinGeckoId: "fuck",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "AN1",
        coinMinimalDenom: "uan1",
        coinDecimals: 6,
        coinGeckoId: "fuck",
      },
    ],
  
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
  },
    features: ['cosmwasm']
  };