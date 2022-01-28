<template>
  <div class="sp-component">
    <div class="sp-box sp-shadow">
      <div v-if="!attestationError && !attested">
        <h2>Link your Ethereum Account</h2>
        <p>
          In order to link your NFT collection on Ethereum to your ONE address, you'll need to sign a single transaction on the ethereum chain.  It's just a few clicks and it will associate your ONE account with your Ethereum wallet.
          (Requires Metamask plugin)
        </p>

        <AnButton href="#" type="primary" v-on:click="handleSign">Link Eth and ONE Address</AnButton>
        <span>(Will Open Metamask) v2</span>
      </div>
      <div v-if="attested">
        <h2>Attestation recorded!</h2>
        <p>{{NFTs.toString()}}</p>
      </div>
      <div v-if="attestationError"><h4>{{attestationError}}</h4></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {ethers} from 'ethers';
import AnButton from '../AnButton/AnButton'
import ABI from './anone_abi.json';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const ANONE_ADDRESS = '0x197fc873b3e498b7ca8fac410f466515ceec600b';
const LAMBDA_URL =  'https://4s3eso3uye.execute-api.ap-southeast-1.amazonaws.com/default/ANONE-ATTESTATION'
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
      ethAddress: address,
      oneAddress: message
    };
  } catch (err) {
    setError(err.message);
  }
};


const checkNFT = async (address) => {
  console.log("Checking NFT");
  // console.log(ANONE_ADDRESS);
  // console.log(ABI);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let contract = new ethers.Contract(ANONE_ADDRESS, ABI, provider);
  const listOfNFTs = await contract.tokensOfOwner(address);
  console.log(listOfNFTs);
  if(listOfNFTs && listOfNFTs.length > 0) {
    return listOfNFTs;
  }
  return [];
}

window.checkNFT = checkNFT;


export default defineComponent({
  name: 'AnOneAttestation',
  components: {
    AnButton,
  },
  data: function () {
    return {
      hasNFT: false,
      NFTs: [],
      attested: false,
      attestationError: false
    }
  },
  methods: {
    handleSign:  async function(e) {
      console.log("Clicked the button")
      e.preventDefault();

      //setError();
      const sig = await signMessage({
        setError: (e) => console.log,
        message: this.currentAccount
      });
      if (sig) {
        console.log("HAS SIG", sig);
        const {ethAddress} = sig;
        console.log(ethAddress)
        const NFTs  = await checkNFT(ethAddress);
        console.log(NFTs)
        if(NFTs && NFTs.length) {
          this.hasNFT = true;
          this.NFTs = NFTs
        }
        sig.NFTs = NFTs;
      }
      try {
        const response  = await axios( {
          url: LAMBDA_URL,
          withCredentials: false,
          data: JSON.stringify(sig)
        })
        // const response = await fetch(LAMBDA_URL, {
        //   method: 'POST',
        //   mode: "no-cors",
        //   cache: 'no-cache',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   redirect: 'follow', // manual, *follow, error
        //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //   body: JSON.stringify(sig)
        // })

        console.log(response);
        this.attested = true;
      } catch(e) {
        console.log(e);
        this.attestationError = e.message;
      };
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
    }
  },
  },
})
</script>
