<template>
  <div>
    <div class="container">
      <AnOneWelcome />
      <SpTokenSend :address="address" :refresh="true" />
      <SpTransferList :address="address" />
    </div>
  </div>
</template>

<script>
import AnOneWelcome from "@/components/AnOneWelcome/AnOneWelcome";
export default {
  name: 'Index',
  components: {AnOneWelcome},
  computed: {
    address() {
      return this.$store.getters['common/wallet/address']
    },
  },
}
</script>
