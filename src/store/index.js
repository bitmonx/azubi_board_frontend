import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import router from '../router/index'
import listing from '@/store/modules/listing'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    user: null,
    loginError: false
  },
  mutations: {
    LOGIN (state, data) {
      state.accessToken = data.accessToken
      state.user = data.user
      state.loginError = false
    },
    SET_LOGIN_ERROR (state) {
      state.loginError = true
    }
  },
  actions: {
    login ({ commit }, formData) {
      axios.post('login', formData)
        .then(res => {
          const accessToken = res.data.data.access_token
          const tokenData = jwt_decode(accessToken)
          const data = {
            accessToken: res.data.data.access_token,
            user: {
              uid: tokenData.uid,
              username: tokenData.username,
              firstname: tokenData.firstname,
              department: tokenData.department,
              isTrainee: tokenData.isTrainee
            }
          }
          commit('LOGIN', data)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('SET_LOGIN_ERROR')
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    getLoginError (state) {
      return state.loginError
    }
  },
  modules: {
    listing
  }
})
