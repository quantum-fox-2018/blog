<template>
  <div>
    <div class="createArticle">
      <h1>What do you want to write?</h1>
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input class="title" v-model="title"> <br>
          <label>Image</label> <br>
          <input type="file" placeholder="Image" v-on:change="addPhoto"> <br>
          <label>Content</label> <br>
          <textarea class="content" v-model="content"></textarea><br>
        </div>
        <button class="ui button" v-on:click="cancleCreate">Cancle</button>
        <button class="ui button" v-on:click="createArticle">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      title: '',
      content: '',
      file: null,
      formData: new FormData(),
      username: localStorage.getItem('username')
    }
  },
  methods: {
    addPhoto: function (event) {
      this.file = event.target.files[0]
    },
    createArticle: function () {
      swal({
        title: 'Do you want post this article?',
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#CACBCD',
        confirmButtonColor: '#42B983',
        confirmButtonText: 'Yes, post it!'
      })
        .then((result) => {
          if (result.value) {
            swal({
              title: 'Auto close alert!',
              text: 'Loading',
              timer: 3000,
              onOpen: () => {
                swal.showLoading()
              }
            })
              .then((result) => {
              })

            let token = localStorage.getItem('token')
            this.formData.set('image', this.file)
            this.formData.set('title', this.title)
            this.formData.set('content', this.content)
            this.formData.set('username', this.username)

            axios({
              method: 'post',
              url: 'http://localhost:3000/articles',
              data: this.formData,
              headers: {
                token: token
              }
            })
              .then(res => {
                swal(
                  'Post!',
                  'Your blog has been post.',
                  'success'
                )
                this.$router.push('/')
              })
              .catch(err => {
                alert(err)
                console.log(err)
              })
          }
        })
    },
    cancleCreate: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.createArticle {
  margin-left: 200px;
  margin-right: 200px;
  padding-bottom: 15px;
}
input.title {
  width: 250px;
  height: 40px;
  word-wrap: break-word;
}

textarea.content {
  width: 700px;
  height: 200px;
  word-wrap: break-word;
}
.editArticle {
  word-wrap: break-word;
}
.left {
  text-align: left;
  padding-right: 10px;
}
</style>
