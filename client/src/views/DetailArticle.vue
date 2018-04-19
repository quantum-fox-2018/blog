<template>
  <div class="detailArticle">
    <h1>Article</h1>
    <button v-on:click="editArticle">edit article</button> | <button v-on:click="deleteArticle">delete article</button>
    <br>
    <div v-if="!statusEdit">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <span>@{{ username }}</span> - <span>{{ createdAt }}</span>
    </div>
    <div v-else class="editArticle">
      <h3>edit?</h3>
      <label>Title</label> <br>
      <input class="title" v-model="title"> <br>
      <br>
      <label>Content</label> <br>
      <textarea class="content" v-model="content"></textarea><br>
      <br>
      <button v-on:click="updateArticle">Update</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'detailArticle',
  props: [ 'id' ],
  data () {
    return {
      title: '',
      content: '',
      createdAt: '',
      username: '',
      statusEdit: false
    }
  },
  created: function () {
    axios.get('http://localhost:3000/articles/' + this.id)
      .then(res => {
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.createdAt = res.data.data.createdAt
        this.username = res.data.data.username
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    deleteArticle: function () {
      if(localStorage.getItem('token')) {
        if(localStorage.getItem('username') === this.username) {
          let token = localStorage.getItem('token')
          let r = confirm('Do you want delete this article?')
          if (r == true) {
            axios({
              method: 'delete',
              url: 'http://localhost:3000/articles/' + this.id,
              headers: {
                token: token
              }
            })
            .then(res => {
              alert('Delete this article is success!')
              this.$router.push('/')
            })
            .catch(err => {
              console.log(err)
            })
          }
        } else {
          alert('It is not yours!')
        }
      } else {
        alert('Sign in?')
      }
    },
    editArticle: function () {
      if(localStorage.getItem('token')) {
        if(localStorage.getItem('username') === this.username) {
          this.statusEdit = !this.statusEdit
        } else {
          alert('It is not yours!')  
        }
      } else {
        alert('Sign in?')
      }
    },
    updateArticle: function () {
      let token = localStorage.getItem('token')
      let username = localStorage.getItem('username')
      let newArticle = {
        title: this.title,
        content: this.content,
        username: this.username
      }

      let r = confirm('Do you want to update this article?')
      if (r == true) {
        axios({
          method: 'put',
          url: 'http://localhost:3000/articles/' + this.id,
          data: newArticle,
          headers: {
            token: token
          }
        })
        .then(res => {
          alert('Update article success!')
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
.detailArticle {
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 15px;
}
input.title {
  width: 250px;
  height: 20px;
  font-size: 1.7vw;
  word-wrap: break-word;
}

textarea.content {
  width: 700px;
  height: 200px;
  font-size: 1.7vw;
  word-wrap: break-word;
}
button {
  font-size: 1.2vw;
}
.editArticle {
  word-wrap: break-word;
}
.left {
  text-align: left;
  padding-right: 10px;
}
</style>
