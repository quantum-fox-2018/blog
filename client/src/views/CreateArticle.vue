<template>
  <div>
    <h1>What do you want to write?</h1>
    <label>Title</label> <br>
    <input class="title" v-model="title"> <br>
    <br>
    <label>Content</label> <br>
    <textarea class="content" v-model="content"></textarea><br>
    <br>
    <button v-on:click="createArticle">Post</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      content: '',
      formData: new FormData(),
      username: localStorage.getItem('username')
    }
  },
  methods: {
    createArticle: function () {
      let token = localStorage.getItem('token')
      let username = localStorage.getItem('username')
      let newArticle = {
        title: this.title,
        content: this.content,
        username: this.username
      }

      let r = confirm('Do you want post this article?')
      if (r == true) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/articles',
          data: newArticle,
          headers: {
            token: token
          }
        })
        .then(res => {
          alert('Post article success!')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>
input.title {
  width: 250px;
  height: 20px;
  font-size: 1.7vw;
}

textarea.content {
  width: 700px;
  height: 200px;
  font-size: 1.7vw;
}
button {
  font-size: 1.2vw;
}

.left {
  text-align: left;
  padding-right: 10px;
}
</style>
