<template>
<div>
  <NavBar></NavBar>
  <div class="container-fluid" id="container">
  <div class="row justify-content-center">
    <div class="col-md-8 mt-8" style="margin-bottom:300px">
      <div class="card profile-card-5">
        <div class="card-img-block">
          <img class="card-img-top" :src="article.image" alt="Card image cap">
        </div>
        <div class="card-body pt-0">
        <h5 class="card-title">{{article.title}}</h5>
        <p class="card-text">{{article.description}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'article'
    ])
  },
  methods: {
    ...mapActions([
      'getOne'
    ])
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.profile-card-5{
    margin-top:100px;
}
.profile-card-5 .card-img-block {
    width: 40%;
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
#container{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRxQOEzgrbawIx-sUnIhnV87KlkdDqFZVen3cyXS2erX3r96r);
}
</style>
