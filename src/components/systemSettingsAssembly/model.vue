<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-19 09:54:43
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-11-03 13:16:07
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\model.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="model" ref="model">
    <div class="systemSettings-table">
      <div class="add">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="adduser"
          >新增型号</el-button
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
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="upDatauser(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deleteData(scope.row.modelID)"
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
        <el-form-item label="型号名称" label-width="120px" prop="ModelName">
          <el-input
            v-model="dialogForm.ModelName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="节拍(秒)" label-width="120px" prop="intervalTime">
          <el-input
            v-model="dialogForm.intervalTime"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="换模时间(分钟)"
          label-width="120px"
          prop="ChangeTime"
        >
          <el-input
            v-model="dialogForm.ChangeTime"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="PLC设置" label-width="120px" prop="plcListID">
          <div style="display: flex">
            <el-input
              v-model="dialogForm.plcSetUpVal"
              disabled
              placeholder="请设置读取PLC"
              style="width: 200px"
            ></el-input>
            <el-button @click="setUpPlcListID">设置</el-button>
          </div>
        </el-form-item>
        <el-form-item label="所对应plcID" label-width="120px" prop="PLCModelID">
          <el-input
            v-model="dialogForm.PLCModelID"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClick('userForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置plc -->
    <el-dialog
      title="设置plc"
      width="500px"
      :close-on-click-modal="false"
      :visible.sync="setUpPlcDialog"
      @closed="plcSetUpClick('plcSetUpForm')"
    >
      <el-form
        ref="plcSetUpForm"
        :model="plcForm"
        label-position="right"
        label-width="140px"
        size="mini"
        :rules="plcSetUpDialogRules"
      >
        <!-- plc名称 -->
        <el-form-item label="plc名称" prop="plcID">
          <div style="display: flex">
            <el-select v-model="plcForm.plcID" style="width: 200px">
              <el-option
                :label="v.PLC_name"
                :value="v.plcID"
                v-for="(v, i) in plcOption"
                :key="i"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- plc读地址 -->
        <el-form-item label="plc读地址" prop="PLC_adress">
          <el-input
            v-model="plcForm.PLC_adress"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <!-- 数据类型 -->
        <el-form-item label="数据类型" prop="PLC_addressType">
          <div style="display: flex">
            <el-select
              style="width: 200px"
              v-model="plcForm.PLC_addressType"
              @change="plcForm.chufa = ''"
            >
              <el-option label="int16" value="int16"> </el-option>
              <el-option label="Dint32" value="Dint32"> </el-option>
              <el-option label="Uint16" value="Uint16"> </el-option>
              <el-option label="UDint32" value="UDint32"> </el-option>
              <el-option label="real" value="real"> </el-option>
              <el-option label="bool" value="bool"> </el-option>
              <el-option label="string" value="string"> </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- 数据长度 -->
        <el-form-item label="数据长度" prop="addressLenth">
          <el-input
            v-model="plcForm.addressLenth"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <!-- 触发数据读取 -->
        <el-form-item label="触发数据读取" prop="chufa">
          <el-select
            style="width: 200px"
            v-model="plcForm.chufa"
            v-if="
              plcForm.PLC_addressType !== 'string' &&
              plcForm.PLC_addressType !== 'bool' &&
              plcForm.PLC_addressType !== 'real'
            "
          >
            <el-option label="数据不为空" value="1"> </el-option>
            <el-option label="与上一次不同" value="2"> </el-option>
            <el-option label="指定信号" value="3"> </el-option>
          </el-select>
          <el-select
            style="width: 200px"
            v-model="plcForm.chufa"
            v-if="plcForm.PLC_addressType === 'bool'"
          >
            <el-option label="等于true" value="4"> </el-option>
            <el-option label="等于false" value="5"> </el-option>
            <el-option label="指定信号" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 指定信号读取条件 -->
        <el-form-item
          label="指定信号读取条件"
          v-if="plcForm.chufa === '3'"
          required
        >
          <div style="display: flex">
            <el-form-item prop="where_PLC_address" style="width: 140px">
              <el-input v-model="plcForm.where_PLC_address"></el-input>
            </el-form-item>
            <el-form-item prop="where_tiaojian" style="width: 140px">
              <el-select v-model="plcForm.where_tiaojian">
                <el-option label="<" value="<"> </el-option>
                <el-option label="=" value="="> </el-option>
                <el-option label=">" value=">"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="where_content" style="width: 140px">
              <el-input
                v-if="plcForm.where_tiaojian === '='"
                v-model="plcForm.where_content"
              ></el-input>
              <el-input-number
                v-else
                v-model="plcForm.where_content"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </div>
          <div style="display: flex; justify-content: space-around; color: red">
            <div style="width: 100px; text-align: center">例：D100</div>
            <div style="width: 100px; text-align: center">=</div>
            <div style="width: 100px; text-align: center">1</div>
          </div>
        </el-form-item>
        <!-- 指定信号读取类型 -->
        <el-form-item
          label="指定信号读取类型"
          v-if="plcForm.chufa === '3'"
          prop="PLC_adress"
        >
          <div style="display: flex">
            <el-select v-model="plcForm.PLC_addressType1" style="width: 200px">
              <el-option label="int16" value="int16"> </el-option>
              <el-option label="Dint32" value="Dint32"> </el-option>
              <el-option label="Uint16" value="Uint16"> </el-option>
              <el-option label="UDint32" value="UDint32"> </el-option>
              <el-option label="real" value="real"> </el-option>
              <el-option label="bool" value="bool"> </el-option>
              <el-option label="string" value="string"> </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- 读取后的数据处理 -->
        <el-form-item label="读取后的数据处理" prop="chuli">
          <el-select
            v-model="plcForm.chuli"
            v-if="plcForm.PLC_addressType !== 'bit'"
            :style="plcForm.chuli === '累加' ? 'width: 100px' : 'width: 200px'"
          >
            <el-option label="累加" value="累加"> </el-option>
            <el-option label="替换" value="替换"> </el-option>
          </el-select>
          <el-select v-model="plcForm.chuli" v-else>
            <el-option label="累加" value="累加"> </el-option>
          </el-select>
          <el-select
            v-model="plcForm.chuliType"
            v-if="plcForm.chuli === '累加'"
            :style="plcForm.chuli === '累加' ? 'width: 100px' : 'width: 200px'"
          >
            <el-option label="直接累加" :value="1"> </el-option>
            <el-option label="每次加1" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 读取成功后回写 -->
        <!-- <el-form-item label="读取成功后回写" prop="returnVal">
          <el-input v-model="plcForm.returnVal" style="width: 200px"></el-input>
          <div style="color: red">读取成功后回写数据，不需要回写请留空</div>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setUpPlcClick('plcSetUpForm')"
          >提交</el-button
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
    var number = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error("请输入数字值"));
      }
      callback();
    };
    return {
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "ID", prop: "modelID" },
        { label: "plc对应ID", prop: "PLC_modelID" },
        { label: "型号名称", prop: "ModelName" },
        { label: "节拍", prop: "intervalTime" },
        { label: "换模时间", prop: "ChangeTime" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: "新增型号",
      dialogForm: {
        ModelName: "",
        intervalTime: "",
        ChangeTime: "",
        plcListID: "",
        plcSetUpVal: "",
        PLCModelID: "",
      },
      userFormRules: {
        ModelName: [
          {
            required: true,
            message: "型号名称不能为空",
            trigger: "blur",
          },
        ],
        intervalTime: [
          {
            required: true,
            message: "节拍不能为空",
            trigger: "blur",
          },
          { validator: number, trigger: "blur" },
        ],
        ChangeTime: [
          {
            required: true,
            message: "换模时间不能为空",
            trigger: "blur",
          },
          { validator: number, trigger: "blur" },
        ],
        plcListID: [
          {
            required: true,
            message: "必须设置PLC",
            trigger: "blur",
          },
        ],
        PLCModelID: [
          {
            required: true,
            message: "所对应plcID不能为空",
            trigger: "blur",
          },
          { validator: number, trigger: "blur" },
        ],
      },

      plcOption: [],
      setUpPlcDialog: false,
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
      plcSetUpDialogRules: {
        plcID: [
          {
            required: true,
            message: "plc名称不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_adress: [
          {
            required: true,
            message: "plc读地址不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_addressType: [
          {
            required: true,
            message: "数据类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        addressLenth: [
          {
            required: true,
            message: "数据长度不能为空",
            trigger: ["blur", "change"],
          },
        ],
        chufa: [
          {
            required: true,
            message: "触发数据读取不能为空",
            trigger: ["blur", "change"],
          },
        ],
        plcIwhere_PLC_addressD: [
          {
            required: true,
            message: "地址不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_tiaojian: [
          {
            required: true,
            message: "条件不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_content: [
          {
            required: true,
            message: "值不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_addressType1: [
          {
            required: true,
            message: "指定信号读取类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        chuli: [
          {
            required: true,
            message: "读取后的数据处理不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_returnVal: [
          {
            required: true,
            message: "指定信号回写不能为空",
            trigger: ["blur", "change"],
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
    this.tableHeight = this.$refs.model.offsetHeight - 40;
    this.queryList();
    this.queryPlc();
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
    // 查询plc
    async queryPlc() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plcList();
      this.plcOption = res.data;
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
      res = await frmKuchun.modelList(this.pageSize, this.currentPage - 1);
      console.log("res: ", res);
      if (res.code === "1") {
        this.tableData = res.data[1];
        this.total = res.data[0][0];
      }
      this.loading.close();
    },
    adduser() {
      this.dialogTitle = "新增型号";
      this.dialogFormVisible = true;
    },
    async upDatauser(v) {
      console.log("v: ", v);
      // 查询plc数据
      let res2 = null;
      // eslint-disable-next-line no-undef
      res2 = await frmKuchun.plc_listList(v.plcListID * 1);
      console.log("res2: ", res2);
      this.plcForm = res2.data[0];
      this.plcForm.chufa += "";
      this.plcForm.PLC_addressType1 = res2.data[0].where_PLC_addressType;
      this.dialogForm = { ...v, PLCModelID: v.PLC_modelID + "" };
      this.dialogTitle = "修改型号";
      this.dialogFormVisible = true;
    },
    async setUpPlcListID() {
      if (
        this.dialogForm.plcListID !== "" &&
        this.dialogForm.plcListID !== null &&
        this.dialogForm.plcListID !== undefined
      ) {
        // 查询plc数据
        let res2 = null;
        // eslint-disable-next-line no-undef
        res2 = await frmKuchun.plc_listList(this.dialogForm.plcListID * 1);
        console.log("res2: ", res2);
        this.plcForm = res2.data[0];
        this.plcForm.chufa += "";
        this.plcForm.PLC_addressType1 = res2.data[0].where_PLC_addressType;
      }
      this.setUpPlcDialog = true;
    },
    // 设置plc提交
    setUpPlcClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          let arr = [
            this.plcForm.plcID,
            this.plcForm.PLC_adress,
            this.plcForm.PLC_addressType,
            this.plcForm.addressLenth,
            this.plcForm.chufa,
            this.plcForm.where_PLC_address,
            this.plcForm.where_tiaojian,
            this.plcForm.where_content,
            this.plcForm.returnVal,
            this.plcForm.chuli,
            this.plcForm.PLC_addressType1,
            this.plcForm.where_returnVal,
            this.plcForm.chuliType,
            "2",
          ];
          // eslint-disable-next-line no-undef
          res = await frmKuchun.plc_list_add(arr);
          console.log("arr: ", arr);
          console.log("res: ", res);
          this.dialogForm.plcSetUpVal = "";
          for (let i = 0; i < this.plcOption.length; i++) {
            if (this.plcOption[i].plcID === this.plcForm.plcID) {
              this.dialogForm.plcSetUpVal +=
                this.plcOption[i].PLC_ip +
                "-" +
                this.plcForm.PLC_adress +
                "-" +
                this.plcForm.PLC_addressType;
            }
          }
          this.dialogForm.plcListID = res;
          this.setUpPlcDialog = false;
        } else {
          return false;
        }
      });
    },
    // 设置plc关闭的回调
    plcSetUpClick(formName) {
      this.$refs[formName].resetFields();
    },
    async addClick(formName) {
      console.log("this.dialogForm: ", this.dialogForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.loading = this.$loading({
            lock: true,
            text: "正在查询",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          if (this.dialogTitle === "新增型号") {
            console.log(
              this.dialogForm.intervalTime * 1,
              this.dialogForm.ChangeTime * 1
            );
            // eslint-disable-next-line no-undef
            res = await frmKuchun.modelAdd(
              this.dialogForm.ModelName,
              this.dialogForm.intervalTime,
              this.dialogForm.ChangeTime,
              this.dialogForm.plcListID * 1,
              this.dialogForm.PLCModelID * 1
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.modelEdit(
              this.dialogForm.ModelName,
              this.dialogForm.intervalTime,
              this.dialogForm.ChangeTime,
              this.dialogForm.plcListID * 1,
              this.dialogForm.PLCModelID * 1,
              this.dialogForm.modelID * 1
            );
          }

          if (res.code === "1" && res.data === "成功") {
            this.dialogFormVisible = false;
            this.queryList();
          } else {
            this.$message({
              message: res.data,
              type: "warning",
            });
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
          res = await frmKuchun.modelDel(v);
          console.log("res: ", res);
          if (res.data) {
            this.queryList();
          } else {
            this.$message({
              message: "操作失败",
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
.model {
  .systemSettings-table {
    width: 100%;
    margin-top: 10px;
    position: relative;
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
    .add {
      position: absolute;
      right: 0px;
      top: -30px;
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

