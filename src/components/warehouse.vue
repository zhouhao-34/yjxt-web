<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-29 16:06:06
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 11:37:07
 * @FilePath: \yjxt-web\src\components\warehouse.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="warehouse" ref="warehouse">
    <div>
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="关联设备：">
          <!-- <el-input
            v-model="formInline.menuID"
            placeholder="请输入内容"
          ></el-input> -->
          <el-cascader
            clearable
            v-model="formInline.menuID"
            :show-all-levels="false"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="配件名称：">
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
          <!-- <el-button @click="reset">重置</el-button> -->
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button size="mini" @click="addClick">新品入库</el-button>
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
        <el-table-column label="适用设备" align="center">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <span
              v-for="(v, i) in scope.row.shiyong"
              :key="i"
              class="screen"
              @click="screenClick(v)"
            >
              {{ v.menuName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="details(scope.row)"
              >适用设备详情</el-button
            > -->
            <el-button type="text" size="mini" @click="enterClick(scope.row)"
              >增加库存</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="scope.row.ckNub * 1 <= 0"
              @click="cangkuOut(scope.row)"
              >出库</el-button
            >
            <el-button type="text" size="mini" @click="updateData(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="scope.row.ckNub * 1 > 0"
              @click="deleteData(scope.row.ckID)"
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
    <!-- 出入库 -->
    <el-dialog
      @close="dialogClose"
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" size="mini" :rules="rules" ref="ruleForm">
        <el-form-item label="配件名称" label-width="120px" prop="productName">
          <el-input
            style="width: 300px"
            :disabled="disabled"
            v-model="form.productName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌" label-width="120px" prop="bandName">
          <el-input
            style="width: 300px"
            :disabled="disabled"
            v-model="form.bandName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号" label-width="120px" prop="modelName">
          <el-input
            style="width: 300px"
            :disabled="disabled"
            v-model="form.modelName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="title !== '修改'"
          :label="title + '数量'"
          label-width="120px"
          prop="ckNub"
        >
          <el-input
            style="width: 300px"
            v-model="form.ckNub"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="出库原因"
          label-width="120px"
          prop="mark"
          v-if="title === '出库'"
        >
          <el-input
            style="width: 300px"
            v-model="form.mark"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="设备id"
          label-width="120px"
          prop="syID"
          v-if="title === '出库'"
        >
          <el-select v-model="form.syID" style="width: 300px">
            <el-option
              v-for="item in options"
              :key="item.syID"
              :label="item.menuName"
              :value="item.syID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人" label-width="120px" prop="userID">
          <el-select
            v-model="form.userID"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              v-for="item in userDataList"
              :key="item.userID"
              :label="item.userName"
              :value="item.userID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="title !== '出库' && title !== '增加库存'"
          label="备注"
          label-width="120px"
          prop="remarks"
        >
          <el-input
            style="width: 300px"
            v-model="form.remarks"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="title !== '增加库存' && title !== '出库'"
          label="适用设备"
          label-width="120px"
          prop="menuID"
        >
          <el-button type="primary" @click="addApplyVisible = true"
            >添加适用设备</el-button
          >
        </el-form-item>
        <el-form-item
          v-if="title !== '增加库存' && title !== '出库'"
          label="使用数量"
          label-width="120px"
          prop="number"
        >
          <el-table
            border
            :data="numberData"
            style="width: 300px"
            height="150px"
          >
            <el-table-column
              prop="label"
              label="设备名称"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.label }}</div>
              </template>
            </el-table-column>
            <el-table-column label="使用数量" align="center">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.number"
                  placeholder="请输入内容"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
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
    <!-- 适用设备详情 -->
    <el-dialog title="适用设备详情" :visible.sync="dialogTableVisible">
      <el-table :data="tableDataTwo" border height="300px">
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
    </el-dialog>
    <!-- 添加适用设备 -->
    <el-dialog
      title="添加适用设备"
      :visible.sync="addApplyVisible"
      width="550px"
    >
      <el-transfer
        :titles="['已选中', '未选中']"
        v-model="transferValue"
        :data="transferData"
      ></el-transfer>
      <div class="dialog-button">
        <el-button size="mini" @click="addApplyCancel">取消</el-button
        ><el-button type="primary" size="mini" @click="addApplyDetermine"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    var validatorCkNub = (rule, value, callback) => {
      if (this.title === "出库") {
        if (value * 1 > this.maxNum) {
          callback(new Error("出库数量不能大于库存数量：" + this.maxNum));
        }
      }
      callback();
    };
    return {
      formInline: {
        menuID: [],
        productName: "",
        bandName: "",
        modelName: "",
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "库存编号", prop: "ckID" },
        { label: "配件名称", prop: "productName" },
        { label: "品牌", prop: "bandName" },
        { label: "型号", prop: "modelName" },
        { label: "库存数量", prop: "ckNub" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: null,

      dialogFormVisible: false,
      title: "入库",
      form: {
        productName: "",
        bandName: "",
        modelName: "",
        ckNub: "",
        userID: "",
      },
      numberData: [],
      rules: {
        productName: [
          { required: true, message: "请输入配件名称", trigger: "blur" },
        ],
        bandName: [{ required: true, message: "请输入品牌", trigger: "blur" }],
        modelName: [{ required: true, message: "请输入型号", trigger: "blur" }],
        ckNub: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { validator: validatorCkNub, trigger: "blur" },
        ],
        mark: [{ required: true, message: "请输入出库原因", trigger: "blur" }],
        syID: [{ required: true, message: "请选择设备id", trigger: "blur" }],
        userID: [{ required: true, message: "请选择操作人", trigger: "blur" }],
      },
      disabled: false,
      maxNum: 0,
      equipmentNameOptions: [],
      cascaderProps: {
        value: "menuID",
        label: "menuName",
        children: "children",
      },
      options: [],

      dialogTableVisible: false,
      tableDataTwo: [],
      tableHeaderTwo: [
        { label: "设备名称", prop: "menuName" },
        { label: "品牌名称", prop: "brandName" },
        { label: "型号名称", prop: "modelName" },
        { label: "数量", prop: "number" },
      ],
      userDataList: [],

      addApplyVisible: false,
      transferValue: [],
      transferData: [],
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
    this.tableHeight = this.$refs.warehouse.offsetHeight - 120;
    this.queryList();
    this.equipmentNameOptions = JSON.parse(sessionStorage.getItem("treeData"));
    this.queryUserList();
    this.queryTreeData();
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
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].menuType === 2) {
            this.transferData.push({
              key: arr[i].menuID,
              label: arr[i].menuName,
            });
          }
        }
        console.log("arr: ", arr);
      }
    },
    // 查询列表
    async queryUserList() {
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
      res = await frmKuchun.queryUserList();
      if (res.code === "1") {
        this.userDataList = res.data;
        for (let i = 0; i < this.userDataList.length; i++) {
          this.userDataList[i].userTypeName =
            this.userDataList[i].userType === 1 ? "管理员" : "维保人员";
        }
      }
      this.loading.close();
    },
    // 查询列表数据
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

      console.log("this.formInline.menuID", this.formInline.menuID);
      // eslint-disable-next-line no-undef
      res = await frmKuchun.warehouseList(
        this.formInline.menuID.length > 0
          ? this.formInline.menuID[this.formInline.menuID.length - 1] + ""
          : "",
        this.formInline.productName,
        this.formInline.bandName,
        this.formInline.modelName,
        this.pageSize,
        this.currentPage - 1
      );
      console.log("res: ", res);
      this.total = res.data[0]["0"];
      this.tableData = res.data[1];
      this.loading.close();
    },
    //重置查询条件
    queryClick() {
      if (this.formInline.menuID.length === 1) {
        this.formInline.menuID = [];
      }
      this.queryList();
    },
    screenClick(v) {
      console.log("v: ", v);
      this.formInline.menuID = [v.menuID];
      this.queryList();
    },
    addClick() {
      this.title = "入库";
      this.dialogFormVisible = true;
    },
    enterClick(val) {
      this.title = "增加库存";
      this.form = {
        ...val,
      };
      this.form.ckNub = "";
      this.disabled = true;
      this.dialogFormVisible = true;
    },
    async cangkuOut(val) {
      this.title = "出库";
      this.form = {
        ...val,
      };
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.cangKuSY(val.ckID);
      console.log("根据仓库ID查询适用设备: ", res);
      this.options = res.data;
      this.maxNum = this.form.ckNub * 1;
      this.form.ckNub = "";
      this.disabled = true;
      this.dialogFormVisible = true;
    },
    async updateData(val) {
      console.log("val: ", val);
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user.userType === 2) {
        this.$message({
          type: "warning",
          message: "权限不足",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.cangKuSY(val.ckID);
      console.log("根据仓库ID查询适用设备: ", res);
      this.numberData = [];
      this.transferValue = [];
      for (let i = 0; i < res.data.length; i++) {
        this.numberData.push({
          label: res.data[i].menuName,
          key: res.data[i].menuID,
          number: res.data[i].number,
        });
        this.transferValue.push(res.data[i].menuID);
      }
      this.title = "修改";
      this.form = {
        ...val,
      };
      this.form.ckNub = "";
      this.dialogFormVisible = true;
    },
    dialogOK(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let user = {};
          for (let i = 0; i < this.userDataList.length; i++) {
            if (this.userDataList[i].userID === this.form.userID) {
              user.userID = this.userDataList[i].userID;
              user.userName = this.userDataList[i].userName;
            }
          }
          let menuID = [];
          let number = [];
          for (let i = 0; i < this.numberData.length; i++) {
            if (!isNaN(this.numberData[i].number)) {
              menuID.push(this.numberData[i].key);
              number.push(this.numberData[i].number * 1);
            } else {
              this.$message({
                message: "使用数量必须是数字",
                type: "warning",
              });
              return;
            }
          }
          let res = null;
          if (this.title === "入库") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.cangkuAdd(
              this.form.productName,
              this.form.bandName,
              this.form.modelName,
              this.form.ckNub * 1,
              user.userID,
              user.userName,
              this.form.remarks,
              menuID,
              number
            );
          } else if (this.title === "增加库存") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.addStock(
              this.form.productName,
              this.form.bandName,
              this.form.modelName,
              this.form.ckNub * 1,
              user.userID,
              user.userName
            );
          } else if (this.title === "修改") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.cangkuEdit(
              this.form.productName,
              this.form.bandName,
              this.form.modelName,
              this.form.ckID,
              user.userID,
              user.userName,
              this.form.remarks,
              menuID,
              number
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.chuku(
              this.form.ckID,
              this.form.productName,
              this.form.bandName,
              this.form.modelName,
              this.form.ckNub * 1,
              this.form.remarks,
              user.userID,
              user.userName,
              this.form.syID
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
      this.form = {
        productName: "",
        bandName: "",
        modelName: "",
        ckNub: "",
        userID: "",
      };
      this.numberData = [];
      this.transferValue = [];
    },
    deleteData(v) {
      this.user = JSON.parse(localStorage.getItem("user"));
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
          res = await frmKuchun.deletecangku(v);
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
    async details(val) {
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.cangKuSY(val.ckID);
      console.log("根据仓库ID查询适用设备: ", res);
      this.tableDataTwo = res.data;
      this.dialogTableVisible = true;
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
    addApplyCancel() {
      this.addApplyVisible = false;
      this.transferValue = [];
    },
    addApplyDetermine() {
      this.addApplyVisible = false;
      let arr = [];
      for (let i = 0; i < this.transferData.length; i++) {
        if (this.transferValue.indexOf(this.transferData[i].key) !== -1) {
          arr.push(this.transferData[i]);
        }
      }
      this.numberData = arr;
      console.log(
        "this.transferValue: ",
        this.transferValue,
        this.transferData
      );
    },
  },
};
</script>

<style lang="scss">
.warehouse {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  padding: 20px;
  position: relative;
  .button {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
  .el-transfer {
    display: flex;
    justify-content: center;
    .el-transfer__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .el-button {
      margin: 10px 0px;
    }
  }
  .screen {
    margin: 0px 5px;
    color: #409eff;
    cursor: pointer;
    text-decoration: underline;
  }
  .el-dialog {
    .el-table {
      th,
      td {
        padding: 0px;
        .cell {
          padding: 0px;
          .el-input {
            border: 0px;
          }
        }
      }
    }
  }
  .dialog-button {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
