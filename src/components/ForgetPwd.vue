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
        <el-input v-model="resetPwdReq.newPassword"></el-input>
      </el-form-item>
      <el-form-item prop="password">确认密码
        <el-input v-model="resetPwdReq.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="update">修 改</el-button>
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
        this.axios.post('session/user/forgetPwd', this.resetPwdReq)
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
            alert(error.data.errors[0].defaultMessage)
          })
      },
      updateSuccess(){
        this.$router.push("/user/login")
      },
      cancel () {
        this.$router.push("/food/home")
      }
    }
  }
</script>

<style scoped>

</style>
