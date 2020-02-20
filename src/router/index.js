import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menu from '../components/Menu'
import Home from '../components/Home'
import UserInfo from '../components/UserInfo'
import Cooperation from '../components/Cooperation'
import Message from '../components/Message'

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
          path: 'user',
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
      ]
    },
    // {
    //   path: '/food/user',
    //   name: 'UserInfo',
    //   component: UserInfo
    // },
    // {
    //   path: '/food/home',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/food/cooperation',
    //   name: 'Cooperation',
    //   component: Cooperation
    // },
    // {
    //   path: '/food/message',
    //   name: 'Message',
    //   component: Message
    // }
  ]
})
