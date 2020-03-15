<template>
  <div id="login" class="login-container" visible="true">
    <el-form ref="registerReq" class="login-page">
      <el-form-item prop="username">用户名
        <el-input v-model="registerReq.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">密&nbsp&nbsp码
        <el-input v-model="registerReq.password"></el-input>
      </el-form-item>
      <el-form-item prop="password">邮&nbsp&nbsp箱
        <el-input v-model="registerReq.email"></el-input>
      </el-form-item>
      <el-form-item prop="password">手&nbsp&nbsp机
        <el-input v-model="registerReq.phone"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="register">注 册</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        registerReq: {
          username: null,
          password: null,
          email: null,
          phone: null,
        },
      }
    },
    methods: {
      register () {
        const _ts = this
        this.axios.post('user-session/user/register', this.registerReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.$message({
                type: 'success',
                message: '注册成功',
              })
              _ts.registerSuccess()
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
          })
      },
      registerSuccess () {
        this.$router.push('/user/login')
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
