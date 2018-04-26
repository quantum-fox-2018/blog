<template>
<div>
  <nav class="navbar justify-content-between">
    <router-link to="/" class="navbar-brand">My Blog</router-link>
    <form class="form-inline">
      <!-- Button trigger modal -->
      <button v-if="token === ''" type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
        Log In
      </button>
        <button v-if="token === ''" type="button" class="btn btn-primary" data-toggle="modal" data-target="#signUpModal">
        Sign Up
      </button>
        <button v-if="token !== ''" type="button" class="btn btn-danger" @click="logOut">
        Log Out
      </button>
    </form>
  </nav>
    <!-- signup -->
  <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Sign Up</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name" class="col-form-label">Name:</label>
              <input type="text" class="form-control" v-model="objNewuser.name" placeholder="name...">
            </div>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <p :class="{ 'control': true }">
                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" class="form-control" v-model="objNewuser.email" placeholder="Email">
                <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
              </p>
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label">Password:</label>
               <p class="control has-icon has-icon-right">
                <input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" class="form-control" v-model="objNewuser.password"  placeholder="Password">
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
            </p>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="signUpButton">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
<!-- login -->
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Log In</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="email" class="col-form-label">Email:</label>
              <input type="text" class="form-control" placeholder="email..." v-model="objUser.email">
            </div>
            <div class="form-group">
              <label for="password" class="col-form-label">Password:</label>
              <input type="password" class="form-control" placeholder="password..." v-model="objUser.password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="signInButton">Log In</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Nabar',
  data () {
    return {
      objNewuser: {
        name: '',
        email: '',
        password: ''
      },
      objUser: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUpButton: function () {
      this.$store.dispatch('signUp', this.objNewuser)
    },
    signInButton: function () {
      this.$store.dispatch('signIn', this.objUser)
    },
    logOut: function () {
      this.$store.dispatch('logOut').then(() => {
        this.$router.push({path: '/'})
      })
    }
  },
  computed: {
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  }
}
</script>

<style>
nav {
  background: rgba(0, 0, 0, 0.5)
}
nav a {
  color: white !important;
  font-weight: bold;
}

button {
  margin-right: 5px;
}
</style>
