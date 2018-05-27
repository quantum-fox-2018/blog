<template>
  <div class="home">
    <div v-for="(post, index) in posts" :key="index">
      <BlogPost :post="post"></BlogPost>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'

export default {
  name: 'home',
  components: {
    BlogPost
  },
  props: ['posts']
}
</script>
