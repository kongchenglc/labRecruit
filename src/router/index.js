import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import error from '@/page/error'
import signup from '@/page/signup'
import success from '@/page/success'
import message from '@/page/message'
import admin_login from '@/page/admin_login'
import admin_messages from '@/page/admin_messages'
import admin_message from '@/page/admin_message'

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
      path: '/admin_messages',
      name: 'Students Message',
      component: admin_messages,
    },
    {
      path: '/admin_message',
      name: 'Student Messages',
      component: admin_message,
    },
    {
      path: '*',
      name: 'Error',
      component: error,
    }
  ]
})
