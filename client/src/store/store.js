import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    tokens: localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || ''
  },
  getters: {
    gettoken (state) {
      return state.tokens
    },
    getid (state) {
      return state.id
    }
  },
  mutations: {
    kirimtoken (state, payload) {
      state.tokens = payload.token
      state.id = payload.id
    },
    hapustoken (state, payload) {
      state.tokens = payload.token
      state.id = payload.id
    }
  },
  actions: {
    kirimtoken ({commit}, payload) {
      localStorage.setItem('token', payload.token)
      localStorage.setItem('id', payload.id)
      commit('kirimtoken', {token: payload.token, id: payload.id})
    },
    hapustoken ({commit}) {
      localStorage.clear()
      commit('hapustoken', {token: null, id: null})
    }
  }
})
