<template>
  <div class="home">
    <h1>NEWSFEED</h1>
    <div class="col">
      <div class="row" v-for="article in articles" v-bind:key="article._id">
        <h2>{{ article.title }}</h2>
        <p>
          <router-link :to="{ name: 'detailArticle', params: {id: article._id} }">detail</router-link>
        </p>
        <p>{{ article.content }}</p>
        <span>{{ article.createdAt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      articles: []
    }
  },
  created: function () {
    Axios.get('http://localhost:3000/articles')
      .then(res => {
        this.articles = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.col {
  margin-left: 100px;
  margin-right: 100px;
}

.row {
  margin-left: 50px;
  margin-right: 50px;
  border-bottom: 1px solid silver;
  padding-bottom: 15px;
}

.row:first-child {
  border-top: 1px solid silver;
}

.row:last-child {
  border-bottom: 0px solid silver;
}

</style>
