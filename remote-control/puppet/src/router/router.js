import {createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            name: 'Main',
            component: import( /* webpackChunkName: "group-foo" */ '../views/Main.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router