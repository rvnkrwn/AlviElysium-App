<template>
  <form class="mt-4" @submit.prevent="handleUpdate">
    <div class="info-user grid grid-cols-1 gap-2 text-sm opacity-100">
      <div class="p-2 text-center text-md">
        <h1>Formulir Update Data</h1>
        <p>Isi atau ubah data yang ingin diedit</p>
      </div>
      <div class="flex flex-col gap-2">
        <label for="full_name">Nama Lengkap: </label>
        <input
          id="full_name"
          v-model="full_name"
          type="text"
          name="full_name"
          class="my-input-group outline-none"
          autofocus
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="username">Nama Pengguna: </label>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          class="my-input-group outline-none"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Email Pengguna: </label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          class="my-input-group outline-none"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Password Baru Pengguna: </label>
        <input
          id="new_password"
          v-model="new_password"
          type="password"
          name="new_password"
          class="my-input-group outline-none"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email">Password Lama Pengguna: </label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="my-input-group outline-none"
          required
        />
      </div>
      <div class="text-xs">
        <p>
          Isi password saat ini untuk konfirmasi
          <span class="text-error">*</span>
        </p>
      </div>
      <button
        type="submit"
        :class="[
          'bg-success text-success-content my-input-group hover:bg-transparent hover:text-base-content',
          isLoading || password <= 0 ? 'btn-disabled' : '',
        ]"
      >
        <span v-if="isLoading">Loading...</span>
        <span v-else>Simpan</span>
      </button>
    </div>
  </form>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'FormEdit',
  data() {
    return {
      isReadOnlyMode: true,
      full_name: this.$store.getters['auth/user']?.data.full_name,
      username: this.$store.getters['auth/user']?.data.username,
      email: this.$store.getters['auth/user']?.data.email,
      password: '',
      new_password: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
  methods: {
    handleEditMode() {
      this.isReadOnlyMode = !this.isReadOnlyMode
    },
    async handleUpdate() {
      try {
        await this.$store.dispatch('config/setIsLoading', true)
        const data = {
          full_name: this.full_name,
          username: this.username,
          email: this.email,
          password: this.password,
          new_password: this.new_password,
        }
        await this.$axios.put('/profile', data)
        await this.$store.dispatch('config/setIsLoading', false)
        await Swal.fire({
          text: 'Berhasil memperbaharui data',
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
          text: 'Gagal memperbaharui data',
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
