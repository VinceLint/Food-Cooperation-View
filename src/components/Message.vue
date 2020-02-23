<template>
  <div class="table-contain">
    <el-table :data="response.details" show-overflow-tooltip style="width: 100%; minHeight: 500px;">
      <el-table-column prop="id" label="id" width="80" v-if="false"></el-table-column>
      <el-table-column prop="title" label="标题" width="150" @click="detail"></el-table-column>
      <el-table-column prop="company" label="单位"
                       width="170"></el-table-column>
      <el-table-column prop="address" label="地点"
                       width="170"></el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="70"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data () {
      return {
        response: {
          details: [{
            id: null,
            title: null,
            company: null,
            address: null,
            publishTime: null,
          }]
        }
      }
    },
    methods: {
      detail(){

      }
    },
  }
</script>

<style scoped>
  .table-contain {
    margin-top: 20px;
    width: 70%;
    display: inline-block;
  }
</style>
