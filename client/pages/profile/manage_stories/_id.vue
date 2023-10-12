<template>
  <section v-if="story" class="container p-6 pt-16 relative max-w-2xl">
    <FormEditStory/>
    <div
      class="h-fit w-full border border-b-4 border-r-4 border-base-content rounded-lg shadow p-2 mt-8"
    >
      <div
        class="p-3 border-b flex items-center justify-between gap-2 flex-wrap"
      >
        <nuxt-link
          :to="'/profile/manage_stories/episode/' + story.story_id"
          class="my-btn text-xs"
        >Tambah Episode Cerita
        </nuxt-link>
        <div class="">
          <p>Total episode: {{ episode?.length }}</p>
        </div>
      </div>
      <div v-if="episode" class="content">
        <div
          v-for="(e, i) in episode"
          :key="i"
          :class="[
            'collapse relative my-1',
            i % 2 === 0 ? 'bg-success/20' : 'bg-info/20',
          ]"
        >
          <input type="radio" name="my-accordion-1" :checked="i === 0"/>
          <h1 class="collapse-title text-lg font-medium">{{ e.title }}</h1>
          <div
            class="absolute top-1 right-1 flex flex-row items-center justify-center gap-1"
          >
            <button
              type="button"
              class="px-2 py-1 cursor-pointer z-50 border border-base-content rounded-lg bg-success text-success-content"
              @click="
                $router.push(`/profile/manage_stories/episode/edit/${e.id}`)
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.84 2.73c-.39 0-.77.15-1.07.44l-2.12 2.12l5.3 5.31l2.12-2.1c.6-.61.6-1.56 0-2.14L17.9 3.17c-.3-.29-.68-.44-1.06-.44M12.94 6l-8.1 8.11l2.56.28l.18 2.29l2.28.17l.29 2.56l8.1-8.11m-14 3.74L2.5 21.73l6.7-1.79l-.24-2.16l-2.31-.17l-.18-2.32"
                />
              </svg>
            </button>
            <button
              type="button"
              class="px-2 py-1 cursor-pointer z-50 border border-base-content rounded-lg bg-error text-error-content"
              @click="handleDeleteEpisode(e.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="h-40 w-full flex items-center justify-center opacity-40"
      >
        <h1>Belum ada episode</h1>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'StoryPage',
  data() {
    return {
      storyData: null,
      episodeData: null,
    }
  },
  head() {
    return {
      title: `${this.story?.title} - ${this.$config.appName}`,
    }
  },
  computed: {
    story() {
      return this.storyData
    },
    episode() {
      return this.episodeData
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`stories/${this.$route.params.id}`)
      if (response.data.user_id) {
        const {data} = await this.$axios.get('/profile');
        if (response.data.user_id !== data.data.id) {
          await this.$router.push('/error/404');
        }
      }
      this.storyData = response.data
    } catch (e) {
      return await this.$router.push('/error/404');
    }

    if (this.storyData.total_episode > 0) {
      try {
        const response = await this.$axios.get(
          `episodes/${this.story.story_id}`
        )
        this.episodeData = response.data
      } catch (e) {
        return {}
      }
    }
  },
  methods: {
    handleDeleteEpisode(id) {
      Swal.fire({
        title: 'Anda yakin menghapus episode ini?',
        text: 'Ini tidak dapat dikembalikan',
        target: '#message',
        customClass: {
          container: 'position-fixed',
        },
        toast: true,
        position: 'center',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Kembali',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$store.dispatch('config/setIsLoading', true)
            await this.$axios.delete(`/episodes/${id}`)
            await this.$store.dispatch('config/setIsLoading', false)
            await Swal.fire({
              text: 'Berhasil menghapus episode',
              target: '#message',
              customClass: {
                container: 'position-fixed',
              },
              toast: true,
              position: 'bottom-right',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
            await window.location.reload()
          } catch (e) {
            await this.$store.dispatch('config/setIsLoading', false)
            await Swal.fire({
              text: 'Gagal menghapus episode',
              target: '#message',
              customClass: {
                container: 'position-fixed',
              },
              toast: true,
              position: 'bottom-right',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        }
      })
    },
  },
}
</script>
