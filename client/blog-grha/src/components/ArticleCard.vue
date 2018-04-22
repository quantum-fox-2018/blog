<template>
  <div class="col-md-4 mt-4">
    <div class="card profile-card-5">
      <div class="card-img-block">
        <img class="card-img-top" :src="blog.image" alt="Card image cap">
      </div>
      <div class="card-body pt-0">
      <h5>{{blog._id}}</h5>
      <h5 class="card-title">{{blog.title}}</h5>
      <p class="card-text">{{blog.description}}</p>
      <button @click="editbind(blog._id)" class="btn btn-outline-success" data-toggle="modal" data-target="#editArticle"><strong>Update Blog</strong></button>
      <EditForm style="margin-top:10px"  :id="id" ></EditForm>
        <div class="row justify-content-center">
          <button @click="deleteBlog(blog._id)" type="button" class="btn btn-primary" style="margin-top:10px;margin-left:10px"><strong>Delete</strong></button>
          <button @click="read" type="button" class="btn btn-primary" style="margin-top:10px;margin-left:10px"><strong>View Article</strong></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from '@/components/EditForm'
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['blog'],
  data () {
    return {
      id: '',
      title: '',
      text: '',
      description: ''
    }
  },
  methods: {
    ...mapActions([
      'editBlog',
      'getOne',
      'deleteBlog'
    ]),
    read () {
      this.getOne(this.blog._id)
      this.$router.push(`/read/${this.blog._id}`)
    },
    editbind (id) {
      console.log(id)
      this.id = id
    }
  },
  computed: {
    ...mapGetters([
      'articles'
    ])
  },
  components: {
    EditForm
  }
}
</script>

<style scoped>
.profile-card-5{
    margin-top:20px;
}
.profile-card-5 .card-img-block {
    width: 91%;
    margin: 0 auto;
    position: relative;
    top: -20px;
}
.profile-card-5 .card-img-block img{
    border-radius:5px;
    box-shadow:0 0 10px rgba(0,0,0,0.63);
}
.profile-card-5 h5{
    color:#4E5E30;
    font-weight:600;
}
.profile-card-5 p{
    font-size:14px;
    font-weight:300;
}
</style>
