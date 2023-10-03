<template>
  <div class="container h-screen max-w-xl p-6">
    <div class="flex flex-col gap-2 pt-16 md:pt-28">
      <img src="@/assets/kitty-cat.png" alt="" class="w-72 mx-auto" />
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
      <div
        class="border p-6 rounded-lg border-r-4 border-b-4 border-base-content"
      >
        <div
          v-if="user"
          class="flex flex-col items-center justify-center gap-2"
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
            <p>@{{ user?.username }}</p>
            <p>
              Anggota sejak {{ new Date(user?.create_at).toLocaleDateString() }}
            </p>
          </div>
          <CardProfile :user="user" />
        </div>
        <div v-else class="text-center">
          <!-- Tampilkan pesan atau elemen loading saat data sedang diambil -->
          <p>Pengguna tidak ditemukan</p>
          <p>404</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userData: null, // Inisialisasi dengan null
    }
  },
  computed: {
    user() {
      return this.userData // Menggunakan computed property untuk mengakses userData
    },
  },
  async created() {
    try {
      await this.$store.dispatch('config/setIsLoading', true)
      const response = await this.$axios.get(
        `/users/${this.$route.params.username}`
      )
      this.userData = response.data
      await this.$store.dispatch('config/setIsLoading', false)
    } catch (error) {
      await this.$store.dispatch('config/setIsLoading', false)
    }
  },
}
</script>
