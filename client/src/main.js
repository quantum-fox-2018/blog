import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/bootstrap.min.css'

let token = localStorage.getItem('token')
let bus = new Vue()

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://35.187.243.55'
Vue.prototype.$bus = bus

if (token) {
  Vue.prototype.$isLogin = true
} else {
  Vue.prototype.$isLogin = false
}

new Vue({
  router,
  beforeCreate: function () {
    console.log(this.$baseUrl)
  },
  render: h => h(App)
}).$mount('#app')
