import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listArticles: []
  },
  getters: {
    getAllArticles (state) {
      return state.listArticles
    }
  },
  mutations: {
    getAllArticles (state, payload) {
      state.listArticles = payload
    },
    logout (context) {
      swal({
        title: 'Are you sure?',
        text: 'You will logout from this site',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.value) {
          swal(
            'Logout!',
            'You are logged out',
            'success'
          ).then(() => {
            localStorage.removeItem('token')
            location.reload()
          })
        }
      })
    }
  },
  actions: {
    getAllArticles (context, payload) {
      axios.get('http://localhost:3000/articles').then(response => {
        context.commit('getAllArticles', response.data.article)
      })
    },
    login (context, payload) {
      axios.post('http://localhost:3000/users/login', payload).then(response => {
        localStorage.setItem('token', response.data.token)
        swal(
          'Login Success!',
          '',
          'success'
        ).then(() => location.reload())
      })
    },
    add (context, payload) {
      axios.post('http://localhost:3000/articles/', payload, {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        swal(
          'Success',
          'create new article',
          'success'
        ).then(() => location.reload())
      })
    }
  }
})
