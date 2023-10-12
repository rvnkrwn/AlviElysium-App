<template>
  <div class="container min-h-screen flex justify-center items-center pt-16">
    <div class="w-full max-w-lg">
      <div class="mb-6 flex flex-col gap-4">
        <img src="@/assets/kitty-cat.png" alt="" width="400" class="mx-auto max-w-full px-2"/>
        <div class="text-center">
          <p>Ayo bergabung dan kembangkan bakatmu!</p>
          <p>
            Sudah punya akun?
            <nuxt-link to="/login">Masuk</nuxt-link>
          </p>
        </div>
      </div>
      <FormRegister />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterPage',
  head() {
    return {
      title: `Daftar | ${this.$config.appName}`,

    }
  }
}
</script>
