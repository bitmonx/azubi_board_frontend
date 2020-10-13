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
    },
    CLEAR_AUTH (state) {
      state.accessToken = null
      state.user = null
    }
  },
  actions: {
    setLogoutTimer ({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    tryAutoLogin ({ commit, dispatch }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        dispatch('logout')
        router.replace('/login')
        return
      }
      const tokenData = jwt_decode(token)
      const data = {
        accessToken: token,
        user: {
          uid: tokenData.uid,
          username: tokenData.username,
          firstname: tokenData.firstname,
          department: tokenData.department,
          isTrainee: tokenData.isTrainee
        }
      }
      commit('LOGIN', data)
      router.replace('/')
    },
    login ({ commit, dispatch }, formData) {
      axios.post('login', formData)
        .then(res => {
          const expiresIn = res.data.data.expires_in
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
          dispatch('setLogoutTimer', expiresIn)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresIn * 1000)
          localStorage.setItem('token', accessToken)
          localStorage.setItem('expirationDate', expirationDate)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('SET_LOGIN_ERROR')
        })
    },
    logout ({ commit }) {
      commit('CLEAR_AUTH')
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      router.replace('/login')
    },
    triggerAlert ({ commit }, type) {
      axios.get('alerts/' + type, {
        headers: {
          Authorization: `Bearer ${this.state.accessToken}`
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
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
