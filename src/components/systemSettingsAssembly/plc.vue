<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 14:00:42
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-19 16:48:41
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\plc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="settingsPLC" ref="settingsPLC">
    <div class="systemSettings-table">
      <div class="add">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addPlcClick"
          >新增PLC</el-button
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
            <el-button type="text" size="small" @click="upPlcClick(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="deletePlc(scope.row.plcID)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="dialogClose('plcForm')"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogForm"
        size="mini"
        ref="plcForm"
        :rules="plcFormRules"
      >
        <el-form-item label="PLC所属" label-width="120px" prop="className">
          <el-cascader
            v-model="dialogForm.className"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="PLC名称" label-width="120px" prop="PLC_name">
          <el-input
            v-model="dialogForm.PLC_name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌" label-width="120px" prop="PLC_brand">
          <el-select v-model="dialogForm.PLC_brand" placeholder="请选择">
            <el-option
              v-for="item in valueOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" label-width="120px" prop="PLC_model">
          <el-select v-model="dialogForm.PLC_model" placeholder="请选择">
            <el-option
              v-for="item in value1Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP地址" label-width="120px" prop="PLC_ip">
          <el-input
            v-model="dialogForm.PLC_ip"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="端口" label-width="120px" prop="PLC_port">
          <el-input
            v-model="dialogForm.PLC_port"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPLC('plcForm')">确 定</el-button>
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
      formInline: {},
      options: [],
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "所属工厂/车间/产线", prop: "className" },
        { label: "PLC名称", prop: "PLC_name" },
        { label: "品牌", prop: "PLC_brand" },
        { label: "型号", prop: "PLC_model" },
        { label: "IP地址", prop: "PLC_ip" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: "新增PLC",
      dialogForm: {},
      plcFormRules: {
        className: [
          {
            required: true,
            message: "所属工厂/车间/产线不能为空",
            trigger: "blur",
          },
        ],
        PLC_name: [
          {
            required: true,
            message: "PLC名称不能为空",
            trigger: "blur",
          },
        ],
        PLC_brand: [
          {
            required: true,
            message: "品牌不能为空",
            trigger: "blur",
          },
        ],
        PLC_model: [
          {
            required: true,
            message: "型号不能为空",
            trigger: "blur",
          },
        ],
        PLC_ip: [
          {
            required: true,
            message: "IP地址不能为空",
            trigger: "blur",
          },
        ],
        PLC_port: [
          {
            required: true,
            message: "端口不能为空",
            trigger: "blur",
          },
        ],
      },
      equipmentNameOptions: [],
      cascaderProps: {
        children: "children",
        label: "menuName",
        checkStrictly: true,
        value: "menuName",
      },
      valueOptions: [
        { label: "欧姆龙", value: "Omron" },
        { label: "西门子", value: "siemens" },
      ],
      value1Options: [
        { label: "Fins-200", value: "Fins-200" },
        { label: "S1200", value: "S1200" },
      ],
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
    this.tableHeight = this.$refs.settingsPLC.offsetHeight - 20;
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
      res = await frmKuchun.plcList();
      console.log("res: ", res);
      this.tableData = res.data;
      this.loading.close();
    },
    async addPLC(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.dialogForm.className = this.dialogForm.className.join("/");

          if (this.dialogTitle === "新增PLC") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.plcAdd(
              this.dialogForm.className,
              this.dialogForm.PLC_name,
              this.dialogForm.PLC_brand,
              this.dialogForm.PLC_model,
              this.dialogForm.PLC_ip,
              this.dialogForm.PLC_port
            );
          } else {
            console.log(
              this.dialogForm.className,
              this.dialogForm.PLC_name,
              this.dialogForm.PLC_brand,
              this.dialogForm.PLC_model,
              this.dialogForm.PLC_ip,
              this.dialogForm.PLC_port,
              this.dialogForm.plcID
            );
            // eslint-disable-next-line no-undef
            res = await frmKuchun.plcEdit(
              this.dialogForm.className,
              this.dialogForm.PLC_name,
              this.dialogForm.PLC_brand,
              this.dialogForm.PLC_model,
              this.dialogForm.PLC_ip,
              this.dialogForm.PLC_port,
              this.dialogForm.plcID
            );
          }
          console.log("res: ", res);
          this.dialogFormVisible = false;
          if (res.data) {
            this.queryList();
          }
        } else {
          return false;
        }
      });
    },
    // handleSizeChange(val) {},
    // handleCurrentChange(val) {},
    addPlcClick() {
      this.dialogTitle = "新增PLC";
      this.dialogFormVisible = true;
    },
    upPlcClick(v) {
      this.dialogForm = JSON.parse(JSON.stringify(v));
      this.dialogForm.className = this.dialogForm.className.split("/");
      this.dialogTitle = "修改PLC";
      this.dialogFormVisible = true;
    },
    async deletePlc(v) {
      this.$confirm("是否删除当前数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.plcDel(v);
          if (res.data) {
            this.queryList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    dialogClose(formName) {
      this.$refs[formName].resetFields();
      this.dialogForm = {};
    },
  },
};
</script>

<style  lang="scss">
.settingsPLC {
  width: 100%;
  height: calc(100% - 60px);
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
