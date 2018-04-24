<template>
  <div id="nav">
    <div class="ui top fixed menu">
      <div class="ui image">
        <img src="@/assets/logo.jpg">
      </div>
      <a class="item">
        <router-link to="/">Home</router-link>
      </a>
      <a class="item">
        <router-link to="/about">About</router-link>
      </a>
      <div class="right menu">
        <a class="ui item" v-if="!token" v-on:click="signin">Sign In</a>
        <a class="ui item" v-else v-on:click="signout">Sign Out</a>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'NavBar',
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    signout: function () {
      swal({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#CACBCD',
        confirmButtonText: 'Yes, Sign out!'
      }).then((result) => {
        if (result.value) {
          localStorage.clear()
          this.token = ''
          this.$router.push('/signin')
          swal(
            'Sign out!',
            'Thank you for bloging!',
            'success'
          )
        }
      })
    },
    signin: function () {
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>
img {
  max-width: 70px;
  max-height: 70px;
}
.ui.menu {
  background: #FCF6EB;
}
</style>
