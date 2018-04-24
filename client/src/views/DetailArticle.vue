<template>
  <div class="ui center aligned column grid">
    <div v-if="!statusEdit">
      <h2>{{ title }}</h2>
      <div class="ui segment">
      <img v-bind:src="image" class="ui centered image">
      <br>
      <p>{{ content }}</p>
      <span>@{{ username }}</span> - <span>{{ createdAt }}</span>
      </div>
      <div class="ui buttons">
        <button class="ui button" v-on:click="editArticle">edit article</button>
        <button class="ui red button" v-on:click="deleteArticle">delete article</button>
      </div>
    </div>

    <div v-else class="editArticle">
      <h3>edit?</h3>
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input class="title" v-model="title">
          <label>Content</label>
          <textarea class="content" v-model="content"></textarea>
          <input type="file" placeholder="Image" v-on:change="addPhoto">
        </div>
        <button class="ui button" v-on:click="editArticle">Cancle</button>
        <button class="ui button" v-on:click="updateArticle">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'detailArticle',
  props: [ 'id' ],
  data () {
    return {
      statusEdit: false,
      title: '',
      content: '',
      createdAt: '',
      image: '',
      file: null,
      formData: new FormData(),
      username: localStorage.getItem('username')
    }
  },
  created: function () {
    axios.get('http://35.187.254.68/articles/' + this.id)
      .then(res => {
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.image = res.data.data.image
        this.createdAt = res.data.data.createdAt
        this.username = res.data.data.username
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    addPhoto: function (event) {
      this.file = event.target.files[0]
    },
    deleteArticle: function () {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('username') === this.username) {
          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#CACBCD',
            confirmButtonText: 'Yes, delete it!'
          })
            .then((result) => {
              if (result.value) {
                let token = localStorage.getItem('token')
                axios({
                  method: 'delete',
                  url: 'http://35.187.254.68/articles/' + this.id,
                  headers: {
                    token: token
                  }
                })
                  .then(res => {
                    swal(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    this.$router.push('/')
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            })
        } else {
          swal('It is not yours!')
        }
      } else {
        swal('Sign in?')
      }
    },
    editArticle: function () {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('username') === this.username) {
          this.statusEdit = !this.statusEdit
        } else {
          swal('It is not yours!')
        }
      } else {
        swal('Sign in?')
      }
    },
    updateArticle: function () {
      swal({
        title: 'Do you want update this article?',
        type: 'info',
        showCancelButton: true,
        cancelButtonColor: '#CACBCD',
        confirmButtonColor: '#42B983',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
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
            method: 'put',
            url: 'http://35.187.254.68/articles/' + this.id,
            data: this.formData,
            headers: {
              token: token
            }
          })
            .then(res => {
              swal(
                'Updated!',
                'Your file has been updated.',
                'success'
              )
              this.$router.push('/')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style>
.detailArticle {
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

.ui.centered.image {
  max-width: 50%;
  align-items: center;
}
</style>
