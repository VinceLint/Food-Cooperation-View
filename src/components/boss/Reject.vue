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
  </div>
</template>

<script>
  export default {
    name: 'Reject',
    data () {
      return {
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
        applyPassReq: {
          cooperationId: null,
          cooperatorId: null,
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
              status: null,
              applyStatus: 2,
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
