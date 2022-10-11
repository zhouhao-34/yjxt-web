<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-10 16:59:29
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-10 16:59:34
 * @FilePath: \yjxt-web\src\components\bulletinBoard\title.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="title">
    <div class="logo"><img src="../../assets/Logo.jpg" alt="" /></div>
    <div>大型冲床生产管理看板</div>
    <div style="width: 300px" class="img">
      <!-- <img
        v-for="(v, i) in menuItems"
        :key="i"
        :src="v.src"
        alt=""
        @click="clickMenu(v.name)"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      menuItems: [
        //name和src必填，且name唯一否则会报错
        { name: "sign", label: "登录", src: require("../../assets/电脑.png") },
        {
          name: "modelList",
          label: "所有型号信息",
          src: require("../../assets/齿轮.png"),
        },
        {
          name: "plan",
          label: "当前计划",
          src: require("../../assets/计划.png"),
        },
        // { name: "plan", label: "当前计划", src: require("./assets/plan.png") },
        {
          name: "shiftSchedule",
          label: "班次",
          src: require("../../assets/表.png"),
        },
        {
          name: "dataQuery",
          label: "数据查询",
          src: require("../../assets/放大镜.png"),
        },
      ],
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {
    //console.log(v);
    //}
    //}
  },
  created() {},
  mounted() {},
  methods: {
    clickMenu(v) {
      this.$router.push({ path: "/" + v });
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .logo {
    width: 200px;
    height: 80px;
    text-align: center;
    img {
      width: 200px;
    }
  }
  .img {
    display: flex;
    justify-content: space-around;
    img {
      width: 40px;
      cursor: pointer;
    }
  }
}
</style>
