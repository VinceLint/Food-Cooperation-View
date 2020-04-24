<template>
  <div>
    <div>
      <h1 class="title">{{requestRes.title}}</h1>
      <h3 class="title">{{requestRes.company}}</h3>
    </div>
    <div>
      <h4>{{requestRes.province}}省 {{requestRes.city}}市
        {{requestRes.address}}&nbsp&nbsp&nbsp&nbsp发布时间：{{requestRes.publishTimeStr}}</h4>
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
<!--    <el-dialog :visible.async="true">-->
<!--      <div>-->
<!--            <span>-->
<!--              您的采购资质未认证，无法申请合作信息，请先提交认证资料-->
<!--            </span>-->
<!--        <el-form :inline="true" label-width="100px" class="formClass">-->
<!--          <el-row class="rowClass">-->
<!--            <span style="font-weight: bolder">营业执照信息</span>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="营业执照号">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="注册名字">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="法人姓名">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="法人身份证号">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="营业执照正反">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                list-type="picture">-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="身份证正反">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :on-preview="handlePreview"-->
<!--                :on-remove="handleRemove"-->
<!--                :file-list="fileList"-->
<!--                list-type="picture">-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item>-->
<!--              <el-button type="primary">提 交</el-button>-->
<!--              <el-button type="danger">取 消</el-button>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>

</template>

<script>
  export default {
    name: 'MessageDetail',
    data() {
      return {
        fileList: [],
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
      requestData(id) {
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
      requestUser(id) {
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
      apply() {
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
      cancel() {
        this.$router.go(-1);
      },
      // -----------------图片上传------------------
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    created() {
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
