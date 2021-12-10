import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user'
import permission from './modules/permission'
import session from './modules/session'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    /* user, */
    permission,
    session
  },
  getters
})
