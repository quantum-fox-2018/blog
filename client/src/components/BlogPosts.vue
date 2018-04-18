<template>
  <div class="blog-posts py-3">
    <h2>{{ post.post_title }}</h2>
    <p class="date">{{ this.dateFormat }}</p>
    <p class="content text-justify">{{ post.post_content }}</p>
  </div>
</template>

<script>

export default {
  name: 'blog',
  props: ['post'],
  data: function () {
    return {
      datePosted: this.post.createdAt
    }
  },
  computed: {
    dateFormat: function () {
      let newDate = new Date(this.post.createdAt)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: 500;
  text-transform: uppercase;
}

.date {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 80%;
}

.content {
  font-family: 'Playfair Display', serif;
  font-size: 110%;
}
</style>
