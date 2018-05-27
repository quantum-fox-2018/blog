<template>
  <div class="text-center p-3" style="height: 100%;">
    <div class="profile">
      <h2>ABOUT ME</h2>
      <img :src="profile_image" class="rounded-circle my-4" style="width: 70%;" />
      <p>Welcome to my first blog build from scratch with Vue.js! My name is Fandy Barestu from Yogyakarta, Indonesia. I'm a photographer, designer, and a full-stack javascript developer. Feel free to explore my blog and enjoy the ride.</p>
    </div>

    <div class="border px-5"></div>

    <div class="add-post m-5">
      <button type="button" class="btn btn-outline-success" v-if="$isLogin" data-toggle="modal" data-target="#ModalCenter">
        WRITE BLOG
      </button>

      <!-- Modal -->
      <div class="modal modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Write New Blog Post!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-left">
              <form @submit.prevent="addPost">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Title</label>
                  <input type="text" v-model="newPost.post_title" class="form-control" id="exampleFormControlInput1" placeholder="Title">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Content</label>
                  <textarea class="form-control" v-model="newPost.post_content" id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>
                <div class="form-group custom-file">
                  <label class="file-label" for="customFile">Choose file</label>
                  <div v-if="newPost.image_url">
                    <img :src="newPost.img_url" style="width: 80%;" />
                  </div>
                  <div class="form-group">
                    <input type="file" class="file-input" name="image_url" value="" id="customFile">
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

    <div class="border px-5"></div>
    <div class="recent-post m-3">
      <h2>RECENT POST</h2>
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'post-details', params: { id: post._id } }" v-for="(post, index) in posts" :key="index">
        <div>
          {{ post.post_title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'
import profileImage from '@/assets/img/profile_image.png'

export default {
  name: 'side-bar',
  props: [
    'posts'
  ],
  data: function () {
    return {
      isLogin: this.$isLogin,
      formData: new FormData(),
      profile_image: profileImage,
      newPost: {
        post_title: '',
        post_content: '',
        image_url: ''
      }
    }
  },
  methods: {
    addPost: function (event) {
      console.log('add')
      let token = localStorage.getItem('token')

      this.onFileChange(event)
      event.target.reset()

      axios.post(`${this.$baseUrl}/api/post/upload-image`, this.formData, {
        headers: { token }
      })
        .then(response => {
          console.log('upload success', response.data.link)
          this.newPost.image_url = response.data.link

          axios.post(`${this.$baseUrl}/api/post/add`, this.newPost, {
            headers: { token }
          })
            .then(response => {
              this.$bus.$emit('add_post', response.data)
              this.newPost.post_title = ''
              this.newPost.post_content = ''
              this.newPost.image_url = ''
            })
            .catch(error => {
              console.log('error add post', error.message)
              swal('Add new post failed!', 'Something wrong!', 'error')
            })
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
        this.newPost.image_url = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style>
h2 {
  font-weight: 500;
  text-transform: uppercase;
}

p {
  font-weight: 100;
}
</style>
