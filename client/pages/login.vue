<template>
  <div class="container h-screen flex justify-center items-center">
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
  middleware: 'auth',
}
</script>
