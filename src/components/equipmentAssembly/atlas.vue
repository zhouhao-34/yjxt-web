<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-07 13:57:55
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 15:01:00
 * @FilePath: \yjxt-web\src\components\equipmentAssembly\atlas.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="atlas" ref="atlas" :style="displayTypeJudge()">
    <div
      class="block"
      :class="displayType === 'comprehensive' ? '' : 'block-simplicity'"
      v-for="(v, i) in equipmentData"
      :key="i"
      :style="letRightmargin()"
    >
      <div
        class="left"
        :class="displayType === 'comprehensive' ? '' : 'left-simplicity'"
      >
        <div
          class="title"
          :class="displayType === 'comprehensive' ? '' : 'title-simplicity'"
          :title="v.proName"
        >
          <span>
            {{ v.proName }}
          </span>
          <el-dropdown
            v-if="displayType !== 'comprehensive'"
            @command="
              (key) => {
                handleCommand(key, v);
              }
            "
          >
            <span class="el-dropdown-link">
              <i class="el-icon-setting" style="font-size: 24px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit" command="1"
                >修改</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-delete" command="4"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="img">
          <img :src="v.imgPath" alt="加载失败" />
        </div>
        <div
          class="simplicityVal"
          v-if="displayType !== 'comprehensive'"
          :style="
            v.DValue < v.yujingValue
              ? { background: '#67C23A' }
              : v.DValue < v.lifeValue
              ? { background: '#E6A23C' }
              : { background: '#F56C6C' }
          "
        >
          <div>
            <div class="simplicityVal-title">当前值：</div>
            <div class="simplicityVal-val">
              {{ v.DValue }}
            </div>
          </div>
          <div>
            <div class="simplicityVal-title">预警值：</div>
            <div class="simplicityVal-val">
              {{ v.yujingValue }}
            </div>
          </div>
          <div>
            <div class="simplicityVal-title">寿命：</div>
            <div class="simplicityVal-val">
              {{ v.lifeValue }}
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-if="displayType === 'comprehensive'">
        <div
          class="title"
          :style="
            v.DValue < v.yujingValue
              ? { background: '#67C23A' }
              : v.DValue < v.lifeValue
              ? { background: '#E6A23C' }
              : { background: '#F56C6C' }
          "
        >
          <div class="setUp">
            <el-dropdown
              @command="
                (key) => {
                  handleCommand(key, v);
                }
              "
            >
              <span class="el-dropdown-link">
                <i class="el-icon-setting" style="font-size: 24px"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="1"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-setting" command="2"
                  >维保</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-refresh" command="3"
                  >更换</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-delete" command="4"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <div>当前值：{{ v.DValue }}</div>
          <div>预警值：{{ v.yujingValue }}</div> -->
        </div>
        <div class="table">
          <div class="row bottom">
            <div class="col left">当前值:</div>
            <div class="col right">
              {{ v.DValue
              }}{{
                v.unit === "工作次数"
                  ? "次"
                  : v.unit === "通电小时" || v.unit === "工作小时"
                  ? "小时"
                  : "天"
              }}
            </div>
          </div>

          <div class="row bottom">
            <div class="col left">预警值:</div>
            <div class="col right">
              {{ v.yujingValue
              }}{{
                v.unit === "工作次数"
                  ? "次"
                  : v.unit === "通电小时" || v.unit === "工作小时"
                  ? "小时"
                  : "天"
              }}
            </div>
          </div>
          <div class="row bottom">
            <div class="col left">设定寿命:</div>
            <div class="col right">
              {{ v.lifeValue
              }}{{
                v.unit === "工作次数"
                  ? "次"
                  : v.unit === "通电小时" || v.unit === "工作小时"
                  ? "小时"
                  : "天"
              }}
            </div>
          </div>
          <div class="row">
            <div class="col left">剩余寿命(天):</div>
            <div class="col right">
              {{ v.surplusLife }}
            </div>
            <div></div>
          </div>
        </div>
      </div>
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
      :dialogTitle="dialogTitle"
      :form="form"
      :plcForm="plcForm"
      :handleForm="handleForm"
    ></dialogIndex>
  </div>
</template>

