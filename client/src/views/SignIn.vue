<template>
  <div>
    <div class="container" style="margin: 0, center">
      <div class="row">
        <div class="col">
          <div class="jumbotron">
            <h1>SignIn</h1>
            <hr>
              <span style="color: red"> {{errEmail}} </span>
              <span style="color: red"> {{errPassword}} </span>
              <br>
              <br>
              <table>
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
              </table>
              <br>
            <button type="button" v-on:click.prevent="signin">SignIn</button>
          </div>
          <br>
          <a href="#" v-on:click="tosignup">do you want to register?</a>
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
    signin: function () {
      if (this.errEmail === '' && this.errPassword === '' && this.email !== '' && this.password !== '') {
        axios.post('http://localhost:3000/users/signin', {
          email: this.email,
          password: this.password
        })
          .then(response => {
            alert(`welcome back ${response.data.username}, lets blog!`)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('token', response.data.token)
            location.reload('/')
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
