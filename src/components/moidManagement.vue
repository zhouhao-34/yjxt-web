<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-31 13:05:57
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-16 10:25:11
 * @FilePath: \yjxt-web\src\components\moidManagement.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="moidManagement" ref="moidManagement">
    <div class="button">
      <el-button @click="addClick" type="primary">添加模具</el-button>
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
        <el-table-column label="操作" align="center" width="200">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="weihu(scope.row)"
              >维护</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="scope.row.ckNub * 1 <= 0"
              @click="modify(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="scope.row.ckNub * 1 > 0"
              @click="deleteData(scope.row.mjID)"
              >删除</el-button
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
    <el-dialog
      class="addmodel"
      @close="dialogClose"
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" size="mini" :rules="rules" ref="ruleForm">
        <el-form-item label="模具名称" label-width="100px" prop="mojuName">
          <el-input
            style="width: 300px"
            v-model="form.mojuName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="设定寿命" label-width="100px" prop="liftNub">
          <el-input
            style="width: 300px"
            v-model="form.liftNub"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="适用型号" label-width="100px" prop="modelList">
          <div
            class="applymodel"
            style="
              width: 300px;
              border: 1px solid #c0c4cc;
              border-radius: 4px;
              padding: 3px;
              box-sizing: border-box;
              min-height: 60px;
            "
          >
            <div
              v-for="(v, i) in modelSelect"
              :key="i"
              class="applymodel-block"
            >
              {{ v.modelName }}
              <i class="el-icon-close cloce" @click="deleteModel(i)"></i>
            </div>
          </div>
          <el-button @click="addModel">添加型号</el-button>
          <!-- <el-select
            v-model="form.modelList"
            filterable
            multiple
            placeholder="请选择"
            style="width: 200px"
          >
            <el-option
              v-for="item in options"
              :key="item.modelID"
              :label="item.PLC_modelID + ' _ ' + item.modelName"
              :value="item.modelID"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" size="mini" @click="dialogOK('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="添加型号" :visible.sync="dialogFormVisibleTwo">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="型号名称">
            <el-input
              style="width: 300px"
              v-model="addModelForm.modelName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="querymodelList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        height="250"
        border
        ref="multipleTable"
        :data="options"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column
          :prop="v.prop"
          :label="v.label"
          :width="v.width"
          v-for="(v, i) in tableHeaderTwo"
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modelSelectClick">确 定</el-button>
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
    var validatorLiftNub = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("设定寿命必须为数字"));
      }
      callback();
    };
    return {
      formInline: {
        productName: "",
        bandName: "",
        modelName: "",
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "模具名称", prop: "mojuName" },
        { label: "使用次数", prop: "mojuNub" },
        { label: "设定寿命", prop: "liftNub" },
        { label: "添加时间", prop: "createTime" },
        { label: "上次保养时间", prop: "baoyangTime" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: null,

      dialogFormVisible: false,
      title: "添加模具",
      form: {
        mojuName: "",
        liftNub: "",
        modelList: [],
      },
      rules: {
        mojuName: [
          { required: true, message: "请输入模具名称", trigger: "blur" },
        ],
        liftNub: [
          { required: true, message: "请输入设定寿命", trigger: "blur" },
          { validator: validatorLiftNub, trigger: "blur" },
        ],
        modelList: [
          { required: true, message: "请选择适用型号", trigger: "blur" },
        ],
      },
      disabled: false,
      maxNum: 0,
      user: JSON.parse(localStorage.getItem("user")),

      // 添加型号开关
      dialogFormVisibleTwo: false,
      options: [],
      tableHeaderTwo: [
        { label: "ID", prop: "modelID" },
        { label: "plc对应ID", prop: "PLC_modelID" },
        { label: "型号名称", prop: "modelName" },
        { label: "节拍", prop: "intervalTime" },
        { label: "换模时间", prop: "ChangeTime" },
      ],
      modelSelect: [],
      addModelForm: {
        modelName: "",
      },
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
    console.log(this.user);
    this.tableHeight = this.$refs.moidManagement.offsetHeight - 140;
    this.queryList();
    this.querymodelList();
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
      res = await frmKuchun.mojuList(this.pageSize, this.currentPage - 1);
      console.log("模具查询: ", res);
      this.total = res.data[0]["0"];
      this.tableData = res.data[1];
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].createTime = this.filterTime(
          this.tableData[i].createTime
        );
        this.tableData[i].baoyangTime = this.filterTime(
          this.tableData[i].baoyangTime
        );
      }
      this.loading.close();
    },
    // 时间转换
    filterTime(time) {
      if (time === null) {
        return "";
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
    async querymodelList() {
      let res = null;
      console.log(this.addModelForm.modelName);
      // eslint-disable-next-line no-undef
      res = await frmKuchun.modelListTwo(this.addModelForm.modelName);
      console.log("查询型号: ", res);
      this.options = res.data;
      for (let i = 0; i < this.options.length; i++) {
        this.options[i].modelName = this.options[i].ModelName;
      }
    },

    addClick() {
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
      this.title = "添加模具";
      this.dialogFormVisible = true;
    },
    addModel() {
      this.dialogFormVisibleTwo = true;
      console.log(this.modelSelect);
      console.log("this.modelSelect[i]: ", this.modelSelect);
    },
    handleSelectionChange(val) {
      this.modelSelect = val;
    },
    modelSelectClick() {
      let arr = [];
      for (let i = 0; i < this.modelSelect.length; i++) {
        arr.push(this.modelSelect[i].modelID);
      }
      this.form.modelList = arr;
      console.log("this.modelSelect[i]: ", this.modelSelect);
      this.dialogFormVisibleTwo = false;
    },
    deleteModel(i) {
      [this.modelSelect[i]].forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.form.modelList.splice(i, 1);
    },
    weihu(val) {
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
      console.log("val: ", val);
      this.$confirm(
        "是否已完成" + val.mojuName + "模具维保工作，点击确定清0使用次数",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.mujuWeihu(val.mjID);
          console.log("res: ", res);
          if (res.data === "成功") {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.queryList();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    async modify(val) {
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
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.modelMujuList(val.mjID);

      console.log("修改模具: ", res);
      this.title = "修改模具";
      this.form = {
        ...val,
      };
      this.form.modelList = [];
      this.modelSelect = res.data;
      for (let i = 0; i < res.data.length; i++) {
        this.form.modelList.push(res.data[i].modelID);
      }
      console.log("this.form: ", this.form);
      this.dialogFormVisible = true;
    },
    dialogOK(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          if (this.title === "添加模具") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.mojuAdd(
              this.form.mojuName,
              this.form.liftNub * 1,
              this.form.modelList
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.mojuEdit(
              this.form.mjID,
              this.form.mojuName,
              this.form.liftNub * 1,
              this.form.modelList
            );
          }
          console.log("res: ", res);
          if (res.data === "成功") {
            this.queryList();
          } else {
            this.$message.error(res.data);
          }
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    dialogClose() {
      this.$refs.ruleForm.resetFields();
      this.disabled = false;
      for (const key in this.form) {
        // if (key === "modelList") {
        //   this.form[key] = [];
        // } else {
        this.form[key] = "";
        // }
      }
    },
    deleteData(v) {
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
      this.$confirm("是否删除当前数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.deleteMuju(v);
          console.log("res: ", res);
          if (res.data === "成功") {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.queryList();
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
.moidManagement {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  padding: 20px;
  .button {
    text-align: right;
    margin-bottom: 20px;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
  .addmodel {
    .applymodel {
      display: flex;
      flex-wrap: wrap;
      .applymodel-block {
        background: #e4e7ed;
        margin: 3px 3px;
        padding: 3px;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 12px;
        height: 34px;
        .cloce {
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
