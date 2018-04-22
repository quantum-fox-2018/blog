<template>
  <section>
    <NavBar></NavBar>
      <div class="container jumbotron" id="container">
        <div class="row">
          <h1 class="text-center"><span>Blogs</span></h1>
          <ArticleCard v-for="(blog,index) in articles" :key="index"
          :blog="blog"></ArticleCard>
        </div>
      </div>
  </section>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
import {mapGetters, mapActions} from 'vuex'
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar, ArticleCard
  },
  computed: {
    ...mapGetters([
      'articles'
    ])
  },
  methods: {
    ...mapActions([
      'fetchData'
    ])
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
:hover{
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
}
section{
    float:left;
    width:100%;
    background: #fff;  /* fallback for old browsers */
    padding:30px 0;
}
h1{float:left; width:100%; color:#fff; margin-bottom:30px; font-size: 14px;}
h1 span{font-family: 'Libre Baskerville', serif; display:block; font-size:45px; text-transform:none; margin-bottom:20px; margin-top:30px; font-weight:700}
h1 a{color:#131313; font-weight:bold;}

#container{
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRxQOEzgrbawIx-sUnIhnV87KlkdDqFZVen3cyXS2erX3r96r);
  background-color: #cccccc;
}
</style>
