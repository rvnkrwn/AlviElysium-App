<template>
  <section>
    <div
      class="menus fixed top-4 left-4 z-[9999] flex flex-col md:flex-row gap-2"
    >
      <button
        type="button"
        class="my-btn bg-accent text-accent-content"
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
          type="button"
          class="my-btn bg-warning text-warning-content"
          @click="handleChangeRoute('/profile/manage_stories')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.75 20.85c1.78-.7 1.39-2.63.49-3.85c-.89-1.25-2.12-2.11-3.36-2.94A9.817 9.817 0 0 1 4.54 12c-.28-.33-.85-.94-.27-1.06c.59-.12 1.61.46 2.13.68c.91.38 1.81.82 2.65 1.34l1.01-1.7C8.5 10.23 6.5 9.32 4.64 9.05c-1.06-.16-2.18.06-2.54 1.21c-.32.99.19 1.99.77 2.77c1.37 1.83 3.5 2.71 5.09 4.29c.34.33.75.72.95 1.18c.21.44.16.47-.31.47c-1.24 0-2.79-.97-3.8-1.61l-1.01 1.7c1.53.94 4.09 2.41 5.96 1.79m9.21-13.52L13.29 13H11v-2.29l5.67-5.68l2.29 2.3m3.4-.78c-.01.3-.32.61-.64.92L19.2 10l-.87-.87l2.6-2.59l-.59-.59l-.67.67l-2.29-2.29l2.15-2.15c.24-.24.63-.24.86 0l1.43 1.43c.24.22.24.62 0 .86c-.21.21-.41.41-.41.61c-.02.2.18.42.38.59c.29.3.58.58.57.88Z"
            />
          </svg>
        </button>

        <button
          v-if="user"
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
        class="bg-transparent font-semibold outline-none capitalize p-[4px] text-xs cursor-pointer"
        @change="handleChangeTheme(currentTheme)"
      >
        <option v-for="(theme, i) of themes" :key="i" :value="theme">
          {{ theme }}
        </option>
      </select>
    </div>
    <AppLoading v-if="isLoading"/>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
import AppLoading from "~/components/TheLoading.vue";

export default {
  name: 'AppHeader',
  components: {AppLoading},
  data() {
    return {
      isLoading: false,
      isMenus: false,
      themes: this.$store.getters['theme/getThemes'],
      currentTheme: this.$store.getters['theme/getCurrentTheme'],
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/getDataUser']
    },
  },
  mounted() {
    window.addEventListener("load", async () => {
      if (localStorage.getItem("token")) {
        this.isLoading = true;
        await this.$store.dispatch("user/setUser");
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
    });

    const self = this;
    window.addEventListener("click", function (e) {
      const menus = document.querySelector(".menus");
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
      this.$store.dispatch('theme/setTheme', theme)
    },
    handleChangeRoute(route) {
      this.$router.push(route)
    },
    async handleFetchUser() {
      await this.$store.dispatch('user/setUser')
    },
    handleLogout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('user/unsetUser')
          Swal.fire('Logout!', 'Your file has been deleted.', 'success')
        }
      })
    },
  },
}
</script>
