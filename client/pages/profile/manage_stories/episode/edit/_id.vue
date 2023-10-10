<template>
  <div class="container max-w-xl">
    <div class="flex flex-col gap-2 pt-16 md:pt-28 mb-8">
      <img src="@/assets/kitty-cat.png" alt="" width="300" class="mx-auto" />
      <div class="text-center">
        <h1
          class="font-black text-xl"
          style="font-family: 'Courier New', serif"
        >
          {{ $config.appName }}
        </h1>
        <p class="p-2">
          Tempat buat kamu kembangin dan tulis cerita dengan bakatmu
        </p>
      </div>
    </div>
    <FormEditEpisode />
  </div>
</template>

<script>
export default {
  name: 'EpisodeEditPage',
}
</script>
