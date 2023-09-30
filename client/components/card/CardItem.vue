<template>
  <div
    class="card w-full h-60 rounded-box overflow-hidden border border-b-4 border-r-4 border-base-content shadow bg-base-200 cursor-pointer transition-all duration-200 hover:scale-105 flex flex-row gap-2 p-4 sm:p-0"
  >
    <div class="h-full hidden sm:block">
      <img src="@/assets/272320068-100-k269695.jpg" alt="" class="h-full" />
    </div>
    <nuxt-link
      :to="'/stories/' + data.id"
      class="flex-1 text-base-content p-2 flex flex-col gap-2"
    >
      <h1 style="font-family: 'Poppins', sans-serif">{{ data.title }}</h1>
      <p class="flex items-center gap-1 text-xs">
        Penulis: <span>{{ data.author }}</span>
      </p>
      <p class="text-xs">
        {{ Array.from(data.description).slice(0, 120).join('') }}...
        <span class="underline">baca selengkapnya</span>
      </p>
    </nuxt-link>
    <div class="absolute bottom-2 right-4 flex gap-2 items-center">
      <button
        type="button"
        class="relative group bg-info/30 border border-info-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
      >
        <span
          class="absolute left-1/2 -translate-x-1/2 -translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2 hidden group-hover:block"
          >0 Likes</span
        >
        <!--   thumb-up-outline     -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="relative group bg-warning/30 border border-warning-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
      >
        <span
          class="absolute left-1/2 -translate-x-1/2 -translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2 hidden group-hover:block"
          >0 Comments</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6m7-5h-2V9h2v2m-4 0h-2V9h2v2m-4 0H7V9h2v2Z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="relative group bg-base-100/30 border border-base-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
      >
        <span
          class="absolute left-1/2 -translate-x-1/2 -translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2 hidden group-hover:block"
          >Share</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>
