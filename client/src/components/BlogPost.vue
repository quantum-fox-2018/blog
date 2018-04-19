<template>
  <div class="blog-posts py-3">
    <h2>
      {{ post.post_title }}
      <a href="#" class="px-1" v-if="isLogin" data-toggle="modal" data-target="#ModalUpdate">
        <span class="fa fa-pencil"></span>
      </a>
      <a href="#" class="px-1" v-if="isLogin" @click.prevent="deletePost">
        <span class="fa fa-trash"></span>
      </a>
    </h2>
    <p class="date">{{ this.dateFormat }}</p>
    <img :src="post.image_url" class="my-4" style="width: 75%;" />
    <p class="content text-justify">
      {{ post.post_summary }}
      <span><router-link :to="{ name: 'post-details', params: { id: post._id } }"> Read more...</router-link></span>
    </p>

    <!-- Modal -->
    <div class="modal modal fade" id="ModalUpdate" tabindex="-1" role="dialog" aria-labelledby="ModalUpdate" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Update Blog Post!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <form @submit.prevent="updatePost">
              <div class="form-group">
                <label>Title</label>
                <input type="text" v-model="updateForm.post_title" class="form-control" placeholder="Title">
              </div>
              <div class="form-group">
                <label>Content</label>
                <textarea v-model="updateForm.post_content" class="form-control" rows="8"></textarea>
              </div>
              <div class="form-group custom-file">
                <label class="file-label">Choose file</label>
                <div v-if="updateForm.image_url">
                  <img :src="updateForm.image_url" style="width: 60%;" />
                </div>
                <div class="form-group">
                  <input type="file" class="file-input" name="image_url" value="">
                </div>
              </div>
              <div class="form-group text-center my-3">
                <button type="button" class="btn btn-outline-secondary mx-1" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-outline-primary mx-1">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'blog-post',
  props: ['post'],
  data: function () {
    return {
      isLogin: this.$isLogin,
      formData: new FormData(),
      updateForm: {
        post_title: this.post.post_title,
        post_content: this.post.post_content,
        image_url: this.post.image_url
      },
      datePosted: this.post.createdAt
    }
  },
  methods: {
    updatePost: function () {
      let token = localStorage.getItem('token')
      let files = event.target.elements.image_url.files

      console.log('length', files.length)

      if (files.length !== 0) {
        this.onFileChange(event)
        event.target.reset()

        axios.post(`${this.$baseUrl}/api/post/upload-image`, this.formData, {
          headers: { token }
        })
          .then(response => {
            this.newPost.image_url = response.data.link
          })
          .catch(error => {
            console.log('error upload image', error.message)
          })
      }

      axios.put(`${this.$baseUrl}/api/post/update/${this.post._id}`, this.updateForm, {
        headers: { token }
      })
        .then(response => {
          this.$bus.$emit('update_post', this.post._id)
        })
        .catch(error => {
          console.log('error update post', error.message)
        })
    },

    onFileChange (event) {
      let files = event.target.elements.image_url.files

      this.createImage(files[0])
      this.formData.append('image_file', files[0])
    },

    createImage (file) {
      let image = new Image()
      let reader = new FileReader()
      console.log(image)
      reader.onload = (e) => {
        this.updateForm.image_url = e.target.result
      }
      reader.readAsDataURL(file)
    },

    deletePost: function () {
      let token = localStorage.getItem('token')

      swal({
        title: 'Delete blog post?',
        text: 'Are you sure want to delete this blog post?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`${this.$baseUrl}/api/post/delete/${this.post._id}`, {
              headers: { token }
            })
              .then(response => {
                this.$bus.$emit('delete_post', this.post._id)
              })
              .catch(error => {
                console.log('delete failed', error.message)
              })
          }
        })
    }
  },
  computed: {
    dateFormat: function () {
      let newDate = new Date(this.post.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: 500;
  text-transform: uppercase;
}

a {
  font-size: 20px;
}

.date {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 80%;
}

.content {
  font-family: 'Playfair Display', serif;
  font-size: 110%;
}
</style>
