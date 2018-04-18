<template>
  <div class="about">
    <About msg="Welcome to My Blog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'

export default {
  name: 'about',
  components: {
    About
  }
}
</script>
