<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a v-if="!token" v-on:click="signin">Sign Up</a>
    <a v-else v-on:click="signout">Sign Out</a>
    <!-- <router-link to="/signup" v-on:click="checkToken">SignUp</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    signout: function () {
      let r = confirm('Do you want to Sign Out?')
      if (r == true) {
        localStorage.clear()
        this.token = ''
        this.$router.push('/')
        alert('Sign out success')
      }
    },
    signin: function () {
      this.$router.push('/signup')
    },
  }
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
