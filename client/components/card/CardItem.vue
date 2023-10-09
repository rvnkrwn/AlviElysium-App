<template>
  <div
    class="w-full h-56 max-h-56 bg-base-100 shadow border-base-content border rounded-lg border-b-4 border-r-4 p-2 flex flex-col gap-2 transition-all hover:scale-105"
  >
    <div class="flex gap-2">
      <img
        :src="data.cover"
        crossorigin="anonymous"
        alt=""
        class="h-32 w-20 rounded-lg shadow"
      />
      <div class="info flex flex-col">
        <h1 class="flex-1">{{ data.title }}</h1>
        <div>
          <div class="badge badge-primary text-xs">
            {{ data.category_name }}
          </div>
          <ul class="flex gap-2 text-center flex-1 h-1/4 mt-2">
            <li>
              <div class="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                  />
                </svg>
                <h2 class="text-xs">Baca</h2>
              </div>
              <p class="text-sm">0</p>
            </li>
            <li><span>|</span></li>
            <li>
              <div class="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2M1 21h4V9H1v12Z"
                  />
                </svg>
                <h2 class="text-xs">Suka</h2>
              </div>
              <p class="text-sm">0</p>
            </li>
            <li><span>|</span></li>
            <li class="">
              <div class="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6m16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 10l-2.5-1.5L15 12V4h5v8Z"
                  />
                </svg>
                <h2 class="text-xs">Episode</h2>
              </div>
              <p class="text-sm">{{ data.total_episode }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="description text-xs my-auto">
      <p>
        {{
          data.description.length > 100
            ? Array.from(data.description).slice(0, 100).join('') +
              '...selengkapnya'
            : data.description
        }}
      </p>
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
