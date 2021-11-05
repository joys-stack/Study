// import Vue from 'vue'
import {createRouter, createWebHistory } from 'vue-router'

/* console.log(Vue)
console.log(VueRouter)
Vue.use(VueRouter) */
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Main',
            component: import( /* webpackChunkName: "group-foo" */ '../views/Main.vue')
        },
        {
            path: '/control',
            name: 'Control',
            component: import( /* webpackChunkName: "group-foo" */ '../views/Control.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router