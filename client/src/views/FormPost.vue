<template>
<div>
  <navbar></navbar>
  <div class="jumbotron" id="headertag">
    <blockquote class="blockquote mb-0">
      <p id="bodyQuo">{{quotes.body}}</p>
      <footer class="blockquote-footer">{{quotes.author}}<cite title="Source Title"> favqs.com</cite></footer>
    </blockquote>
  </div>
  <div class="jumbotron" id="addArticle">
    <form>
      <div class="form-group">
        <label for="name" class="col-form-label">Title:</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <hr>
      <div class="form-group">
        <label for="content" class="col-form-label">Content:</label>
        <textarea  class="form-control" v-model="content"></textarea>
      </div>
      <hr>
       <div class="form-group">
          <label for="exampleFormControlFile1">Image:</label>
          <input type="file" name="image" class="form-control-file" id="uploadImage"
          accept="image/*" @change="handleUpload">
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="postArticle">Post</button>
    </form>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'FormPost',
  components: {
    Navbar
  },
  data () {
    return {
      title: '',
      content: '',
      image: ''
    }
  },
  created: function () {
    this.$store.dispatch('getQuote')
  },
  computed: {
    quotes: function () {
      return this.$store.getters.getQuotes
    }
  },
  methods: {
    postArticle: function () {
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('image', this.image)
      this.$store.dispatch('postArticle', formData).then(() => {
        this.$router.push({path: '/'})
        location.reload()
      })
    },
    handleUpload: function (event) {
      this.image = event.target.files[0]
    }
  }
}
</script>

<style>
#headertag {
  background-image: url('https://images.pexels.com/photos/358482/pexels-photo-358482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-repeat: no-repeat;
}
#addArticle {
  background-color: #f1f1f2;
  max-width: 700px;
  margin: 0 auto;
}
textarea {
  height: 500px;
}
blockquote{
  background: rgba(255, 242, 0, 0.5);
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10%;
}
#bodyQuo{
  color: black;
}
</style>
