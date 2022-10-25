
<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 11:33:08
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-24 19:38:58
 * @FilePath: \yjxt-web\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="Home">
    <div class="menu">
      <div class="menu-item">
        <span class="title">大型冲床预警系统</span>
      </div>
      <div class="right">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          background-color="#1E1E1E"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item
            :index="v.id"
            v-for="(v, i) in menuList"
            :key="i"
            v-if="!v.submenu"
            :disabled="v.menu === '设置' && user.userID !== 1"
            >{{ v.menu }}</el-menu-item
          >
          <el-submenu :index="v.id" v-else>
            <template slot="title">{{ v.menu }}</template>
            <el-menu-item :index="x.id" v-for="(x, y) in v.submenu" :key="y">{{
              x.menu
            }}</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="sign">
          <el-button v-if="user.userName === ''" type="text" @click="sign"
            >登录</el-button
          >
          <el-popover v-else placement="bottom" trigger="click">
            <div class="button">
              <el-button type="text" @click="signOut">退出登录</el-button>
            </div>
            <div
              slot="reference"
              :style="{ color: '#409EFF', cursor: 'pointer' }"
              class="userName"
            >
              {{ user.userName }}
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <router-view :key="historyKey" style="height: calc(100% - 60px)" />
    <el-dialog
      title="登录"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="400px"
      @close="dialogClose('ruleForm')"
    >
      <el-form :model="form" :rules="rules" size="mini" ref="ruleForm">
        <el-form-item label="用户名" label-width="100px" prop="user">
          <el-input v-model="form.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input
            v-model="form.password"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogClick('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      historyKey: 0,
      //选中的菜单
      activeIndex: "8",
      // 菜单列表
      menuList: [
        { menu: "看板", id: "8" },
        { menu: "总览", id: "1" },
        {
          menu: "模具管理",
          id: "10",
        },
        { menu: "设备保养管理", id: "2" },
        {
          menu: "设备预警信息",
          id: "4",
        },
        {
          menu: "设备/模具保养",
          id: "12",
          submenu: [
            { menu: "模具保养记录", id: "11" },
            { menu: "设备保养记录", id: "14" },
          ],
        },
        {
          menu: "设备/模具维修",
          id: "13",
          submenu: [
            { menu: "模具维修记录", id: "15" },
            { menu: "设备维修记录", id: "16" },
          ],
        },
        {
          menu: "配件库存管理",
          id: "9",
          submenu: [
            { menu: "设备配件", id: "9-1" },
            { menu: "入库记录", id: "9-2" },
            { menu: "出库记录", id: "9-3" },
          ],
        },
        { menu: "设置", id: "5" },
      ],
      user: {
        userID: "",
        userName: "",
      },
      dialogFormVisible: false,
      form: {
        user: "",
        password: "",
      },
      rules: {
        user: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        password: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
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
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      localStorage.setItem("user", JSON.stringify(this.user));
    } else {
      this.user = user;
    }
    console.log("  this.user: ", this.user);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      if (key !== null) {
        this.activeIndex = key;
      }
      if (key === "1") {
        this.$router.push({ path: "/overview", query: {} });
      }
      if (key === "2") {
        this.$store.commit("setNodeData", []);
        this.$router.push({ path: "/dataList/", query: {} });
      }
      if (key === "3") {
        this.$router.push({ path: "/troubleshooting/", query: {} });
      }
      if (key === "4") {
        this.$router.push({ path: "/alarmLog/", query: {} });
      }
      if (key === "5") {
        this.$router.push({ path: "/systemSettings/", query: {} });
      }
      if (key === "6") {
        this.$router.push({ path: "/1", query: {} });
      }
      if (key === "7") {
        this.$router.push({ path: "/2", query: {} });
      }
      if (key === "8") {
        this.$router.push({ path: "/", query: {} });
      }
      if (key === "9-1") {
        this.$router.push({ path: "/warehouse", query: {} });
      }
      if (key === "9-2") {
        this.$router.push({ path: "/cangkuIn", query: {} });
      }
      if (key === "9-3") {
        this.$router.push({ path: "/cangkuOut", query: {} });
      }
      if (key === "10") {
        this.$router.push({ path: "/moidManagement", query: {} });
      }
      if (key === "11") {
        this.$router.push({ path: "/mouldRecord", query: { type: "保养" } });
        this.historyKey++;
      }
      if (key === "15") {
        this.$router.push({ path: "/mouldRecord", query: { type: "维修" } });
        this.historyKey++;
      }
      if (key === "14") {
        this.$router.push({
          path: "/troubleshooting",
          query: { type: "保养" },
        });
        this.historyKey++;
      }
      if (key === "16") {
        this.$router.push({
          path: "/troubleshooting",
          query: { type: "维修" },
        });
        this.historyKey++;
      }
    },
    sign() {
      this.dialogFormVisible = true;
    },
    dialogClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.login(this.form.user, this.form.password);
          console.log("res: ", res);
          if (res.length > 0) {
            let user = res[0];
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: "账号或密码错误",
              type: "warning",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dialogClose(formName) {
      this.$refs[formName].resetFields();
    },
    signOut() {
      if (this.activeIndex === "5") {
        this.activeIndex = "8";
        this.handleSelect("8");
      }
      let user = { userName: "" };
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(this.activeIndex);
    },
  },
};
</script>

<style  lang="scss">
.Home {
  height: 100%;
  width: 100%;
  background-image: url("../assets/beijing.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #1e1e1e;
    .menu-item {
      color: #fff;
      margin-left: 20px;
      .title {
        font-size: 18px;
        font-weight: 600;
      }
    }
    .right {
      display: flex;
      .el-menu-demo {
        border: 0px;
      }
      .sign {
        margin: 0px 30px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.el-popover {
  padding: 0px !important;
  .button {
    text-align: center;
  }
}
</style>
