import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menu from '../components/Menu'
import Home from '../components/Home'
import UserInfo from '../components/UserInfo'
import Cooperation from '../components/purchaser/Cooperation'
import Seek from '../components/purchaser/Seek'
import SeekDetail from '../components/purchaser/SeekDetail'
import On from '../components/purchaser/On'
import Refuse from '../components/purchaser/Refuse'
import Finish from '../components/purchaser/Finish'
import Message from '../components/Message'
import Login from '../components/Login'
import ForgetPwd from '../components/ForgetPwd'
import Register from '../components/Register'
import Publish from '../components/Publish'
import MessageDetail from '../components/MessageDetail'
import Release from '../components/boss/Release'
import Wait from '../components/boss/Wait'
import During from '../components/boss/During'
import End from '../components/boss/End'
import Reject from '../components/boss/Reject'
import AdvanceEnd from '../components/boss/AdvanceEnd'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/food',
      name: 'Menu',
      component: Menu,
      redirect: '/food/home',
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
          path: 'release',
          name: 'Release',
          component: Release,
          redirect: '/food/release/wait',
          children: [
            {
              path: '/food/release/wait',
              name: 'Wait',
              component: Wait,
            },
            {
              path: '/food/release/during',
              name: 'During',
              component: During,
            },
            {
              path: '/food/release/reject',
              name: 'Reject',
              component: Reject,
            },
            {
              path: '/food/release/advanceEnd',
              name: 'AdvanceEnd',
              component: AdvanceEnd,
            },
            {
              path: '/food/release/end',
              name: 'End',
              component: End,
            },
          ]
        },
        {
          path: 'cooperation',
          name: 'Cooperation',
          component: Cooperation,
          redirect: '/food/cooperation/seek',
          children: [
            {
              path: '/food/cooperation/seek',
              name: 'Seek',
              component: Seek,
            },
            {
              path: '/food/cooperation/seekDetail',
              name: 'SeekDetail',
              component: SeekDetail,
            },
            {
              path: '/food/cooperation/on',
              name: 'On',
              component: On,
            },
            {
              path: '/food/cooperation/refuse',
              name: 'Refuse',
              component: Refuse,
            },
            {
              path: '/food/cooperation/finish',
              name: 'Finish',
              component: Finish,
            },
          ]
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
        },
        {
          path: 'messageDetail',
          name: 'MessageDetail',
          component: MessageDetail
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
