/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/update-instructions',
  component: () => import( /* webpackChunkName: "group-update-instructions" */ '../views/other/update-instructions')
}, {
  path: '/',
  component: () => import( /* webpackChunkName: "group-redirect" */ '../views/login/redirect')
}, {
  path: '/404',
  component: () => import( /* webpackChunkName: "group-error" */ '@/views/error/404.vue')
}, {
  path: '/login',
  component: () => import( /* webpackChunkName: "group-login" */ '@/views/login/login.vue')
}]
