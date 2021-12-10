import {
  generatorDynamicRouter
} from '../../router/generator-router'

const permission = {
  state: {
    menus: [],
    addRouters: [],
    openRoutes: []
  },
  mutations: {
    CLEARROUTERS: (state) => {
      state.menus = []
      state.addRouters = []
    },
    SETROUTERS: (state, routers) => {
      state.menus = routers.menuTrees
      state.addRouters = routers.addRoutes
    },
    SETOPENROUTES: (state, openRoutes) => {
      state.openRoutes = openRoutes
    }
  },
  actions: {
    generateRoutes({
      commit
    }, param) {
      return new Promise((resolve, reject) => {
        generatorDynamicRouter(param).then(response => {
          commit('SETROUTERS', response)
          resolve(response.mainRouter)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
