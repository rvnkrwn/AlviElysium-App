export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
}

export const actions = {
  async setUser({ commit }) {
    try {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        'token'
      )}`
      const response = await this.$axios.get('/profile')
      const userData = response.data.user // Assuming the response contains user data
      commit('SET_USER', userData)
    } catch (error) {
      localStorage.removeItem('token')
      commit('SET_USER', null)
    }
  },

  unsetUser({ commit }) {
    localStorage.removeItem('token')
    commit('SET_USER', null)
  },
}

export const getters = {
  getDataUser: (state) => state.user,
}
