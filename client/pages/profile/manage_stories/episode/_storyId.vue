<template>
  <div class="container pt-20 p-6 max-w-xl">
    <div class="flex flex-col gap-2 pt-16 md:pt-28 mb-8">
      <img src="@/assets/kitty-cat.png" alt="" width="300" class="mx-auto" />
      <div class="text-center">
        <h1
          class="font-black text-xl"
          style="font-family: 'Courier New', serif"
        >
          {{ $config.appName }}
        </h1>
        <p class="p-2">
          Tempat buat kamu kembangin dan tulis cerita dengan bakatmu
        </p>
      </div>
    </div>
    <FormAddEpisode />
  </div>
</template>

<script>
export default {
  name: 'PageAddEpisode',
  computed: {},
  async mounted() {
    try {
      const response = await this.$axios.get(
        `stories/${this.$route.params.storyId}`
      )
      const user = await this.$store.getters['auth/user']
      if (response.data.user_id !== user.data.id) {
        return this.$router.push('/profile')
      }
    } catch (e) {
      return this.$router.push('/profile')
    }
  },
}
</script>
