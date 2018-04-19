<template>
  <div class="col-md-8">
    <div class="card mb-3">
      <img class="card-img-top" :src="image" alt="browser not compatible">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text contentblog">{{content}}</p>
        <p class="card-text"><small class="text-muted">writer: {{author}}</small> - <small class="text-muted">{{dateCreate}}</small></p>
        <button v-if="token !== ''" type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        <button v-if="token !== ''" type="button" class="btn btn-warning"><i class="fas fa-pencil-alt"></i></button>
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
      title: '',
      content: '',
      author: '',
      image: '',
      dateCreate: ''
    }
  },
  computed: {
    listArticles: function () {
      return this.$store.getters.getAllArticles
    },
    token: function () {
      return this.$store.getters.getActiveUser.token
    }
  },
  methods: {
    articleId: function () {
      this.listArticles.map(value => {
        console.log('watch===', value)
        if (value._id === this.id) {
          this.title = value.title
          this.content = value.content
          this.author = value.author.name
          this.image = value.image
          this.dateCreate = moment(value.createdAt).startOf('hour').fromNow()
        }
      })
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
</style>
