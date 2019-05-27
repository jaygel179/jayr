import Vue from 'vue'
import Router from 'vue-router'

import auth from './utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notfound" */'@/components/NotFound.vue'),
    },
  ],
})
