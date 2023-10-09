// store/auth.js
import Cookies from 'js-cookie'
export const state = () => ({
  isLoggedIn: false,
  user: null,
})

export const mutations = {
  SET_LOGGED_IN(state, status) {
    state.isLoggedIn = status
  },
  SET_USER(state, data) {
    state.user = data
  },
}

export const actions = {
  async login({ commit }) {
    try {
      const token = Cookies.get('token')
      if (token) {
        const response = await this.$axios.get('/profile')
        if (response) {
          commit('SET_LOGGED_IN', true)
          commit('SET_USER', response.data)
        } else {
          Cookies.remove('isLoggedIn')
          Cookies.remove('token')
          commit('SET_LOGGED_IN', false)
          commit('SET_USER', null)
        }
      }
    } catch (e) {
      Cookies.remove('isLoggedIn')
      Cookies.remove('token')
      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
    }
  },

  logout({ commit }) {
    Cookies.remove('isLoggedIn')
    Cookies.remove('token')
    commit('SET_LOGGED_IN', false)
    commit('SET_USER', null)
  },
}

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
}
