<template>
  <div class="container pt-14 md:pt-16">
    <div class="p-6">
      <div class="flex flex-col gap-2 pt-16 md:pt-28">
        <img src="../../../assets/kitty-cat.png" alt="" class="w-72 mx-auto" />
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
      <div class="mt-6">
        <FormAddStory />
      </div>
    </div>
  </div>
</template>

<script>
import FormAddStory from '~/components/form/story/FormAddStory.vue'

export default {
  name: 'AddNewStoryPage',
  components: { FormAddStory },
}
</script>
