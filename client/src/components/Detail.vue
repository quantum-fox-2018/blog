<template>
  <div class="col-md-8">
    <div class="card mb-3">
      <img class="card-img-top" :src="articles.image" alt="browser not compatible">
      <div class="card-body">
        <h5 class="card-title">{{articles.title}}</h5>
        <p class="card-text contentblog">{{articles.content}}</p>
        <p class="card-text"><small class="text-muted">writer: {{articles.author.name}}</small> - <small class="text-muted">{{dateCreate}}</small></p>
        <button v-if="userId === articles.author._id" type="button" class="btn btn-danger" @click="removeArticle(articles)"><i class="fas fa-trash-alt"></i></button>
        <button v-if="userId === articles.author._id" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="getEditArticle(articles)"><i class="fas fa-pencil-alt"></i></button>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="name" class="col-form-label">Title:</label>
                <input type="text" class="form-control" v-model="editedArticle.title">
              </div>
              <hr>
              <div class="form-group">
                <label for="content" class="col-form-label">Content:</label>
                <textarea  class="form-control" v-model="editedArticle.content"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateArticle">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Detail',
  props: ['id'],
  data () {
    return {
      articles: '',
      dateCreate: '',
      editedArticle: ''
    }
  },
  computed: {
    listArticles: function () {
      return this.$store.getters.getAllArticles
    },
    userId: function () {
      return this.$store.getters.getActiveUser.userId
    }
  },
  methods: {
    articleId: function () {
      this.listArticles.map(value => {
        console.log('watch===', value)
        if (value._id === this.id) {
          this.articles = value
          this.dateCreate = moment(value.createdAt).startOf('hour').fromNow()
        }
      })
    },
    removeArticle: function (data) {
      console.log('yg mau diremove==', data)
      this.$store.dispatch('removeArticle', data)
    },
    getEditArticle: function (data) {
      this.editedArticle = data
    },
    updateArticle: function () {
      console.log('data blog===', this.editedArticle)
      this.$store.dispatch('updateArticle', this.editedArticle)
    }
  },
  created () {
    console.log('this==', this.id)
    this.articleId()
  },
  watch: {
    id: function () {
      this.articleId()
    }
  }
}
</script>

<style scoped>
.contentblog {
  text-align: justify;
}
.card-img-top {
  max-height: 500px;
}
</style>
