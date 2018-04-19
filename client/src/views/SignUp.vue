<template>
  <div>
    <div class="container" style="margin: 0, center">
      <div class="row">
        <div class="col">
          <div class="jumbotron">
            <h1>SignUp</h1>
            <hr>
              <span style="color: red"> {{errEmail}} </span>
              <span style="color: red"> {{errPassword}} </span>
              <span style="color: red"> {{errConfirm}} </span>
              <br>
              <br>
              <table>
                <tr>
                  <td class="left">
                    <label>Username</label>
                  </td>
                  <td>
                    <input class="form-control" v-model="username">
                  </td>
                </tr>
                <tr>
                  <td class="left">
                    <label>Email</label>
                  </td>
                  <td>
                    <input class="form-control" v-model="email">
                  </td>
                </tr>
                <tr>
                  <td class="left">
                    <label>Password</label>
                  </td>
                  <td>
                    <input type="password" v-model="password">
                  </td>
                </tr>
                <tr>
                  <td class="left">
                    <label>Confirm Password</label>
                  </td>
                  <td>
                    <input type="password" v-model="confirmpassword">
                  </td>
                </tr>
              </table>
              <br>
            <button type="button" v-on:click.prevent="signup">SignUp</button>
          </div>
          <br>
          <a href="#" v-on:click="tosignin">do you have account?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
        axios.post('http://localhost:3000/users/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(response => {
            alert(`Sign Up success ${this.username}, lets blog!`)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('token', response.data.token)
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

<style>
table {
  margin: 0 auto;
}

input {
  width: 250px;
  height: 20px;
  font-size: 1.7vw;
}
button {
  font-size: 1.7vw;
}

.left {
  text-align: left;
  padding-right: 10px;
}
.container {
  margin-left: 200px;
  margin-right: 200px;
  padding-bottom: 15px;
}
</style>