<script>
import dialogIndex from "../../components/dialog/index.vue";
export default {
  name: "",
  components: {
    dialogIndex,
  },
  props: {
    containerHeight: {
      type: Number,
    },
    containerWidth: {
      type: Number,
    },
  },
  data() {
    return {
      //设备
      equipmentData: [],
      // 展示类型（comprehensive 全面  simplicity 简约）
      displayType: "comprehensive",

      currentPage: 1,
      pageSize: 10,
      total: 0,

      // plc数据集合
      plcOption: [],
      // 添加、修改对话框标题
      dialogTitle: "添加保养预警项",
      // 添加、修改对话框开关
      dialogFormVisible: false,
      // 添加修改表单数据
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
      loading: null,
      timer: null,
      user: JSON.parse(localStorage.getItem("user")),

      handleForm: { notice: 0 },
    };
  },
  computed: {
    nodeData() {
      return this.$store.state.nodeData;
    },
    refresh() {
      return this.$store.state.refresh;
    },
  },
  watch: {
    nodeData: {
      immediate: true,
      deep: true,
      handler: function (v) {
        if (v.length > 0) {
          this.equipmentConditionQuery(v[v.length - 1].menuID);
        }
      },
    },
    refresh: {
      immediate: true,
      deep: true,
      handler: function (v) {
        if (v.bool) {
          this.equipmentConditionQuery(
            this.nodeData[this.nodeData.length - 1].menuID
          );
          if (v.name !== "") {
            for (const key in this[v.name]) {
              this[v.name][key] = "";
            }
          }
          this.$store.commit("setrefresh", { bool: false, name: "" });
        }
      },
    },
  },
  created() {},
  beforeMount() {},
  mounted() {
    console.log("containerWidth", this.containerWidth);
    this.timer = setInterval(() => {
      if (this.nodeData.length > 0) {
        this.equipmentConditionQuery(
          this.nodeData[this.nodeData.length - 1].menuID
        );
      }
    }, 60000);
    this.queryPlc();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
      console.log("关闭: ");
    } //利用vue的生命周期函数
  },
  methods: {
    // 查询plc
    async queryPlc() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.plcList();
      this.plcOption = res.data;
    },
    // 根据设备id查保养项
    async equipmentConditionQuery(menuID) {
      console.log("menuID: ", menuID);
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
      res = await frmKuchun.queryEquipmentCondition(
        menuID,
        this.currentPage - 1,
        this.pageSize
      );
      console.log("liebiao");
      this.total = res.data[0]["0"];
      if (res.code === "1") {
        for (let i = 0; i < res.data[1].length; i++) {
          res.data[1][i].surplusLife =
            res.data[1][i].lifeValue - res.data[1][i].DValue > 0
              ? res.data[1][i].meitian > 0
                ? (
                    (res.data[1][i].lifeValue - res.data[1][i].DValue) /
                    res.data[1][i].meitian
                  ).toFixed(1)
                : "/"
              : "寿命已尽";
        }
        this.equipmentData = res.data[1];
        console.log("this.equipmentData: ", this.equipmentData);
      }
      this.loading.close();
    },
    // 设备框宽高计算
    letRightmargin() {
      let a = 0;
      if (this.displayType === "comprehensive") {
        a =
          Math.floor(
            (this.containerWidth -
              453 * Math.floor(this.containerWidth / 453)) /
              Math.floor(this.containerWidth / 453)
          ) / 2;
      } else {
        a =
          Math.floor(
            (this.containerWidth -
              203 * Math.floor(this.containerWidth / 203)) /
              Math.floor(this.containerWidth / 203)
          ) / 2;
      }
      return {
        margin: "10px " + a + "px",
      };
    },
    // 页面加载时判断展示类型
    displayTypeJudge() {
      let num =
        (this.containerHeight - 100) / 255 -
        this.equipmentData.length / Math.round(this.containerWidth / 453);
      if (num >= 1) {
        this.displayType = "comprehensive";
      } else {
        this.displayType = "simplicity";
      }
      return "";
    },
    // 点击设备设置菜单
    async handleCommand(key, v) {
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
      if (key === "1") {
        this.form = JSON.parse(JSON.stringify(v));
        let res = null;
        // eslint-disable-next-line no-undef
        res = await frmKuchun.proEdit_list(v.proID);
        this.form.plcSetUp = res.data[0].plcListID;
        this.form.plcListID = res.data[0].plcListID;
        let res1 = null;
        // eslint-disable-next-line no-undef
        res1 = await frmKuchun.userList(v.proID);
        this.form.notice = 0;
        for (let i = 0; i < res1.data.length; i++) {
          this.form.notice = res1.data[i].userID;
        }
        this.form.menuValue = v.menuName;
        this.form.menuValueID = v.menuID;
        if (this.form.unit !== "自然日") {
          // 查询plc数据
          let res2 = null;
          // eslint-disable-next-line no-undef
          res2 = await frmKuchun.plc_listList(this.form.plcListID * 1);
          this.plcForm = res2.data[0];
          this.plcForm.chufa += "";
          this.plcForm.PLC_addressType1 = res2.data[0].where_PLC_addressType;
        }
        this.dialogTitle = "修改";
        this.$refs.dialogIndex.dialogFormVisible = true;
      }
      if (key === "2") {
        // this.handleDialogFormVisible = true;
        this.$refs.dialogIndex.handleDialogFormVisible = true;
        this.handleForm = JSON.parse(JSON.stringify(v));

        this.handleForm.menuValue = v.menuName;
        this.handleForm.menuValueID = v.menuID;
      }
      if (key === "3") {
        this.form = JSON.parse(JSON.stringify(v));
        console.log("this.form: ", this.form);
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
          this.form.notice = res2.data[i].userID;
        }
        console.log(" this.form.notice: ", this.form.notice);
        this.dialogTitle = "更换设备";
        this.$refs.dialogIndex.dialogFormVisible = true;
      }
      if (key === "4") {
        this.$confirm("是否删除当前设备", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = null;
            // eslint-disable-next-line no-undef
            res = await frmKuchun.proDel(v.proID);
            console.log("res: ", res);
            this.equipmentConditionQuery(
              this.nodeData[this.nodeData.length - 1].menuID
            );
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.equipmentConditionQuery(
        this.nodeData[this.nodeData.length - 1].menuID
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.equipmentConditionQuery(
        this.nodeData[this.nodeData.length - 1].menuID
      );
    },
  },
};
</script>

