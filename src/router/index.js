import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menu from '../components/Menu'
import Home from '../components/Home'
import UserInfo from '../components/UserInfo'
import Cooperation from '../components/Cooperation'
import Message from '../components/Message'
import Login from '../components/Login'
import ForgetPwd from '../components/ForgetPwd'
import Register from '../components/Register'
import Publish from '../components/Publish'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/food',
      name: 'Menu',
      component: Menu,
      redirect: '/food',
      children: [
        {
          path: 'userInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'cooperation',
          name: 'Cooperation',
          component: Cooperation
        },
        {
          path: 'message',
          name: 'Message',
          component: Message
        },
        {
          path: 'publish',
          name: 'Publish',
          component: Publish
        }
      ]
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/user/forgetPwd',
      name: 'ForgetPwd',
      component: ForgetPwd,
    },
  ]
})
