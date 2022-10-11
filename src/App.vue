<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 11:32:24
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-27 13:29:04
 * @FilePath: \yjxt-web\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view />
    <earlyWarning v-if="earlyWarningShow" id="earlyWarning"></earlyWarning>
  </div>
</template>
<script>
import earlyWarning from "./components/earlyWarning.vue";
export default {
  name: "",
  components: {
    earlyWarning,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {};
  },
  computed: {
    earlyWarningShow() {
      console.log(1111);
      return this.$store.state.earlyWarningShow;
    },
  },
  watch: {
    // earlyWarningShow(val) {
    //
    // },
  },
  created() {
    window.warning = this.warning;
  },
  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      frmKuchun.start();
    }, 1000);
  },
  methods: {
    warning(v) {
      console.log("v: ", v);
      this.$store.commit("setEarlyData", JSON.parse(v));
      this.$store.commit("setEarlyWarningShow", true);
    },
  },
};
</script>
<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  height: 100%;
  font-size: 14px;
  min-width: 1280px;
  min-height: 720px;
}
#earlyWarning {
  position: absolute;
  top: 0px;
}
.ellipsis {
  text-overflow: -o-ellipsis-lastline;
  /* //溢出内容隐藏 */
  overflow: hidden;
  /* //文本溢出部分用省略号表示 */
  text-overflow: ellipsis;
  /* //特别显示模式 */
  display: -webkit-box;
  /* //行数 */
  -webkit-line-clamp: 2;
  line-clamp: 2;
  /* //盒子中内容竖直排列 */
  -webkit-box-orient: vertical;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  /* display: none; */
  width: 7px;
  height: 7px;
  background-color: Transparent;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #909399;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
