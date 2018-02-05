import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import error from '@/page/error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Log In',
      component: login,
    },
    {
      path: '*',
      name: 'Error',
      component: error,
    }
  ]
})
