<template>
  <div>
    <div class="table-contain">
      <el-table :data="requestRes.details" show-overflow-tooltip
                style="width: 80%; minHeight: 500px; margin-left: 100px">
        <el-table-column prop="cooperationId" label="合作号"></el-table-column>
        <el-table-column prop="cooperationVO.title" label="标题"></el-table-column>
        <el-table-column prop="user.id" label="申请人ID"></el-table-column>
        <el-table-column prop="user.username" label="申请人"></el-table-column>
        <el-table-column prop="user.score" label="申请人评分"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="pass(scope.$index)" icon="el-icon-setting" type="primary">通过</el-button>
            <el-button @click="notPass(scope.$index)" icon="el-icon-setting" type="danger">拒绝</el-button>
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
    <el-dialog :visible.sync="dialogVisible">
      <el-form :inline="true">
        <el-row>
          <el-form-item label="申请号: ">
            {{applyRejectReq.cooperationId}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="标题:">
            {{form.cooperationTitle}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="申请人ID:">
            {{applyRejectReq.cooperatorId}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="申请人:">
            {{form.cooperatorName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="拒绝理由:">
            <el-input type="textarea" :rows="8" style="width: 400px;" v-model="applyRejectReq.comment">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button @click="submitReject" type="danger">拒 绝</el-button>
            <el-button @click="dialogVisible=false">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Wait',
    data () {
      return {
        dialogVisible: false,
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
            cooperationVO: {},
          }],
        },
        applyPassReq: {
          cooperationId: null,
          cooperatorId: null,
        },
        form: {
          cooperationId: null,
          cooperationTitle: null,
          cooperatorId: null,
          cooperatorName: null,
        },
        applyRejectReq: {
          cooperationId: null,
          cooperatorId: null,
          comment: null,
        }
      }
    },
    methods: {
      requestMeta () {
      },
      requestData (page, pageSize) {
        const _ts = this
        this.axios.get('user-cooperation/boss/seek',
          {
            params: {
              page: page,
              pageSize: pageSize,
              status: 0,
              applyStatus: 0,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestRes.details = response.data.data.list
              _ts.requestRes.page = response.data.data.page
              _ts.requestRes.total = response.data.data.total
              _ts.requestRes.limit = response.data.data.limit
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
          })
      },
      pass (row) {
        this.applyPassReq = {}
        this.applyPassReq.cooperationId = this.requestRes.details[row].cooperationId
        this.applyPassReq.cooperatorId = this.requestRes.details[row].cooperatorId
        const _ts = this
        this.axios.post('user-cooperation/boss/pass', this.applyPassReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestData(1, 20)
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
          })
      },
      notPass (row) {
        this.applyRejectReq.cooperationId = this.requestRes.details[row].cooperationId
        this.form.cooperationTitle = this.requestRes.details[row].cooperationVO.title
        this.applyRejectReq.cooperatorId = this.requestRes.details[row].cooperatorId
        this.form.cooperatorName = this.requestRes.details[row].user.username
        this.applyRejectReq.comment = ''
        this.dialogVisible = true
        console.log(this.dialogVisible)
        console.log(row)
      },
      submitReject () {
        const _ts = this
        this.axios.post('user-cooperation/boss/reject', this.applyRejectReq)
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.dialogVisible = false;
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
