import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    posts: []
  },
  mutations: {
    addPost (state, payload) {
      state.posts = payload.data
    }
  },
  actions: {
    getPosts ({ commit }) {
      axios.get(`http://35.197.139.113/posts`)
        .then(response => {
          commit('addPost', response.data)
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
})
