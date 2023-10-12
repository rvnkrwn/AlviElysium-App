<template>
  <div class="container pt-20 min-h-screen">
    <div v-if="story" class="p-4 grid gap-8">
      <div class="flex flex-col gap-2 items-center justify-center">
        <img
          :src="story.cover"
          crossorigin="anonymous"
          alt=""
          class="w-full max-w-[14rem] mx-auto rounded-lg shadow-lg shadow-base-content overflow-hidden"
        />
        <h1 class="text-xl text-center md:text-2xl p-2 mt-4">{{ story.title }}</h1>
        <p class="text-sm">
          Oleh:
          <nuxt-link :to="'/' + story.username" class="underline"
            >@{{ story.username }}</nuxt-link
          >
        </p>
        <p class="text-base-content/70 text-sm text-center max-w-4xl">
          {{ story.description }}
        </p>
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
            @click="handleShare"
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
      <div v-if="episode" class="w-full">
        <div
          v-for="(s, i) in episode"
          :key="i"
          :class="[
            'collapse my-2 rounded-lg p-2',
            i % 2 === 0 ? 'bg-success/20' : 'bg-info/20',
          ]"
        >
          <input type="radio" name="my-accordion-1" :checked="i === 0" />
          <h1
            :class="[
              'collapse-title text-base font-bold my-btn',
              i % 2 === 0 ? 'bg-success/40' : 'bg-info/40',
            ]"
          >
            {{ s.title }}
          </h1>
          <div class="collapse-content text-sm mt-2">
            <div v-html="s.content"></div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="h-40 w-full flex items-center justify-center opacity-40"
      >
        <h1>Belum ada episode</h1>
      </div>
      <div class="w-full">
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
      </div>
      <div v-if="comments.length" class="w-full">
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
      <div v-else class="w-4/5 mx-auto h-40 flex items-center justify-center gap-2 opacity-70">
        <span class="border-b border-base-content w-full h-0.5" />
        <span class="w-full text-center">Belum ada komentar</span>
        <span class="border-b border-base-content w-full h-0.5" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'StoryPage',
  data() {
    return {
      id: this.$route.params.id,
      comments: [],
      comment: '',
      storyData: null,
      episodeData: null,
    }
  },
  head() {
    return {
      title: `${this.story?.title} - ${this.$config.appName}`,
    }
  },
  computed: {
    story() {
      return this.storyData
    },
    episode() {
      return this.episodeData
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get(`stories/${this.$route.params.id}`)
      this.storyData = response.data
    } catch (e) {
      await this.$router.push('/error/404')
    }

    if (this.storyData.total_episode > 0) {
      try {
        const response = await this.$axios.get(
          `episodes/${this.story.story_id}`
        )
        this.episodeData = response.data
      } catch (e) {
        return {}
      }
    }
  },
  methods: {
    handleShare() {
      const textToCopy = window.location.href

      const tempTextArea = document.createElement('textarea')
      tempTextArea.value = textToCopy

      tempTextArea.style.position = 'fixed'
      tempTextArea.style.top = '0'
      tempTextArea.style.left = '0'
      tempTextArea.style.opacity = '0'

      document.body.appendChild(tempTextArea)

      tempTextArea.select()

      try {
        // Salin teks ke clipboard menggunakan Clipboard API
        document.execCommand('copy')
        Swal.fire({
          text: 'Link URL telah berhasil disalin ke clipboard.',
          target: '#message',
          customClass: {
            container: 'position-fixed',
          },
          toast: true,
          position: 'bottom-right',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      } catch (err) {
        return {}
      }

      document.body.removeChild(tempTextArea)
    },
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
