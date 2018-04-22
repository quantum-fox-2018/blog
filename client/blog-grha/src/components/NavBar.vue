<template>
  <nav class="navbar navbar-light bg-dark fixed-top">
  <a class="navbar-brand" id="navbartitle">Blog-Rha</a>
  <span v-show="loadingEdit">
    <p>Please Wait Upload Edited Picture</p>
    <icon name="sync" spin></icon>
  </span>
  <form class="form-inline">
    <CreateArticle style="margin-right:10px"></CreateArticle>
    <button class="btn btn-outline-success my-2 my-sm-0" @click="logout"><strong>Logout</strong></button>
  </form>
</nav>
</template>

<script>
import {mapGetters} from 'vuex'
import CreateArticle from '@/components/CreateArticle'
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  components: {
    CreateArticle
  },
  computed: {
    ...mapGetters([
      'loadingEdit'
    ])
  }
}
</script>

<style scoped>
#navbartitle {
  color:white;
  text-shadow: 3px 2px green;
  text-decoration: underline;
}
</style>
