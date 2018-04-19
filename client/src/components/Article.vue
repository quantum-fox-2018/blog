<template>
  <div class="col-9 card">
    <div class="card-body" v-if="content !== ''">
      <h5 class="card-title">{{content.title}}</h5>
      <p>{{content.text}}</p>
      <footer class="blockquote-footer">Author: <cite title="Source Title">{{content.author.name}}</cite></footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      content: ''
    }
  },
  watch: {
    id () {
      let self = this.$store.getters.getAllArticles
      self.map(data => {
        if (data._id === this.id) {
          this.content = data
        }
      })
    }
  },
  created () {
    let prop = this._props.id
    let self = this.$store.getters.getAllArticles
    self.map(data => {
      if (data._id === prop) {
        this.content = data
      }
    })
  }
}
</script>
