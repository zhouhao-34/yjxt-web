<template>
  <div class="viewing" ref="viewing">
    <div class="viewing-form">
      <el-form
        :inline="true"
        size="mini"
        :model="viewingForm"
        class="demo-form-inline"
      >
        <el-form-item label="生产型号">
          <el-input
            v-model="viewingForm.model"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="viewingForm.pandTime"
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
      viewingForm: {
        model: "",
        pandTime: ["", ""],
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "班次", prop: "ShiftName" },
        { label: "生产型号", prop: "ModelName" },
        { label: "计划产量", prop: "PlanNumber" },
        { label: "单项产量", prop: "Single" },
        { label: "换模次数", prop: "ChangeNumber" },
        { label: "型号名称", prop: "ModelName" },
        { label: "目标产量", prop: "Target" },
        { label: "产量差异", prop: "Differences" },
        { label: "保存时间", prop: "Datetime" },
        { label: "完成率", prop: "completion" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
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
    this.tableHeight = this.$refs.viewing.offsetHeight - 80;
    this.queryList();
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
      // eslint-disable-next-line no-undef
      res = await frmKuchun.dataSaveList(
        this.pageSize,
        this.currentPage - 1,
        this.viewingForm.pandTime[0],
        this.viewingForm.pandTime[1],
        this.viewingForm.model
      );
      console.log("查询列表: ", res);
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
          this.tableData[i].Datetime = this.filterTime(
            this.tableData[i].Datetime
          );
          this.tableData[i].completion =
            (
              (this.tableData[i].Actual / this.tableData[i].Target) *
              100
            ).toFixed(0) + "%";
        }
      }
      this.loading.close();
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

<style scoped lang="scss">
.viewing {
  .viewing-form {
    margin-top: 5px;
  }
  .systemSettings-table {
    width: 100%;
    position: relative;
    .pagination {
      text-align: right;
      margin-top: 10px;
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