<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
        <el-menu-item :index="subitem.path" @click="clickMenu(subitem)">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import cookie from 'cookiejs';
export default {
  data() {
    return {
      // menuData: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserMange",
      //   },
      //   {
      //     path: "/其他",
      //     name: "location",
      //     label: "其他",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "Other/pageTwo",
      //       },
      //     ],
      //   },
      // ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        // 判断当前路由是否与跳转路由一致，注意重定向之后也要判断
        if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
            this.$router.push(item.path)
        }
        this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    // 不含有菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    // 含有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    menuData() {
      return  JSON.parse(cookie.get('menu')) || this.$store.state.tab.menu
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height: 100vh;
    border-right: none;
    h3{
        color:#fff;
        text-align: center;
        line-height: 48px;
        font-size: 14px;
        font-weight: 400;
    }
}
</style>
