<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-4">
      <div class="w-full flex flex-col items-center justify-center gap-5">
        <div class="my-input-group">
          <input
            id="title"
            v-model="payload.title"
            type="text"
            name="title"
            class="peer bg-base-100 w-full h-full outline-none"
            autofocus
            required
          />
          <label
            for="title"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              payload.title
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
            >Isi Judul</label
          >
        </div>
        <div class="my-input-group">
          <input
            id="release_date"
            v-model="payload.release_date"
            type="datetime-local"
            name="release_date"
            class="peer bg-base-100 w-full h-full outline-none"
            value="-05:00"
            autofocus
            required
          />
          <label
            for="title"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              payload.release_date
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
            >Isi tanggal rilis</label
          >
        </div>
      </div>
      <div class="my-input-group overflow-hidden" style="padding: 0 !important">
        <Editor
          v-model="payload.content"
          api-key="r8jyvs3bc2gzoqog2gb0xnir7bym1e0lc8i76v5nqmhofg5e"
          :init="{
            height: 400,
          }"
        />
      </div>
      <button
        type="submit"
        :class="[
          'bg-success text-success-content my-input-group hover:bg-transparent hover:text-base-content',
          isLoading ? 'btn-disabled' : '',
        ]"
      >
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span>
      </button>
    </div>
  </form>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import Swal from 'sweetalert2'

export default {
  name: 'FormEditEpisode',
  components: {
    Editor,
  },
  data() {
    return {
      payload: {
        title: null,
        release_date: null,
        content: null,
      },
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(
        `/episodes/e/${this.$route.params.id}`
      )
      this.payload = response.data
      const jakartaDatetime = new Date(
        response.data.release_date.toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta',
        })
      )
      this.payload.release_date = jakartaDatetime.toISOString().slice(0, 16)
    } catch (e) {
      return {}
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$store.dispatch('config/setIsLoading', true)
        this.payload.release_date = this.payload.release_date.replace('T', ' ')
        await this.$axios.put(
          `/episodes/${this.$route.params.id}`,
          this.payload
        )
        await this.$store.dispatch('config/setIsLoading', false)
        await Swal.fire({
          text: 'Berhasil memperbarui episode',
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
        await this.$store.dispatch('auth/login')
        await this.$router.push(
          `/profile/manage_stories/${this.payload.story_id}`
        )
      } catch (e) {
        await this.$store.dispatch('config/setIsLoading', false)
        await Swal.fire({
          text: 'Gagal memperbarui episode',
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
    },
  },
}
</script>
