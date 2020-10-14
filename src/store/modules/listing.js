import axios from '@/axios/index'
import store from '@/store'
import router from '@/router'

const state = {
  currentListing: {
    items: []
  },
  checkedListings: []
}

const mutations = {
  SET_CURRENT (state, listing) {
    state.currentListing = listing
  },
  SET_CHECKED (state, listings) {
    state.checkedListings = listings
  },
  ADD_ITEM (state, item) {
    state.currentListing.items.push(item)
  },
  DELETE_ITEM (state, index) {
    state.currentListing.items.splice(index, 1)
  },
  EDIT_ITEM (state, data) {
    const itemIndex = state.currentListing.items.findIndex(element => {
      return element.id === data.itemId
    })
    state.currentListing.items[itemIndex].description = data.description
    state.currentListing.items[itemIndex].deadline = data.deadline
  },
  CHECK_LIST (state, data) {
    state.currentListing.checked_by = data.user.uid
  },
  FINISH_LIST (state, data) {
    state.checkedListings.splice(data.index, 1)
  }
}

const actions = {
  fetchCurrent ({ commit }) {
    axios.get('listings/0/items', {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.data) {
          commit('SET_CURRENT', res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  fetchChecked ({ commit }) {
    axios.get('listings/undone', {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.data) {
          commit('SET_CHECKED', res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  addItem ({ commit }, formData) {
    axios.post('items', formData, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.data.data) {
          commit('ADD_ITEM', res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteItem ({ commit }, item) {
    axios.delete('items/' + item.id, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          commit('DELETE_ITEM', item.index)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  editItem ({ commit }, formData) {
    axios.put('items/' + formData.itemId, formData, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          commit('EDIT_ITEM', formData)
          router.push('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  checkList ({ commit }, data) {
    axios.put('listings/' + data.listId + '/approve', null, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          commit('CHECK_LIST', data)
          store.dispatch('fetchCurrent')
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  finishList ({ commit }, data) {
    axios.put('listings/' + data.listId + '/finish', null, {
      headers: {
        Authorization: `Bearer ${store.state.accessToken}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          commit('FINISH_LIST', data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const getters = {
  getCurrent (state) {
    return state.currentListing
  },
  getChecked (state) {
    return state.checkedListings
  },
  getItemById: state => (itemId) => {
    return state.currentListing.items.find(element => {
      return element.id === itemId
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
