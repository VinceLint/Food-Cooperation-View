<template>
  <div width="80%">
    <el-form :inline="true" label-width="50px" class="formClass">
      <el-row class="rowClass">
        <el-form-item label="用户">
          <el-input v-model="user.username" style="width: 200px" disabled="true"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="rowClass">
        <el-form-item label="邮箱">
          <el-input v-model="user.email" style="width: 200px"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="rowClass">
        <el-form-item label="电话">
          <el-input v-model="user.phone" style="width: 200px"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="rowClass">
        <el-form-item label="评分">
          <span>
          {{user.score}}
          </span>
        </el-form-item>
      </el-row>
      <el-row class="rowClass">
        <span style="width: 200px;">
          <el-link style="text-align: center;" target="_blank" class="forgetPwd-item"
                   @click="updatePwd">点击修改密码</el-link>
        </span>
      </el-row>
      <el-row class="rowClass">
        <el-form-item>
          <el-button @click="handleEdit">修 改</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="updatePwdVisible">
      <el-form :inline="true" label-width="70px">
        <el-row>
          <el-form-item label="原密码">
            <el-input type="password" v-model="changePwdReq.oldPassword" style="width: 200px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="新密码">
            <el-input type="password" v-model="changePwdReq.newPassword" style="width: 200px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="changePwdReq.confirmPassword" style="width: 200px"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button @click="changePwd">确 认</el-button>
            <el-button @click="updatePwdVisible=false">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'UserInfo',
    data () {
      return {
        updatePwdVisible: false,
        user: {
          username: 'vincelin',
          email: '173220160@qq.com',
          phone: '17602024926',
          score: 4.99,
        },
        changeMsgReq: {
          email: null,
          phone: null,
        },
        changePwdReq: {
          oldPassword: null,
          newPassword: null,
          confirmPassword: null,
        }
      }
    },
    methods: {
      updatePwd () {
        this.changePwdReq.oldPassword = ''
        this.changePwdReq.newPassword = ''
        this.changePwdReq.confirmPassword = ''
        this.updatePwdVisible = true
      },
      changePwd () {
        const _ts = this
        this.axios.post('user-session/user/changePwd', this.changePwdReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.$message({
                type: 'success',
                message: '修改成功',
              })
              _ts.updatePwdVisible = false
            } else {
              _ts.$message({
                type: 'error',
                message: response.data.message,
              })
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      },
      handleEdit () {
        this.changeMsgReq.email = this.user.email
        this.changeMsgReq.phone = this.user.phone
        const _ts = this
        this.axios.post('user-session/user/changeMsg', this.changeMsgReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.$message({
                type: 'success',
                message: '修改成功',
              })
              _ts.requestData()
            } else {
              _ts.$message({
                type: 'error',
                message: response.data.message,
              })
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      },
      requestData () {
        const _ts = this
        this.axios.get('user-session/user/me')
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.user = response.data.data;
            } else {
              _ts.$message({
                type: 'error',
                message: response.data.message,
              })
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
          })
      }
    },
    created () {
      this.requestData()
    }
  }
</script>

<style scoped>
  .formClass {
    margin-top: 100px;
    margin-left: 110px;
    width: 80%;
  }

  .rowClass {
    text-align: center;
  }
</style>
