import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Posts from './components/Posts'
import Post from './components/Post'
import DetailPost from './components/DetailPost'
import About from './views/About.vue'
import LoginAdmin from './views/LoginAdmin.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/admin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/admin-page',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: Posts,
          props: true
        },
        {
          path: ':id',
          component: Post,
          props: true
        },
        {
          path: ':id/:postid',
          component: DetailPost,
          props: true
        }
      ]
    }
  ]
})
