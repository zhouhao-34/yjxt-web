<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-19 13:02:46
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 10:47:55
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\production.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="production" ref="production">
    <div class="production-form">
      <el-form
        :inline="true"
        size="mini"
        :model="productionForm"
        class="demo-form-inline"
      >
        <el-form-item label="生产型号">
          <el-input
            v-model="productionForm.model"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="productionForm.pandTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="systemSettings-table">
      <div class="add">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="adduser"
          >新增生产计划</el-button
        >
      </div>
      <el-table
        :key="tableHeight"
        :height="tableHeight"
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
          <template slot-scope="scope">
            <div class="ellipsis" :title="scope.row[v.prop]">
              {{ scope.row[v.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <!--  eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="upDatauser(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deleteData(scope.row.planID)"
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
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="dialogClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogForm"
        size="mini"
        ref="userForm"
        :rules="userFormRules"
      >
        <el-form-item label="班次名称" label-width="120px" prop="ShiftName">
          <el-select
            style="width: 200px"
            v-model="dialogForm.ShiftName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ShiftNameOptions"
              :key="item.shiftID"
              :label="item.ShiftName"
              :value="item.ShiftName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产型号" label-width="120px" prop="modelID">
          <el-select
            style="width: 200px"
            v-model="dialogForm.modelID"
            placeholder="请选择"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.modelID"
              :label="item.PLC_modelID + ' - ' + item.ModelName"
              :value="item.modelID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划产量" label-width="120px" prop="planNub">
          <el-input-number
            style="width: 200px"
            v-model="dialogForm.planNub"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="计划生产日期" label-width="120px" prop="pandTime">
          <el-date-picker
            style="width: 200px"
            v-model="dialogForm.pandTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClick('userForm')"
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
      productionForm: {
        model: "",
        pandTime: ["", ""],
      },
      options: [],
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "班次", prop: "Shift" },
        { label: "生产型号", prop: "ModelName" },
        { label: "计划产量", prop: "Planproduction" },
        { label: "实际产量", prop: "ActualProduction" },
        { label: "开始时间", prop: "startTime" },
        { label: "结束时间", prop: "endTime" },
        { label: "计划生产日期", prop: "planTime" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,

      ShiftNameOptions: [],
      modelOptions: [],
      dialogFormVisible: false,
      dialogTitle: "新增生产计划",
      dialogForm: {},
      userFormRules: {
        ShiftName: [
          {
            required: true,
            message: "班次名称不能为空",
            trigger: "blur",
          },
        ],
        modelID: [
          {
            required: true,
            message: "生产型号不能为空",
            trigger: "blur",
          },
        ],
        planNub: [
          {
            required: true,
            message: "计划产量不能为空",
            trigger: "blur",
          },
        ],
        actualNub: [
          {
            required: true,
            message: "实际产量不能为空",
            trigger: "blur",
          },
        ],
        pandTime: [
          {
            required: true,
            message: "计划生产日期不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: null,
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
    this.loading = this.$loading({
      lock: true,
      text: "正在查询",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    setTimeout(() => {
      this.loading.close();
    }, 30000);
    this.tableHeight = this.$refs.production.offsetHeight - 80;
    this.queryList();
    this.queryShiftName();
    this.queryModel();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    // 查询列表
    async queryList() {
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
      console.log("this.productionForm", this.productionForm);
      // eslint-disable-next-line no-undef
      res = await frmKuchun.planList(
        this.pageSize,
        this.currentPage - 1,
        this.productionForm.pandTime[0],
        this.productionForm.pandTime[1],
        this.productionForm.model
      );
      console.log("查询列表: ", res);
      this.loading.close();
      if (res.code === "1") {
        this.tableData = res.data[1];
        this.total = res.data[0][0];
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].createTime = this.filterTime(
            this.tableData[i].createTime
          );
          this.tableData[i].planTime = this.filterTime(
            this.tableData[i].planTime
          );
          this.tableData[i].startTime = this.filterTime(
            this.tableData[i].startTime
          );
          this.tableData[i].endTime = this.filterTime(
            this.tableData[i].endTime
          );
        }
      }
    },
    // 时间转换
    filterTime(time) {
      if (time === undefined || time === null) {
        return null;
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // var h = date.getHours();
      // h = h < 10 ? "0" + h : h;
      // var minute = date.getMinutes();
      // minute = minute < 10 ? "0" + minute : minute;
      // var s = date.getSeconds();
      // s = s < 10 ? "0" + s : s;
      return y + "-" + m + "-" + d;
    },
    // 查询班次
    async queryShiftName() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.shiftListTwo();
      console.log("res: ", res);
      if (res.code === "1") {
        this.ShiftNameOptions = res.data;
      }
    },
    // 查询型号
    async queryModel() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.modelListTwo("");
      console.log("res: ", res);
      if (res.code === "1") {
        this.modelOptions = res.data;
      }
    },
    adduser() {
      this.dialogTitle = "新增生产计划";
      this.dialogFormVisible = true;
    },
    upDatauser(v) {
      this.dialogForm = {
        ShiftName: v.Shift,
        modelID: v.ModelID,
        planNub: v.Planproduction,
        actualNub: v.ActualProduction,
        pandTime: v.planTime,
        planID: v.planID,
      };
      this.dialogTitle = "修改生产计划";
      this.dialogFormVisible = true;
    },
    async addClick(formName) {
      console.log("formName: ", formName);
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.loading = this.$loading({
            lock: true,
            text: "正在查询",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          if (this.dialogTitle === "新增生产计划") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.planAdd(
              this.dialogForm.ShiftName,
              this.dialogForm.modelID,
              this.dialogForm.planNub * 1,
              0,
              this.dialogForm.pandTime
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.planEdit(
              this.dialogForm.ShiftName,
              this.dialogForm.modelID,
              this.dialogForm.planNub * 1,
              this.dialogForm.actualNub * 1,
              this.dialogForm.pandTime,
              this.dialogForm.planID
            );
          }
          if (res.code === "1" && res.data === "成功") {
            this.dialogFormVisible = false;
            this.queryList();
          } else {
            this.dialogFormVisible = false;
            this.$message({
              message: res.data,
              type: "warning",
            });
            this.loading.close();
          }
          console.log("res: ", res);
        } else {
          return false;
        }
      });
    },
    dialogClose() {
      this.dialogForm = {};
    },
    async deleteData(v) {
      this.$confirm("是否删除当前数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.planDel(v);
          console.log("res: ", res);
          if (res.data === true) {
            this.queryList();
          } else {
            this.$message({
              message: res.data,
              type: "warning",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.production {
  .production-form {
    margin-top: 5px;
  }
  .systemSettings-table {
    width: 100%;
    position: relative;
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
    .add {
      position: absolute;
      right: 0px;
      top: -45px;
    }
  }
  .el-dialog {
    .el-form {
      .el-input {
        width: 200px;
      }
    }
  }
}
</style>
