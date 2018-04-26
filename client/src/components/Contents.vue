<template>
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <div id="postbutton">
        <button v-if="token !== ''" type="button" class="btn btn-primary btn-lg btn-block" @click="buttonPost">Post Article</button>
      </div>
      <h2>List Articles</h2>
      <div class="list-group" v-for="(article, i) in listArticles" :key="i">
        <router-link :to="{name: 'Detail', params: {id:article._id}}" class="list-group-item list-group-item-action list-group-item-secondary">{{article.title}}</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'Contents',
  created: function () {
    this.$store.dispatch('showAllArticles')
  },
  computed: {
    listArticles: function () {
      return this.$store.getters.getAllArticles
    },
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  },
  methods: {
    buttonPost: function () {
      this.$router.push({name: 'FormPost'})
    }
  }
}
</script>

<style>
#postbutton {
  margin-bottom: 10px;
}
</style>
