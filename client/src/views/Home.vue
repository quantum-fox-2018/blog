<template>
  <div class="home">
    <div v-for="(post, index) in posts" :key="index">
      <BlogPosts :post="post"></BlogPosts>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import BlogPosts from '@/components/BlogPosts.vue'

export default {
  name: 'home',
  components: {
    BlogPosts
  },
  data: function () {
    return {
      posts: []
    }
  },
  created: function () {
    axios.get(`${this.$baseUrl}/api/post/show`)
      .then((response) => {
        console.log('get  success', response.data)
        response.data.posts.forEach(post => {
          this.posts.push(post)
        })
      })
      .catch(error => {
        console.log('get post failed', error)
      })
  }
}
</script>
