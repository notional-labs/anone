<template>
    <div class="sp-wallet" v-if="depsLoaded">
        <SpButton type="primary" v-on:click="useMetamask">Use Metamask</SpButton>
        <SpButton type="primary" v-on:click="useKeplr">Use Keplr</SpButton>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AnWallet',
    computed: {
        depsLoaded: function () {
            return this._depsLoaded
        }
    },
    methods: { 
        useKeplr: async function () {
            console.log("adding wallet")

            if(!window.keplr){
                alert("you have to install keplr wallet extension first")
                return
            }

            if (this._depsLoaded) {
                try {
                    console.log(process.env.VUE_APP_CHAIN_ID)

                    await window.keplr.experimentalSuggestChain({
                        chainId: process.env.VUE_APP_CHAIN_ID,
                        chainName: process.env.VUE_APP_CHAIN_NAME,
                        rpc: process.env.VUE_APP_API_TENDERMINT,
                        rest: process.env.VUE_APP_API_COSMOS,
                        bip44: {
                            coinType: 60,
                        },
                        bech32Config: {
                            bech32PrefixAccAddr: process.env.VUE_APP_ADDRESS_PREFIX,
                            bech32PrefixAccPub: process.env.VUE_APP_ADDRESS_PREFIX + "pub",
                            bech32PrefixValAddr: process.env.VUE_APP_ADDRESS_PREFIX + "valoper",
                            bech32PrefixValPub: process.env.VUE_APP_ADDRESS_PREFIX + "valoperpub",
                            bech32PrefixConsAddr: process.env.VUE_APP_ADDRESS_PREFIX + "valcons",
                            bech32PrefixConsPub: process.env.VUE_APP_ADDRESS_PREFIX + "valconspub",
                        },
                        currencies: [ 
                            { 
                                coinDenom: "ONE", 
                                coinMinimalDenom: "uone", 
                                coinDecimals: 18, 
                                coinGeckoId: "fuck", 
                            }, 
                        ],
                        feeCurrencies: [
                            {
                                coinDenom: "ONE",
                                coinMinimalDenom: "uone",
                                coinDecimals: 18,
                                coinGeckoId: "fuck",
                            },
                        ],
                        stakeCurrency: {
                            coinDenom: "ONE",
                            coinMinimalDenom: "uone",
                            coinDecimals: 18,
                            coinGeckoId: "fuck",
                        },
                        coinType: 60,
                        gasPriceStep: {
                            low: 0.01,
                            average: 0.025,
                            high: 0.03,
                        },
                    });

                    await window.keplr.enable(process.env.VUE_APP_CHAIN_ID)
                }catch (e){
                    console.error(e)
                }
            }
        },
        useMetamask: async function () {

        },
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