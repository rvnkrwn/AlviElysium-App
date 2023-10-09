<template>
  <div>
    <div id="message"></div>
    <div class="w-full flex gap-4 flex-col mx-auto">
      <div class="relative w-fit mx-auto">
        <img
          :src="cover ?? {}"
          crossorigin="anonymous"
          alt=""
          class="w-48 h-72 max-w-[14rem] mx-auto rounded-lg shadow-lg shadow-base-content overflow-hidden"
        />
        <button
          type="button"
          :class="[
            'absolute -right-2 bottom-2 my-btn text-xs',
            isChangeCoverMode
              ? 'bg-error text-error-content'
              : 'bg-success text-success-content',
          ]"
          @click="handleChangeCoverMode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 13c.34 0 .67.04 1 .09V8l-6-6H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h7.81c-.51-.88-.81-1.9-.81-3c0-3.31 2.69-6 6-6m-6-9.5L18.5 9H13V3.5m7 16V18h-4v-2h4v-1.5l3 2.5l-3 2.5m-2 .5h4v2h-4v1.5L15 21l3-2.5V20Z"
            />
          </svg>
        </button>
      </div>
      <form
        v-if="isChangeCoverMode"
        class="flex flex-col items-center justify-center gap-5"
        @submit.prevent="handleUpdateCover"
      >
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
            for="cover"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              '!-translate-y-8 border-base-content/70',
            ]"
            >Isi Cover</label
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
      </form>
      <div class="flex items-center justify-center mt-10">
        <button type="button" class="my-btn text-xs" @click="handleEditMode">
          {{ isEditMode ? 'Batal' : 'Edit' }}
        </button>
      </div>
      <form
        class="flex flex-col items-center justify-center gap-5"
        @submit.prevent="handleSubmit"
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
            :disabled="!isEditMode"
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
            :disabled="!isEditMode"
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
          <textarea
            id="description"
            v-model="payload.description"
            type="description"
            name="description"
            class="peer bg-base-100 w-full h-full outline-none"
            placeholder="Silahkan isi deskripsi cerita"
            rows="5"
            :disabled="!isEditMode"
          />
          <label
            v-if="payload.description"
            for="description"
            class="text-xs absolute right-4 -top-4"
            >minimal 100 karakter:
            {{
              payload.description ? payload.description.length : 0
            }}/300</label
          >
        </div>
        <button
          v-if="isEditMode"
          type="submit"
          :class="[
            'bg-success text-success-content my-input-group hover:bg-transparent hover:text-base-content',
            isLoading ? 'btn-disabled' : '',
          ]"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'FormEditStory',
  data() {
    return {
      categoriesData: null,
      payload: {},
      isChangeCoverMode: false,
      isEditMode: false,
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
    story() {
      return this.payload
    },
    cover() {
      return this.coverData
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`stories/${this.$route.params.id}`)
      this.payload = response.data
      this.coverData = response.data.cover
    } catch (e) {
      return {}
    }
    try {
      const response = await this.$axios.get(`/categories`)
      this.categoriesData = response.data
    } catch (e) {
      return {}
    }
  },
  methods: {
    handleEditMode() {
      this.isEditMode = !this.isEditMode
    },
    handleChangeCoverMode() {
      this.isChangeCoverMode = !this.isChangeCoverMode
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.coverData = URL.createObjectURL(file)
        this.payload.cover = file
      }
    },
    async handleUpdateCover() {
      try {
        const formData = new FormData()
        formData.append('cover', this.payload.cover)

        const response = await this.$axios.patch(
          `/stories/${this.payload.story_id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

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
        await this.handleChangeCoverMode()
        await this.$store.dispatch('auth/login')
      } catch (e) {
        await Swal.fire({
          text: 'Gagal mengganti cover',
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
    async handleSubmit() {
      try {
        const payload = {
          title: this.payload.title,
          category_id: this.payload.category_id,
          description: this.payload.description,
        }

        const response = await this.$axios.put(
          `/stories/${this.payload.story_id}`,
          payload
        )

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
        await this.$router.push('/profile')
      } catch (e) {
        await Swal.fire({
          text: 'Gagal memperbarui cerita',
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
