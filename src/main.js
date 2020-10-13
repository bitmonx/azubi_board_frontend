import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'

import '../src/assets/css/styles.css'
import '@/font-awesome/index'

// Sets base url for sending http requests with axios
axios.defaults.baseURL = 'http://azubi-board.localhost'

// Creates a vue filter for formatting built-in Date objects
Vue.filter('dateFormat', function (value) {
  return value.toLocaleDateString()
})

// Add datepicker component
Vue.component('datepicker', Datepicker)

// Set production tips
Vue.config.productionTip = false

// Build Vue Instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
