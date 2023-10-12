<template>
  <div class="container min-h-screen flex items-center justify-center pt-16">
    <div class="w-full max-w-lg">
      <div class="mb-6 flex flex-col gap-4">
        <img src="@/assets/kitty-cat.png" alt="" width="400" class="mx-auto max-w-full px-2"/>
        <div class="text-center">
          <p>Login dan kembangkan bakatmu disini!</p>
          <p>
            Belum punya akun?
            <nuxt-link to="/register">Daftar</nuxt-link>
          </p>
        </div>
      </div>
      <FormLogin/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  head() {
    return {
      title: `Masuk | ${this.$config.appName}`,

    }
  }
}
</script>
