<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right: 20px;"
      ></el-button>
      <!-- 面包屑 -->
      <!-- <span class="text">首页</span> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path: item.path}">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <img class="user" src="../assets/user.png" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cookie from 'cookiejs';
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === 'logout') {
        console.log('登出成功');
        // 清除token
        cookie.remove('token')
        // 清除cookie的menu
        cookie.remove('menu')
        this.$router.push('/login')
      }
    },
    handleSelect(item) {
      if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
            this.$router.push(item.path)
        }
    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff
        }
      }
    }
  }
}
</style>
