<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <img src="@/assets/logo.jpg">
    <p>
      with vue-cli, Semantic UI
    </p>
    <h3>Hacktiv8 Portofolio - Blog</h3>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  max-width: 25vw;
  max-height: 25vh;
}
</style>
