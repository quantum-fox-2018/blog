<template>
    <div class="row navbar">
      <div class="col-max-2 logo" style="font-family:meriend;">
        <router-link :to="{ name: 'Home'}">My blog</router-link>
      </div>
      <div class="col-max-2 logout" v-show="!tokens">
        <button type="button" name="button" class="btnlogout" @click="show(false, true, true)">Register</button>
        <router-link to="Login"><button type="button" name="button" class="btnlogout">Login</button></router-link>
      </div>
      <div class="col-max-1 logout" v-show="tokens">
        <router-link to="/"><button type="button" name="button" class="btnlogout" @click="logout">Logout</button></router-link>
      </div>
      <modal name="example-modal"
        transition="nice-modal-fade"
        :min-width="200"
        :min-height="200"
        :delay="100"
        width=400
        height="auto"
        :adaptive="adaptive"
        :resizable="resizable"
        :draggable="draggable">
         <div class="example-modal-content" style="color:black">
           <h1 style="text-align:center; font-family:meriend">Register</h1>
           <table>
             <tr>
               <td>
                 <label for="firstname" style="margin-right:30px;">User Name</label>
               </td>
               <td>
                 <input type="text" id="firstname" v-model="username" value="" placeholder="User Name">
               </td>
             </tr>
             <tr>
               <td>
                 <label for="email" style="margin-right:30px;">Email</label>
               </td>
               <td>
                 <input type="email" id="email" v-model="email" value="" placeholder="Enter Your Email">
               </td>
             </tr>
             <tr>
               <td>
                 <label for="password" style="margin-right:30px;">Password</label>
               </td>
               <td>
                 <input type="password" name="password" v-model="password" value="" placeholder="Enter Your Password">
               </td>
             </tr>
             <tr>
               <td></td>
               <td>
                 <button class="tombol" @click="hide()" >cancle</button>
                 <button class="tombol" @click="register" >Register</button>
               </td>
             </tr>
           </table>
         </div>
       </modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      resizable: false,
      adaptive: false,
      draggable: false,
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    show (resizable, adaptive, draggable) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.draggable = draggable
      this.$nextTick(() => {
        this.$modal.show('example-modal')
      })
    },
    hide () {
      this.$modal.hide('example-modal')
    },
    register () {
      axios.post('http://localhost:3000/users/signup', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(response)
        this.username = ''
        this.password = ''
        this.email = ''
      })
      console.log(this.username + this.email + this.password)
      this.$modal.hide('example-modal')
    },
    logout () {
      this.$store.dispatch('hapustoken')
      this.token = ''
    }
  },
  computed: {
    tokens () {
      return this.$store.getters.gettoken
    }
  }
}
</script>

<style scoped>
a{
  color:white;
  text-decoration: none;
}
.example-modal-content{
  padding: 10px 30px;
}
.tombol{
  background-color: transparent;
  border: 1px solid #ced4da;
  padding: 10px 15px;
  color: black;
}
.tombol:hover{
  background-color: black;
  color: white;
}
.btnlogout{
  background-color: transparent;
  border: 1px solid white;
  padding: 10px 15px;
  color: white;
}
.btnlogout:hover{
  background-color: white;
  color: black;
}
.logo{
  padding-top: 10px;
}
.row {
  justify-content: space-between;
}
.navbar {
  background-color: black;
  color: white;
  padding:10px;
}
.btnlogout{
  margin-left: 20px;
}
.v--modal-box,.v--modal{
  width:100%;
}
@media only screen and (max-width: 768px){
  .btnlogout{
    margin-left: 0px;
  }
  .row {
    justify-content: space-between;
  }
}
</style>
