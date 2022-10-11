<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 14:14:36
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-27 09:06:23
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="user" ref="user">
    <div class="systemSettings-table">
      <div class="add">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="adduser"
          >添加账号</el-button
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
              @click="deleteUser(scope.row.userID)"
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
      @closed="dialogClose"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dialogForm"
        size="mini"
        ref="userForm"
        :rules="userFormRules"
      >
        <el-form-item label="姓名" label-width="120px" prop="userName">
          <el-input
            v-model="dialogForm.userName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号类型" label-width="120px" prop="userType">
          <el-select
            v-model="dialogForm.userType"
            placeholder="请选择"
            style="width: 200px"
          >
            <el-option label="管理员" :value="1"> </el-option>
            <el-option label="维保" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" label-width="120px" prop="mobile">
          <el-input
            v-model="dialogForm.mobile"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="Email">
          <el-input
            v-model="dialogForm.Email"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          label-width="120px"
          prop="password"
          v-if="dialogTitle === '添加账号'"
        >
          <el-input
            v-model="dialogForm.password"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" v-else>
          <el-input
            v-model="dialogForm.password"
            placeholder="无需修改请留空"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('userForm')">取 消</el-button>
        <el-button type="primary" @click="addUserClick('userForm')"
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
        { label: "姓名", prop: "userName" },
        { label: "账号类型", prop: "userTypeName" },
        { label: "手机号", prop: "mobile" },
        { label: "邮箱", prop: "Email" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: "添加账号",
      dialogForm: {
        userName: "",
        userTypeName: "",
        mobile: "",
        Email: "",
      },
      userFormRules: {
        userName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "change",
          },
        ],
        userType: [
          {
            required: true,
            message: "账号类型不能为空",
            trigger: "change",
          },
        ],
        mobile: [
          {
            required: true,
            message: "手机不能为空",
            trigger: "change",
          },
        ],
        Email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
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
    this.tableHeight = this.$refs.user.offsetHeight - 20;
    this.queryUserList();
  },
  methods: {
    // handleSizeChange(val) {},
    // handleCurrentChange(val) {},
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
      console.log("res: ", res);
      if (res.code === "1") {
        this.tableData = res.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].userTypeName =
            this.tableData[i].userType === 1 ? "管理员" : "维保人员";
        }
      }
      this.loading.close();
    },
    adduser() {
      this.dialogTitle = "添加账号";
      this.dialogFormVisible = true;
    },
    upDatauser(v) {
      this.dialogForm = JSON.parse(JSON.stringify(v));
      console.log(" this.dialogForm: ", this.dialogForm);
      this.dialogForm.password = "";
      this.dialogTitle = "修改账号";
      this.dialogFormVisible = true;
    },
    async addUserClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.loading = this.$loading({
            lock: true,
            text: "正在查询",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          if (this.dialogTitle === "添加账号") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.userAdd(
              this.dialogForm.userName,
              this.dialogForm.mobile,
              this.dialogForm.Email,
              this.dialogForm.password,
              this.dialogForm.userType
            );
          } else {
            console.log(" this.dialogForm: ", this.dialogForm);
            // eslint-disable-next-line no-undef
            res = await frmKuchun.userEdit(
              this.dialogForm.userName,
              this.dialogForm.mobile,
              this.dialogForm.Email,
              this.dialogForm.password,
              this.dialogForm.userID,
              this.dialogForm.userType
            );
          }

          if (res.code === "1") {
            this.dialogFormVisible = false;
            this.queryUserList();
          } else {
            this.$message({
              message: "操作失败",
              type: "warning",
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    dialogClose() {
      this.dialogForm = {
        userName: "",
        userTypeName: "",
        mobile: "",
        Email: "",
      };
      this.$refs["userForm"].resetFields();
    },
    async deleteUser(v) {
      this.$confirm("是否删除当前数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.userDel(v);
          console.log("res: ", res);
          if (res.data) {
            this.queryUserList();
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
.user {
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
