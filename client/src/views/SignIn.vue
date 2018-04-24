<template>
  <div>
    <div class="ui center aligned three column grid">
      <div class="row">
        <div class="ui form">
          <h1>Blognyaa</h1>
          <img src="@/assets/logo.jpg">
          <h3 style="margin: 0;">Sign In</h3> <br>
          <div class="ui error message">
            <p>{{errEmail}}</p>
          </div>
          <span style="color: red"> {{errEmail}} </span>
          <span style="color: red"> {{errPassword}} </span>
          <div class="field">
            <label>Email</label>
            <input class="form-control" v-model="email">
            <label>Password</label>
            <input type="password" v-model="password" @keyup.enter="signin">
            <button class="ui positive button" v-on:click="signin">Sign In</button>
            <br>
            <a href="#" v-on:click="tosignup">do you want to register?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
// eslint-disable-next-line
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  data () {
    return {
      email: '',
      password: '',
      errEmail: '',
      errPassword: ''
    }
  },
  watch: {
    email: function (val) {
      this.checkEmail()
    },
    password: function (val) {
      this.checkPassword()
    }
  },
  methods: {
    checkEmail: function () {
      if (!re.test(this.email) && this.email.length > 0) {
        this.errEmail = 'email is invalid'
      } else {
        this.errEmail = ''
      }
    },
    checkPassword: function () {
      if (this.password.length < 6 && this.password.length > 0) {
        this.errPassword = 'password length less than 6'
      } else {
        this.errPassword = ''
      }
    },
    signin: function () {
      if (this.errEmail === '' && this.errPassword === '' && this.email !== '' && this.password !== '') {
        axios.post('http://localhost:3000/users/signin', {
          email: this.email,
          password: this.password
        })
          .then(response => {
            swal({
              title: 'welcome back, lets blog!',
              animation: false,
              customClass: 'animated tada'
            })
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('token', response.data.token)
            location.reload()
            this.$router.push('/')
          })
          .catch(error => {
            console.log(error.message)
            alert(`login failed ${error.message}`)
          })
      }
    },
    tosignup: function () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.ui.form .field>label{
  margin: 0.5em 0 0.5em 0;
}

.ui.positive.button{
  margin-top: 10px;
  margin-bottom: 10px;
}

img {
  max-width: 25vw;
  max-height: 25vh;
}

</style>
