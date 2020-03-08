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
            <el-button @click="openDialog(scope.$index)" icon="el-icon-setting" type="danger">结 束</el-button>
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
            {{applyEndReq.cooperationId}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="标题:">
            {{applyEndReq.cooperationTitle}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="申请人ID:">
            {{applyEndReq.cooperatorId}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="申请人:">
            {{applyEndReq.cooperatorName}}
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="结束类型:">
            <el-select v-model="applyEndReq.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div v-if="applyEndReq.status==2">
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
        </div>
        <el-row>
          <el-form-item>
            <el-button @click="submitEnd" type="danger">结 束</el-button>
            <el-button @click="dialogVisible=false">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'During',
    data () {
      return {
        dialogVisible: false,
        options: [{
          value: 2,
          label: '已完成合作'
        }, {
          value: 3,
          label: '已协商，提前结束'
        }
        ],
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
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
          }],
        },
        applyEndReq: {
          cooperationId: null,
          cooperationTitle: null,
          cooperatorId: null,
          cooperatorName: null,
          status: 2,
          score: null,
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
              status: 1,
              applyStatus: 1,
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
      openDialog (row) {
        this.applyEndReq.cooperationId = this.requestRes.details[row].cooperationId
        this.applyEndReq.cooperationTitle = this.requestRes.details[row].cooperationVO.title
        this.applyEndReq.cooperatorId = this.requestRes.details[row].cooperatorId
        this.applyEndReq.cooperatorName = this.requestRes.details[row].user.username
        this.applyEndReq.score = 5
        this.applyEndReq.comment = ''
        this.dialogVisible = true
      },
      submitEnd () {
        this.applyEndReq.score = this.applyEndReq.status == 2 ? this.applyEndReq.score : null
        this.applyEndReq.comment = this.applyEndReq.status == 2 ? this.applyEndReq.comment : ''
        const _ts = this
        this.axios.post('user-cooperation/boss/end', this.applyEndReq)
          .then(function (response) {
            if (response.data.status == 1001) {
              _ts.dialogVisible = false
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
