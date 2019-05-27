import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
} from '@/definition'
import request, { headers } from '@/utils/request'

import router from '@/router'


const state = {
  isAuthenticated: false,
  loading: false,
  token: null || window.localStorage.getItem('accessToken'),
}

const getters = {
  loading(state) {
    return state.loading
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  token(state) {
    return state.token
  },
}

const actions = {
  login({ dispatch, commit }, data) {
    commit(LOGIN)
    return request.post(`/api/v1/login/`, data, headers())
      .then((response) => {
        commit(LOGIN_SUCCESS, response.token)
        router.push({ path: '/' })
      })
      .catch(() => {
        commit(LOGIN_FAIL)
        dispatch(
          'notification/create',
          {
            message: 'You have entered an invalid username or password.',
            type: 'warning',
          },
          { root: true },
        )
      })
  },
  signup({ dispatch, commit }, data) {
    commit(SIGNUP)
    return request.post(`/api/v1/signup/`, data, headers())
      .then((response) => {
        commit(SIGNUP_SUCCESS, response.token)
        router.push({ path: '/' })
      })
      .catch((err) => {
        commit(SIGNUP_FAIL)
        dispatch(
          'notification/create',
          {
            message: err || err.message || 'Something went wrong. Please try again.',
            type: 'error',
          },
          { root: true },
        )
      })
  },
  logout({ commit }) {
    commit(LOGOUT)
    router.push({ path: '/login' })
  },
}

const mutations = {
  [LOGIN](state) {
    state.loading = true
  },
  [LOGIN_SUCCESS](state, token) {
    state.loading = false
    state.isAuthenticated = true
    window.localStorage.setItem('accessToken', token)
    state.token = token
  },
  [LOGIN_FAIL](state) {
    state.loading = false
    state.isAuthenticated = false
    state.token = null
  },
  [SIGNUP](state) {
    state.loading = true
  },
  [SIGNUP_SUCCESS](state, token) {
    state.loading = false
    state.isAuthenticated = true
    window.localStorage.setItem('accessToken', token)
    state.token = token
  },
  [SIGNUP_FAIL](state) {
    state.loading = false
    state.isAuthenticated = false
    state.token = null
  },
  [LOGOUT](state) {
    state.loading = false
    state.isAuthenticated = false
    window.localStorage.removeItem('accessToken')
    state.token = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
