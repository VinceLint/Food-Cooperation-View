<template>
  <div>
    <div>
      <h1 class="title">{{requestRes.title}}</h1>
      <h3 class="title">{{requestRes.company}}</h3>
    </div>
    <div>
      <h4>{{requestRes.province}}省 {{requestRes.city}}市 {{requestRes.address}}&nbsp&nbsp&nbsp&nbsp发布时间：{{requestRes.publishTimeStr}}</h4>
    </div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="合作细则" name="1">
          <div>{{requestRes.detail}}</div>
        </el-collapse-item>
        <el-collapse-item title="发布者信息" name="2">
          <div>发布人：{{user.username}}</div>
          <div>邮箱：{{user.email}}</div>
          <div>手机：{{user.phone}}</div>
          <div>评分：{{user.score}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-button @click="apply" type="primary">申 请</el-button>
      <el-button @click="cancel">返 回</el-button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'MessageDetail',
    data () {
      return {
        activeNames: ['1', '2'],
        requestRes: {
          id: null,
          title: '大司马的饭堂',
          company: 'fordeal',
          province: null,
          city: null,
          address: null,
          publishTime: null,
          publishTimeStr: null,
          detail: null,
          userId: null,
        },
        user: {
          username: null,
          email: null,
          phone: null,
          score: null,
        },
      }
    },
    methods: {
      requestData (id) {
        var _ts = this
        this.axios.get('user-cooperation/cooperation/commonMsg',
          {
            params: {
              id: id,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestRes = response.data.data
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
            // alert(error.data.errors[0].defaultMessage)
          })
      },
      requestUser (id) {
        var _ts = this
        this.axios.get('user-session/user/getUser',
          {
            params: {
              id: id,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.user = response.data.data
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
            // alert(error.data.errors[0].defaultMessage)
          })
      },
      apply(){
        var _ts = this
        // var id = this.requestRes.id
        // console.log(id)
        this.axios.get('user-cooperation/cooperation/apply', {
          params: {
            id: this.requestRes.id,
          }
        })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.$message({
                type: 'success',
                message: response.data.message,
                duration: 3000,
              })
              _ts.$router.push("/food/message");
            } else {
              _ts.$message({
                type: 'error',
                message: response.data.message,
                duration: 3000,
              })
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            _ts.$message({
              type: 'error',
              message: '服务器发生错误',
            })
            // 根据返回error打的，有点乱
            // alert(error.data.errors[0].defaultMessage)
          })
      },
      cancel(){
        this.$router.go(-1);
      }
    },
    created () {
      this.requestData(this.$route.query.id)
      this.requestUser(this.$route.query.userId)
    }
  }
</script>

<style scoped>
  .title {
    position: relative;
    margin-left: 0%;
  }
</style>
