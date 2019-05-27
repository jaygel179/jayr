import Vue from 'vue'

export const headers = token => ({
  'Content-Type': 'application/json',
  Authorization: `JWT ${token}`,
})

export default {
  get(url, header) {
    return Vue.http.get(url, header)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  post(url, body, header) {
    return Vue.http.post(url, body, header)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  patch(url, body, header) {
    return Vue.http.patch(url, body, header)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  delete(url, header) {
    return Vue.http.delete(url, header)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
}
