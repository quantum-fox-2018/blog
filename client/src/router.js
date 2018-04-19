import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
import Detail from './components/Detail'
import FormPost from './views/FormPost'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: ':id',
        name: 'Detail',
        component: Detail,
        props: true
      }]
    },
    {
      path: '/formpost',
      name: 'FormPost',
      component: FormPost,
      beforeEnter: (to, from, next) => {
        console.log('beforeenter===', store.state.activeUser)
        if (store.state.activeUser.token !== '') {
          next()
        } else {
          next({path: '/'})
        }
      }
    }
  ]
})
