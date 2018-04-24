<template>
  <div class="home">
    <h1>News Feed</h1>
    <button class="ui button" v-on:click="createArticle">Create Article</button>
    <div class="ui grid container">
      <div class="ui link cards" v-for="article in articles" v-bind:key="article._id" style="margin: 0">
        <div class="card">
          <div class="image">
            <img v-bind:src="article.image">
          </div>
          <div class="content">
            <div class="header">
              <router-link :to="{ name: 'detailArticle', params: {id: article._id} }">
                {{ article.title }}
              </router-link>
            </div>
            <div class="description">
              {{ article.content.split(' ').splice(0,10).join(' ') }} ...
            </div>
          </div>
          <div class="content">
            <span class="right floated">
              <i class="heart outline like icon"></i>
              0 likes
            </span>
            <i class="comment icon"></i> 0 comments
          </div>
          <div class="extra content">
            <span class="right floated">
              {{ article.createdAt.split('').splice(0,10).join('') }}
            </span>
            <span>
              <i class="user icon"></i>
              @{{ article.username }}
            </span>
          </div>
        </div>
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
        alert(err)
      })
  },
  methods: {
    createArticle: function () {
      if (localStorage.getItem('token')) {
        this.$router.push('/create')
      } else {
        alert('Sign in?')
      }
    }
  }
}
</script>

<style>
.ui.grid {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.ui.grid.container {
  justify-content: center;
  align-items: center;
}
.ui.img {
  max-width: 30%;
  align-items: center;
}
</style>
