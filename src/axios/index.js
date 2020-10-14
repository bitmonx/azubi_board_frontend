import axios from 'axios'
import swal from 'sweetalert'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://azubi-board.localhost'
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const status = error.response.status
  const url = error.response.request.responseURL
  if (status !== 401) {
    return Promise.reject(error)
  }
  if (url.includes('login')) {
    return Promise.reject(error)
  }
  swal({
    title: 'Session abgelaufen',
    text: 'Deine Session ist abgelaufen. Du wirst zur Login-Seite weitergeleitet.'
  }).then(function () {
    store.dispatch('logout')
    router.replace('/login')
  })
})

export default instance
