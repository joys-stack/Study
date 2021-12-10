import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import user from './modules/user'
import permission from './modules/permission'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    permission,
    theme
  },
  getters
})
