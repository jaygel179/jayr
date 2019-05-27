import store from '@/store'

import { LOGIN_SUCCESS } from '@/definition'
import request from './request'


export default {
  verifyLogin: () => {
    if (store.getters['auth/isAuthenticated']) {
      return Promise.resolve()
    }

    const token = store.getters['auth/token']
    if (!token || !token.length) {
      return Promise.reject(new Error('User is not logged in.'))
    }

    return request.post(`${process.env.VUE_APP_SERVER_URL}/auth/verify`, { token })
      .then((res) => {
        store.commit(LOGIN_SUCCESS, res.token)
      }).catch(() => {
        window.localStorage.removeItem('accessToken')
        throw new Error('User is not logged in.')
      })
  },
}
