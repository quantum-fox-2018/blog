<template>
<div>
  <div class="jumbotron jumbotron-fluid"></div>
  <div class="home container">
    <div class="row">
      <ul class="col-md-3 list-group">
        <li class="list-group-item" v-for="(article, i) in articles" :key="i">
          <router-link :to="{path: '/'+article._id}">{{article.title}}</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      id: ''
    }
  },
  created () {
    this.$store.dispatch('getAllArticles')
  },
  computed: {
    articles () {
      return this.$store.getters.getAllArticles
    }
  },
  methods: {
    selectArticle () {
      this.id = 'active'
    }
  }
}
</script>

<style scoped>
.home{
  margin-top: 3rem;
}
#active{
  background-color: #FF9E5E;
  border-color: #FF9E5E;
  color: white;
}
.jumbotron{
  height: 15rem;
  background: url(../../public/img/banner.jpg);
  background-size: cover;
}
</style>
