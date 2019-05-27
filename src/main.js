import Vue from 'vue'
import App from '@/App.vue'
import Vuetify from 'vuetify'

import store from '@/store'
import router from '@/router'

import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)
Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
