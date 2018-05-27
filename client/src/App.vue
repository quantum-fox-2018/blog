<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <br>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    Footer,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 5vw;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav {
  padding-bottom: 20px;
  margin-top: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body{
  background: #FCF6EB;
  padding-top: 40px;
}
</style>
