import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listArticles: [],
    activeUser: {
      userId: localStorage.getItem('userId') || '',
      token: localStorage.getItem('token') || '',
      name: localStorage.getItem('name') || ''
    },
    quotes: ''
  },
  getters: {
    getAllArticles: function (state) {
      return state.listArticles
    },
    getActiveUser: function (state) {
      return state.activeUser
    },
    getQuotes: function (state) {
      return state.quotes
    }
  },
  mutations: {
    showAllArticles: function (state, payload) {
      state.listArticles = payload
    },
    postArticle: function (state, payload) {
      state.listArticles.push(payload)
    },
    logOut: function (state, payload) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log me out!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Log out!',
            'Your have been logged out',
            'success'
          )
          localStorage.clear()
          location.reload()
        }
      })
    },
    getQuote: function (state, payload) {
      state.quotes = payload
    }
  },
  actions: {
    showAllArticles: function (context, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles'
      }).then(response => {
        context.commit('showAllArticles', response.data.listArticle)
      }).catch(error => {
        console.log(error)
      })
    },
    postArticle: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles',
        headers: {
          token: context.state.activeUser.token,
          userid: context.state.activeUser.userId
        },
        data: payload
      }).then(response => {
        swal(
          'Post Article success!',
          'Your article has been post!',
          'success'
        )
        context.dispatch('showAllArticle')
      })
    },
    signUp: function (context, payload) {
      console.log('signup payloda', payload)
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('respon signup', response)
        swal(
          'Welcome!',
          'Sign Up success!',
          'success'
        )
        localStorage.setItem('userId', response.data.data.id)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('name', response.data.data.name)
        location.reload()
      }).catch(error => {
        console.log(error.message)
      })
    },
    signIn: function (context, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(response => {
        console.log('signin', response)
        swal(
          'Welcome!',
          'Login success!',
          'success'
        )
        localStorage.setItem('userId', response.data.data.id)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('name', response.data.data.name)
        location.reload()
      }).catch(error => {
        console.log(error)
      })
    },
    getQuote: function (context, payload) {
      axios({
        method: 'get',
        url: 'https://favqs.com/api/qotd'
      }).then(response => {
        console.log('quotes', response.data)
        context.commit('getQuote', response.data.quote)
      })
    }
  }
})
