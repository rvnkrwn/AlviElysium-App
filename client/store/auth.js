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
        }
      }
    } catch (e) {
      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
    }
  },

  logout({ commit }) {
    commit('SET_LOGGED_IN', false)
    commit('SET_USER', null)
    Cookies.remove('isLoggedIn')
    Cookies.remove('token')
  },
}

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
}
