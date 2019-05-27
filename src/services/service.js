import api from '@/services/api'

export default {
  fetchMessages(url) {
    return api.get(url)
      .then(response => response.data)
  },
  postMessage(url, payload) {
    return api.post(url, payload)
      .then(response => response.data)
  },
  deleteMessage(url, itemId) {
    return api.delete(`${url}/${itemId}`)
      .then(response => response.data)
  }
}
