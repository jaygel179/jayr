import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '@/definition'


const state = {
  data: [],
}

const getters = {
  getNotifications(state) {
    return state.data
  },
}

const actions = {
  create({ commit }, data) {
    commit(CREATE_NOTIFICATION, data)
  },
  delete({ commit }, index) {
    commit(DELETE_NOTIFICATION, index)
  },
}

const mutations = {
  [CREATE_NOTIFICATION](state, notification) {
    state.data.push(notification)
  },
  [DELETE_NOTIFICATION](state, index) {
    state.data.splice(index, 1)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
