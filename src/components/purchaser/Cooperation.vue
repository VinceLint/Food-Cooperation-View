<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="审核中" name="/food/cooperation/seek"></el-tab-pane>
      <el-tab-pane label="合作中" name="/food/cooperation/on"></el-tab-pane>
      <el-tab-pane label="被拒绝" name="/food/cooperation/refuse"></el-tab-pane>
      <el-tab-pane label="已结束" name="/food/cooperation/finish"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>

</template>

<script>
  export default {
    name: 'Cooperation',
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
