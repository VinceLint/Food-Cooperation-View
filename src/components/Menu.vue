<template>
  <div>
    <div class="header">
      <h1 class="title">食材供应信息平台</h1>
      <el-button class="logout" size="mini" :type="isLogin?'info':'primary'" plain @click="logout">{{isLogin?'退 出':'登 陆'}}
      </el-button>
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
          <el-menu-item key="1" index="/food/home">
            <i class="el-icon-location">首&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp页</i>
          </el-menu-item>
          <el-menu-item key="2" index="/food/message">
            <i class="el-icon-menu">寻求合作</i>
          </el-menu-item>
          <el-menu-item key="3" index="/food/release">
            <i class="el-icon-document">我的发布</i>
          </el-menu-item>
          <el-menu-item key="4" index="/food/cooperation">
            <i class="el-icon-document">我的合作</i>
          </el-menu-item>
          <el-menu-item key="5" index="/food/userInfo">
            <i class="el-icon-setting">个人中心</i>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>平台信息</span>
        </div>
        <div class="text item">
          投诉热线：15999955194
        </div>
        <div class="text item">
          微&nbsp信&nbsp号：FoodCooperation
        </div>
        <div class="text item">
          qq：332232715
        </div>
      </el-card>
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
  // import Login from './Login';
  export default {
    name: 'Menu',
    data () {
      return {
        routerView: true,
        isLogin: false,
      }
    },
    methods: {
      logout () {
        // 退出登陆
        if (this.isLogin) {
          // 清token
          this.cookie.delete("token")
          console.log(this.cookie.get("token"))
          this.isLogin = false
        }
        // 去登陆
        else {
          this.$router.push({
            path: '/user/login'
          })
        }
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
    },
    created () {
      console.log("Menu get ls: "+this.cookie.get("token"))
      if (this.cookie.get("token") != null){
        this.isLogin = true;
      } else{
        this.isLogin = false;
      }
    }
  }
</script>

<style scoped>
  .header {
    /*flex: 5px*/
  }

  .title {
    display: inline-block;
    /*margin-left: auto;*/
  }

  .logout {
    float: right;
    margin-top: 40px;
    margin-right: 40px;
    /*right: 20px;*/
    text-align: right;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 30px;
  }
</style>
