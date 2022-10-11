<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-19 16:30:27
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-26 15:37:33
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\read.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="read">
    <div v-for="(v, i) in tableData" :key="i">
      <div class="title">{{ v.sname }}</div>
      <el-form
        :model="v"
        size="mini"
        :ref="'plcForm' + i"
        :rules="plcFormRules"
      >
        <el-form-item label="读取PLC" label-width="100px" prop="plcID">
          <el-select
            v-model="v.plcID"
            placeholder="请选择"
            style="width: 200px"
          >
            <el-option
              v-for="item in plcOption"
              :key="item.plcID"
              :label="item.PLC_name"
              :value="item.plcID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PLC地址" label-width="100px" prop="plc_address">
          <el-input
            style="width: 200px"
            v-model="v.plc_address"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="读取长度" label-width="100px" prop="addressLenth">
          <el-input-number
            style="width: 200px"
            v-model="v.addressLenth"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button size="mini" type="primary" @click="submit(v, 'plcForm' + i)"
          >提交</el-button
        >
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
      plcOption: [],
      tableData: [],
      plcFormRules: {
        plcID: [
          { required: true, message: "读取PLC不能为空", trigger: "blur" },
        ],
        plc_address: [
          { required: true, message: "PLC地址不能为空", trigger: "blur" },
        ],
        addressLenth: [
          { required: true, message: "读取长度不能为空", trigger: "blur" },
        ],
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
    this.queryPlc();
    this.queryList();
  },
  methods: {
    // 查询plc
    async queryPlc() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plcList();
      console.log("查询plc: ", res);
      this.plcOption = res.data;
    },
    async queryList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plc_gudingList();
      console.log("res: ", res);
      this.tableData = res.data;
    },
    submit(v, formName) {
      this.$refs[formName][0].validate(async (valid) => {
        if (valid) {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.plc_guding(
            v.plcID,
            v.plc_address,
            v.GID,
            v.addressLenth
          );
          console.log("提交 ", res);
          if (res.data === "成功") {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.queryList();
          } else {
            this.$message.error(res.data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.read {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  > div {
    border: 1px solid #fff;
    width: 350px;
    height: 280px;
    background: #fff;
    margin: 20px;
    border-radius: 10px;
    .title {
      text-align: center;
      line-height: 50px;
      border-bottom: 1px solid #ebeef5;
      font-size: 16px;
      font-weight: 600;
    }
    .el-form {
      margin: 20px 0px;
    }
    .button {
      text-align: center;
    }
  }
}
</style>
