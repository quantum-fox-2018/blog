<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signup">SignUp</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      statusToken: false
    }
  },
  methods: {
    checkToken: function() {
      if(localStorage.getItem(token).length > 0) {
        this.statusToken = true
      } else {
        this.statusToken = false
      }
    }
  }
}
</script>

<style>

</style>
