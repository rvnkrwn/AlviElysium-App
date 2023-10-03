<template>
  <div>
    <div class="container">
      <div class="flex flex-col gap-2 pt-16 md:pt-28">
        <img src="@/assets/kitty-cat.png" alt="" class="w-72 mx-auto" />
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
          <nuxt-link to="/profile" class="avatar">
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
      <div class="p-6 flex flex-col gap-2 max-w-lg mx-auto">
        <div class="my-input-group">
          <input
            id="search"
            v-model="keyword"
            type="search"
            name="search"
            class="peer bg-base-100 w-full h-full outline-none"
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
        <div v-if="categories" class="flex flex-wrap gap-1 mt-2">
          <nuxt-link
            v-for="category in categories"
            :key="category?.category_id"
            :to="'/kategori/' + category.category_id"
            class="my-btn text-xs"
            style="padding: 4px 10px !important"
            >{{ category.name }}
          </nuxt-link>
          <button
            v-if="categoriesCounter.toString() === '4'"
            type="button"
            class="my-btn text-xs"
            @click="loadMoreCategories"
          >
            lainnya
          </button>
        </div>
      </div>

      <div class="p-6">
        <h1 class="text-xl">Sedang tren teratas</h1>
        <div
          v-if="dataStories"
          class="cards grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <CardItem v-for="s in dataStories" :key="s.id" :data="s" />
        </div>
        <div
          v-else
          class="cards mt-4 h-40 flex flex-col items-center justify-center"
        >
          <p>Not Found</p>
          <p>Search: {{ keyword }}</p>
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
      storiesData: [
        {
          id: 1,
          title: 'Buku 1',
          author: 'Penulis 1',
          description:
            'Ini adalah deskripsi buku 1 yang cukup panjang dan berisi tentang konten buku ini. Buku ini mengisahkan tentang petualangan seorang tokoh utama yang berjuang melawan segala rintangan dalam hidupnya. Dalam perjalananannya, ia bertemu dengan berbagai karakter menarik dan menghadapi berbagai konflik yang mempengaruhi nasibnya. Baca buku ini untuk mengetahui lebih banyak!',
          cover: 'https://img.wattpad.com/cover/303640066-100-k406345.jpg',
        },
        {
          id: 2,
          title: 'Buku 2',
          author: 'Penulis 2',
          description:
            'Buku ini adalah sebuah karya sastra yang memikat hati pembaca dengan alur stories yang kompleks dan karakter yang mendalam. Cerita ini menggambarkan perjalanan seorang individu dalam menemukan jati dirinya dan melawan segala bentuk ketidakadilan. Dengan berbagai twist dan drama, buku ini akan membuat Anda terpaku di halaman-halaman ceritanya.',
          cover: 'https://img.wattpad.com/cover/422987-100-k990535.jpg',
        },
        {
          id: 3,
          title: 'Buku 3',
          author: 'Penulis 3',
          description:
            'Dalam buku ini, Anda akan memasuki dunia yang penuh misteri dan petualangan yang tak terlupakan. Sang protagonis, bersama dengan sekutunya, menjelajahi tempat-tempat fantastis dan mengungkap rahasia kuno yang telah tersembunyi selama berabad-abad. Buku ini akan membawa Anda ke dalam perjalanan epik yang tak terlupakan.',
          cover: 'https://img.wattpad.com/cover/272320068-100-k269695.jpg',
        },
        {
          id: 4,
          title: 'Buku 4',
          author: 'Penulis 4',
          description:
            'Buku ini adalah sebuah stories cinta yang penuh emosi dan romantisme. Karakter utama berjuang melawan segala rintangan untuk bersatu dengan cinta sejatinya. Dengan latar yang indah dan dialog yang mendalam, buku ini akan membuat hati Anda tersentuh dan berdebar-debar menanti apa yang akan terjadi selanjutnya.',
          cover: 'https://img.wattpad.com/cover/303327265-100-k389967.jpg',
        },
        {
          id: 5,
          title: 'Buku 5',
          author: 'Penulis 5',
          description:
            'Dalam buku ini, Anda akan memasuki dunia ilmiah yang menggugah pikiran. Penulis menggali konsep-konsep kompleks dan mengajak pembaca untuk memahami dunia yang lebih dalam. Buku ini adalah perjalanan intelektual yang mengasyikkan bagi siapa pun yang mencari pemahaman yang lebih dalam tentang dunia kita.',
          cover: 'https://img.wattpad.com/cover/135176886-100-k439569.jpg',
        },
      ],
      keyword: '',
      categoriesData: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    categories() {
      return this.categoriesData?.slice(0, this.categoriesCounter)
    },
    stories() {
      return this.storiesData
    },
    dataStories() {
      if (this.keyword) {
        return this.stories.filter(
          (story) =>
            story.title.toLowerCase().includes(this.keyword.toLowerCase()) ||
            story.author.toLowerCase().includes(this.keyword.toLowerCase()) ||
            story.description.toLowerCase().includes(this.keyword.toLowerCase())
        )
      } else {
        return this.stories
      }
    },
  },
  async mounted() {
    const response = await this.$axios.get(`/categories`)
    this.categoriesData = response.data
  },
  methods: {
    loadMoreCategories() {
      this.categoriesCounter = this.categoriesData.length
    },
  },
}
</script>
