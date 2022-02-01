<template>
  <div class="sp-wallet" v-if="depsLoaded">
    <SpButton type="primary" v-on:click="useKeplr"
      ><span v-if="address">Connected</span><span v-if="!address">Connect Keplr</span></SpButton
    >
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AnWallet',
  computed: {
    depsLoaded: function () {
      return this._depsLoaded
    },
    address() {
      if (this._depsLoaded) {
        return this.$store.getters['common/wallet/address']
      }
      return null
    },
  },
  methods: {
    useKeplr: async function () {
      console.log('adding wallet')

      if (!window.keplr) {
        alert('you have to install keplr wallet extension first')
        return
      }

      if (this._depsLoaded) {
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: process.env.VUE_APP_CHAIN_ID,
            chainName: process.env.VUE_APP_CHAIN_NAME,
            rpc: process.env.VUE_APP_API_TENDERMINT,
            rest: process.env.VUE_APP_API_COSMOS,
            bip44: {
              coinType: parseInt(process.env.VUE_APP_COIN_TYPE),
            },
            bech32Config: {
              bech32PrefixAccAddr: process.env.VUE_APP_ADDRESS_PREFIX,
              bech32PrefixAccPub: process.env.VUE_APP_ADDRESS_PREFIX + 'pub',
              bech32PrefixValAddr: process.env.VUE_APP_ADDRESS_PREFIX + 'valoper',
              bech32PrefixValPub: process.env.VUE_APP_ADDRESS_PREFIX + 'valoperpub',
              bech32PrefixConsAddr: process.env.VUE_APP_ADDRESS_PREFIX + 'valcons',
              bech32PrefixConsPub: process.env.VUE_APP_ADDRESS_PREFIX + 'valconspub',
            },
            currencies: [
              {
                coinDenom: 'AN1',
                coinMinimalDenom: 'uan1',
                coinDecimals: parseInt(process.env.VUE_APP_COIN_DECIMAL),
                coinGeckoId: 'fuck',
              },
            ],
            feeCurrencies: [
              {
                coinDenom: 'AN1',
                coinMinimalDenom: 'uan1',
                coinDecimals: parseInt(process.env.VUE_APP_COIN_DECIMAL),
                coinGeckoId: 'fuck',
              },
            ],
            stakeCurrency: {
              coinDenom: 'AN1',
              coinMinimalDenom: 'uan1',
              coinDecimals: parseInt(process.env.VUE_APP_COIN_DECIMAL),
              coinGeckoId: 'fuck',
            },
            coinType: parseInt(process.env.VUE_APP_COIN_TYPE),
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.03,
            },
          })

          await window.keplr.enable(process.env.VUE_APP_CHAIN_ID)
          const offlineSigner = window.getOfflineSigner(process.env.VUE_APP_CHAIN_ID)
          await this.$store.dispatch('common/wallet/connectWithKeplr', offlineSigner)
        } catch (e) {
          console.error(e)
        }
      }
    },
    useMetamask: async function () {},
  },
  beforeCreate: function () {
    const vuexModule = ['common', 'wallet']
    for (let i = 1; i <= vuexModule.length; i++) {
      const submod = vuexModule.slice(0, i)
      if (!this.$store.hasModule(submod)) {
        console.log('Module ' + vuexModule + ' has not been registered!')
        this._depsLoaded = false
        break
      }
    }
  },
})
</script>
