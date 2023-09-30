<template>
  <div class="max-w-md mx-auto">
    <form @submit.prevent="handleRegister">
      <div class="h-screen flex flex-col items-center justify-center gap-5 p-6">
        <div class="mb-6 flex flex-col gap-4">
          <img src="@/assets/kitty-cat.png" alt="" class="w-72 mx-auto"/>
          <div class="text-center">
            <p>Ayo bergabung dan kembangkan bakatmu!</p>
            <p>
              Sudah punya akun?
              <nuxt-link to="/login">Masuk</nuxt-link>
            </p>
          </div>
        </div>
        <div class="my-input-group">
          <input
            id="full_name"
            v-model="full_name"
            type="text"
            name="full_name"
            class="peer bg-base-100 w-full h-full outline-none"
            required
          />
          <label
            for="full_name"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              full_name.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >Isi namamu</label
          >
        </div>
        <div class="my-input-group">
          <input
            id="birthday"
            v-model="birthday"
            type="date"
            name="birthday"
            :class="[
              'peer bg-base-100 w-full h-full outline-none',
              birthday.length > 0 ? 'text-base-content' : 'text-transparent',
            ]"
            required
          />
          <label
            for="birthday"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              birthday.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >Isi Ulang Tahunmu</label
          >
        </div>
        <div class="my-input-group">
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="peer bg-base-100 w-full h-full outline-none"
            required
          />
          <label
            for="email"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              email.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >Isi emailmu</label
          >
        </div>
        <div class="my-input-group">
          <input
            id="username"
            v-model="username"
            type="text"
            name="username"
            class="peer bg-base-100 w-full h-full outline-none"
            required
          />
          <label
            for="username"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              username.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >Nama pengguna</label
          >
        </div>
        <div class="my-input-group">
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            class="peer bg-base-100 w-full h-full outline-none"
            required
          />
          <label
            for="password"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              password.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >Isi passwordmu</label
          >
        </div>
        <p class="w-full text-start text-xs">
          Dengan mendaftar, Anda setuju untuk patuh pada
          <nuxt-link to="/forget-password" class="text-info">Syarat</nuxt-link>
          dan
          <nuxt-link to="/forget-password" class="text-info"
          >Ketentuan kami
          </nuxt-link>
          .
        </p>
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
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  name: 'RegisterPage',
  data() {
    return {
      full_name: '',
      birthday: '',
      username: '',
      email: '',
      password: '',
      emailAlreadyUse: false,
      usernameAlreadyUse: false,
      isLoading: false,
    }
  },
  methods: {
    clearForm() {
      this.full_name = ''
      this.birthday = ''
      this.username = ''
      this.email = ''
      this.password = ''
    },
    async handleRegister() {
      try {
        this.isLoading = true
        const data = {
          full_name: this.full_name,
          birthday: this.birthday,
          username: this.username,
          email: this.email,
          password: this.password,
        }
        const response = await this.$axios.post('/users/register', data)
        this.isLoading = false
        await this.clearForm()
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        })
        await this.$router.push('/login')
      } catch (e) {
        await Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'email atau username anda telah digunakan',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isLoading = false
        this.password = ''
      }
    },
  },
}
</script>
