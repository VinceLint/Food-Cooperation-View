<template>
  <div id="login" class="login-container">
    <el-form ref="userForm" class="login-page">
      <el-form-item prop="username">用户名
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">密&nbsp&nbsp码
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-link href="forgetPwd.html" target="_blank" class="forgetPwd-item">忘记密码？</el-link>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="Login">登 陆</el-button>
        <el-button @click="register">注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        token: null,
        userForm: {
          username: null,
          password: null,
        }
      };
    },
    methods: {
      login(){
        // const _ts = this;
        // ax.post("doLogin", this.userForm)
        //     .then(function (response) {
        //         console.log(response.data.status)
        //         if (response.data.status == 1001) {
        //             _ts.token = response.data.data;
        //             _ts.loginSuccess()
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("账号密码错误")
        //         console.log(error);
        //     });
        $.ajax({
          type: "POST",
          url: "http://localhost:8040/api-view/user/doLogin",
          contentType: "application/json; charset=utf-8",
          data: this.userForm,
          success: function (response) {
            if (response.data.status == 1001) {
              this.token = response.data.data;
              this.loginSuccess()
            }
          }.bind(this),
          error: function (message) {
            //失败信息
            console.log("error")
          }
        });
      },
      // 登陆成功
      loginSuccess() {
        // await ax.get("index")
        //     // .then(function (response) {
        //     // })
        //     // .catch(function (error) {
        //     //     console.log("系统错误")
        //     // });
        console.log(this.token)
        localStorage.setItem("token", this.token);
        // window.location.href = "http://localhost:8040/api-view/user/index"
      },
      // 注册
      register() {
        ax.get("register")
          .then(function (response) {
          })
          .catch(function (error) {
            console.log("系统错误")
          });
      }
    }
  }
</script>

<style scoped>

</style>
