import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

const state = {
  articles: [{
    title: 'makan ayam',
    text: 'makan ayam bareng orang kehormatan negara api'
  }, {
    title: 'pesta pora di negeri orang',
    text: 'pesta pora di negeri orang bareng si presiden'
  }, {
    title: 'makan sosis',
    text: 'makan sosis di warung pejaten raya'
  }]
}

const getters = {
  articles () {
    return this.articles
  }
}

const actions = {
  signin (payload) {
    axios.post(`http://localhost:3000/signin`, payload)
      .then(response => {
        console.log(response)
        swal(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      })
      .catch(err => {
        swal(
          err.message,
          'You clicked the button!',
          'success'
        )
      })
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
