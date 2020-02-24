<template>
  <div id="login" class="login-container" visible="true">
    <el-form ref="loginReq" class="login-page">
      <el-form-item prop="username">用户名
        <el-input v-model="loginReq.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">密&nbsp&nbsp码
        <el-input v-model="loginReq.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-link target="_blank" class="forgetPwd-item" @click="forgetPwd">忘记密码？</el-link>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="login">登 陆</el-button>
        <el-button @click="register">注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        token: null,
        loginReq: {
          username: null,
          password: null,
        }
      }
    },
    methods: {
      login () {
        const _ts = this
        this.axios.post('user-session/user/login', this.loginReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              console.log('response token: ' + response.data.data.token)
              _ts.token = response.data.data.token
              _ts.loginSuccess()
            }else{
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
            alert(error.data.errors[0].defaultMessage)
          })
      },
      // 登陆成功
      loginSuccess () {
        console.log('this.token = ' + this.token)
        this.cookie.set('token', this.token)
        this.$router.push('/food/home')
      },
      // 注册
      register () {
        this.$router.push('/user/register')
      },
      // 忘记密码
      forgetPwd () {
        this.$router.push('/user/forgetPwd')
      }
    }
  }
</script>
<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .forgetPwd-item {
    float: right;
  }

  .button-item {
    text-align: center;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
