<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <navbar></navbar>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Healthy life - Healthy Mind</h1>
        <p class="lead">The mind has great influence over the body, and maladies often have their origin there</p>
      </div>
    </div>
    <contents></contents>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar'
import Contents from '@/components/Contents'
export default {
  name: 'home',
  components: {
    Navbar,
    Contents
  }
}
</script>

<style>
.jumbotron-fluid {
  background-image: url('https://images.pexels.com/photos/1006166/pexels-photo-1006166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-repeat: no-repeat;
}

h1, p {
  color: black;
}
</style>
