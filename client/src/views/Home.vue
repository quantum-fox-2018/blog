<template>
  <div class="container">
    <Navbar></Navbar>

    <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8">
          <h1 class="my-4">101 Things I Love
            <small></small>
          </h1>

          <router-view />

          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a><router-link :to="{ path: '/Animals', params: { id: 'Animals' } }">Animals</router-link></a>
                    </li>
                    <li>
                      <a><router-link :to="{ path: '/Hacktiv8', params: { id: 'Hacktiv8' } }">Hacktiv8</router-link></a>
                    </li>
                    <li>
                      <a><router-link :to="{ path: '/Javascript', params: { id: 'Javascript' } }">Javascript</router-link></a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <a><router-link :to="{ path: '/Landscape', params: { id: 'Landscape' } }">Landscape</router-link></a>
                    </li>
                    <li>
                      <a><router-link :to="{ path: '/Quotes', params: { id: 'Quotes' } }">Quotes</router-link></a>
                    </li>
                    <li>
                      <a><router-link :to="{ path: '/Others', params: { id: 'Others' } }">Others</router-link></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Side Widget -->
          <div class="card my-4">
            <h5 class="card-header">Side Widget</h5>
            <div class="card-body">
              <div style="text-align:center;padding:1em 0;"> <h3><span style="color:gray;">Current local time in</span><br />Jakarta, Indonesia</h3> <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=Asia%2FJakarta" width="100%" height="115" frameborder="0" seamless></iframe> </div>
            </div>
          </div>

        </div>

      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbar,
    Post
  },
  methods: {
    ...mapActions([
      'getPosts'
    ])
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  mounted () {
    this.getPosts()
  }
}
</script>
