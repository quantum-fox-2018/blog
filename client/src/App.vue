<template>
  <div id="app">
    <!-- Navbar -->
    <NavBar></NavBar>

    <div class="container mt-5">
      <div class="row my-3">
        <!-- Content -->
        <div class="col-md-9 px-4">
          <router-view :posts="posts" />
        </div>
        <!-- Side Bar -->
        <div class="col-md-3 px-0">
          <SideBar></SideBar>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  components: {
    NavBar, SideBar
  },
  data: function () {
    return {
      posts: []
    }
  },
  methods: {
    showAllPost: function () {
      this.posts = []

      axios.get(`${this.$baseUrl}/api/post/show`)
        .then((response) => {
          response.data.data.reverse()
          response.data.data.forEach(post => {
            post.post_summary = post.post_content.split(' ').slice(0, 40)
            post.post_summary = post.post_summary.join(' ')

            this.posts.push(post)
          })
        })
        .catch(error => {
          console.log('get post failed', error)
        })
    }
  },
  created: function () {
    this.showAllPost()
  },
  updated: function () {
    this.$bus.$on('add_post', (data) => {
      console.log('add post', data)
      swal('Add new post success!', ``, 'success')
      this.showAllPost()
    })

    this.$bus.$on('update_post', (postId) => {
      console.log('update post', postId)
      swal('Update post success!', ``, 'success')
      this.showAllPost()
    })

    this.$bus.$on('delete_post', (postId) => {
      console.log('delete post', postId)
      swal('Delete post success!', ``, 'success')
      this.showAllPost()
    })
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2e2e2e;
}

li {
  padding: 0 10px;
}

.navbar-brand {
  font-family: 'Great Vibes', cursive;
  font-size: 38px;
}
</style>
