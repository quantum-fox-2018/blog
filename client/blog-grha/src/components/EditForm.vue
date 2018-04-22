<template>
  <div>
    <div class="modal fade" id="editArticle" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Update Blog</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="#photo" class="col-form-label">Photo:</label>
                <input type="file" class="form-control" id="photo" @change="takePhoto">
              </div>
              <div class="form-group">
                <label for="#title" class="col-form-label">Title</label>
                <input v-model="editId" type="text" class="form-control" id="title" placeholder="orang ganteng">
              </div>
              <div class="form-group">
                <label for="#description" class="col-form-label">Description</label>
                <input v-model="editDescription" type="text" class="form-control" id="description">
              </div>
              <div class="form-group">
                <label for="#text" class="col-form-label">Text</label>
                <textarea v-model="editText" class="form-control" id="text" placeholder="text here"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="editBlog" type="button" class="btn btn-primary">Update Blog</button>
            <icon v-show="loading" name="sync" spin></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['id'],
  data () {
    return {
      editId: `${this.id}`,
      editTitle: ``,
      editDescription: ``,
      editText: ``,
      file: null,
      formData: new FormData()
    }
  },
  methods: {
    takePhoto (event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    editBlog () {
      console.log(this.blog)
      this.formData.set('image', this.file)
      this.formData.set('title', this.title)
      this.formData.set('description', this.description)
      this.formData.set('text', this.text)
      this.editBlog(this.formData, this.blog)
    },
    ...mapActions([
      'editBlog'
    ])
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: #000;
}
</style>
