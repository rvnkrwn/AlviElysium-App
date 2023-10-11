<template>
  <form @submit.prevent="handleLogin">
    <div id="message"></div>
    <div class="flex flex-col items-center justify-center gap-5 p-6">
      <div class="my-input-group">
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="peer bg-base-100 w-full h-full outline-none"
          autocomplete="email"
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
        <span v-else>Masuk</span>
      </button>
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export default {
  name: 'FormLogin',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('config/setIsLoading', true)
        const payload = {
          email: this.email,
          password: this.password,
        }
        const { data } = await this.$axios.post('/users/login', payload)
        await this.$store.dispatch('config/setIsLoading', false)
        await Swal.fire({
          text: 'Anda berhasil login',
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
        Cookies.set('isLoggedIn', true, { expires: 7 })
        Cookies.set('token', data.token, {
          expires: 7,
          sameSite: 'Strict',
          secure: true,
        })
        await this.$store.dispatch('auth/login')
        await this.$router.push('/')
      } catch (e) {
        await this.$store.dispatch('config/setIsLoading', false)
        await Swal.fire({
          text: 'Anda gagal login',
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
