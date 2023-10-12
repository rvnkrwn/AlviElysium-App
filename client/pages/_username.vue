<template>
  <div class="container max-w-2xl mx-auto pt-20 md:pt-28">
    <div class="p-4 flex flex-col gap-2">
      <div
        class="relative px-6 py-12 flex flex-col items-center justify-center gap-4 border border-base-content rounded-lg border-r-4 border-b-4"
      >
        <div class="avatar">
          <div class="w-20 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
        </div>
        <div class="text-center">
          <p>Hai, {{ user?.username }}</p>
          <p>
            Anggota sejak {{ new Date(user?.created_at).toLocaleDateString() }}
          </p>
        </div>
        <CardProfile :user="user ?? {}" />
      </div>
      <div v-if="stories" class="relative">
        <h1 class="text-center text-lg">Daftar Cerita</h1>
        <div class="cards grid gap-4 mt-2 items-center">
          <nuxt-link
            v-for="s in stories"
            :key="s.story_id"
            :to="'/stories/' + s.story_id"
          >
            <CardItem :data="s" />
          </nuxt-link>
        </div>
      </div>
      <div
        v-else
        class="cards mt-4 h-40 flex flex-col items-center justify-center"
      >
        <p>Not Found</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userData: null,
      storiesData: null,
    }
  },
  computed: {
    user() {
      return this.userData
    },
    stories() {
      return this.storiesData
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('config/setIsLoading', true)
      const response = await this.$axios.get(
        `/users/${this.$route.params.username}`
      )
      if (!response) {
        await this.$router.push('/error/404')
      }
      this.userData = response.data?.data
      this.storiesData = response.data?.stories
      await this.$store.dispatch('config/setIsLoading', false)
    } catch (error) {
      await this.$store.dispatch('config/setIsLoading', false)
      await this.$router.push('/error/404')
    }
  },
}
</script>
