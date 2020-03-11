<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="待审核" name="/food/release/wait"></el-tab-pane>
      <el-tab-pane label="合作中" name="/food/release/during"></el-tab-pane>
      <el-tab-pane label="已拒绝" name="/food/release/reject"></el-tab-pane>
      <el-tab-pane label="提前结束" name="/food/release/advanceEnd"></el-tab-pane>
      <el-tab-pane label="正常结束" name="/food/release/end"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>

</template>

<script>
  export default {
    name: 'Release',
    data () {
      return {
        activeName: null,
      }
    },
    methods: {
      handleClick (val) {
        this.$router.push(this.activeName)
      },
    },

    created () {
      this.activeName = this.$route.path
    },
    mounted(){
      this.activeName = this.$route.path
    },
    watch: {
      activeName() {
        console.log(this.activeName)
      }
    }
  }
</script>

<style scoped>

</style>
