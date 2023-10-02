<template>
  <div class="min-h-screen bg-base-100" :data-theme="currentTheme">
    <AppLoading v-if="isLoading" />
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '~/components/TheHeader.vue'
import AppFooter from '~/components/TheFooter.vue'
import AppLoading from '~/components/TheLoading.vue'

export default {
  name: 'Layout',
  components: {
    AppLoading,
    AppFooter,
    AppHeader,
  },
  computed: {
    currentTheme() {
      return this.$store.getters['config/getCurrentTheme']
    },
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
  async mounted() {
    if (!this.$store.getters['auth/isLoggedIn']) {
      await this.$store.dispatch('auth/login')
    }
    setTimeout(() => {
      this.$store.dispatch('config/setIsLoading', false)
    }, 1000)
  },
  async beforeCreate() {
    await this.$store.dispatch('config/setIsLoading', true)
  },
}
</script>
