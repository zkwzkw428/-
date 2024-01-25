<template>
  <div id="app">
    <!-- 路由组件显示出口 -->
    <!-- 匹配的路由显示在此 -->
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  created() {
    this.$store.commit('addMenu', this.$router) 
  }
}
</script>

<style lang="less">
  html,body,h3,p{
    margin: 0;
    padding: 0;
  }
</style>
