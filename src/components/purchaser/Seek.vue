<template>
  <div>
    <div class="table-contain">
      <el-table :data="requestRes.details" @row-click="detail" show-overflow-tooltip style="width: 100%; minHeight: 500px;">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="company" label="单位" width="200px"></el-table-column>
        <el-table-column prop="province" label="省份" width="50px"></el-table-column>
        <el-table-column prop="city" label="城市" width="70px"></el-table-column>
        <el-table-column prop="publishTimeStr" label="发布时间"></el-table-column>
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
    name: 'Seek',
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
      }
    },
    methods: {
      requestMeta () {
      },
      requestData (page, pageSize) {
        const _ts = this
        this.axios.get('user-cooperation/purchaser/seek',
          {
            params: {
              page: page,
              pageSize: pageSize,
              applyStatus: 0,
              status: 0,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestRes.details = response.data.data.list
              _ts.requestRes.page = response.data.data.page
              _ts.requestRes.total = response.data.data.total
              _ts.requestRes.limit = response.data.data.limit
              _ts.requestRes.pageSize = response.data.data.pageSize
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
      detail (row) {
        this.$router.push({
          path: '/food/cooperation/seekDetail',
          query: {
            id: row.id,
            userId: row.userId,
          }
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
  .table-contain {
    margin-top: 20px;
    width: 70%;
    display: inline-block;
  }

  .pagination-container {
    margin-top: 20px;
    /*text-align: center;*/
  }
</style>
