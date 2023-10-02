<template>
  <div class="container h-screen flex justify-center items-center">
    <div class="w-full max-w-lg">
      <div class="mb-6 flex flex-col gap-4">
        <div class="w-72 mx-auto">
          <img src="@/assets/kitty-cat.png" alt="" />
        </div>
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
  middleware: 'auth',
}
</script>
