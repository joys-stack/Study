import Vue from 'vue'
import {
  mapState
} from 'vuex'

Vue.mixin({
  computed: {
    ...mapState({
      mixin_routes: state => state.permission.addRouters,
      mixin_menus: state => state.permission.menus,
      mixin_theme: state => state.theme.theme,
      mixin_openRoutes: state => state.permission.openRoutes,
      mixin_user: state => state.user.token,
      mixin_socket: state => state.socket.socket
    })
  }
})
