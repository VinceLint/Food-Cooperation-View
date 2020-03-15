<template>
  <div id="login" class="login-container" visible="true">
    <el-form ref="resetPwdReq" class="login-page">
      <el-form-item prop="username">用户名
        <el-input v-model="resetPwdReq.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">邮&nbsp&nbsp箱
        <el-input v-model="resetPwdReq.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">新密码
        <el-input type="password" v-model="resetPwdReq.newPassword"></el-input>
      </el-form-item>
      <el-form-item prop="password">确认密码
        <el-input type="password" v-model="resetPwdReq.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="update" type="primary">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ForgetPwd',
    data () {
      return {
        resetPwdReq: {
          username: null,
          email: null,
          newPassword: null,
          confirmPassword: null,
        },
      }
    },
    methods: {
      update () {
        const _ts = this
        this.axios.post('user-session/user/forgetPwd', this.resetPwdReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              console.log('response token: ' + response.data.data.token)
              _ts.updateSuccess()
            }else{
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      },
      updateSuccess(){
        this.$router.push("/user/login")
      },
      cancel () {
        this.$router.push("/user/login")
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
