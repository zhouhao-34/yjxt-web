<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-07 11:11:14
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-27 10:36:06
 * @FilePath: \yjxt-web\src\components\dataList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dataList">
    <div class="dataList-left">
      <div class="addtree-button" v-if="!treeData.length > 0">
        <el-button type="primary" size="mini" @click="edit('2')"
          >新增主菜单</el-button
        >
      </div>
      <el-tree
        v-if="treeData.length > 0"
        ref="tree"
        :default-checked-keys="[1]"
        :data="treeData"
        default-expand-all
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="true"
        @node-click="handleNodeClick"
        node-key="menuID"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="img-text"
            ><img
              src="../assets/icon-13.png"
              alt=""
              v-if="data.menuType === 2"
            />
            <span> {{ node.label }}</span>
          </span>
          <div class="icon" @click.stop="iconClick(node)">
            <i class="el-icon-s-tools"></i>
            <div class="icon-menu" v-if="iconCheck === node.data.menuID">
              <div @click="edit('1', node, data)" v-if="data.menuType === 1">
                添加同级
              </div>
              <div @click="edit('2', node, data)" v-if="data.menuType === 1">
                添加子级
              </div>
              <div @click="edit('5', node, data)" v-if="data.menuType === 1">
                添加设备
              </div>
              <div @click="edit('3', node, data)">修改</div>
              <div @click="edit('4', node, data)">删除</div>
            </div>
          </div>
        </span>
      </el-tree>
    </div>
    <div class="dataList-right">
      <router-view style="height: 100%; width: 100%" />
    </div>
    <div class="lowerRight">
      <div
        class="button"
        v-if="journalShow"
        @click="journalShow = !journalShow"
      >
        <!-- <i class="el-icon-bell"></i> -->
        <el-button
          type="danger"
          icon="el-icon-bell"
          circle
          size="mini"
        ></el-button>
        设备报警消息
      </div>
      <div class="forms" v-else>
        <div class="forms-title">
          <div></div>
          <div style="text-align: center">设备报警消息</div>
          <div class="minimize" @click="journalShow = !journalShow">
            <i class="el-icon-minus"></i>
          </div>
        </div>
        <div class="journal">
          <div class="journal-left">
            <el-menu
              :default-active="radio"
              class="el-menu-vertical-demo"
              @select="queryAlarmLog"
            >
              <el-menu-item index="1">
                <!-- <i class="el-icon-document"></i> -->
                <img src="../assets/jinggao.png" alt="" srcset="" />&nbsp;&nbsp;
                <span slot="title">预警</span>
              </el-menu-item>
              <el-menu-item index="2">
                <!-- <i class="el-icon-setting"></i> -->
                <img src="../assets/weixian.png" alt="" />&nbsp;&nbsp;
                <span slot="title">报警</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="journal-right">
            <div class="forms-content">
              <div class="block" v-for="(v, i) in alarmLog" :key="i">
                <div class="block-left">
                  <img
                    v-if="v.manageType !== '报警'"
                    src="../assets/jinggao.png"
                    alt=""
                  />
                  <img v-else src="../assets/weixian.png" alt="" />
                </div>
                <div class="block-right">
                  <div class="timde">
                    <span>{{
                      v.manageType === "报警" ? "设备报警" : "设备预警"
                    }}</span>
                    <span> {{ v.manageCreateTime }}</span>
                  </div>
                  <div class="block-right-content">
                    <div class="content-left">
                      <img :src="v.imgPath" alt="" srcset="" />
                    </div>
                    <div class="content-right">
                      <div class="right-title">{{ v.menuName }}</div>
                      <div class="right-val">
                        <div class="right-val-left">
                          <div>
                            <span>设定寿命：</span>
                            {{ v.lifeValue }}{{ v.unit }}
                          </div>
                          <div>
                            <span>预警值：</span>
                            {{ v.yujingValue }}{{ v.unit }}
                          </div>
                        </div>
                        <div
                          class="right-val-right"
                          :style="{
                            color:
                              v.manageType === '预警' ? '#E6A23C' : '#F56C6C',
                          }"
                        >
                          <div>已使用</div>
                          <div>{{ v.DValue }}{{ v.unit }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="菜单修改"
      :visible.sync="menuDialog"
      :close-on-click-modal="false"
      width="400px"
    >
      <el-form :model="menuForm" size="mini" :rules="rules" ref="formName">
        <el-form-item label="父级菜单" label-width="100px" prop="menuID">
          <el-cascader
            style="width: 200px"
            clearable
            v-model="menuForm.menuID"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称" label-width="100px" prop="name">
          <el-input
            style="width: 200px"
            v-model="menuForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="menuUpClick('formName')"
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
    var validateMenuID = (rule, value, callback) => {
      if (this.menuForm.menuID === this.menuData.menuID) {
        callback(new Error("父级菜单不可是自身"));
      }
      let bool = true;
      if (
        this.menuData.children !== undefined &&
        this.menuData.children.length > 0
      ) {
        let arr = this.menuData.children;
        bool = this.boolmenu(this.menuForm.menuID, arr);
      }
      if (!bool) {
        callback(new Error("不可选择自身子级菜单作为父级"));
      }
      callback();
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入菜单名称"));
      }
      callback();
    };
    return {
      treeData: [],
      iconCheck: 0,
      maxID: 6,
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      treekey: 0,
      selectShow: false,
      nodeData: [],
      downgradeVal: "",
      journalShow: true,
      radio: "1",
      alarmLog: [],
      menuDialog: false,
      menuForm: {
        menuID: [],
        name: "",
      },
      equipmentNameOptions: [],
      cascaderProps: {
        children: "children",
        label: "menuName",
        checkStrictly: true,
        emitPath: false,
        value: "menuID",
      },
      rules: {
        menuID: [{ validator: validateMenuID, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
      menuNode: null,
      menuData: null,
      user: JSON.parse(localStorage.getItem("user")),
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
    this.queryTreeData();
    this.queryAlarmLog();
  },
  methods: {
    // 查询菜单
    async queryTreeData() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryTreeData();
      if (res.code === "1" && res.data.length > 0) {
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
        this.treeData = arr1;
        this.nodeData.push({
          label: this.treeData[0].menuName,
          menuID: this.treeData[0].menuID,
          menuType: this.treeData[0].menuType,
        });
        this.$store.commit("setNodeData", this.nodeData);
        console.log("this.treeData: ", this.treeData);
        this.equipmentNameOptions = arr1;
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
    handleNodeClick(data, node) {
      console.log("node: ", node);
      this.nodeData = [];
      this.obtainFatherNode(node);
      this.$store.commit("setNodeData", this.nodeData);
      this.iconCheck = 0;
    },
    iconClick(node) {
      console.log("node: ", node);
      if (this.iconCheck === node.data.menuID) {
        this.iconCheck = 0;
      } else {
        this.iconCheck = node.data.menuID;
      }
    },
    // 获取父节点
    obtainFatherNode(v) {
      if (v.level > 1) {
        this.obtainFatherNode(v.parent);
      }
      this.nodeData.push({
        label: v.data.menuName,
        menuID: v.data.menuID,
        menuType: v.data.menuType,
      });
    },
    async edit(v, node, data) {
      console.log("v, node, data: ", v, node, data);
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.userID === "") {
        this.$message({
          type: "warning",
          message: "请登录！",
        });
        return;
      }
      if (this.user.userType === 2) {
        this.$message({
          type: "warning",
          message: "权限不足",
        });
        return;
      }
      if (v === "2" || v === "1" || v === "5") {
        let text = v === "5" ? "设备" : "菜单";
        this.$prompt("请输入" + text + "名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValidator: (val) => {
            if (val === "" || val === null) {
              return text + "名称不可为空";
            }
            return true;
          },
        })
          .then(async ({ value }) => {
            let res = null;
            // eslint-disable-next-line no-undef
            res = await frmKuchun.menuAddChildren(
              value,
              node === undefined ? 0 : v === "1" ? 0 : node.data.menuID,
              v === "5" ? 2 : 1
            );
            console.log("res: ", res);
            if (res.code === "1" && res.data) {
              this.queryTreeData();
              this.$message({
                type: "success",
                message: "添加成功",
              });
            } else {
              this.$message({
                type: "info",
                message: res.data,
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
      if (v === "3") {
        console.log("node.parent.data.menuID: ", node.parent.data.menuID);
        if (node.parent.data.menuID !== undefined) {
          this.menuForm.menuID = node.parent.data.menuID;
        } else {
          this.menuForm.menuID = 0;
        }
        this.menuNode = node;
        this.menuData = data;
        this.menuForm.name = node.data.menuName;
        this.menuDialog = true;
      }
      if (v === "4") {
        this.$confirm("是否删除当前菜单", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = null;
            // eslint-disable-next-line no-undef
            res = await frmKuchun.menuDel(data.menuID);
            if (res.code === "1") {
              this.queryTreeData();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 修改菜单
    menuUpClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          console.log("this.menuForm", this.menuForm);
          console.log(this.menuData);
          // eslint-disable-next-line no-undef
          res = await frmKuchun.menuEdit(
            this.menuData.menuID,
            this.menuForm.menuID,
            this.menuForm.name,
            this.menuData.menuType
          );
          if (res.code === "1") {
            this.queryTreeData();
            this.menuDialog = false;
          }
        } else {
          return false;
        }
      });
    },
    boolmenu(id, list) {
      let bool = true;
      for (let i = 0; i < list.length; i++) {
        if (id === list[i].menuID) {
          return false;
        }
        if (list[i].children.length > 0) {
          bool = this.boolmenu(id, list[i].children);
        }
      }
      return bool;
    },
    onCommentInputChange() {
      this.downgradeVal = document.getElementById("select").value;
    },
    // 设备保养信息查询
    async queryAlarmLog(v) {
      if (v !== undefined) {
        this.radio = v;
      }

      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.proLogList(
        100,
        1,
        0,
        this.radio === "1" ? "预警" : this.radio === "2" ? "报警" : ""
      );
      for (let i = 0; i < res.data[1].length; i++) {
        res.data[1][i].manageCreateTime = this.filterTime(
          res.data[1][i].manageCreateTime
        );
        // eslint-disable-next-line no-undef
        let res1 = await frmKuchun.proEdit_list(res.data[1][i].proID);
        res.data[1][i].imgPath = res1.data[0].imgPath;
        // eslint-disable-next-line no-undef
        let res2 = await frmKuchun.getSysMenu(res.data[1][i].menuID);
        res.data[1][i].menuName = res2.join("/");
        res.data[1][i].type = "";
      }
      this.alarmLog = res.data[1];
    },
    // 时间转换
    filterTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    },
  },
};
</script>

<style lang="scss">
.dataList {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  display: flex;
  position: relative;
  .dataList-left {
    width: 300px;
    height: 100%;
    border-right: 1px solid #dcdfe6;
    padding: 20px;
    box-sizing: border-box;
    .addtree-button {
      text-align: right;
    }
    .el-tree {
      background: #ebeef5;
      position: relative;
      .el-dropdown {
        position: absolute;
        right: -20px;
      }
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        padding-right: 8px;
        .img-text {
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
          }
        }
        .icon {
          // position: relative;
          .icon-menu {
            position: absolute;
            right: 0px;
            background: #fff;
            padding: 15px 0px;
            border-radius: 5px;
            > div {
              width: 100px;
              padding: 5px 10px;
              box-sizing: border-box;
              color: #606266;
              padding-left: 10px;
            }
            > div:hover {
              background: #f2f6fc;
            }
          }
        }
      }
      .el-tree-node__expand-icon {
        font-size: 20px !important;
      }
      .el-tree-node__content {
        height: 40px !important;
      }
    }
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      // 设置颜色
      background-color: rgba(
        135,
        206,
        235,
        0.2
      ); // 透明度为0.2的skyblue，作者比较喜欢的颜色
      color: #409eff; // 节点的字体颜色
      font-weight: bold; // 字体加粗
    }
    .el-tree .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    .el-tree .el-icon-caret-right:before {
      content: "\e78a";
      font-size: 18px;
    }
    .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      content: "\e784";
      font-size: 18px;
    }
  }
  .dataList-right {
    width: calc(100% - 300px);
  }
  .lowerRight {
    position: absolute;
    bottom: 0px;
    right: 20px;
    z-index: 9999;
    .button {
      width: 200px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      background: #409eff;
      color: #fff;
      cursor: pointer;
    }
    .forms {
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      width: 900px;
      height: 700px;
      background: #f2f6fc;

      .forms-title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dcdfe6;
        height: 40px;
        align-items: center;
        padding: 0px 20px;
        .minimize {
          cursor: pointer;
          text-align: right;
        }
        > div {
          width: 33%;
        }
      }
      .journal {
        display: flex;
        height: calc(100% - 40px);
        .journal-left {
          width: 150px;
          height: 100%;
          .el-menu {
            height: 100%;
            .el-menu-item {
              img {
                width: 20px;
              }
              border-bottom: 1px solid #e4e7ed;
            }
          }
        }
        .journal-right {
          width: 750px;
          .forms-content {
            padding: 20px;
            box-sizing: border-box;
            height: calc(100% - 20px);
            overflow: auto;
            .el-radio-group {
              margin-bottom: 10px;
              width: 100%;
            }
            .block {
              display: flex;
              justify-content: space-between;
              margin: 20px 0px;
              .block-left {
                img {
                  width: 50px;
                  height: 50px;
                }
              }
              .block-right {
                width: calc(100% - 60px);
                .timde {
                  display: flex;
                  justify-content: space-between;
                }
                .block-right-content {
                  background: #fff;
                  border-radius: 10px;
                  padding: 20px;
                  display: flex;
                  justify-content: space-between;
                  .content-left {
                    display: flex;
                    align-items: center;
                    img {
                      width: 80px;
                      height: 80px;
                    }
                  }
                  .content-right {
                    width: calc(100% - 120px);
                    .right-title {
                      font-size: 16px;
                      font-weight: 600;
                    }
                    .right-val {
                      display: flex;
                      .right-val-left {
                        width: 70%;
                        font-size: 14px;
                        > div {
                          margin: 10px 0px;
                          > span {
                            display: inline-block;
                            width: 90px;
                            text-align: right;
                          }
                        }
                      }
                      .right-val-right {
                        width: 30%;
                        text-align: center;
                        font-size: 14px;
                        > div {
                          margin: 10px 0px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
