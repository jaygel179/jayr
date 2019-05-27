import Vue from 'vue'
import Router from 'vue-router'

import auth from './utils/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/components/Login.vue'),
      beforeEnter: (to, from, next) => {
        auth.verifyLogin().then(() => {
          next('/')
        }).catch(() => {
          next()
        })
      },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import(/* webpackChunkName: "signup" */ '@/components/Signup.vue'),
      beforeEnter: (to, from, next) => {
        auth.verifyLogin().then(() => {
          next('/')
        }).catch(() => {
          next()
        })
      },
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
      beforeEnter: (to, from, next) => {
        auth.verifyLogin().then(() => {
          next()
        }).catch(() => {
          next('/login')
        })
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notfound" */'@/components/NotFound.vue'),
    },
  ],
})
