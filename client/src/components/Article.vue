<template>
  <div class="col-9 card">
    <div class="card-body" v-if="content !== ''">
      <h5 class="card-title">{{content.title}}</h5>
      <p>{{content.text}}</p>
      <button type="button" class="btn btn-light" v-if="isAuthor" data-toggle="modal" data-target="#modalEdit">Edit</button>
      <button type="button" class="btn btn-light" v-if="isAuthor" @click="del">Delete</button>
      <footer class="blockquote-footer">Author: <cite title="Source Title">{{content.author.name}}</cite></footer>
    </div>
    <!-- MODAL EDIT -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEdit" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <form>
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Title">
                </div>
                <div class="form-group">
                  <label>Content</label>
                  <textarea rows="5" class="form-control" v-model="text" placeholder="Content"></textarea>
                </div>
              </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ligth" @click="edit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      content: '',
      title: '',
      text: '',
      isAuthor: false
    }
  },
  watch: {
    id () {
      let self = this.$store.getters.getAllArticles
      self.map(data => {
        if (data._id === this.id) {
          this.content = data
          this.title = data.title
          this.text = data.text
          if (data.author._id === localStorage.getItem('id')) {
            this.isAuthor = true
          } else {
            this.isAuthor = false
          }
        }
      })
    }
  },
  created () {
    let self = this.$store.getters.getAllArticles
    self.map(data => {
      if (data._id === this.id) {
        this.content = data
        this.title = data.title
        this.text = data.text
      }
    })
  },
  methods: {
    edit () {
      let payload = {
        title: this.title,
        text: this.text,
        id: this.id
      }
      this.$store.dispatch('edit', payload)
    },
    del () {
      this.$store.dispatch('del', this.id)
    }
  }
}
</script>
