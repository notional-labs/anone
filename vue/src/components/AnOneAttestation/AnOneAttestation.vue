<template>
  <div class="sp-component">
    <div class="sp-box sp-shadow">
      <h2>Link your Ethereum Account</h2>
      <p>
        In order to link your NFT collection on Ethereum to your ONE address, you'll need to sign a single transaction on the ethereum chain.  It's just a few clicks and it will associate your ONE account with your Ethereum wallet.
        (Requires Metamask plugin)
      </p>
      <AnButton href="#" type="primary" v-on:click="handleSign">Link Eth Address to <span>{{currentAccount}}</span></AnButton>
      <span>(Will Open Metamask)</span>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import {ethers} from 'ethers';
import AnButton from '../AnButton/AnButton'

const verifyMessage = async ({ message, address, signature }) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const signMessage = async ({ setError, message }) => {
  try {
    console.log({ message });
    // TODO: Verify message is a ONE address.
    if (!window.ethereum)
      throw new Error("Metamask not found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address
    };
  } catch (err) {
    setError(err.message);
  }
};


const handleSign = async (e) => {
  console.log("Clicked the button")
  e.preventDefault();


  //setError();
  const sig = await signMessage({
    setError: (e) => console.log,
    message: "MESSAGe"
  });
  if (sig) {
    console.log("HAS SIG", sig);
    //setSignatures([...signatures, sig]);
  }
};



export default defineComponent({
  name: 'AnOneAttestation',
  components: {
    AnButton,
  },
  methods: {
    handleSign: async function  (e) {
      console.log("Clicked the button")
      e.preventDefault();

      //setError();
      const sig = await signMessage({
        setError: (e) => console.log,
        message: this.currentAccount
      });
      if (sig) {
        console.log("HAS SIG", sig);
        //setSignatures([...signatures, sig]);
      }
    }
  },
  beforeCreate: function () {
    console.log("create")
    const vuexModule = ['common', 'wallet']
    for (let i = 1; i <= vuexModule.length; i++) {
      const submod = vuexModule.slice(0, i)
      console.log(submod);
      if (!this.$store.hasModule(submod)) {
        console.log('Module ' + vuexModule + ' has not been registered!')
        this._depsLoaded = false
        break
      }
    }
  },
  computed: {
    walletList: function () {
      console.log("Listing wallets");
      if (this._depsLoaded) {
        return this.$store.state.common.wallet.wallets
      } else {
        return []
      }
    },
    depsLoaded: function () {
      console.log("deps");
      return this._depsLoaded
    },
    currentAccount: function () {
      if (this._depsLoaded) {
        return this.$store.getters['common/wallet/address']
      } else {
        return null
      }
    },
    activeWallet: function () {
      return this.$store.state.common.wallet.activeWallet
    },
  },
})
</script>
