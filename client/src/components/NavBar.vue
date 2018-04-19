<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-2 px-5">
    <a class="navbar-brand" href="/">Barestu.</a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link"><router-link to="/">HOME</router-link> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><router-link to="/blog">BLOG</router-link> <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-outline-dark" v-if="!isLogin" data-toggle="modal" data-target="#exampleModalCenter">
            LOGIN
          </button>
          <button type="button" class="btn btn-outline-dark" v-if="isLogin" @click="logout">
            LOGOUT
          </button>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div class="modal modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Login As Author</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <input type="email" class="form-control" v-model="username" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Password">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-primary" @click="login" data-dismiss="modal">Login</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'navbar',
  data: function () {
    return {
      isLogin: this.$isLogin,
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      axios.post(`${this.$baseUrl}/api/user/signin`, {
        username: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.isLogin = true
          this.username = ''
          this.password = ''
          swal('Login success!', ``, 'success')
        })
        .catch(error => {
          console.log(error)
          swal('Login failed!', 'Username/password invalid', 'error')
        })
    },

    logout: function () {
      swal({
        title: 'Logging out',
        text: 'Are you sure want to logout?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            swal('You have been logged out!', {
              icon: 'success'
            })
            localStorage.removeItem('token')
            this.isLogin = false
          }
        })
    }
  }
}
</script>

<style>

</style>
