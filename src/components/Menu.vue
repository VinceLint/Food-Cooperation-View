<template>
  <div>
  <!--<div>-->
  <!--<div></div>-->
  <!--<div>-->
  <!--<router-link to="/">首页</router-link>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div>-->
  <!--<div></div>-->
  <!--<div>-->
  <!--<router-link to="/message">寻求合作</router-link>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div>-->
  <!--<div></div>-->
  <!--<div>-->
  <!--<router-link to="/cooperation">我的合作</router-link>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div>-->
  <!--<div></div>-->
  <!--<div>-->
  <!--<router-link to="/userInfo">个人中心</router-link>-->
  <!--</div>-->
  <!--</div>-->
  <!--<el-row class="tac">-->
  <el-col :span="4">
    <h5>食材供应平台</h5>

    <!--default-active="2"-->
    <!--@open="handleOpen"-->
    <!--@close="handleClose"-->

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
        <el-menu-item-group>
          <el-menu-item key="1" index="message">
            <i class="el-icon-location">erwr</i>
            <!--<span><router-link to="/">首&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp页</router-link></span>-->
          </el-menu-item>
          <el-menu-item key="2" index="message">
            <i class="el-icon-menu">werwr</i>
            <!--<span><router-link to="/message">寻求合作</router-link></span>-->
          </el-menu-item>
          <el-menu-item key="3" index="cooperation">
            <i class="el-icon-document"></i>
            <!--<span><router-link to="/cooperation">我的合作</router-link></span>-->
          </el-menu-item>
          <el-menu-item key="4" index="user">
            <!--<template slot="title">-->
            <i class="el-icon-setting">123</i>
            <!--</template>-->

            <!--<span><router-link to="/food/userInfo">个人中心</router-link></span>-->
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

</style>
