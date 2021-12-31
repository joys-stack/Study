import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = () => import( /* webpackChunkName: "group-home" */ '../components/Home.vue')
// 基础组件
const Button = () => import( /* webpackChunkName: "group-home" */ '../views/Button.vue')

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home'
    }, {
        name: 'home',
        path: '/home',
        component: Home,
        children: [{
            name: 'button',
            path: '/button',
            component: Button,
        }]
    }]
})

/* router.beforeEach((to, from, next) => {
    next(to.path)
}) */

export default router