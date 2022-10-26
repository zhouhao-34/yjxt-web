<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-31 12:35:30
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 10:52:59
 * @FilePath: \yjxt-web\src\components\cangkuOut.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cangkuOut" ref="cangkuOut">
    <div>
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="产品名称：">
          <el-input
            v-model="formInline.productName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称：">
          <el-input
            v-model="formInline.bandName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号名称：">
          <el-input
            v-model="formInline.modelName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
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
    </div>
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
      formInline: {
        productName: "",
        bandName: "",
        modelName: "",
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "编号", prop: "ckcID" },
        { label: "产品名称", prop: "productName" },
        { label: "品牌", prop: "bandName" },
        { label: "型号", prop: "modelName" },
        { label: "出库存数量", prop: "outNub" },
        { label: "出库时间", prop: "outTime" },
        { label: "操作人", prop: "userName" },
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
    //console.log(v);
    //}
    //}
  },
  created() {},
  mounted() {
    this.tableHeight = this.$refs.cangkuOut.offsetHeight - 120;
    this.queryList();
  },
  methods: {
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
      res = await frmKuchun.cangkuOutList(
        this.formInline.productName,
        this.formInline.bandName,
        this.formInline.modelName,
        this.pageSize,
        this.currentPage - 1
      );
      console.log("res: ", res);
      this.total = res.data[0]["0"];
      this.tableData = res.data[1];
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].outTime = this.filterTime(this.tableData[i].outTime);
      }
      this.loading.close();
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
  },
};
</script>

<style scoped lang="scss">
.cangkuOut {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  padding: 20px;
  position: relative;
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
