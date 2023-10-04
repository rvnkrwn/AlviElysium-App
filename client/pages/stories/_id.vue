<template>
  <section class="container p-6">
    <div class="flex flex-col gap-4 my-6 text-center">
      <img
        :src="story.cover"
        alt=""
        class="w-full max-w-[14rem] mx-auto rounded-lg shadow-lg shadow-base-content overflow-hidden"
      />
      <nuxt-link :to="'/' + story.id">@{{ story.author }}</nuxt-link>
      <p class="text-base-content/70 text-sm">{{ story.description }}</p>
      <div class="my-4 flex gap-8 justify-center items-center">
        <button
          type="button"
          class="relative group bg-info/30 border border-info-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
        >
          <span
            class="absolute left-1/2 -translate-x-1/2 translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2"
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
        <span>|</span>
        <button
          type="button"
          class="relative group bg-warning/30 border border-warning-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
        >
          <span
            class="absolute left-1/2 -translate-x-1/2 translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2"
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
        <span>|</span>
        <button
          type="button"
          class="relative group bg-base-100/30 border border-base-content border-b-2 border-r-2 p-2 rounded-full transition-all hover:-translate-y-1"
        >
          <span
            class="absolute left-1/2 -translate-x-1/2 translate-y-8 text-xs w-max badge badge-outline border-b-2 border-r-2"
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
    <div
      class="h-fit w-full border border-b-4 border-r-4 border-base-content rounded-lg shadow bg-base-200 px-2 py-4 mt-8"
    >
      <div class="text-center mb-4">
        <h1 class="text-xl">{{ story.title }}</h1>
      </div>
      <div class="content">
        <div
          v-for="(s, i) in stories"
          :key="i"
          class="collapse border-b border-base-content/20 rounded-none"
        >
          <input type="radio" name="my-accordion-1" :checked="i === 0" />
          <div class="collapse-title text-lg font-medium">
            Eps. {{ i + 1 }}: <span class="text-base">Memulai Cerita</span>
          </div>
          <div class="collapse-content text-sm">
            <p>hello {{ i + 1 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-8">
      <h1 class="text-center text-xl">Komentar</h1>
      <form action="" @submit.prevent="addComment">
        <div
          class="bg-warning/70 text-warning-content mt-4 rounded-lg border-b-4 border-r-4 border-base-content"
        >
          <textarea
            id="comment"
            v-model="comment"
            name="comment"
            class="bg-transparent outline-none w-full resize-y px-4 py-3 placeholder:text-warning-content/50"
            placeholder="Komentar disini"
            required
          ></textarea>
        </div>
        <small class="p-2 text-base-content/60">Minimal 3 karakter *</small>
        <button
          type="submit"
          class="my-btn bg-base-200 text-sm mt-4 transition-all hover:-translate-y-1"
        >
          Kirim Komentar
        </button>
      </form>
      <br />
      <div class="comments">
        <div
          v-for="(c, i) in comments"
          :key="i"
          class="w-full p-4 bg-base-200/70 text-base-content my-4 rounded-lg border border-b-4 border-r-4 border-base-content flex flex-col gap-2 transition-all hover:scale-105"
        >
          <p class="text-xs">
            Dari: <span class="text-base">{{ story.author }}</span>
          </p>
          <p>{{ c.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'StoryPage',
  data() {
    return {
      id: this.$route.params.id,
      stories: [
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
      comments: [],
      comment: '',
    }
  },
  head() {
    return {
      title: `${this.story.title} - ${this.$config.appName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.description
        },
      ],
    }
  },
  computed: {
    story() {
      if (this.id) {
        return this.stories.filter(
          (s) => s.id.toString() === this.id.toString()
        )[0]
      } else {
        return []
      }
    },
  },
  methods: {
    addComment() {
      if (this.comment.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      } else {
        this.comments.push({
          id: 1,
          comment: this.comment,
        })
        this.comment = ''
      }
    },
  },
}
</script>
