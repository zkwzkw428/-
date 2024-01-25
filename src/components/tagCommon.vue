<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      size="samll"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    // 点击tag跳转的功能
    changeMenu(item) {
      // 判断当前路径是否与所跳转路径一致
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
    },
    // 点击tag删除的功能
    handleClose(item, index) {
      console.log(item, index);
      this.closeTag(item);
      const length = this.tags.length - 1;
      // 删除之后的逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      // 表示删除最后一项
      if (index === length) {
        this.$router.push({
          name: item[index -1].name
        })
      } else {
        this.$router.push({
          name: item[index + 1].name
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
