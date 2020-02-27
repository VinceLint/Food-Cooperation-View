<template>
  <div>
    <div class="table-contain">
      <el-table :data="requestRes" show-overflow-tooltip
                style="width: 80%; minHeight: 500px; margin-left: 100px">
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="cooperationId" label="标题"></el-table-column>
        <el-table-column prop="company" label="单位" width="200px"></el-table-column>
        <el-table-column prop="province" label="省份" width="50px"></el-table-column>
        <el-table-column prop="city" label="城市" width="70px"></el-table-column>
        <el-table-column prop="publishTimeStr" label="发布时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Seek',
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
