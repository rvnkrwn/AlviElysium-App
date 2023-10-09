import Cookies from 'js-cookie'

export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const token = Cookies.get('token')
    if (token || store.getters['auth/isLoggedIn']) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
