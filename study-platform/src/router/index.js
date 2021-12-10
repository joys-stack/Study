import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  constantRouterMap
} from '../config/router.config'
import store from '../store'
import {
  onRecursive
} from '@/lib/common'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap
})

// 使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
  // 根据路径为单点登录，直接放行
  if (to.path === '/' || to.path === '/login') return next()

  // 如果是首页页面，直接放行
  if (to.path === '/homepage-finance' || to.path === '/homepage-logistics' || to.path === '/homepage-oa') {
    return next()
  }

  // 判断打开的功能点是否超过10个，超过则不跳转
  // 当前跳转的页面是否在 已打开的页面中
  const index = store.getters.openRoutes.findIndex(item => item.path === to.path)
  if (store.getters.openRoutes && store.getters.openRoutes.length === 10 && index < 0) {
    return
  }

  // 如果既不是登录页面，也不是单点登录，则验证权限
  const role = window.SessionStorage.getItem('AccessToken')
  if (role && role !== '') {
    // 若角色已经登录，但是仓库中没有角色信息，则进行添加
    if (!store.getters.token) {
      store.commit('SETTOKEN', JSON.parse(role))
    }

    // 判断仓库中是否有角色新加的路由
    if (store.getters.addRouters.length === 0) {
      const param = {
        appID: store.getters.token.appID,
        userID: store.getters.token.userID
      }
      // 根据用户ID和应用ID获取权限
      const response = await store.dispatch('generateRoutes', param)
      // 如果返回的对象为空，则取警告页面
      if (!response) {
        return next({
          path: '/login'
        })
      }

      router.addRoutes(response)
      return next({
        ...to,
        replace: true
      })
    } else {
      // 获取权限数据源
      const tempRole = JSON.parse(role)
      let tempRoutes = []
      if (tempRole.groupOrder && tempRole.groupOrder !== '') {
        tempRoutes = store.getters.menus.filter(item => item.menuGroupOrder === tempRole.groupOrder)
      } else {
        tempRoutes = store.getters.menus
      }
      const data = onRecursive(tempRoutes, 'children', 'objectName', to.path)
      const index = constantRouterMap.findIndex(item => item.path === to.path)
      // 路由找不到权限就跳到 404页面
      if (!data && index < 0 && (to.path !== '/index' && to.path !== '/home')) {
        return next('/404')
      }
      return next()
    }
  } else {
    return next('/login')
  }
})

export default router
