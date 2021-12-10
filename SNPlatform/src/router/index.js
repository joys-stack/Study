import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const constRoutes = [{
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "login" */ '@/views/home/Login.vue')
}]

const router = new VueRouter({
  mode: 'history',
  routes: constRoutes
})

router.beforeEach(async (to, from, next) => {
  // 登录页面直接放行
  if (to.path === '/login') {
    return next()
  }

  // 判断当前用户是否登陆（检验登录令牌）
  const AuthCode = true
  if (AuthCode) {
    // 判断是否已经生成路由
    if (!store.getters.AddRoutes) {
      const routes = await store.dispatch('generatorRoute', {})
      // 如果 routes的长度为空，则表示没有权限
      if (routes && routes.length === 0) {
        return next('/403')
      }
      // 加入权限
      router.addRoutes(routes)
      return next({
        ...to,
        replace: true
      })
    } else {
      return next()
    }
  } else {
    return next('/login')
  }
})

export default router
