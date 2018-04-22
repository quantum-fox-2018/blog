import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
let url = `http://localhost:3000`

Vue.use(Vuex)

const state = {
  articles: [],
  oneArticle: {},
  loading: false
}

const getters = {
  articles: state => {
    return state.articles
  },
  article: state => {
    return state.oneArticle
  },
  loading: state => {
    return state.loading
  }
}

const actions = {
  fetchData ({commit}) {
    // console.log('masuk fetch')
    axios.get(`${url}/blogs`)
      .then(response => {
        console.log('hasil fetch', response.data.blog)
        commit('fetchData', response.data.blog)
        state.data = false
      })
      .catch(err => {
        console.log('fetch failed', err.message)
      })
  },
  editBlog ({commit}, payload, payload2) {
    console.log(payload)
    console.log(payload2)
    // state.loading = true
    // axios.put(`${url}/blogs/${obj2}`, payload, {headers: {token: localStorage.getItem('token')}})
    //   .then(response => {
    //     console.log('edit', response)
    //     swal(
    //       'Edit Blog Success',
    //       'congrats',
    //       'success'
    //     )
    //     state.loading = false
    //     // commit('editData', obj1)
    //   })
    //   .catch(err => {
    //     console.log('error edit', err)
    //     state.loading = false
    //   })
  },
  writeBlog ({commit}, obj) {
    state.loading = true
    console.log('=============> masuk storenya pak')
    axios.post(`${url}/blogs`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data.data)
        commit('addData', response.data.data)
        swal(
          'Create Blog Success',
          `${response.data.data.title} is created`,
          'success'
        )
        state.loading = false
      })
      .catch(err => {
        console.log(err.message)
        swal({
          type: 'error',
          title: 'Create Blog Failed',
          text: err.message
        })
        state.loading = false
      })
  },
  deleteBlog ({commit}, obj) {
    axios.delete(`${url}/blogs/${obj}`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        swal({
          title: 'Are you sure?',
          text: 'You will delete this article',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        }).then(result => {
          if (result.value) {
            swal(
              'Delete Blog Success',
              `${response.data.blog.title} is deleted`,
              'success'
            )
            commit('deleteData', obj)
          }
        })
      })
      .catch(err => {
        console.log('error when deleting article', err)
      })
  },
  getOne ({commit}, obj) {
    console.log(obj)
    axios.get(`${url}/blogs/${obj}`)
      .then(response => {
        console.log(response.data.blog)
        commit('fetchOneData', response.data.blog[0])
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  fetchData (state, payload) {
    state.articles = payload
  },
  fetchOneData (state, payload) {
    state.oneArticle = payload
  },
  addData (state, payload) {
    state.articles.push(payload)
  },
  editData (state, payload) {
    console.log(payload)
    let index = state.articles.findIndex(post => post._id === payload.id)
    console.log(index)
    state.articles.splice(index, 1, payload)
  },
  deleteData (state, payload) {
    state.articles.map((data, index) => {
      if (payload === data._id) {
        state.articles.splice(index, 1)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
