<template>
<div>
  <div class="navigator">
    <button type="button" class="btn btn-danger btn-md btn-add" v-on:click="logout">Logout</button>
    <button type="button" class="btn btn-danger btn-md btn-logout"  data-toggle="modal"
      data-target="#modalAdd">Add Post</button>
  </div>
  <div id="modalAdd" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" align="left">New Post</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ivu-form ivu-form-label-right">
            <div class="form-group">
              <label class="form-title">Title</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Post Title" class="form-control" v-model="addThisItem.title">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Image</label>
              <div class="form-group-content">
                <div class="">
                  <input type="file" class="form-control" id="recipient-name" @change="getPhotoAdd">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Content</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <textarea placeholder="Content" rows="2" class="form-control" v-model="addThisItem.content"></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Category</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i> 
                  <select class="form-control form-control-sm" data-live-search="true" v-model="addThisItem.category">
                    <option value="Animals" selected>Animals</option>
                    <option value="Hacktiv8" selected>Hacktiv8</option>
                    <option value="Javascript" selected>Javascript</option>
                    <option value="Lanscape" selected>Lanscape</option>
                    <option value="Quotes" selected>Quotes</option>
                    <option value="Others" selected>Others</option>
									</select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="addPost" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>No</th>
        <th>Title</th>
        <th>Image</th>
        <th>Content</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(post,i) in posts" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ post.title }}</td>
        <td><img v-bind:src="post.image" height="50px" width="50px"></td>
        <td>{{ post.content }}</td>
        <td>{{ post.category }}</td>
        <td><button type="button" class="btn btn-success btn-sm" @click="changeItem(post)" data-toggle="modal"
      data-target="#modalEdit">Edit</button> | <button type="button" class="btn btn-danger btn-sm" @click="deleteItem(post._id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
  <div id="modalEdit" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" align="left">Edit Post</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ivu-form ivu-form-label-right">
            <div class="form-group">
              <label class="form-title">Title</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <input type="text" placeholder="Post Title" class="form-control" v-model="selectedItem.title">
                  </div>
                </div>
              </div>
            <div class="form-group">
              <label class="form-title">Image</label>
              <div class="form-group-content">
                <div class="">
                  <br><br>
                  <div v-if="!fileEdit">
                    <img :src="selectedItem.image" height="200" width="200" class="image-edit">
                  </div>
                  <input type="file" class="form-control" id="recipient-name" @change="getPhoto">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Content</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i>
                  <textarea placeholder="Content" rows="2" class="form-control" v-model="selectedItem.content"></textarea>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-title">Category</label>
              <div class="form-group-content">
                <div class="">
                  <i class="validate"></i> 
                  <select class="form-control form-control-sm" data-live-search="true" v-model="selectedItem.category">
                    <option value="Animals" selected>Animals</option>
                    <option value="Hacktiv8" selected>Hacktiv8</option>
                    <option value="Javascript" selected>Javascript</option>
                    <option value="Lanscape" selected>Lanscape</option>
                    <option value="Quotes" selected>Quotes</option>
                    <option value="Others" selected>Others</option>
									</select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button class="btn btn-primary" @click="editItem" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Admin',
  data () {
    return {
      addThisItem: {},
      fileAdd: null,
      fileEdit: null,
      formData: new FormData(), 
      formDataAdd: new FormData(),
      selectedItem: ''
    }
  },
  methods: {
    addPost: function () {
      this.formDataAdd.set('image', this.fileAdd)
      this.formDataAdd.set('title', this.addThisItem.title)
      this.formDataAdd.set('content', this.addThisItem.content)
      this.formDataAdd.set('category', this.addThisItem.category)
      axios({
        method: 'post',
        url: 'http://35.197.139.113/posts',
        data: this.formDataAdd,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        console.log(data)
        this.$router.push('/admin-page');
      })
    },
    getPhotoAdd: function (event) {
      this.fileAdd = event.target.files[0]
      console.log("image to add--", this.fileAdd)
    },
    getPhoto: function (event) {
      this.fileEdit = event.target.files[0]
      console.log("image--", this.fileEdit)
    },
    changeItem: function (post) {
      this.selectedItem = post;
    },
    editItem: function () {
      if(this.fileEdit) {
        console.log("edit this item ", this.selectedItem)
        console.log("file--", this.fileEdit)
        this.formData.set('id', this.selectedItem._id)
        this.formData.set('image', this.fileEdit)
        this.formData.set('title', this.selectedItem.title)
        this.formData.set('content', this.selectedItem.content)
        this.formData.set('category', this.selectedItem.category)
        axios({
          method: 'put',
          url: 'http://35.197.139.113/posts',
          data: this.formData,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(({ data }) => {
          console.log(data)
          location.reload()
        })
      } else {
        axios.put('http://35.197.139.113/posts/noImage', {
          id: this.selectedItem._id,
          title: this.selectedItem.title,
          content: this.selectedItem.content,
          category: this.selectedItem.category
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            location.reload()
          })
      }
    },
    deleteItem: function (id) {
      axios.delete(`http://35.197.139.113/posts/${id}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log('ini err', err);
        });
    },
    logout: function () {
      localStorage.removeItem('token');
      this.$router.push('/admin');
    },
    ...mapActions([
      'getPosts'
    ])
  },
  computed: {
    ...mapState([
      'posts'
    ]),
  },
  mounted () {
    this.getPosts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigator {
  height: 50px;
  margin-top: 10px;
  margin-right: 10px;
}

.image-edit {
  float: left;
}

.btn-add {
  float: right;
}

.modal-title {
  float: left;
}

.form-title {
  float: left;
}
</style>