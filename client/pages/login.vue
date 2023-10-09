<template>
  <div class="container min-h-screen flex items-center justify-center pt-20">
    <div class="w-full max-w-lg">
      <div class="mb-6 flex flex-col gap-4">
        <div class="w-72 mx-auto">
          <img src="@/assets/kitty-cat.png" alt="" />
        </div>
        <div class="text-center">
          <p>Login dan kembangkan bakatmu disini!</p>
          <p>
            Belum punya akun?
            <nuxt-link to="/register">Daftar</nuxt-link>
          </p>
        </div>
      </div>
      <FormLogin />
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
}
</script>
