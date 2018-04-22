<template>
  <div>
    <form>
      <div class="form-group">
        <label for="#photo" class="col-form-label">Photo:</label>
        <input type="file" class="form-control" id="photo" @change="takePhoto">
      </div>
      <div class="form-group">
        <label for="#title" class="col-form-label">Title</label>
        <input v-model="editTitle" type="text" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="#description" class="col-form-label">Description</label>
        <input v-model="editDescription" type="text" class="form-control" id="description" :placeholder="description">
      </div>
      <div class="form-group">
        <label for="#text" class="col-form-label">Text</label>
        <textarea v-model="editText" class="form-control" id="text" placeholder="text here"></textarea>
      </div>
    </form>
    <button @click="updateBlog" class="btn btn-outline-success"><strong>Update</strong></button>
    <icon v-show="loading" name="sync" spin></icon>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  props: ['id', 'title', 'description', 'text'],
  data () {
    return {
      editId: this.id,
      editTitle: this.title,
      editDescription: this.description,
      editText: this.text,
      file: null,
      formData: new FormData()
    }
  },
  methods: {
    takePhoto (event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    updateBlog () {
      this.formData.set('image', this.file)
      this.formData.set('title', this.editTitle)
      this.formData.set('description', this.editDescription)
      this.formData.set('text', this.editText)
      let obj = {
        id: this.id,
        formData: this.formData
      }
      this.editBlog(obj)
      this.$emit('close')
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
