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
  currentTheme: 'light', // Theme default sebagai nilai awal
})

export const mutations = {
  SET_THEME(state, theme) {
    state.currentTheme = theme
  },
}

export const actions = {
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
}

export const getters = {
  getThemes: (state) => state.themes,
  getCurrentTheme: (state) => state.currentTheme,
}
