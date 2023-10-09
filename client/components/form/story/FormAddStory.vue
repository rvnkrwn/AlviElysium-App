<template>
  <form @submit.prevent="handleSubmit">
    <div id="message"></div>
    <div
      class="flex flex-col items-center justify-center gap-5 max-w-xl mx-auto"
    >
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
        <select
          id="category"
          v-model="payload.category_id"
          name="category"
          class="peer bg-base-100 w-full h-full outline-none"
          required
        >
          <option v-for="(c, i) of categories" :key="i" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <label
          for="category"
          :class="[
            'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
            payload.category_id
              ? '!-translate-y-8 border-base-content/70'
              : 'border-transparent',
          ]"
          >Pilih Kategori</label
        >
      </div>
      <div class="my-input-group">
        <input
          id="cover"
          type="file"
          name="cover"
          class="peer bg-base-100 w-full h-full outline-none"
          accept="image/*"
          required
          @change="handleFileUpload"
        />
        <label
          v-if="!cover"
          for="cover"
          :class="[
            'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
            '!-translate-y-8 border-base-content/70',
          ]"
          >Isi Cover</label
        >
        <img
          v-else
          :src="cover ?? {}"
          crossorigin="anonymous"
          alt=""
          class="w-48 h-72 max-w-[14rem] mx-auto rounded-lg shadow-lg shadow-base-content overflow-hidden"
        />
      </div>
      <div class="my-input-group">
        <textarea
          id="description"
          v-model="payload.description"
          type="description"
          name="description"
          class="peer bg-base-100 w-full h-full outline-none"
          placeholder="Silahkan isi deskripsi cerita"
          rows="5"
        />
        <label for="description" class="text-xs absolute right-4 top-0.5"
          >minimal 100 karakter:
          {{ payload.description ? payload.description.length : 0 }}/300</label
        >
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
import Swal from 'sweetalert2'

export default {
  name: 'FormAddStory',
  data() {
    return {
      categoriesData: null,
      payload: {},
      coverData: null,
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
    categories() {
      return this.categoriesData
    },
    cover() {
      return this.coverData
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`/categories`)
      this.categoriesData = response.data
    } catch (e) {
      return {}
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.coverData = URL.createObjectURL(file)
        this.payload.cover = file
      }
    },
    async handleSubmit() {
      try {
        const formData = new FormData()
        formData.append('title', this.payload.title)
        formData.append('category_id', this.payload.category_id)
        formData.append('description', this.payload.description)
        formData.append('cover', this.payload.cover)

        const response = await this.$axios.post('/stories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        await Swal.fire({
          text: response.data.message,
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
          `/profile/manage_stories/${response.data.story_id}`
        )
      } catch (e) {
        await Swal.fire({
          text: 'Gagal membuat cerita',
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
