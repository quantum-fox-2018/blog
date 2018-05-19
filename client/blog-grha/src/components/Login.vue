<template>
  <div class="container jumbotron justify-content-center" id="body">
    <div class="row" style="margin-top:100px">
         <h1>
          <span><strong>B</strong></span>
          <span><strong>L</strong></span>
          <span><strong>O</strong></span>
          <span><strong>G</strong></span>
          <span><strong>-</strong></span>
          <span><strong>R</strong></span>
          <span><strong>H</strong></span>
          <span><strong>A</strong></span>
        </h1>
      </div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">Login</button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content login">
          <form>
            <h3 style="font-family:Arial bold, FontAwesome; color:white">Login</h3>
            <div class="form-group">
              <label for="inputUsername" style="font-family:Arial bold, FontAwesome; color:white">Email</label>
              <input v-model="loginemail" type="email" class="loginstyle" id="inputEmail" placeholder="Email" style="font-family:Arial, FontAwesome">
            </div>
            <div class="form-group">
              <label for="inputPassword" style="font-family:Arial bold, FontAwesome; color:white">Password</label>
              <input v-model="loginpassword" type="password" class="loginstyle" id="inputPassword" placeholder="Password" style="font-family:Arial, FontAwesome">
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" @click="login" class="btn btn-primary" data-dismiss="modal">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="RegisterModal" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content login">
          <form>
            <h3 style="font-family:Arial bold, FontAwesome; color:white">Register</h3>
            <div class="form-group">
              <label for="inputUsername" style="font-family:Arial bold, FontAwesome; color:white">Email</label>
              <input v-model="registeremail" type="email" class="loginstyle" id="inputEmail" placeholder="Email" style="font-family:Arial, FontAwesome">
            </div>
            <div class="form-group">
              <label for="inputPassword" style="font-family:Arial bold, FontAwesome; color:white">Password</label>
              <input v-model="registerpassword" type="password" class="loginstyle" id="inputPassword" placeholder="Password" style="font-family:Arial, FontAwesome">
            </div>
            <div class="modal-footer justify-content-center">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" @click="register" class="btn btn-primary" data-dismiss="modal">User</button>
              <button type="button" @click="bikinAdmin" class="btn btn-primary" data-dismiss="modal">Admin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
export default {
  data () {
    return {
      loginemail: '',
      loginpassword: '',
      registeremail: '',
      registerpassword: '',
      url: 'http://localhost:3000'
    }
  },
  methods: {
    login () {
      let data = {
        email: this.loginemail,
        password: this.loginpassword
      }
      axios.post(`${this.url}/users/signin`, data)
        .then(response => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('role', response.data.role)
          swal(
            'Login Success',
            'you can go to landing page now',
            'success'
          )
          this.$router.push('/home')
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Login Failed',
            text: err.message
          })
        })
    },
    register () {
      let data = {
        email: this.registeremail,
        password: this.registerpassword
      }
      axios.post(`${this.url}/users/signup`, data)
        .then(response => {
          // console.log(response.data)
          swal(
            'Register Success',
            'you can login using your email now',
            'success'
          )
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Register Failed',
            text: err.message
          })
        })
    },
    bikinAdmin () {
      let data = {
        email: this.registeremail,
        password: this.registerpassword
      }
      axios.post(`${this.url}/users/admin`, data)
        .then(response => {
          // console.log(response.data)
          swal(
            'Register Success',
            'you can login using your email now',
            'success'
          )
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Register Failed',
            text: err.message
          })
        })
    }
  }
}
</script>

<style scoped>
#body{
background-color: palevioletred
}
.login{
padding: 40px;
margin-top: 50px;
border: 5px solid rgba(0, 0, 0, 0.44);
border-radius: 5px;
background: rgba(0, 0, 0, 0.4);
}
.loginstyle{
height: 54px;
padding: 11px 12px;
font-size: 16px;
-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
width: 100%;
}
.register{
position: relative;
width: 300px;
right: 30px;
}
.registerstyle{
height: 54px;
padding: 11px 12px;
font-size: 16px;
-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
width: 100%;
}
.inputRegister{
width: 180px;
}
::-webkit-input-placeholder {
color: black;
}
:-moz-placeholder { /* Firefox 18- */
color: black;
}
::-moz-placeholder {  /* Firefox 19+ */
color: black;
}
:-ms-input-placeholder {
color: black;
}
h1 {
    margin:0;
    padding:0;
    position: relative;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
h1 span {
    color:#17a2b8;
    background:#fff;
    padding:10px 20px;
    font-family:arial;
    display:table-cell;
    box-shadow:inset 0 0 5px rgba(0,0,0,.3) , 0 5px 0 #ccc;
    animation: animate .5s infinite;
}
@keyframes animate
{
    0%
    {
     transform: translateY(0px);
    }
    50%
    {
     transform: translateY(-20px);
    }
    100%
    {
     transform: translateY(0px);
    }
}
h1 span:nth-child(1)
{
    animation-delay:.2s;
}
h1 span:nth-child(2)
{
    animation-delay:.4s;
}
h1 span:nth-child(3)
{
    animation-delay:.6s;
}
h1 span:nth-child(4)
{
    animation-delay:.8s;
}
h1 span:nth-child(5)
{
    animation-delay:.10s;
}
h1 span:nth-child(6)
{
    animation-delay:.2s;
}
h1 span:nth-child(7)
{
    animation-delay:.4s;
}
</style>
