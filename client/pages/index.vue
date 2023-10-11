<template>
  <div>
    <div class="container">
      <div class="flex flex-col gap-2 pt-16">
        <img src="@/assets/kitty-cat.png" alt="" width="400" class="mx-auto max-w-full px-2" />
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
        <div
          v-if="user"
          class="flex flex-col justify-center items-center gap-2"
        >
          <nuxt-link
            to="/profile"
            class="avatar"
            aria-label="mengarah ke halaman profile"
          >
            <div
              class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-all hover:ring-secondary"
            >
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt=""
              />
            </div>
          </nuxt-link>
          <h1 class="text-xl">Hi, {{ user.full_name }}</h1>
        </div>
        <div v-else class="flex justify-center items-center gap-4">
          <nuxt-link
            to="/login"
            class="my-btn bg-warning/60 text-warning-content text-sm transition-all duration-200 hover:-mt-2"
            >Login
          </nuxt-link>
          <nuxt-link
            to="/register"
            class="my-btn bg-error/60 text-error-content text-sm transition-all duration-200 hover:-mt-2"
            >Gabung Sekarang
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="p-4 flex flex-col gap-2 max-w-lg mx-auto">
        <div class="my-input-group">
          <input
            id="search"
            v-model="keyword"
            type="search"
            name="search"
            class="peer bg-base-100 w-full h-full outline-none bg-transparent"
          />
          <label
            for="search"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              keyword.length > 0
                ? '!-translate-y-8 border-base-content/70'
                : 'border-transparent',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
              />
            </svg>
            Cari sesuatu...</label
          >
        </div>
        <div v-if="!!categories" class="flex flex-wrap items-center gap-1 mt-2">
          <div
            v-for="c in categories"
            :key="c?.id"
            class="flex flex-row-reverse items-center gap-0.5"
          >
            <button
              :class="[
                'my-btn text-xs',
                filter === c.id ? 'bg-secondary/70 text-secondary-content' : '',
              ]"
              style="padding: 4px 10px !important"
              @click="addFilter(c.id)"
            >
              {{ c.name }}
            </button>
            <span
              v-if="filter === c.id"
              class="cursor-pointer"
              @click="clearFilter"
              >x</span
            >
          </div>
          <div v-if="categoriesCounter.toString() === '4'" class="">
            <button
              class="my-btn text-xs"
              style="padding: 4px 10px !important"
              @click="loadMoreCategories"
            >
              lainnya
            </button>
          </div>
        </div>
      </div>
      <div class="p-4">
        <h1 class="text-xl">Sedang tren teratas</h1>
        <div v-if="filterStories" class="flex flex-col gap-2">
          <div
            class="cards grid gap-4 mt-4 items-center md:grid-cols-2 xl:grid-cols-3"
          >
            <nuxt-link
              v-for="s in filterStories"
              :key="s.story_id"
              :to="'/stories/' + s.story_id"
            >
              <CardItem :data="s" />
            </nuxt-link>
          </div>
          <button
            v-if="filterStories.length >= storiesCounter"
            type="button"
            class="my-btn m-auto"
            @click="loadMoreStories"
          >
            Load more
          </button>
        </div>
        <div
          v-else
          class="cards mt-4 h-40 flex flex-col items-center justify-center"
        >
          <p>Not Found</p>
          <p v-if="keyword">Search: {{ keyword }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      categoriesCounter: 4,
      storiesData: null,
      keyword: '',
      categoriesData: null,
      storiesCounter: 10,
      filter: '',
    }
  },
  head() {
    return {
      title: 'AlviElysium - kembangin dan tulis cerita dengan bakatmu',
      meta: [
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'alvi, alvielysium, elysium, alvielysium.com, stories, cerita',
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']?.data
    },
    categories() {
      return this.categoriesData?.slice(0, this.categoriesCounter)
    },
    stories() {
      return this.storiesData
    },
    filterStories() {
      if ((this.keyword && this.stories) || this.filter) {
        return this.stories.filter(
          (story) =>
            (story.title.toLowerCase().includes(this.keyword.toLowerCase()) ||
              story.username
                .toLowerCase()
                .includes(this.keyword.toLowerCase()) ||
              story.description
                .toLowerCase()
                .includes(this.keyword.toLowerCase())) &&
            (this.filter ? story.category_id === this.filter : true)
        )
      } else {
        return this.stories?.slice(0, this.storiesCounter)
      }
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`/categories`)
      this.categoriesData = response.data
    } catch (e) {
      return {}
    }
    try {
      const response = await this.$axios.get(`/stories`)
      this.storiesData = response.data
    } catch (e) {
      return {}
    }
  },
  methods: {
    loadMoreCategories() {
      this.categoriesCounter = this.categoriesData.length
    },
    loadMoreStories() {
      this.storiesCounter += 10
    },
    addFilter(filter) {
      this.filter = filter
    },
    clearFilter() {
      this.filter = ''
    },
  },
}
</script>
