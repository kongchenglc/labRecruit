import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import error from '@/page/error'
import signup from '@/page/signup'
import success from '@/page/success'
import message from '@/page/message'
import admin_login from '@/page/admin_login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Log In',
      component: login,
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: signup,
    },
    {
      path: '/success',
      name: 'Congratulations',
      component: success,
    },
    {
      path: '/message',
      name: 'Message',
      component: message,
    },
    {
      path: '/admin_login',
      name: 'Admin Login',
      component: admin_login,
    },
    {
      path: '*',
      name: 'Error',
      component: error,
    }
  ]
})
