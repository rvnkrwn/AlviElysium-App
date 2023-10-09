<template>
  <section>
    <div id="message"></div>
    <div
      class="menus fixed top-4 left-4 z-[9999] flex flex-col md:flex-row gap-2"
    >
      <button
        type="button"
        class="my-btn bg-accent text-accent-content"
        aria-label="menus"
        @click="handleToggleMenus()"
      >
        <svg
          v-if="isMenus"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
          />
        </svg>
      </button>
      <div v-if="isMenus" class="flex flex-col gap-2 md:flex-row">
        <button
          type="button"
          class="my-btn bg-success text-success-content"
          @click="handleChangeRoute('/')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"
            />
          </svg>
        </button>

        <button
          v-if="isLoggedIn"
          type="button"
          class="my-btn bg-warning text-warning-content"
          @click="handleChangeRoute('/profile')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
            />
          </svg>
        </button>

        <button
          v-if="isLoggedIn"
          type="button"
          class="my-btn bg-error text-error-content"
          @click="handleLogout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m17 8l-1.4 1.4l1.6 1.6H9v2h8.2l-1.6 1.6L17 16l4-4l-4-4M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5Z"
            />
          </svg>
        </button>
        <button
          v-else
          type="button"
          class="my-btn bg-error text-error-content"
          @click="handleChangeRoute('/login')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5m9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14Z"
            />
          </svg>
        </button>

        <button type="button" class="my-btn bg-info text-info-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.5 4A1.5 1.5 0 0 0 12 5.5A1.5 1.5 0 0 0 13.5 7A1.5 1.5 0 0 0 15 5.5A1.5 1.5 0 0 0 13.5 4m-.36 4.77c-1.19.1-4.44 2.69-4.44 2.69c-.2.15-.14.14.02.42c.16.27.14.29.33.16c.2-.13.53-.34 1.08-.68c2.12-1.36.34 1.78-.57 7.07c-.36 2.62 2 1.27 2.61.87c.6-.39 2.21-1.5 2.37-1.61c.22-.15.06-.27-.11-.52c-.12-.17-.24-.05-.24-.05c-.65.43-1.84 1.33-2 .76c-.19-.57 1.03-4.48 1.7-7.17c.11-.64.41-2.04-.75-1.94Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      class="my-btn bg-primary text-primary-content fixed top-4 right-4 z-[9999]"
    >
      <select
        v-model="currentTheme"
        name="theme"
        aria-label="state theme"
        class="bg-transparent font-semibold outline-none capitalize p-[4px] text-xs cursor-pointer"
        @change="handleChangeTheme(currentTheme)"
      >
        <option v-for="(theme, i) of themes" :key="i" :value="theme">
          {{ theme }}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'AppHeader',
  data() {
    return {
      isMenus: false,
      themes: this.$store.getters['config/getThemes'],
      currentTheme: this.$store.getters['config/getCurrentTheme'],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
  mounted() {
    const self = this
    window.addEventListener('click', function (e) {
      const menus = document.querySelector('.menus')
      if (!menus.contains(e.target) && self.isMenus) {
        self.handleToggleMenus()
      }
    })
  },
  methods: {
    handleToggleMenus() {
      this.isMenus = !this.isMenus
    },
    handleChangeTheme(theme) {
      this.$store.dispatch('config/setTheme', theme)
    },
    handleChangeRoute(route) {
      this.$router.push(route)
    },
    handleLogout() {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Anda ingin keluar dari sini',
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
          await this.$store.dispatch('auth/logout')
          await Swal.fire({
            text: 'Berhasil keluar',
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
          await this.$router.push('/')
        }
      })
    },
  },
}
</script>
