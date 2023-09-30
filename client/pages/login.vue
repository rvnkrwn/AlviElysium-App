<template>
  <div class="max-w-md mx-auto">
    <form @submit.prevent="handleLogin">
      <div class="h-screen flex flex-col items-center justify-center gap-5 p-6">
        <div class="mb-6 flex flex-col gap-4">
          <img src="@/assets/kitty-cat.png" alt="" class="w-72 mx-auto" />
          <div class="text-center">
            <p>Login dan kembangkan bakatmu disini!</p>
            <p>
              Belum punya akun?
              <nuxt-link to="/register">Daftar</nuxt-link>
            </p>
          </div>
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
        <p class="w-full text-end text-xs">
          <nuxt-link to="/forget-password">Lupa password?</nuxt-link>
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
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    }
  },
  methods: {
    handleClearForm() {
      this.email = ''
      this.password = ''
    },
    async handleLogin() {
      try {
        this.isLoading = true
        const data = {
          email: this.email,
          password: this.password,
        }
        const response = await this.$axios.post('/users/login', data)
        this.isLoading = false
        await this.handleClearForm()
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        })
        localStorage.setItem('token', response.data.token)
        await this.$store.dispatch('user/setUser')
        await this.$router.push('/')
      } catch (e) {
        await Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'email atau password salah',
          showConfirmButton: false,
          timer: 1500,
        });
        this.isLoading = false
        this.handleClearForm()
      }
    },
  },
}
</script>
