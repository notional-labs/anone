<template>
  <div v-if="initialized">
    <AnWallet ref="wallet" v-on:dropdown-opened="$refs.menu.closeDropdown()" />
    <SpLayout>
      <template v-slot:sidebar>
        <Sidebar />
      </template>
      <template v-slot:content>
        <router-view />
      </template>
    </SpLayout>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>

<script>
import '@starport/vue/lib/starport-vue.css'
import './scss/app.scss'
import Sidebar from './components/Sidebar'
import AnWallet from '@/components/AnWallet/AnWallet'

export default {
  components: {
    Sidebar,
    AnWallet,
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
  async created() {
    await this.$store.dispatch('common/env/init')
    this.initialized = true
  },
  errorCaptured(err) {
    console.log(err)
    return false
  },
}
</script>
