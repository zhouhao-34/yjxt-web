<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 10:47:01
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-25 11:36:03
 * @FilePath: \yjxt-web\src\components\alarmLog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="alarmLog" ref="alarmLog">
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
        <el-form-item label="状态">
          <el-select v-model="formInline.type" clearable placeholder="请选择">
            <el-option label="报警" value="报警"> </el-option>
            <el-option label="预警" value="预警"> </el-option>
          </el-select>
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
        <el-table-column label="操作" align="center" width="100">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.manageStatus === '是'"
              type="text"
              size="mini"
              @click="handleCommandTwo('2', scope.row)"
              >维保</el-button
            >
            <el-button
              :disabled="scope.row.manageStatus === '是'"
              type="text"
              size="mini"
              @click="handleCommandTwo('3', scope.row)"
              >更换</el-button
            >
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
    <dialogIndex
      ref="dialogIndex"
      :plcOption="plcOption"
      :handleForm="handleForm"
      :dialogTitle="dialogTitle"
      :form="form"
    ></dialogIndex>
  </div>
</template>

<script>
import dialogIndex from "../components/dialog/index.vue";
export default {
  name: "",
  components: {
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
      formInline: { menuID: [], type: "" },
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
        { label: "序号", prop: "MID", width: "50" },
        { label: "产线/设备", prop: "menuName" },
        { label: "保养内容", prop: "proName" },
        { label: "设定寿命", prop: "lifeValue" },
        { label: "预警值", prop: "yujingValue" },
        { label: "当前值", prop: "DValue" },
        { label: "单位", prop: "unit" },
        { label: "报警", prop: "manageType" },
        { label: "通知人", prop: "userName" },
        { label: "通知方式", prop: "type" },
        { label: "通知时间", prop: "manageCreateTime" },
        { label: "是否维保", prop: "manageStatus" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogTitle: "",
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
      handleForm: { notice: 0 },
      plcOption: [],
    };
  },
  computed: {
    refresh() {
      return this.$store.state.refresh;
    },
  },
  watch: {
    refresh: {
      immediate: true,
      deep: true,
      handler: function (v) {
        if (v.bool) {
          this.queryList();
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
    this.tableHeight = this.$refs.alarmLog.offsetHeight - 140;
    this.queryTreeData();
    this.queryList();
    this.queryUserList();
  },
  methods: {
    closedialog(name) {
      for (const key in this[name]) {
        if (key === "notice") {
          this[name][key] = [];
        } else {
          this[name][key] = "";
        }
      }
    },
    // 人员查询
    async queryUserList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryUserList();
      if (res.code === "1") {
        this.noticeOption = res.data;
      }
    },
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
      res = await frmKuchun.proLogList(
        this.pageSize,
        this.currentPage,
        this.formInline.menuID.length > 0
          ? this.formInline.menuID[this.formInline.menuID.length - 1]
          : 0,
        this.formInline.type
      );
      console.log("queryList: ", res);
      this.total = res.data[0]["0"];
      for (let i = 0; i < res.data[1].length; i++) {
        res.data[1][i].manageCreateTime = this.filterTime(
          res.data[1][i].manageCreateTime
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
      console.log("this.tableData: ", this.tableData);
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

    // 点击设备设置菜单
    async handleCommandTwo(key, v) {
      if (key === "2") {
        // this.handleDialogFormVisible = true;
        this.$refs.dialogIndex.handleDialogFormVisible = true;
        this.handleForm = JSON.parse(JSON.stringify(v));
        this.handleForm.menuValue = v.menuName;
        this.handleForm.menuValueID = v.menuID;
      }
      if (key === "3") {
        this.form = JSON.parse(JSON.stringify(v));
        this.form.notice = 0;
        this.form.menuValue = v.menuName;
        this.form.menuValueID = v.menuID;
        this.form.shopTime = this.form.shopTime + "";
        this.form.lifeValue = this.form.lifeValue + "";
        let res = null;
        // eslint-disable-next-line no-undef
        res = await frmKuchun.tuijianYJ(this.form.model, this.form.menuValueID);
        this.form.recommend = res.data;
        let res1 = null;
        // eslint-disable-next-line no-undef
        res1 = await frmKuchun.proEdit_list(this.form.proID);
        this.form.imgPath = res1.data[0].imgPath;
        this.form.shopTime = res1.data[0].shopTime;
        this.form.shopTimeType = res1.data[0].shopTimeType;
        this.form.plcSetUp = res1.data[0].plcListID;
        let res2 = null;
        // eslint-disable-next-line no-undef
        res2 = await frmKuchun.userList(this.form.proID);
        for (let i = 0; i < res2.data.length; i++) {
          this.form.notice.push(res2.data[i].userID);
        }
        this.dialogTitle = "更换设备";
        this.$refs.dialogIndex.dialogFormVisible = true;
      }
    },
    // 选中已有图片
    imgUrlClick(i) {
      this.form.imgPath = this.imgList[i];
    },
    // 选择自己上传图片
    async uploadClick() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.uploadImg();
      this.form.imgPath = res;
    },
    //维保提交
    async weibaoClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          let proList = [
            this.handleForm.proID,
            this.handleForm.lifeValue,
            this.handleForm.unit,
            this.handleForm.yujingValue,
            "已维保设备",
            this.handleForm.remarks,
            this.handleForm.MID,
          ];
          // eslint-disable-next-line no-undef
          res = await frmKuchun.listWeibaoAdd(proList, this.handleForm.notice);
          if (res.data) {
            this.handleDialogFormVisible = false;
            this.queryList();
          }
        } else {
          return false;
        }
      });
    },

    //设置plc按钮
    setUp() {
      this.setUpPlcDialog = true;
    },
    //添加、修改关闭的回调
    addFormClose(formName) {
      this.$refs[formName].resetFields();
      for (const key in this.form) {
        if (key === "notice") {
          this.form[key] = [];
        } else {
          this.form[key] = "";
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.alarmLog {
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
