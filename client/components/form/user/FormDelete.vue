<template>
  <form class="mt-4" @submit.prevent="handleDelete">
    <div class="info-user grid grid-cols-1 gap-2 text-sm opacity-100">
      <div class="my-input-group">
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="peer bg-base-100 w-full h-full outline-none"
          required
        />
        <label
          for="password"
          :class="[
            'my-label-input bg-base-100 text-base-content badge peer-hover:border-base-content/70 peer-focus:border-base-content/70',
            password.length > 0
              ? '!-translate-y-8 border-base-content/70'
              : 'border-transparent',
          ]"
          >Isi passwordmu</label
        >
      </div>
      <div class="text-xs text-error">
        <p>Isi password sekarang (lama) anda untuk melanjutkan</p>
      </div>
      <button
        type="submit"
        class="bg-error text-error-content my-input-group hover:bg-transparent hover:text-base-content"
      >
        Simpan
      </button>
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'FormDelete',
  data() {
    return {
      password: '',
    }
  },
  methods: {
    handleDelete() {
      Swal.fire({
        title: 'Anda yakin menghapus akun?',
        text: 'Ini tidak dapat dikembalikan',
        target: '#message',
        customClass: {
          container: 'position-fixed',
        },
        toast: true,
        position: 'center',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Kembali',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$store.dispatch('config/setIsLoading', true)
            await this.$axios.delete('/profile', {
              data: { password: this.password },
            })
            await this.$store.dispatch('config/setIsLoading', false)
            await Swal.fire({
              text: 'Berhasil menghapus akun',
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
            await this.$store.dispatch('auth/logout')
            await this.$router.push('/')
          } catch (e) {
            await this.$store.dispatch('config/setIsLoading', false)
            await Swal.fire({
              text: 'Hapus semua episode dan cerita kamu dulu',
              target: '#message',
              customClass: {
                container: 'position-fixed',
              },
              toast: true,
              position: 'bottom-right',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        }
      })
    },
  },
}
</script>
