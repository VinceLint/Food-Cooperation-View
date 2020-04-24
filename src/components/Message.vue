<template>
  <div>
    <div>
      <el-button @click="goToPublish">我要发布</el-button>
    </div>
    <div class="table-contain">
      <el-table :data="requestRes.details" @row-click="detail" show-overflow-tooltip
                style="width: 100%; minHeight: 500px;">
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
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
<!--    <el-dialog :visible.async="true">-->
<!--      <div>-->
<!--        <span>-->
<!--          您的个人信息不完善，无法发布合作信息，请先完善公司信息-->
<!--        </span>-->
<!--        <el-form :inline="true" label-width="100px" class="formClass">-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="企业代码">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="企业名称">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="省份">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="城市">-->
<!--              <el-input style="width: 200px"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-row>-->
<!--          <el-row class="rowClass">-->
<!--            <el-form-item label="详细地址">-->
<!--              <el-input type="textarea" :rows="3" style="width: 200px"></el-input>-->
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
    name: 'Message',
    data() {
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
      goToPublish() {
        this.$router.push('/food/publish')
      },
      requestMeta() {
      },
      requestData(page, pageSize) {
        const _ts = this
        this.axios.get('user-cooperation/cooperation/listCommonMsg',
          {
            params: {
              page: page,
              pageSize: pageSize,
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
      detail(row) {
        this.$router.push({
          path: '/food/messageDetail',
          query: {
            id: row.id,
            userId: row.userId,
          }
        })
      },
      // --------------------页码编辑----------------------------
      handleSizeChange(val) {
        this.requestData(1, val)
      },
      handleCurrentChange(val) {
        this.requestData(val, this.requestRes.limit)
      },
      // -------------------------------------------------------
    },
    created() {
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
  / / text-align: center;
  }
</style>
