<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 12:42:28
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-14 16:18:35
 * @FilePath: \yjxt-web\src\components\systemSettings.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="systemSettings" ref="systemSettings">
    <div class="systemSettings-left">
      <el-menu
        @select="menuSelect"
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        background-color="#ebeef5"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">设置PLC</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span slot="title">账号管理</span>
        </el-menu-item>
        <el-submenu index="8">
          <template slot="title">
            <div><i class="el-icon-data-board"></i> 看板设置</div>
          </template>
          <el-menu-item index="3">
            <i class="el-icon-copy-document"></i>
            <span slot="title">型号管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-date"></i>
            <span slot="title">班次管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-edit"></i>
            <span slot="title">生产计划管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-document-copy"></i>
            <span slot="title">每日看板数据</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">看板固定读取</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="systemSettings-right">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(v, i) in breadcrumbList" :key="i">{{
            v.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view style="height: calc(100% - 20px); width: 100%" />
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
      menuActive: "1",
      breadcrumbList: [{ label: "设置" }, { label: "设置PLC" }],
      dialogFormVisible: false,
      dialogTitle: "看板固定读取设置",
      dialogForm: {},
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {
    //
    //}
    //}
  },
  created() {},
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    menuSelect(v, val) {
      if (v === "1") {
        this.breadcrumbList[1].label = "设置PLC";
        this.$router.push({ path: "/systemSettings/", query: {} });
      }
      if (v === "2") {
        this.breadcrumbList[1].label = "账号管理";
        this.$router.push({ path: "/systemSettings/user", query: {} });
      }
      if (v === "3") {
        this.breadcrumbList[1].label = "型号管理";
        this.$router.push({ path: "/systemSettings/model", query: {} });
      }
      if (v === "4") {
        this.breadcrumbList[1].label = "班次管理";
        this.$router.push({ path: "/systemSettings/classes", query: {} });
      }
      if (v === "5") {
        this.breadcrumbList[1].label = "生产计划管理";
        this.$router.push({ path: "/systemSettings/production", query: {} });
      }
      if (v === "6") {
        this.breadcrumbList[1].label = "每日看板数据查询";
        this.$router.push({ path: "/systemSettings/viewing", query: {} });
      }
      if (v === "7") {
        this.breadcrumbList[1].label = "看板固定读取";
        this.$router.push({ path: "/systemSettings/read", query: {} });
      }
    },
  },
};
</script>

<style  lang="scss">
.systemSettings {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  display: flex;
  .systemSettings-left {
    width: 210px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    box-sizing: border-box;
  }
  .systemSettings-right {
    width: calc(100% - 210px);
    padding: 20px;
  }
}
</style>
