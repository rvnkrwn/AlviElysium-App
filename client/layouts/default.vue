<template>
  <div
    class="min-h-screen bg-base-100"
    :data-theme="$store.getters['theme/getCurrentTheme']"
  >
    <AppHeader />
    <nuxt />
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from '~/components/TheHeader.vue'
import AppFooter from '~/components/TheFooter.vue'
export default {
  components: {
    AppFooter,
    AppHeader,
  },
}
</script>
