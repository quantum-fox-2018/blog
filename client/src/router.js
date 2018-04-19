import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import DetailArticle from './views/DetailArticle.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import Create from './views/CreateArticle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/',
      name: 'home',
      props: true,
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      props: true,
      component: About
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/:id',
      name: 'detailArticle',
      props: true,
      component: DetailArticle
    }
  ]
})
