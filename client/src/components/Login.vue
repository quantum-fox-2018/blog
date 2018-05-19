<template>
  <div class="row">
    <div class="boxlogin">
      <div class="col-max-12">
        <h1 style="text-align:center; font-family:meriend;">Login</h1>
      </div>
      <form class="" @submit.prevent='signin'>
        <div class="col-max-12 zoom">
          <div class="email" style="width:10%;float:left;"><font-awesome-icon :icon="user" /></div>
          <input type="text" name="" value="" v-model="username" placeholder="input your username" style="width:80%;">
          <span class="tooltiptext">Input Your Username</span>
        </div>
        <div class="col-max-12 zoom">
          <div class="password" style="width:10%;float:left;"><font-awesome-icon :icon="passwordicon" /></div>
          <input type="password" name="password" id="password" v-model="password" value="" placeholder="input your password" :class="{colorborder:bordercolor}" style="width:80%;">
          <span class="tooltiptext">Input Your Password</span>
        </div>
        <div class="col-max-12">
          <button type="submit" name="button" class="col-max-12"> Sign in </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fauser from '@fortawesome/fontawesome-free-solid/faUser'
import faUnlock from '@fortawesome/fontawesome-free-solid/faUnlock'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      bordercolor: false
    }
  },
  computed: {
    user () {
      return fauser
    },
    passwordicon () {
      return faUnlock
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    signin () {
      axios.post('http://localhost:3000/users/signin', {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.status === 200) {
          console.log(response)
          this.$store.dispatch('kirimtoken', {token: response.data.token, id: response.data.id})
          swal('Good job!', 'username & password valid', 'success').then(data => {
            this.$router.push('/')
          })
        }
      }).catch(() => {
        swal('username atau password salah')
      })
    }
  },
  watch: {
    password: function () {
      if (this.password.length < 6 && this.password.length !== 0) {
        this.bordercolor = true
      } else {
        this.bordercolor = false
      }
    }
  }
}
</script>

<style scoped>
  .zoom {
    position: relative;
    display: inline-block;
  }
  .colorborder {
    outline: none !important;
    border: 1px solid red;
    box-shadow: inset 0 0 2px red;
  }
  .zoom .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: 105%;
  }

  .zoom .tooltiptext::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
  .zoom:hover .tooltiptext {
    visibility: visible;
  }
  .zoom:hover{
    width:310px;
    -webkit-transition: width 2s;
    transition: width 2s;
  }

  .row{
    justify-content:center;
  }
  button{
    background-color: transparent;
    border: 1px solid black;
    padding: 10px 15px;
    color: black;
  }
  button:hover{
    background-color: black;
    color: white;
    transition-duration:0.8s;
  }

  .boxlogin{
    margin-top: 100px;
    border-radius: 3px;
    padding: 20px;
    border:1px solid rgba(0,0,0,0.125);
    width:300px;
  }
  .email,.password{
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    padding:5.5px;
    text-align: center;
    border-radius:2.3px 0 0 2.3px;
  }
  input {
    border-radius:0px 2.3px 2.3px 0px;
  }
  .email,.password{
    color:rgba(0,0,0,0.3);
  }
  @media only screen and (max-width: 768px){
    .boxlogin{
      margin-top: 20px;
    }
    .zoom {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .zoom .tooltiptext {
        visibility: hidden;
        width: 150px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: 80%;
        left: 50%;
        margin-left: -60px;
    }
    .zoom .tooltiptext::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      top: -100%;
      right: 100%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }

    .zoom:hover .tooltiptext {
        visibility: visible;
    }
  }
</style>
