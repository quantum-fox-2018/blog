<template>
  <div class="detailArticle">
    <h1>Article</h1>
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <span>{{ createdAt }}</span>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'detailArticle',
  props: [ 'id' ],
  data () {
    return {
      title: '',
      content: '',
      createdAt: ''
    }
  },
  created: function () {
    Axios.get('http://localhost:3000/articles/' + this.id)
      .then(res => {
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.createdAt = res.data.data.createdAt
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
.detailArticle {
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 15px;
}
</style>
