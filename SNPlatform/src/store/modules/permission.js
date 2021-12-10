import {
  generator
} from '@/router/generator-route'

export default {
  state: {
    AddRoutes: null,
    TreeRoutes: []
  },
  mutations: {
    ADDROUTES(state, route) {
      state.AddRoutes = route.AddRoutes
      state.TreeRoutes = route.TreeRoutes
    }
  },
  actions: {
    generatorRoute({
      commit
    }, param) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const route = await generator(param)
        commit('ADDROUTES', route)
        resolve(route.MainRoute)
      })
    }
  }
}
