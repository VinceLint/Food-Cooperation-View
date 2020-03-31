<template>
  <div id="login" class="login-container" visible="true">
    <el-form :inline="true" ref="resetPwdReq" class="login-page">
      <el-form-item label="用 户 名">
        <el-input v-model="resetPwdReq.username"></el-input>
      </el-form-item>
      <el-form-item label="我的邮箱">
        <el-input v-model="resetPwdReq.email"></el-input>
      </el-form-item>
      <el-form-item label="验 证 码">
        <el-col :span="16">
          <el-input v-model="resetPwdReq.verifyCode"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button @click="sendVerifyCode">发送验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="新 密 码">
        <el-input type="password" v-model="resetPwdReq.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
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
    data() {
      return {
        resetPwdReq: {
          username: null,
          email: null,
          verifyCode: null,
          newPassword: null,
          confirmPassword: null,
        },
      }
    },
    methods: {
      sendVerifyCode() {
        const _ts = this
        this.axios.get('user-session/user/getVerifyCode', {
          params: {
            username: _ts.resetPwdReq.username,
            email: _ts.resetPwdReq.email,
          }
        })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.$message({
                message: '发送验证码成功',
                type: 'success',
                duration: 3000,
              })
            } else {
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      },
      update() {
        const _ts = this
        this.axios.post('user-session/user/forgetPwd', this.resetPwdReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              console.log('response token: ' + response.data.data.token)
              _ts.updateSuccess()
            } else {
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      },
      updateSuccess() {
        this.$router.push("/user/login")
      },
      cancel() {
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
