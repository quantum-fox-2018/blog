<template>
  <div class="container">
    <div class="row">
      <transition-group class="col-max-12" name="card" tag="p" >
        <div class="col-max-12 card" v-for="(n,i) in listartikel" :key="n._id">
          <div class="close" @click="butttonclick(n._id)" v-if="n.userid === id">
            <font-awesome-icon :icon="close"/>
          </div>
          <div class="content-card">
            <h3 style="text-align:center">{{n.title}}</h3>
            <p v-html="n.content">{{n.content}}</p>
            <div align="center" v-if="n.userid === id">
              <button type="button" class="btnupdate" name="button" id="button" @click="showupdate(false, true, false,n._id,n.title,n.content)">Update</button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="addartikel" @click="showadd(false, true, false)" v-show="tokens">
      <font-awesome-icon :icon="add" class="add"/>
    </div>
    <modal name="addmodal"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="200"
      :delay="100"
      height="auto"
      :adaptive="adaptive"
      :resizable="resizable"
      :draggable="draggable">
       <div class="example-modal-content" style="color:black">
         <h1 style="text-align:center; font-family:meriend">Add Artikel</h1>
         <label for="title" style="margin-right:30px;">Title</label>
         <input type="text" id="title" v-model="title" placeholder="Enter Your Title" style="width:100%;">
         <label for="deskripsi" style="margin-right:30px;">Description</label>
         <vue-editor v-model="content"></vue-editor>
         <div align="center">
           <button class="tombol" @click="hideadd()" >cancle</button>
           <button class="tombol" @click="addartikels" >Submit</button>
         </div>
       </div>
     </modal>
     <modal name="updatemodal"
       transition="nice-modal-fade"
       :min-width="200"
       :min-height="200"
       :delay="100"
       height="auto"
       :adaptive="adaptive"
       :resizable="resizable"
       :draggable="draggable">
        <div class="example-modal-content" style="color:black">
          <h1 style="text-align:center; font-family:meriend">Update Artikel</h1>
          <label for="title" style="margin-right:30px;">Title</label>
          <input type="text" id="title" v-model="updatetitle" placeholder="Enter Your Title" style="width:100%;">
          <label for="deskripsi" style="margin-right:30px;">Description</label>
          <vue-editor v-model="updatecontent"></vue-editor>
          <div align="center">
            <button class="tombol" @click="hideadd()" >cancle</button>
            <button class="tombol" @click="updateartikel" >Submit</button>
          </div>
        </div>
      </modal>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      resizable: false,
      adaptive: false,
      draggable: false,
      title: '',
      content: '',
      updateid: '',
      updatetitle: '',
      updatecontent: '',
      listartikel: [],
      token: localStorage.getItem('token')
    }
  },
  computed: {
    add () {
      return faPlus
    },
    close () {
      return faTimes
    },
    tokens () {
      return this.$store.getters.gettoken
    },
    id () {
      return this.$store.getters.getid
    }
  },
  components: {
    FontAwesomeIcon,
    VueEditor
  },
  created: function () {
    this.showartikel()
  },
  methods: {
    showartikel () {
      axios.get('http://localhost:3000/artikels/showartikels').then(response => {
        this.listartikel = response.data.data
      })
    },
    showadd (resizable, adaptive, draggable) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.draggable = draggable
      this.$nextTick(() => {
        this.$modal.show('addmodal')
      })
    },
    showupdate (resizable, adaptive, draggable, id, title, content) {
      this.resizable = resizable
      this.adaptive = adaptive
      this.draggable = draggable
      this.updateid = id
      this.updatetitle = title
      this.updatecontent = content
      this.$nextTick(() => {
        this.$modal.show('updatemodal')
      })
    },
    hideadd () {
      this.$modal.hide('addmodal')
      this.$modal.hide('updatemodal')
    },
    butttonclick (id) {
      $('.card').toggleClass('card-active')
      axios.delete(`http://localhost:3000/artikels/deleteartikels/${id}`).then(response => {
        this.showartikel()
      }).catch(err => {
        console.log(err)
      })
    },
    addartikels () {
      axios.post('http://localhost:3000/artikels/addartikel', {
        title: this.title,
        content: this.content
      },
      {
        headers: {
          token: this.token
        }
      }).then(response => {
        console.log(response)
        this.title = ''
        this.content = ''
        this.$modal.hide('addmodal')
        this.showartikel()
      })
    },
    updateartikel () {
      axios.put(`http://localhost:3000/artikels/updateartikel/${this.updateid}`, {
        title: this.updatetitle,
        content: this.updatecontent
      }).then(response => {
        this.hideadd()
        this.showartikel()
      })
    }
  }
}
</script>

<style scoped>
.example-modal-content{
  padding:20px;
}
.content-card{
  padding: 20px;
}
button{
  background-color: transparent;
  border: 1px solid black;
  padding: 10px 15px;
  color: black;
}
button:hover{
  background-color: black;
  color: white;
  transition-duration:0.8s;
}
p{
  text-indent:10px;
}
.close {
  border:1px solid rgba(0,0,0,0.125);
  padding: 2px 5px;
  float:right;
  cursor:pointer;
  color:grey;
}
.close:hover{
  background-color: rgba(0,0,0,0.125);
}
.tombol{
  background-color: transparent;
  border: 1px solid #ced4da;
  padding: 10px 15px;
  color: black;
}
.tombol:hover{
  background-color: black;
  color: white;
}
.add{
  width:30px;
  height:30px;
  position: absolute;
  left:20%;
  top:20%;
  color:white;
}
.addartikel{
  position: fixed;
  background-color: black;
  width:50px;
  height:50px;
  right:20px;
  bottom: 20px;
  border-radius:50%;
  cursor:pointer;
}
.addartikel:hover{
  box-shadow: 0px 0px 30px 0px white inset;
  border:0px solid white;
  transition-duration:0.25s;
}
.container{
  padding:50px 100px;
  margin-bottom: 80px;
}
.card{
  background-color: white;
  border:1px solid rgba(0,0,0,0.125);
  border-radius:5px;
  margin-bottom: 20px;
}
.card-leave-active {
  -webkit-animation: rotate 2s;
}
@-webkit-keyframes rotate {
    from { -webkit-transform: rotateY(0deg);width:100%;}
    to{ -webkit-transform: rotateY(360deg);width:10%;}
}
.card:hover{
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.125) inset;
  transition-duration:0.25s;
}
@media only screen and (max-width: 768px){
  .container{
    padding:10px 5px;
    margin-bottom: 80px;
  }
}
</style>
