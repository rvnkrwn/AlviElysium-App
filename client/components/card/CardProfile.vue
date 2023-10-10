<template>
  <div class="mt-4">
    <div class="info-user grid grid-cols-1 gap-2 text-sm opacity-70">
      <div class="flex flex-wrap gap-2 items-center">
        <label for="full_name">Nama Lengkap: </label>
        <input
          id="full_name"
          type="text"
          name="full_name"
          class="my-input-group outline-none"
          :value="user?.full_name"
          readonly
        />
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <label for="username">Nama Pengguna: </label>
        <input
          id="username"
          type="text"
          name="username"
          class="my-input-group outline-none"
          :value="user?.username"
          autocomplete="off"
          readonly
        />
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <label for="email">Email Pengguna: </label>
        <input
          id="email"
          type="text"
          name="email"
          class="my-input-group outline-none"
          :value="user?.email"
          autocomplete="off"
          readonly
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardProfile',
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters['config/getIsLoading']
    },
  },
}
</script>
