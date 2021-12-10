const permission = {
  state: {
    theme: {}
  },
  mutations: {
    SET_THEME: (state, value) => {
      state.theme = value
      // 将主题存储到本地
      sessionStorage.setItem('THEME_MENU', value['THEME_MENU'])
      sessionStorage.setItem('THEME_COLOR', value['THEME_COLOR'])
    },
    SET_THEME_MENU: (state, value) => {
      state.theme['THEME_MENU'] = value
      sessionStorage.setItem('THEME_MENU', value)
    },
    SET_THEME_COLOR: (state, value) => {
      state.theme['THEME_COLOR'] = value
      sessionStorage.setItem('THEME_COLOR', value)
    }
  }
}

export default permission
