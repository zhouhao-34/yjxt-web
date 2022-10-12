
<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-10 16:57:55
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-12 15:50:28
 * @FilePath: \yjxt-web\src\components\bulletinBoard\linnei.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for -->
  <div class="linnei" id="linnei">
    <!-- <Title></Title> -->
    <div class="content">
      <div class="linnei-top" id="linnei-top">
        <el-row :gutter="20" v-for="x in 4" :key="x">
          <el-col
            :span="8"
            v-for="(v, i) in descriptionsItem"
            :key="i"
            v-if="x * 3 > i && x * 3 - 3 <= i"
          >
            <div class="form-item-label">{{ v.label }}</div>
            <div
              class="form-item-val"
              @dblclick="updataChangeNumber(descriptionsData)"
            >
              <el-input
                v-if="v.value !== 'time'"
                disabled
                v-model="descriptionsData[v.value]"
              ></el-input>
              <div v-else class="time">
                {{ dataTime }}
              </div>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="plan">
        <el-table
          @contextmenu.prevent.native="openMenu($event)"
          border
          :data="tableData"
          :header-cell-style="{
            background: '#DCDFE6',
            color: '#303133',
            'font-size': '18px',
          }"
          :key="tableHeight"
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            :prop="v.prop"
            :label="v.label"
            v-for="(v, i) in tableHeader"
            :key="i"
            :width="v.width"
          >
            <template slot-scope="scope">
              <div @dblclick="upPlan(scope.row, v.label)">
                {{ scope.row[v.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <ul
          v-show="visible"
          :style="{ left: left + 'px', top: top + 'px' }"
          class="contextmenu"
        >
          <li @click="addPlan">添加生产任务</li>
        </ul>
      </div>
    </div>
    <div class="right-table" :key="tableHeight">
      <!-- <div class="text">模具使用信息</div> -->
      <el-table
        border
        :data="tableDataTwo"
        :header-cell-style="{
          'font-size': '18px',
        }"
        height="50%"
        style="width: 100%"
      >
        <el-table-column label="模具使用信息" align="center">
          <el-table-column
            align="center"
            :prop="v.prop"
            :label="v.label"
            v-for="(v, i) in tableHeaderTwo"
            :key="i"
            :width="v.width"
          >
            <template slot-scope="scope">
              <div
                :style="{
                  color:
                    scope.row.mojuNub * 1 > scope.row.liftNub * 1
                      ? '#F56C6C'
                      : '#67C23A',
                }"
              >
                {{ scope.row[v.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
        border
        :data="tableDataThree"
        :header-cell-style="{
          'font-size': '18px',
        }"
        height="50%"
        style="width: 100%"
      >
        <el-table-column label="设备保养信息" align="center">
          <el-table-column
            align="center"
            :prop="v.prop"
            :label="v.label"
            v-for="(v, i) in tableHeaderThree"
            :key="i"
            :width="v.width"
          >
            <template slot-scope="scope">
              <div
                :style="{
                  color:
                    scope.row.yujingValue > scope.row.DValue
                      ? '#67C23A'
                      : scope.row.yujingValue < scope.row.DValue &&
                        scope.row.lifeValue > scope.row.DValue
                      ? '#E6A23C'
                      : '#F56C6C',
                }"
              >
                {{ scope.row[v.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增生产计划"
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
          <el-select
            style="width: 200px"
            v-model="dialogForm.ShiftName"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ShiftNameOptions"
              :key="item.shiftID"
              :label="item.ShiftName"
              :value="item.ShiftName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产型号" label-width="120px" prop="modelID">
          <el-select
            style="width: 200px"
            v-model="dialogForm.modelID"
            placeholder="请选择"
          >
            <el-option
              v-for="item in modelOptions"
              :key="item.modelID"
              :label="item.PLC_modelID + ' - ' + item.ModelName"
              :value="item.modelID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划产量" label-width="120px" prop="planNub">
          <el-input-number
            style="width: 200px"
            v-model="dialogForm.planNub"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="计划生产日期" label-width="120px" prop="pandTime">
          <el-date-picker
            style="width: 200px"
            v-model="dialogForm.pandTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
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
// import Title from "./title.vue";
export default {
  name: "",
  components: {
    // Title,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      top: 0,
      left: 0,
      visible: false,
      ShiftNameOptions: [],
      modelOptions: [],
      dialogFormVisible: false,
      dialogTitle: "新增生产计划",
      dialogForm: {},
      userFormRules: {
        ShiftName: [
          {
            required: true,
            message: "班次名称不能为空",
            trigger: "blur",
          },
        ],
        modelID: [
          {
            required: true,
            message: "生产型号不能为空",
            trigger: "blur",
          },
        ],
        planNub: [
          {
            required: true,
            message: "计划产量不能为空",
            trigger: "blur",
          },
        ],
        actualNub: [
          {
            required: true,
            message: "实际产量不能为空",
            trigger: "blur",
          },
        ],
        pandTime: [
          {
            required: true,
            message: "计划生产日期不能为空",
            trigger: "blur",
          },
        ],
      },
      descriptionsItem: [
        { label: "生产班次", value: "ShiftName" },
        { label: "换模次数", value: "ChangeNumber" },
        { label: "时间", value: "time" },
        { label: "生产型号", value: "PLC_modelID" },
        { label: "型号名称", value: "ModelName" },
        { label: "实际产量", value: "Actual" },
        { label: "计划产量", value: "PlanNumber" },
        { label: "目标产量", value: "Target" },
        { label: "完成率", value: "completion" },
        { label: "单项产量", value: "Single" },
        { label: "产量差异", value: "Differences" },
        { label: "OEE", value: "OEE" },
      ],
      descriptionsData: {},
      tableHeader: [
        { prop: "PLC_modelID", label: "型号", width: "60px" },
        { prop: "ModelName", label: "名称" },
        { prop: "Planproduction", label: "计划生产", width: "100px" },
        { prop: "ActualProduction", label: "实际生产", width: "100px" },
        { prop: "startTime", label: "开始时间" },
        { prop: "endTime", label: "结束时间" },
      ],
      tableData: [],
      tableHeight: 0,
      timer: null,
      timerTwo: null,
      dataTime: "",
      loading: null,

      tableHeaderTwo: [
        { prop: "mojuName", label: "模具名称" },
        { prop: "mojuNub", label: "使用次数", width: "100px" },
        { prop: "liftNub", label: "设定寿命", width: "100px" },
        { prop: "baoyangTime", label: "上次保养日期", width: "130px" },
      ],
      tableDataTwo: [],
      tableHeaderThree: [
        { prop: "proName", label: "设备名称" },
        { prop: "DValue", label: "当前值", width: "100px" },
        { prop: "yujingValue", label: "预警值", width: "100px" },
        { prop: "lifeValue", label: "寿命", width: "80px" },
      ],
      tableDataThree: [],
    };
  },
  watch: {
    //   监听属性对象，newValue为新的值，也就是改变后的值
    visible(newValue) {
      if (newValue) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener("click", this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer); //关闭
    clearInterval(this.timerTwo); //关闭
    console.log("关闭: ");
  },
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
    this.timer = setInterval(() => {
      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var month = date.getMonth() + 1; //获取当前月份
      var dat = date.getDate(); //获取当前日
      var hour = date.getHours(); //获取小时
      var minutes = date.getMinutes(); //获取分钟
      var second = date.getSeconds(); //获取秒
      this.dataTime =
        year +
        "-" +
        month +
        "-" +
        dat +
        " " +
        hour +
        ":" +
        ((minutes + "").length === 1 ? "0" + minutes : minutes) +
        ":" +
        ((second + "").length === 1 ? "0" + second : second);
    }, 1000);
    console.log(this.descriptionsData);
    this.tableHeight =
      document.getElementById("linnei").clientHeight -
      document.getElementById("linnei-top").clientHeight;
    window.onresize = () => {
      return (() => {
        console.log("变化");
        this.tableHeight =
          document.getElementById("linnei").clientHeight -
          document.getElementById("linnei-top").clientHeight;
      })();
    };
    setTimeout(() => {
      this.queryList();
      this.queryrizhi();
    }, 1000);
    this.timerTwo = setInterval(() => {
      this.queryList();
      this.queryrizhi();
    }, 10000);
    window.vue = this;
    this.queryShiftName();
    this.queryModel();
  },
  methods: {
    // 右击事件
    openMenu(e) {
      this.top = e.pageY;
      this.left = e.pageX;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
    addPlan() {
      this.dialogFormVisible = true;
    },
    // 添加计划
    async addClick(formName) {
      console.log("formName: ", formName);
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          this.loading = this.$loading({
            lock: true,
            text: "正在查询",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          // eslint-disable-next-line no-undef
          res = await frmKuchun.planAdd(
            this.dialogForm.ShiftName,
            this.dialogForm.modelID,
            this.dialogForm.planNub * 1,
            0,
            this.dialogForm.pandTime
          );

          if (res.code === "1" && res.data === "成功") {
            this.dialogFormVisible = false;
            this.queryList();
          } else {
            this.dialogFormVisible = false;
            this.$message({
              message: res.data,
              type: "warning",
            });
            this.loading.close();
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
    // 查询班次
    async queryShiftName() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.shiftListTwo();
      console.log("res: ", res);
      if (res.code === "1") {
        this.ShiftNameOptions = res.data;
      }
    },
    // 查询型号
    async queryModel() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.modelListTwo("");
      console.log("查询型号: ", res);
      if (res.code === "1") {
        this.modelOptions = res.data;
      }
    },
    // 修改换模次数
    updataChangeNumber(data) {
      console.log("data: ", data);
      this.$prompt("请输入换模次数", "修改换模次数", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: (val) => {
          if (val === "" || val === null) {
            return "换模次数不可为空";
          }
          return true;
        },
      })
        .then(async ({ value }) => {
          if (isNaN(value)) {
            this.$message({
              message: "请输入数字",
              type: "warning",
            });
          } else {
            let res = null;
            // eslint-disable-next-line no-undef
            res = await frmKuchun.editHuanMo(data.ID, value * 1);
            console.log("修改换模次数: ", res);
            this.queryList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 修改计划产量
    upPlan(val, label) {
      console.log("val: ", val);
      if (label === "计划生产") {
        this.$prompt("请输入计划生产", "修改计划生产", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValidator: (v) => {
            if (v === "" || v === null) {
              return "计划生产不可为空";
            }
            return true;
          },
        })
          .then(async ({ value }) => {
            if (isNaN(value)) {
              this.$message({
                message: "请输入数字",
                type: "warning",
              });
            } else {
              let res = null;
              // eslint-disable-next-line no-undef
              res = await frmKuchun.planEdit(
                val.Shift,
                val.ModelID,
                value * 1,
                val.ActualProduction * 1,
                val.planTime,
                val.planID
              );
              console.log("修改计划生产: ", res);
              if (res.data === "成功") {
                this.queryList();
                this.queryrizhi();
              }
              // this.queryList();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
    },
    updateData() {
      this.queryList();
      this.queryrizhi();
    },
    async queryList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.planListD();
      console.log("res: ", res);
      this.tableData = res.data;
      let arr = [];
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].createTime = this.filterTime(
          this.tableData[i].createTime
        );
        this.tableData[i].planTime = this.filterTime(
          this.tableData[i].planTime
        );
        this.tableData[i].startTime = this.filterTime(
          this.tableData[i].startTime
        );
        this.tableData[i].endTime = this.filterTime(this.tableData[i].endTime);
        arr.push(this.tableData[i].ModelID);
      }
      this.mujuList(arr);
      this.queryKanbanList();
    },
    async queryKanbanList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.kanban();
      console.log("看板: ", res);
      this.descriptionsData = res.data[0];
      if (this.descriptionsData.Target > 0) {
        this.descriptionsData.completion =
          (
            (this.descriptionsData.Actual / this.descriptionsData.Target) *
            100
          ).toFixed(0) + "%";
      } else {
        this.descriptionsData.completion = "0%";
      }

      this.descriptionsData.OEE = this.descriptionsData.OEE / 100 + "%";
      this.loading.close();
    },
    async mujuList(mjID) {
      console.log("mjID: ", mjID);
      if (mjID.length === 0) {
        return;
      }
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.mojuListOnly(mjID);
      console.log("模具查询: ", res);
      if (res.code === "1") {
        this.tableDataTwo = res.data;
        for (let i = 0; i < this.tableDataTwo.length; i++) {
          this.tableDataTwo[i].baoyangTime = this.filterTimeTwo(
            this.tableDataTwo[i].baoyangTime
          );
        }
      }
    },
    // 时间转换
    filterTime(time) {
      if (time === undefined || time === null) {
        return null;
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
    filterTimeTwo(time) {
      if (time === undefined || time === null) {
        return null;
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // 日志查询
    async queryrizhi() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.kbproList(0, 10, 0, "");
      console.log("日志查询: ", res);
      // for (let i = 0; i < res.data[1].length; i++) {
      // res.data[1][i].createTime = this.filterTime(res.data[1][i].createTime);
      // // eslint-disable-next-line no-undef
      // let res2 = await frmKuchun.getSysMenu(res.data[1][i].menuID);
      // res.data[1][i].menuName = res2.join("/");
      //   res.data[1][i].type = "";
      // eslint-disable-next-line no-undef
      // let res3 = await frmKuchun.manageSendList(res.data[1][i].MID);
      // for (let y = 0; y < res3.length; y++) {
      //   if (res.data[1][i].type.indexOf(res3[y].type) === -1) {
      //     res.data[1][i].type += res3[y].type + " ";
      //   }
      //   res.data[1][i].userName = "";
      //   // eslint-disable-next-line no-undef
      //   let res4 = await frmKuchun.userList_U(res3[y].userID);
      //   for (let x = 0; x < res4.length; x++) {
      //     if (res.data[1][i].userName.indexOf(res4[x].type) === -1) {
      //       res.data[1][i].userName += res4[x].userName + " ";
      //     }
      //   }
      // }
      // }
      this.tableDataThree = res.data[1];
      console.log("this.tableDataThree: ", this.tableDataThree);
    },
  },
};
</script>

<style lang="scss">
.linnei {
  height: calc(100% - 80px);
  display: flex;
  .content {
    width: 70%;
    > div {
      position: relative;
    }
    .linnei-top {
      padding: 20px;
      box-sizing: border-box;
      background: blue;
      .el-row {
        margin: 50px 0px;
        .el-col {
          display: flex;
          .form-item-label {
            font-size: 40px;
            color: #fff;
            width: 170px;
          }
          .form-item-val {
            width: calc(100% - 170px);
          }
          .el-input {
            font-size: 40px;
            .el-input__inner {
              height: 60px;
              color: black;
            }
          }
          .time {
            width: 100%;
            height: 40px;
            font-size: 36px;
            color: yellow;
            min-width: 190px;
          }
        }
      }
    }
    .plan {
      .el-table {
        //   background: rgba(255, 255, 255, 0.37);
        td,
        th {
          padding: 5px 0px;
        }
        .el-table__body-wrapper {
          .el-table__body {
            .el-table__row {
              td {
                font-size: 24px;
                color: black;
              }
            }
          }
        }
      }
      .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: fixed; //关键样式设置固定定位
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      }

      .contextmenu li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
      }
      .contextmenu li:hover {
        background: #eee;
      }
    }
  }
  .right-table {
    width: 30%;
    .text {
      background: #fff;
      text-align: center;
      font-size: 20px;
    }
    .el-table {
      //   background: rgba(255, 255, 255, 0.37);
      td,
      th {
        padding: 5px 0px;
      }
      .el-table__body-wrapper {
        background: #002c3b;
        .el-table__body {
          .el-table__row {
            td {
              color: #67c23a;
              font-size: 18px;
            }
          }
        }
      }
      .el-table__empty-block {
        background: #002c3b;
      }
      .el-table__row {
        background: #002c3b;
        color: #67c23a;
      }
    }
    .el-table thead.is-group th.el-table__cell {
      background: #002c3b;
      color: #66b1ff;
    }
  }
}
</style>
