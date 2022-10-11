<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-19 11:23:21
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-29 09:36:06
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\classes.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="classes" ref="classes">
    <div class="systemSettings-table">
      <div class="add">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="adduser"
          >新增班次</el-button
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
              @click="deleteData(scope.row.shiftID)"
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
          <el-input
            v-model="dialogForm.ShiftName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上班时间" label-width="120px" prop="startTime">
          <el-time-picker
            v-model="dialogForm.startTime"
            value-format="HH:mm"
            placeholder="上班时间"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="下班时间" label-width="120px" prop="endTime">
          <el-time-picker
            v-model="dialogForm.endTime"
            value-format="HH:mm"
            placeholder="下班时间"
          >
          </el-time-picker>
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
      formInline: {},
      options: [],
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "班次名称", prop: "ShiftName" },
        { label: "上班时间", prop: "startTime" },
        { label: "下班时间", prop: "endTime" },
      ],

      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: "新增班次",
      dialogForm: {},
      userFormRules: {
        ShiftName: [
          {
            required: true,
            message: "班次名称不能为空",
            trigger: "blur",
          },
        ],
        startTime: [
          {
            required: true,
            message: "上班时间不能为空",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            required: true,
            message: "下班时间不能为空",
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
    this.tableHeight = this.$refs.classes.offsetHeight - 40;
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
      res = await frmKuchun.shiftList(this.pageSize, this.currentPage - 1);
      console.log("res: ", res);
      if (res.code === "1") {
        this.tableData = res.data[1];
        this.total = res.data[0][0];
      }
      this.loading.close();
    },
    adduser() {
      this.dialogTitle = "新增班次";
      this.dialogFormVisible = true;
    },
    upDatauser(v) {
      this.dialogForm = v;
      console.log("v: ", v);
      this.dialogTitle = "修改班次";
      this.dialogFormVisible = true;
    },
    async addClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.loading = this.$loading({
            lock: true,
            text: "正在查询",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          if (this.dialogTitle === "新增班次") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.shiftAdd(
              this.dialogForm.ShiftName,
              this.dialogForm.startTime,
              this.dialogForm.endTime
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.shiftEdit(
              this.dialogForm.ShiftName,
              this.dialogForm.startTime,
              this.dialogForm.endTime,
              this.dialogForm.shiftID
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
          res = await frmKuchun.shiftDel(v);
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
.classes {
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

