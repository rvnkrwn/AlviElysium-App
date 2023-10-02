<template>
  <form @submit.prevent="handleDelete">
    <div id="message"></div>
    <div class="info-user grid grid-cols-1 gap-2 text-sm opacity-100">
      <div class="grid grid-cols-2 items-center">
        <label for="email">Password Pengguna: </label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="my-input-group outline-none"
          autofocus
          required
        />
      </div>
      <button type="submit" class="my-btn bg-error text-error-content">Hapus</button>
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2';

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
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Kembali',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$store.dispatch('config/setIsLoading', true);
            await this.$axios.delete('/profile', {data: {password: this.password}});
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
            await this.$store.dispatch('auth/logout');
            await this.$router.push('/')
          } catch (e) {
            await this.$store.dispatch('config/setIsLoading', false)
            await Swal.fire({
              text: 'Gagal menghapus akun',
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
  }
}
</script>
