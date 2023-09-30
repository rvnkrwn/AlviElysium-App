<template>
  <div
    class="min-h-screen bg-base-100"
    :data-theme="$store.getters['theme/getCurrentTheme']"
  >
    <nuxt />
  </div>
</template>
