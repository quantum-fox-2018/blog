<template>
  <div class="blog">
    <div v-for="(post, index) in orderedPost" :key="index">
      <BlogPost :post="post"></BlogPost>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'

export default {
  name: 'blog',
  components: {
    BlogPost
  },
  props: ['posts'],
  computed: {
    orderedPost: function () {
      return this.posts
    }
  }
}
</script>

<style>

</style>
