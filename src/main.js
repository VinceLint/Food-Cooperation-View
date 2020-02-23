// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import cookie from 'vue-cookie'
Vue.config.productionTip = false
//-------------------- axios配置-----------------------------
Vue.prototype.axios = axios
Vue.prototype.cookie = cookie;
// 网关地址
axios.defaults.baseURL= 'http://localhost:8040/'
// 拦截器
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // //config.data = JSON.stringify(config.data);
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    if (cookie.get("token")) {
      //用户每次操作，都将cookie设置成2小时
      cookie.set("token",cookie.get("token") ,1/12)
      cookie.set("name",cookie.get("name") ,1/12)
      config.headers.token = cookie.get("token");
    }

    return config;
  },
  error => {
    return Promise.reject(error.response);
  });
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode=="404") {
      console.log("response.data.resultCode是404")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      cookie.delete("token");
      console.log("登陆信息失效")
      this.$router.push("/user/login")
      return
    }else{
      return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
//----------------------------------------------------------

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import App from './App'
//
// Vue.use(ElementUI)
//
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
