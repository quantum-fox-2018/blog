<template>
  <div>
    <div class="ui center aligned three column grid">
      <div class="row">
        <div class="ui form">
          <h1>Blognyaa</h1>
          <img src="@/assets/logo.jpg">
          <h3 style="margin: 0;">Sign Up</h3> <br>
          <div class="ui error message">
            <p>{{errEmail}}</p>
          </div>
          <span style="color: red"> {{errEmail}} </span>
          <span style="color: red"> {{errPassword}} </span>
          <span style="color: red"> {{errConfirm}} </span>
          <div class="field">
            <label>Username</label>
            <input class="form-control" v-model="username">
            <label>Email</label>
            <input class="form-control" v-model="email">
            <label>Password</label>
            <input type="password" v-model="password">
            <label>Confirm Password</label>
            <input type="password" v-model="confirmpassword" @keyup.enter="signup">
            <button class="ui positive button" v-on:click="signup">Sign Up</button>
            <br>
            <a href="#" v-on:click="tosignin">do you have account?</a>
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
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      errEmail: '',
      errPassword: '',
      errConfirm: ''
    }
  },
  watch: {
    email: function (val) {
      this.checkEmail()
    },
    password: function (val) {
      this.checkPassword()
    },
    confirmpassword: function (val) {
      this.checkConfirmPassword()
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
    checkConfirmPassword: function () {
      if (this.password !== this.confirmpassword && this.confirmpassword.length > 0) {
        this.errConfirm = 'password is different'
      } else {
        this.errConfirm = ''
      }
    },
    signup: function () {
      if (this.errEmail === '' && this.errPassword === '' && this.errConfirm === '' && this.email !== '' && this.password !== '' && this.confirmpassword !== '' && this.username !== '') {
        axios.post('http://35.187.254.68/users/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(response => {
            swal({
              title: 'welcome, lets blog!',
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
    tosignin: function () {
      this.$router.push('/signin')
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
