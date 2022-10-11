<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 10:21:06
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-08 15:55:05
 * @FilePath: \yjxt-web\src\components\troubleshooting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="troubleshooting" ref="troubleshooting">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产线/设备">
          <el-cascader
            clearable
            v-model="formInline.menuID"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
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
      formInline: { menuID: [] },
      equipmentNameOptions: [],
      cascaderProps: {
        children: "children",
        label: "menuName",
        checkStrictly: true,
        value: "menuID",
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "序号", prop: "CLID", width: "50" },
        { label: "产线/设备", prop: "menuName" },
        { label: "保养内容", prop: "proName" },
        { label: "设置寿命", prop: "lifeValue" },
        { label: "预警值", prop: "yujingValue" },
        { label: "当前值", prop: "DValue" },
        { label: "单位", prop: "unit" },
        { label: "处理方式", prop: "typeCL" },
        { label: "设置预警值", prop: "yujingValue" },
        { label: "处理人", prop: "userName" },
        { label: "处理时间", prop: "createTimeCL" },
        { label: "备注", prop: "mark" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {0
    //
    //}
    //}
  },
  created() {},
  mounted() {
    this.tableHeight = this.$refs.troubleshooting.offsetHeight - 140;
    this.queryTreeData();
    this.queryList();
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
        this.equipmentNameOptions = arr1;
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
    async queryList() {
      let res = null;
      this.tableData = [];

      // eslint-disable-next-line no-undef
      res = await frmKuchun.proLogListCL(
        this.pageSize,
        this.currentPage,
        this.formInline.menuID.length > 0
          ? this.formInline.menuID[this.formInline.menuID.length - 1]
          : 0
      );

      this.total = res.data[0]["0"];
      for (let i = 0; i < res.data[1].length; i++) {
        res.data[1][i].createTimeCL = this.filterTime(
          res.data[1][i].createTimeCL
        );
        // eslint-disable-next-line no-undef
        let res2 = await frmKuchun.getSysMenu(res.data[1][i].menuID);
        res.data[1][i].menuName = res2.join("/");
        res.data[1][i].type = "";
        // eslint-disable-next-line no-undef
        let res3 = await frmKuchun.manageSendList(res.data[1][i].MID);
        for (let y = 0; y < res3.length; y++) {
          if (res.data[1][i].type.indexOf(res3[y].type) === -1) {
            res.data[1][i].type += res3[y].type + " ";
          }
          res.data[1][i].userName = "";
          // eslint-disable-next-line no-undef
          let res4 = await frmKuchun.userList_U(res3[y].userID);
          for (let x = 0; x < res4.length; x++) {
            if (res.data[1][i].userName.indexOf(res4[x].type) === -1) {
              res.data[1][i].userName += res4[x].userName + " ";
            }
          }
        }
      }
      this.tableData = res.data[1];
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
      this.currentPage = 1;
      this.pageSize = val;
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
.troubleshooting {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  padding: 20px;
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
