<template>
  <div class="home">
    <h1>News Feed</h1>
    <div class="col">
      <button v-on:click="createArticle">Create Article</button>
      <div class="row" v-for="article in articles" v-bind:key="article._id">
        <h2>
          <router-link :to="{ name: 'detailArticle', params: {id: article._id} }">
            <u>{{ article.title }}</u>
          </router-link>
        </h2>
        <p>{{ article.content }}</p>
        <span>@{{ article.username }}</span> - <span>{{ article.createdAt }}</span>
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
        this.articles = res.data.data.reverse()
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    contentPreview: function () {
      let preview = this.articles.content.split('').splice(10).push('...').join(' ')
      return preview
    }
  },
  methods: {
    createArticle: function () {
      if(localStorage.getItem('token')) {
        this.$router.push('/create')
      } else {
        alert('Sign in?')
      }
    }
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
