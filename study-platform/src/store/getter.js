const getters = {
  addRouters: state => state.permission.addRouters,
  menus: state => state.permission.menus,
  token: state => state.user.token,
  theme: state => state.theme.theme,
  openRoutes: state => state.permission.openRoutes,
  socket: state => state.socket.socket
}

export default getters
