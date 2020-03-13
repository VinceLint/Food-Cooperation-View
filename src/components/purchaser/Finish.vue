<template>
  <div>
    <div class="table-contain">
      <el-table :data="requestRes.details" show-overflow-tooltip
                style="width: 80%; minHeight: 500px; margin-left: 100px">
        <el-table-column prop="cooperationId" label="合作号"></el-table-column>
        <el-table-column prop="cooperationVO.title" label="标题"></el-table-column>
        <el-table-column prop="cooperationVO.user.id" label="雇主ID"></el-table-column>
        <el-table-column prop="cooperationVO.user.username" label="雇主"></el-table-column>
        <el-table-column prop="cooperationVO.user.score" label="雇主综合评分"></el-table-column>
        <el-table-column label="我的评价" width="200px">
          <template slot-scope="scope">
            <el-button v-if="!requestRes.details[scope.$index].hasComment" @click="goToComment(scope.$index)"
                       type="primary">评 价
            </el-button>
            <el-button v-if="requestRes.details[scope.$index].hasComment" @click="getDetail(scope.$index)"
                       type="danger">查 看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
        :pager-count="7"
        background
        :current-page="requestRes.page"
        :page-sizes="[20, 50, 100, 500]"
        :page-size="requestRes.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="requestRes.total"
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible1" width="50%">
      <div style="overflow: scroll">
        <el-row>
          <el-col :span="4">
            <span>&nbsp</span>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header">
                <span>我的评价</span>
              </div>
              <div>
                {{detail.cooperationVO.comment}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <span>&nbsp
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <span>我的评分:</span>
              <span>{{detail.cooperationVO.score}}</span>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span>&nbsp</span>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header">
                <span>他的评价</span>
              </div>
              <div>
                {{detail.comment}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <span>&nbsp
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <span>他的评分:</span>
              <span>{{detail.score}}</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--评价框-->
    <el-dialog :visible.sync="dialogVisible2">
      <el-form :inline="true">
        <el-row>
          <el-form-item label="申请号: ">
            {{applyEndReq.cooperationId}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="标题:">
            {{detail.cooperationVO.title}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="雇主ID:">
            {{detail.cooperationVO.user.id}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="雇主:">
            {{detail.cooperationVO.user.username}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="评价:">
            <el-input type="textarea" :rows="8" style="width: 400px;" v-model="applyEndReq.comment">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="评分:">
            <el-rate
              v-model="applyEndReq.score"
              :colors="colors">
            </el-rate>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button @click="submit" type="primary">提 交</el-button>
            <el-button @click="dialogVisible2=false">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Finish',
    data () {
      return {
        dialogVisible1: false,
        dialogVisible2: false,
        requestRes: {
          page: 1,
          total: 100,
          limit: 20,
          totalPage: 5,
          details: [{
            id: null,
            title: null,
            company: null,
            province: null,
            city: null,
            publishTime: null,
            publishTimeStr: null,
            detail: null,
            userId: null,
            hasComment: false,
          }],
        },
        detail: {
          id: null,
          title: null,
          company: null,
          province: null,
          city: null,
          publishTime: null,
          publishTimeStr: null,
          detail: null,
          comment: null,
          userId: null,
          user: {
            username: null,
            score: null,
          },
          cooperationVO: {
            comment: null,
            score: null,
            user: {
              id: null,
              username: null,
            }
          }
        },
        applyEndReq: {
          cooperationId: null,
          comment: null,
          score: null,
        }
      }
    },
    methods: {
      requestMeta () {
      },
      requestData (page, pageSize) {
        const _ts = this
        this.axios.get('user-cooperation/purchaser/listFinish',
          {
            params: {
              page: page,
              pageSize: pageSize,
              status: null,
              applyStatus: 3,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestRes.details = response.data.data.list
              _ts.requestRes.page = response.data.data.page
              _ts.requestRes.total = response.data.data.total
              _ts.requestRes.limit = response.data.data.limit
              for (var index in _ts.requestRes.details) {
                console.log(_ts.requestRes.details[index].cooperationVO.comment)
                if (_ts.requestRes.details[index].cooperationVO.comment != null) {
                  _ts.requestRes.details[index].hasComment = true
                }
              }
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
          })
      },
      submit () {
        const _ts = this
        this.axios.post('user-cooperation/purchaser/end', this.applyEndReq)
          .then(function (response) {
            if (response.data.status == 1001) {
              _ts.dialogVisible2 = false
              _ts.$message({
                type: 'success',
                message: '评价成功',
                duration: 3000,
              })
              _ts.requestData(1, 20)
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            alert(error)
          })
      },
      getDetail (row) {
        this.detail = this.requestRes.details[row]
        this.dialogVisible1 = true
      },
      goToComment (row) {
        this.detail = this.requestRes.details[row]
        this.applyEndReq.cooperationId = this.detail.cooperationId
        this.applyEndReq.comment = null
        this.applyEndReq.score = null
        this.applyEndReq.status = 2 // 正常结束
        this.dialogVisible2 = true
      },
      // --------------------页码编辑----------------------------
      handleSizeChange (val) {
        this.requestData(1, val)
      },
      handleCurrentChange (val) {
        this.requestData(val, this.requestRes.limit)
      },
      // -------------------------------------------------------
    },
    created () {
      this.requestMeta()
      this.requestData(this.requestRes.page, this.requestRes.limit)
    },
  }
</script>

<style scoped>
</style>
