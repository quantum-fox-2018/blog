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
    }
  },
  actions: {
    getAllArticles (context, payload) {
      axios.get('http://localhost:3000/articles').then(response => {
        context.commit('getAllArticles', response.data.article)
      })
    },
    register (context, payload) {
      axios.post('http://localhost:3000/users/register', payload).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.user._id)
        swal(
          'Register Success!',
          'You are now logged in',
          'success'
        ).then(() => location.reload())
      })
    },
    login (context, payload) {
      axios.post('http://localhost:3000/users/login', payload).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.user._id)
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
    },
    edit (context, payload) {
      axios.put(`http://localhost:3000/articles/${payload.id}`, payload).then(response => {
        swal(
          'Success',
          'create new article',
          'success'
        ).then(() => location.reload())
      })
    },
    del (context, payload) {
      axios.delete(`http://localhost:3000/articles/${payload}`).then(response => {
        swal({
          title: 'Are you sure?',
          text: 'You will delete this article',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.value) {
            swal(
              'Deleted!',
              'Article is deleted',
              'success'
            ).then(() => {
              location.reload()
            })
          }
        })
      })
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
            localStorage.removeItem('id')
            location.reload()
          })
        }
      })
    }
  }
})
