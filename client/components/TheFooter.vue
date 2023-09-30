<template>
  <section class="container max-w-xl mt-8 text-center flex flex-col gap-2 p-6">
    <div>
      <h1>Profile Developer</h1>
      <p class="text-xs">
        Hi there, I am Revan Kurniawan, called Revan. I am an informatics
        student at the Telkom Purwokerto Institute of Technology. I am also a
        web developer, I like new things and like challenges, especially when it
        comes to technology
      </p>
    </div>
    <div class="text-center p-4 text-xs">
      <p>
        Build with ❤️ from
        <a target="_blank" href="https://www.linkedin.com/in/rvnkrwn/"
          >rvnkrwn</a
        >
      </p>
      <p>
        Copyright &copy; {{ date }}
        <nuxt-link to="/">{{ $config.appName }}</nuxt-link>
        .
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      date: new Date().getFullYear(),
    }
  },
}
</script>
