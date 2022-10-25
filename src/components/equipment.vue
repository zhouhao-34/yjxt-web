<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-07 12:59:04
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-25 11:37:31
 * @FilePath: \yjxt-web\src\components\equipment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="equipment" ref="equipment">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v, i) in nodeData" :key="i">{{
        v.label
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs ref="tabs" v-model="activeName" type="border-card">
      <el-tab-pane label="图谱显示" name="first">
        <atlas
          ref="tab-first"
          v-if="activeName === 'first'"
          :containerHeight="containerHeight"
          :containerWidth="containerWidth"
          @handleCommandTwo="handleCommandTwo"
        ></atlas>
      </el-tab-pane>
      <el-tab-pane label="表格显示" name="second">
        <Table
          ref="tab-table"
          :tableHeight="containerHeight - 30"
          v-if="activeName === 'second'"
          @handleCommandTwo="handleCommandTwo"
        ></Table>
      </el-tab-pane>
    </el-tabs>
    <div class="add">
      <el-button
        type="primary"
        size="mini"
        @click="addEquipment"
        v-if="
          nodeData.length > 0 && nodeData[nodeData.length - 1].menuType === 2
        "
        >添加保养预警项</el-button
      >
    </div>
    <dialogIndex
      ref="dialogIndex"
      :plcOption="plcOption"
      :dialogTitle="dialogTitle"
      :form="form"
      :plcForm="plcForm"
    ></dialogIndex>
  </div>
</template>

<script>
import atlas from "../components/equipmentAssembly/atlas.vue";
import Table from "../components/equipmentAssembly/table.vue";
import dialogIndex from "../components/dialog/index.vue";
export default {
  name: "",
  components: {
    atlas,
    Table,
    dialogIndex,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      activeName: "first",
      containerHeight: 0,
      containerWidth: 0,
      tableData: [],
      tableHeader: [
        { label: "序号", prop: "proID", width: "50" },
        { label: "产线/设备", prop: "menuName" },
        { label: "保养内容", prop: "proName" },
        { label: "设定寿命", prop: "lifeValue" },
        { label: "预警值", prop: "yujingValue" },
        { label: "当前值", prop: "DValue" },
        { label: "单位", prop: "unit" },
        { label: "每天使用量（最近3天均值）", prop: "meitian" },
        { label: "剩余寿命（天）", prop: "surplusLife" },
        { label: "采购周期（天）", prop: "shopTime" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,

      // plc数据集合
      plcOption: [],
      // 添加、修改对话框标题
      dialogTitle: "添加保养预警项",
      // 添加、修改对话框开关
      dialogFormVisible: false,
      // 添加修改表单数据
      form: {
        menuValueID: "",
        brand: "",
        model: "",
        proName: "",
        lifeValue: "",
        unit: "",
        shopTime: "",
        shopTimeType: "",
        yujingValue: "",
        imgPath: "",
        plcSetUp: "",
        notice: 0,
        menuValue: "",
      },
      plcForm: {
        plcID: "",
        PLC_adress: "",
        PLC_addressType: "",
        addressLenth: "",
        chufa: "",
        where_PLC_address: "",
        where_tiaojian: "",
        where_content: "",
        returnVal: "",
        chuli: "",
        PLC_addressType1: "",
      },
      loading: null,
      timer: null,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  computed: {
    nodeData() {
      return this.$store.state.nodeData;
    },
  },
  watch: {
    nodeData: {
      immediate: true,
      deep: true,
      handler: function (v) {
        console.log(" nodeData", v);
        if (v.length > 0) {
          clearInterval(this.timer); //关闭
          console.log("关闭: ");
        }
      },
    },
  },
  created() {},
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: "正在查询",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
      this.loading.close();
    }, 30000);
    window.onresize = () => {
      return (() => {
        this.containerHeight = this.$refs.equipment.clientHeight - 40;
        this.containerWidth = this.$refs.equipment.clientWidth - 72;
      })();
    };
    this.containerHeight = this.$refs.equipment.clientHeight - 40;
    this.containerWidth = this.$refs.equipment.clientWidth - 72;
    this.queryPlc();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
      console.log("关闭: ");
    } //利用vue的生命周期函数
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    linefeed(h, { column, index }) {
      // column,index都是el-table中自带的
      let numble = "column.lable.length"; // 表头字数
      let size = 16; // 字体尺寸
      column.minWidth = numble * size; // 计算宽度
      return h("div", { class: "table-head", style: { width: "100%" } }, [
        column.lable,
      ]);
    },

    // 点击设备设置菜单
    async handleCommandTwo(key, v) {
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
      if (key === "1") {
        this.form = JSON.parse(JSON.stringify(v));
        let res = null;
        // eslint-disable-next-line no-undef
        res = await frmKuchun.proEdit_list(v.proID);
        console.log("res: ", res);
        this.form.plcSetUp = res.data[0].plcListID;
        this.form.plcListID = res.data[0].plcListID;
        let res1 = null;
        // eslint-disable-next-line no-undef
        res1 = await frmKuchun.userList(v.proID);

        this.form.notice = 0;
        for (let i = 0; i < res1.data.length; i++) {
          this.form.notice = res1.data[i].userID;
        }
        if (this.nodeData.length > 0) {
          this.form.menuValue = this.nodeData[this.nodeData.length - 1].label;
          this.form.menuValueID =
            this.nodeData[this.nodeData.length - 1].menuID;
        } else {
          this.form.menuValue = v.menuName;
          this.form.menuValueID = v.menuID;
        }
        if (this.form.unit !== "自然日") {
          // 查询plc数据
          let res2 = null;
          // eslint-disable-next-line no-undef
          res2 = await frmKuchun.plc_listList(this.form.plcListID * 1);
          console.log("this.form.plcListID: ", this.form);
          console.log("res2: ", res2);
          this.plcForm = res2.data[0];
          this.plcForm.chufa += "";
          this.plcForm.PLC_addressType1 = res2.data[0].where_PLC_addressType;
        }
        this.dialogTitle = "修改";
        this.$refs.dialogIndex.dialogFormVisible = true;
      }
      if (key === "4") {
        this.$confirm("是否删除当前设备", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = null;
            // eslint-disable-next-line no-undef
            res = await frmKuchun.proDel(v.proID);
            console.log("res: ", res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    closedialog(name) {
      for (const key in this[name]) {
        if (key === "notice") {
          this[name][key] = [];
        } else {
          this[name][key] = "";
        }
      }
    },
    // 添加保养预警项按钮
    addEquipment() {
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
      this.dialogTitle = "添加保养预警项";
      this.$refs.dialogIndex.dialogFormVisible = true;
      this.form.menuValue = this.nodeData[this.nodeData.length - 1].label;
      this.form.menuValueID = this.nodeData[this.nodeData.length - 1].menuID;
    },

    // 查询plc
    async queryPlc() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plcList();

      this.plcOption = res.data;
    },
  },
};
</script>

<style  lang="scss">
.equipment {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .add {
    position: absolute;
    top: 65px;
    z-index: 999;
    right: 40px;
  }
  .el-breadcrumb {
    height: 20px;
  }
  .el-tabs {
    margin-top: 20px;
    height: calc(100% - 40px);
    .el-tabs__content {
      height: calc(100% - 71px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .equipment-table {
    margin-top: 20px;
    height: calc(100% - 20px);
    .pagination {
      margin-top: 20px;
      padding-right: 230px;
    }
  }
}
</style>
