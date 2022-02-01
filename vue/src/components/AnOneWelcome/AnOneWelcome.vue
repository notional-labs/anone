<template>
  <div class="sp-component sp-welcome">
    <div class="sp-box sp-shadow">
      <div class="sp-welcome__header">
        <h2>Welcome to Another-1</h2>
      </div>
      <p>
        A permissionless platform enhancing the secondary trading of sneaker and fashion collectibles, leveraging Cosmos
        blockchain technology and NFTs to overcome limitations of physical logistics and authentication.
      </p>
      <p>
        Install
        <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap">Keplr Wallet</a> for
        Chrome and then push the "Connect Keplr" button to get started.
      </p>
      <div class="sp-welcome__btns">
        <AnButton href="https://another-1.io/" target="_blank" type="primary">About</AnButton>
        <AnButton
          href="https://github.com/notional-labs/anone"
          target="_blank"
          type="secondary"
          class="sp-welcome__btns__github"
          >Github</AnButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AnButton from '../AnButton/AnButton'

export default defineComponent({
  name: 'AnOneWelcome',
  components: {
    AnButton,
  },
})
</script>
