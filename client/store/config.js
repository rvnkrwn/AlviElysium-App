export const state = () => ({
  themes: [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ],
  currentTheme: 'light',
  isLoading: false,
})

export const mutations = {
  SET_THEME(state, theme) {
    state.currentTheme = theme
  },

  SET_IS_LOADING(state, bool) {
    state.isLoading = bool
  },
}

export const actions = {
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
    localStorage.setItem('currentTheme', theme)
  },

  setIsLoading({ commit }, bool) {
    commit('SET_IS_LOADING', bool)
  },
}

export const getters = {
  getThemes: (state) => state.themes,
  getCurrentTheme: (state) => state.currentTheme,
  getIsLoading: (state) => state.isLoading,
}
