export default {
  state: {
    Session: {
      RoutePath: null
    }
  },
  mutations: {
    SET_ROUTEPATH(state, route) {
      state.Session.RoutePath = route
      sessionStorage.setItem('ROUTEPATH', route)
    }
  },
  actions: {

  }
}
