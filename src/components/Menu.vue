<template>
  <div>
    <div class="header">
      <h1 class="title">食材供应信息平台</h1>
      <el-button size="mini" type="primary" @click="logout">退出登陆</el-button>
    </div>
  <el-col :span="4">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
        <el-menu-item-group>
          <el-menu-item key="1" index="message">
            <i class="el-icon-location">首&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp页</i>
          </el-menu-item>
          <el-menu-item key="2" index="message">
            <i class="el-icon-menu">寻求合作</i>
          </el-menu-item>
          <el-menu-item key="3" index="cooperation">
            <i class="el-icon-document">我的合作</i>
          </el-menu-item>
          <el-menu-item key="4" index="user">
            <i class="el-icon-setting">个人中心</i>
          </el-menu-item>
        </el-menu-item-group>

    </el-menu>
  </el-col>
    <el-col>
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data () {
      return {}
    },
    methods: {
      logout(){

      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    mounted () {
      console.log(this.$route.path)
    }
  }
</script>

<style scoped>
  .header{
    flex:3
  }
  .title{
    display: inline-block;
    margin-left: auto;
  }
</style>
