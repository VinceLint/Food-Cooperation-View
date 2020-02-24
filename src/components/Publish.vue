<template>
  <div class="login-container">
    <el-form ref="publishReq" class="login-page">
      <el-form-item prop="title">
        <el-row>标题
          <el-input v-model="publishReq.title"></el-input>
        </el-row>
      </el-form-item>
      <el-form-item prop="company">公司
        <el-input v-model="publishReq.company"></el-input>
      </el-form-item>
      <el-form-item prop="province">省份
        <el-input v-model="publishReq.province"></el-input>
      </el-form-item>
      <el-form-item prop="city">城市
        <el-input v-model="publishReq.city"></el-input>
      </el-form-item>
      <el-form-item prop="address">具体地址
        <el-input v-model="publishReq.address"></el-input>
      </el-form-item>
      <el-form-item prop="detail">具体合作细则
        <el-input type="textarea" :rows="8" v-model="publishReq.detail"></el-input>
      </el-form-item>
      <el-form-item class="button-item">
        <el-button @click="publish">发 布</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Publish',
    data () {
      return {
        publishReq: {
          title: null,
          company: null,
          province: null,
          city: null,
          address: null,
          detail: null,
        }
      }
    },
    methods: {
      publish () {
        const _ts = this
        this.axios.post('user-cooperation/cooperation/publish', this.publishReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.publishSuccess()
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
            alert(error.data.errors[0].defaultMessage)
          })
      },
      publishSuccess () {
        this.$router.push('/food/message')
      },
      cancel () {
        this.$router.push('/food/message')
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
    margin-top: 20px;
    margin-left: 20%;
    width: 350px;
  }

  .button-item {
    text-align: center;
  }

</style>
