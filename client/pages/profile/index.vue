<template>
  <div class="container max-w-2xl mx-auto pt-20 md:pt-28">
    <div class="p-6">
      <div
        class="relative px-6 py-12 flex flex-col items-center justify-center gap-4 border border-base-content rounded-lg border-r-4 border-b-4"
      >
        <div class="avatar">
          <div class="w-20 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="avatar"
            />
          </div>
        </div>
        <div class="text-center">
          <p>Hai, {{ user?.username }}</p>
          <p>
            Anggota sejak {{ new Date(user?.create_at).toLocaleDateString() }}
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <div class="relative">
            <button
              id="edit"
              class="peer flex flex-col gap-1 justify-center items-center bg-success text-success-content border border-base-content border-r-4 border-b-4 px-4 py-1 rounded-lg"
              @click="handleEditMode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.84 2.73c-.39 0-.77.15-1.07.44l-2.12 2.12l5.3 5.31l2.12-2.1c.6-.61.6-1.56 0-2.14L17.9 3.17c-.3-.29-.68-.44-1.06-.44M12.94 6l-8.1 8.11l2.56.28l.18 2.29l2.28.17l.29 2.56l8.1-8.11m-14 3.74L2.5 21.73l6.7-1.79l-.24-2.16l-2.31-.17l-.18-2.32"
                />
              </svg>
            </button>
            <label
              for="edit"
              class="absolute left-1/2 -translate-x-1/2 translate-y-1 text-xs badge badge-outline hidden peer-hover:block"
              >Edit</label
            >
          </div>
          <div class="relative">
            <button
              id="delete"
              class="peer flex flex-col gap-1 justify-center items-center bg-error text-error-content border border-base-content border-r-4 border-b-4 px-4 py-1 rounded-lg"
              @click="handleDeleteMode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
                />
              </svg>
            </button>
            <label
              for="delete"
              class="absolute left-1/2 -translate-x-1/2 translate-y-1 text-xs badge badge-outline hidden peer-hover:block"
              >Hapus</label
            >
          </div>
        </div>
        <FormDelete v-if="isDeleteMode" />
        <CardProfile v-if="isReadOnlyMode" :user="user ?? {}" />
        <FormEdit v-else />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  middleware: 'auth',
  data() {
    return {
      isReadOnlyMode: true,
      isDeleteMode: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
  methods: {
    handleEditMode() {
      this.isReadOnlyMode = !this.isReadOnlyMode
    },
    handleDeleteMode() {
      this.isDeleteMode = !this.isDeleteMode
    },
  },
}
</script>
