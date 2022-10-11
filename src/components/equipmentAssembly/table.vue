<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-11 14:12:57
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-07 09:44:43
 * @FilePath: \yjxt-web\src\components\equipmentAssembly\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table" id="table">
    <el-table
      :key="tableHeight"
      :height="tableHeight - 120"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :prop="v.prop"
        :label="v.label"
        :width="v.width"
        v-for="(v, i) in tableHeader"
        :key="i"
        align="center"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template slot="header" slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{ v.label }}</span>
            <div
              slot="reference"
              style=" 120px;padding: 0px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;"
            >
              <span>{{ v.label }}</span>
            </div>
          </el-popover>
        </template>
        <template slot-scope="scope">
          <div class="ellipsis" :title="scope.row[v.prop]">
            {{ scope.row[v.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleCommand('1', scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handleCommand('4', scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <dialogIndex
      ref="dialogIndex"
      :plcOption="plcOption"
      :dialogTitle="dialogTitle"
      :form="form"
    ></dialogIndex>
  </div>
</template>

<script>
import dialogIndex from "../../components/dialog/index.vue";
export default {
  name: "",
  components: {
    dialogIndex,
  },
  props: {
    tableHeight: {
      type: Number,
    },
  },
  data() {
    return {
      tableData: [],
      tableHeader: [
        { label: "序号", prop: "proID", width: "50" },
        { label: "保养内容", prop: "proName" },
        { label: "设定寿命", prop: "lifeValue" },
        { label: "预警值", prop: "yujingValue" },
        { label: "当前值", prop: "DValue" },
        { label: "单位", prop: "unit" },
        { label: "每天使用量（最近3天均值）", prop: "meitian" },
        { label: "剩余寿命（天）", prop: "surplusLife" },
        { label: "采购周期（天）", prop: "shopTime" },
        { label: "当前寿命", prop: "currentLife" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,

      // 人员下拉数据集合
      noticeOption: [],
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
        notice: [],
        menuValue: "",
      },
      loading: null,
      timer: null,
    };
  },
  computed: {
    nodeData() {
      return this.$store.state.nodeData;
    },
    refresh() {
      return this.$store.state.refresh;
    },
  },
  watch: {
    nodeData: {
      immediate: true,
      deep: true,
      handler: function (v) {
        if (v.length > 0) {
          this.equipmentConditionQuery(v[v.length - 1].menuID);
        }
      },
    },
    refresh: {
      immediate: true,
      deep: true,
      handler: function (v) {
        if (v.bool) {
          this.equipmentConditionQuery(
            this.nodeData[this.nodeData.length - 1].menuID
          );
          if (v.name !== "") {
            for (const key in this[v.name]) {
              if (key === "notice") {
                this[v.name][key] = [];
              } else {
                this[v.name][key] = "";
              }
            }
          }
          this.$store.commit("setrefresh", { bool: false, name: "" });
        }
      },
    },
  },
  created() {},
  mounted() {
    this.timer = setInterval(() => {
      this.equipmentConditionQuery(
        this.nodeData[this.nodeData.length - 1].menuID
      );
    }, 60000);
    this.equipmentConditionQuery(
      this.nodeData[this.nodeData.length - 1].menuID
    );
    this.queryPlc();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    } //利用vue的生命周期函数
  },
  methods: {
    // 查询plc
    async queryPlc() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plcList();

      this.plcOption = res.data;
    },
    // 根据菜单id查设备
    async equipmentConditionQuery(menuID) {
      this.loading = this.$loading({
        lock: true,
        text: "正在查询",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        this.loading.close();
      }, 30000);
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryEquipmentCondition(
        menuID,
        this.currentPage - 1,
        this.pageSize
      );
      this.total = res.data[0]["0"];

      if (res.code === "1") {
        for (let i = 0; i < res.data[1].length; i++) {
          res.data[1][i].surplusLife =
            res.data[1][i].lifeValue - res.data[1][i].DValue > 0
              ? res.data[1][i].meitian > 0
                ? (
                    (res.data[1][i].lifeValue - res.data[1][i].DValue) /
                    res.data[1][i].meitian
                  ).toFixed(1)
                : "/"
              : "寿命已尽";
        }
        this.tableData = res.data[1];
      }
      this.loading.close();
    },
    // 点击设备设置菜单
    async handleCommand(key, v) {
      if (key === "1") {
        this.form = JSON.parse(JSON.stringify(v));
        let res = null;
        // eslint-disable-next-line no-undef
        res = await frmKuchun.proEdit_list(v.proID);
        this.form.plcSetUp = res.data[0].plcListID;
        let res1 = null;
        // eslint-disable-next-line no-undef
        res1 = await frmKuchun.userList(v.proID);

        this.form.notice = [];
        for (let i = 0; i < res1.data.length; i++) {
          this.form.notice.push(res1.data[i].userID);
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
            this.equipmentConditionQuery(v[v.length - 1].menuID);
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

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.equipmentConditionQuery(
        this.nodeData[this.nodeData.length - 1].menuID
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.equipmentConditionQuery(
        this.nodeData[this.nodeData.length - 1].menuID
      );
    },
  },
};
</script>

<style  lang="scss">
.table {
  width: 100%;
  height: 100%;
  .pagination {
    margin-top: 10px;
  }
}
</style>
