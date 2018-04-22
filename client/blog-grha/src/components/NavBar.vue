<template>
  <nav class="navbar navbar-light bg-dark fixed-top">
  <a class="navbar-brand" id="navbartitle">Blog-Rha</a>
  <form class="form-inline">
    <CreateArticle v-if="role === admin" style="margin-right:10px"></CreateArticle>
    <button class="btn btn-outline-success my-2 my-sm-0" @click="logout"><strong>Logout</strong></button>
  </form>
</nav>
</template>

<script>
import {mapGetters} from 'vuex'
import CreateArticle from '@/components/CreateArticle'
export default {
  data () {
    return {
      role: localStorage.getItem('role')
    }
  },
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
