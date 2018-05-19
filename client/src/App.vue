<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
body {
  margin: 0;
  background-image: url('assets/bg.jpg');
  background-size: cover;
}
</style>