<style  lang="scss">
.atlas {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  .button {
    position: absolute;
  }
  .block {
    border: 1px solid #f2f6fc;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    height: 255px;
    .left {
      border-right: 1px solid #f2f6fc;
      position: relative;
      .setUp {
        position: absolute;
        right: 10px;
        top: 15px;
        cursor: pointer;
      }
      .title {
        width: 200px;
        border-radius: 10px 0px 0px 0px;
        border-bottom: 1px solid #f2f6fc;
        text-align: center;
        height: 50px;
        background: rgb(255, 246, 236);
        position: relative;
        > span {
          display: inline-block;
          width: 120px;
          line-height: 50px;
          overflow: hidden; /*超出的文本隐藏*/
          text-overflow: ellipsis; /* 溢出用省略号*/
          white-space: nowrap;
          -webkit-line-clamp: 1;
        }
        .el-dropdown {
          position: absolute;
          bottom: 15px;
          right: 10px;
        }
      }
      .title-simplicity {
        border-radius: 10px 10px 0px 0px;
      }
      .img {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 160px;
          height: 160px;
        }
      }
      .simplicityVal {
        border-radius: 0px 0px 10px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgb(225, 243, 216);
        height: 60px;
        > div {
          display: flex;
          width: 100%;
          .simplicityVal-title {
            width: 50%;
            text-align: right;
          }
          .simplicityVal-val {
            width: 50%;
          }
        }
      }
    }
    .left-simplicity {
      border: 0px;
    }
    .right {
      width: 250px;
      .title {
        border-radius: 0px 10px 0px 0px;
        height: 51px;
        border-bottom: 1px solid #f2f6fc;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
      }
      .table {
        height: calc(100% - 51px);
        .row {
          height: 50px;
          display: flex;
          .left {
            width: 70%;
          }
          .right {
            width: 30%;
          }
          .col {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .bottom {
          border-bottom: 1px solid #f2f6fc;
        }
      }
    }
  }
  .block-simplicity {
    height: 313px;
  }
  .add-simplicity {
    width: 200px;
  }
  .plcSetUpDialog {
    .el-input {
      width: 200px;
    }
  }
  .pagination {
    position: absolute;
    bottom: 10px;
    left: 20px;
  }
}
.imgList {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 10px;
    border: 1px solid #fff;
  }
  > div:hover {
    border: 1px solid #409eff;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
.atlas::-webkit-scrollbar {
  display: none;
}
</style>
