<template>
  <div>
    <section class="container">
      <div class="flex flex-col gap-2 mb-2 pt-16 md:pt-28">
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
      <div v-if="user" class="flex flex-col justify-center items-center gap-2">
        <nuxt-link :to="'/' + user.username" class="avatar">
          <div class="w-16 rounded-full">
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
    </section>
    <section class="container">
      <div class="p-6 flex flex-col gap-2 max-w-lg mx-auto">
        <div class="my-input-group">
          <input
            id="search"
            v-model="searchQuery"
            type="search"
            name="search"
            class="peer bg-base-100 w-full h-full outline-none"
          />
          <label
            for="search"
            :class="[
              'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
              searchQuery.length > 0
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
        <div class="flex flex-wrap gap-1 mt-2">
          <nuxt-link
            v-for="category in loadCategory"
            :key="category.id"
            :to="'/kategori/' + category.id"
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
      <div v-if="searchQuery" class="p-6">
        <div
          v-if="SearchStories.length > 0"
          class="cards my-2 grid gap-4 md:grid-cols-2"
        >
          <CardItem v-for="s in SearchStories" :key="s.id" :data="s" />
        </div>
        <div
          v-else
          class="flex flex-col items-center justify-center h-72 text-base-content/50"
        >
          <p>Judul tidak ditemukan</p>
          <p>404</p>
        </div>
      </div>
      <div v-else class="p-6">
        <h1 class="text-xl text-center sm:text-start">Sedang tren teratas</h1>
        <div class="cards my-4 grid gap-4 md:grid-cols-2">
          <CardItem v-for="s in stories" :key="s.id" :data="s" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Fantasi',
        },
        {
          id: 2,
          name: 'Misteri',
        },
        {
          id: 3,
          name: 'Sains Fiksi',
        },
        {
          id: 4,
          name: 'Romantis',
        },
        {
          id: 5,
          name: 'Petualangan',
        },
        {
          id: 6,
          name: 'Horor',
        },
        {
          id: 7,
          name: 'Komedi',
        },
        {
          id: 8,
          name: 'Drama',
        },
        {
          id: 9,
          name: 'Sejarah',
        },
        {
          id: 10,
          name: 'Thriller',
        },
        {
          id: 11,
          name: 'Aksi',
        },
        {
          id: 12,
          name: 'Fiksi Realis',
        },
        {
          id: 13,
          name: 'Mitraan',
        },
        {
          id: 14,
          name: 'Supranatural',
        },
        {
          id: 15,
          name: 'Cerita Anak-Anak',
        },
        {
          id: 16,
          name: 'Cerita Remaja',
        },
        {
          id: 17,
          name: 'Politik',
        },
        {
          id: 18,
          name: 'Kehidupan Kota',
        },
        {
          id: 19,
          name: 'Cerita Keluarga',
        },
        {
          id: 20,
          name: 'Cerita Klasik',
        },
      ],
      categoriesCounter: 4,
      stories: [
        {
          id: 1,
          title: 'Buku 1',
          author: 'Penulis 1',
          description:
            'Ini adalah deskripsi buku 1 yang cukup panjang dan berisi tentang konten buku ini. Buku ini mengisahkan tentang petualangan seorang tokoh utama yang berjuang melawan segala rintangan dalam hidupnya. Dalam perjalananannya, ia bertemu dengan berbagai karakter menarik dan menghadapi berbagai konflik yang mempengaruhi nasibnya. Baca buku ini untuk mengetahui lebih banyak!',
          cover: '@/assets/272320068-100-k269695.jpg',
        },
        {
          id: 2,
          title: 'Buku 2',
          author: 'Penulis 2',
          description:
            'Buku ini adalah sebuah karya sastra yang memikat hati pembaca dengan alur stories yang kompleks dan karakter yang mendalam. Cerita ini menggambarkan perjalanan seorang individu dalam menemukan jati dirinya dan melawan segala bentuk ketidakadilan. Dengan berbagai twist dan drama, buku ini akan membuat Anda terpaku di halaman-halaman ceritanya.',
          cover: '@/assets/272320068-100-k269695.jpg',
        },
        {
          id: 3,
          title: 'Buku 3',
          author: 'Penulis 3',
          description:
            'Dalam buku ini, Anda akan memasuki dunia yang penuh misteri dan petualangan yang tak terlupakan. Sang protagonis, bersama dengan sekutunya, menjelajahi tempat-tempat fantastis dan mengungkap rahasia kuno yang telah tersembunyi selama berabad-abad. Buku ini akan membawa Anda ke dalam perjalanan epik yang tak terlupakan.',
          cover: '@/assets/272320068-100-k269695.jpg',
        },
        {
          id: 4,
          title: 'Buku 4',
          author: 'Penulis 4',
          description:
            'Buku ini adalah sebuah stories cinta yang penuh emosi dan romantisme. Karakter utama berjuang melawan segala rintangan untuk bersatu dengan cinta sejatinya. Dengan latar yang indah dan dialog yang mendalam, buku ini akan membuat hati Anda tersentuh dan berdebar-debar menanti apa yang akan terjadi selanjutnya.',
          cover: '@/assets/272320068-100-k269695.jpg',
        },
        {
          id: 5,
          title: 'Buku 5',
          author: 'Penulis 5',
          description:
            'Dalam buku ini, Anda akan memasuki dunia ilmiah yang menggugah pikiran. Penulis menggali konsep-konsep kompleks dan mengajak pembaca untuk memahami dunia yang lebih dalam. Buku ini adalah perjalanan intelektual yang mengasyikkan bagi siapa pun yang mencari pemahaman yang lebih dalam tentang dunia kita.',
          cover: '@/assets/272320068-100-k269695.jpg',
        },
      ],
      searchQuery: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/getDataUser']
    },
    SearchStories() {
      if (this.searchQuery) {
        return this.stories.filter(
          (story) =>
            story.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            story.author
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            story.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        )
      } else {
        return []
      }
    },
    loadCategory() {
      return this.categories.slice(0, this.categoriesCounter)
    },
  },
  methods: {
    loadMoreCategories() {
      this.categoriesCounter = this.categories.length
    },
  },
}
</script>
