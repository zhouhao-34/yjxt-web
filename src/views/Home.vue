
<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 11:33:08
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-11-11 10:52:02
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
            :disabled="
              v.menu_id !== undefined &&
              (jurisdiction === undefined ||
                jurisdiction === null ||
                jurisdiction.indexOf(v.menu_id) === -1)
            "
            >{{ v.menu }}</el-menu-item
          >
          <el-submenu
            :index="v.id"
            v-else
            :disabled="
              v.menu_id !== undefined &&
              (jurisdiction === undefined ||
                jurisdiction === null ||
                jurisdiction.indexOf(v.menu_id) === -1)
            "
          >
            <template slot="title">{{ v.menu }}</template>
            <el-menu-item :index="x.id" v-for="(x, y) in v.submenu" :key="y">{{
              x.menu
            }}</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <div class="sign">
          <el-button v-if="user.User_Name === ''" type="text" @click="sign"
            >登录</el-button
          >
          <el-popover v-else placement="bottom" trigger="click">
            <div class="button">
              <el-button type="text" @click="signOut">退出登录</el-button>
            </div>
            <div
              slot="reference"
              :style="{ color: '#409EFF', cursor: 'pointer' }"
              class="User_Name"
            >
              {{ user.User_Name }}
            </div>
          </el-popover>
        </div> -->
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
          menu_id: "KLJDKCD99EC-b6b5b5-D8EB-47FC-96CE",
        },
        {
          menu: "设备保养管理",
          id: "2",
          menu_id: "999000D8D99EC-b6b5b5-D8EB-47FC-96CE",
        },
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
          menu_id: "kefvhegsb81-b6b5b5-D8EB-revf-85rd",
          submenu: [
            { menu: "设备配件", id: "9-1" },
            { menu: "入库记录", id: "9-2" },
            { menu: "出库记录", id: "9-3" },
          ],
        },
        { menu: "设置", id: "5" },
      ],
      user: {
        UserID: "",
        User_Name: "",
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
      jurisdiction: [],
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
  created() {
    this.jurisdiction = JSON.parse(sessionStorage.getItem("jurisdiction"));
    let user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      localStorage.setItem("user", JSON.stringify(this.user));
    } else {
      this.user = JSON.parse(user);
      console.log("this.user: ", this.user);
      console.log('this.user.UserID !== "": ', this.user.UserID !== "");
      if (this.user.User_Name !== "") {
        this.menuList[this.menuList.length - 1].menu = this.user.User_Name;
        this.menuList[this.menuList.length - 1].id = "5-1";
      } else {
        this.menuList[this.menuList.length - 1].menu = "设置";
        this.menuList[this.menuList.length - 1].id = "5";
      }
    }
  },
  mounted() {
    console.log("  this.user: ", this.user);
    setTimeout(() => {
      this.queryTreeData();
    }, 1000);
  },
  methods: {
    // 查询菜单
    async queryTreeData() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryTreeData();
      if (res.code === "1") {
        // 所有数据
        let arr = res.data;
        // 筛选出来的一级菜单
        let arr1 = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parentID === 0) {
            arr1.push({ ...arr[i] });
            arr.splice(i, 1);
            i--;
          }
        }
        for (let i = 0; i < arr1.length; i++) {
          let array = this.children(arr, arr1[i].menuID);
          if (array.length > 0) {
            arr1[i].children = array;
          }
        }
        sessionStorage.setItem("treeData", JSON.stringify(arr1));
      }
    },
    // 子级菜单分类
    children(arr, menuID) {
      if (arr.length === 0) {
        return [];
      }
      let array = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parentID === menuID) {
          array.push({ ...arr[i] });
        }
      }
      for (let i = 0; i < array.length; i++) {
        let array2 = this.children(arr, array[i].menuID);
        if (array2.length > 0) {
          array[i].children = array2;
        }
      }
      return array;
    },
    // eslint-disable-next-line no-unused-vars
    async handleSelect(key, keyPath) {
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
        // eslint-disable-next-line no-undef
        await frmKuchun.shezhi();
      }
      if (key === "5-1") {
        // eslint-disable-next-line no-undef
        await frmKuchun.shouye(JSON.stringify(this.user));
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
      let user = { User_Name: "" };
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
