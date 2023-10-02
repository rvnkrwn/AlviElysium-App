// plugins/axios.js

import Cookies from 'js-cookie'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    // Mendapatkan token dari localStorage jika tersedia
    const token = Cookies.get('token')

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
