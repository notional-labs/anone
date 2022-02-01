<template>
  <div>
    <div class="container">
      <template v-if="address">
        <AnOneAttestation />
      </template>
      <AnOneWelcome />
      <SpTokenSend :address="address" :refresh="true" />
      <SpTransferList :address="address" />
    </div>
  </div>
</template>

<script>
import AnOneWelcome from '@/components/AnOneWelcome/AnOneWelcome'
import AnOneAttestation from '@/components/AnOneAttestation/AnOneAttestation'
export default {
  name: 'Index',
  components: {
    AnOneWelcome,
    AnOneAttestation,
  },
  computed: {
    address() {
      return this.$store.getters['common/wallet/address']
    },
  },
}
</script>
