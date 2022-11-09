<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-10-24 10:30:04
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 17:37:18
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\manual.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="manual" ref="manual">
    <el-form
      :inline="true"
      :model="queryForm"
      size="mini"
      class="demo-form-inline"
    >
      <el-form-item label="手册名称">
        <el-input v-model="queryForm.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="手册类型">
        <el-select v-model="queryForm.type" placeholder="请选择">
          <el-option label="全部" :value="0"> </el-option>
          <el-option label="模具保养手册" :value="2"> </el-option>
          <el-option label="设备保养手册" :value="1"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="shouceList">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="manual-table">
      <div class="add">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addManualClick"
          >新增手册</el-button
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
        <el-table-column label="操作" width="150" align="center">
          <!--  eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="enclosure(scope.row)"
              >查看附件</el-button
            >
            <el-button type="text" size="small" @click="datamodify(scope.row)"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="dataDelete(scope.row)"
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
    <!-- 新增修改手册 -->
    <el-dialog
      @close="dialogClose"
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" size="mini" :rules="rules" ref="ruleForm">
        <el-form-item label="手册名称" label-width="100px" prop="name">
          <el-input
            style="width: 300px"
            v-model="form.name"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="手册类型" label-width="100px" prop="type">
          <el-select
            style="width: 300px"
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option label="模具保养手册" :value="2"> </el-option>
            <el-option label="设备保养手册" :value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="form.type === 2 ? '关联模具' : '关联设备'"
          label-width="100px"
          prop="tableID"
        >
          <el-cascader
            v-if="form.type === 1"
            style="width: 300px"
            clearable
            v-model="form.tableID"
            :show-all-levels="false"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
          <div
            v-else
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
            <div v-for="(v, i) in mujuSelect" :key="i" class="applymodel-block">
              {{ v.mojuName }}
              <i class="el-icon-close cloce" @click="deleteMuju(i)"></i>
            </div>
          </div>
          <el-button v-if="form.type === 2" @click="xzmuju">选择模具</el-button>
        </el-form-item>
        <el-form-item label="选择文件" prop="img" label-width="100px">
          <div class="choicePhoto" style="width: 300px" v-if="form.img !== ''">
            <div class="textPhoto">{{ form.img }}</div>
            <div>
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                size="mini"
                @click="deleteChoice"
              ></el-button>
            </div>
          </div>
          <el-button @click="selectComplete">选择文件</el-button>
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
    <!-- 选择模具 -->
    <el-dialog title="选择模具" :visible.sync="dialogFormVisibleTwo">
      <div>
        <el-form :inline="true" :model="queryCriteria" class="demo-form-inline">
          <el-form-item label="模具名称">
            <el-input
              v-model="queryCriteria.name"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="上次保养日期">
            <el-date-picker
              v-model="queryCriteria.time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="querymujuList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        height="250"
        border
        ref="multipleTable"
        :data="tableDataTwo"
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
      <el-pagination
        background
        @size-change="handleSizeChangeTwo"
        @current-change="handleCurrentChangeTwo"
        :current-page="currentPageTwo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSizeTwo"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalTwo"
      >
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="mujuSelectClick">确 定</el-button>
      </div>
    </el-dialog>
    <div class="seeImg" @click="cancelSee" v-if="seeImgShow">
      <div class="pdfshow" v-if="seeImgType === 'pdf'">
        <!-- <pdf
          :src="pdfSrc"
          ref="pdf"
          v-for="item in numPages"
          :key="item"
          :page="item"
        ></pdf> -->
        <CPdf :pdfurl="pdfSrc"></CPdf>
        <!-- <iframe
          ref="mainiframe"
          :src="pdfSrc"
          style="height: 100%; width: 100%"
        ></iframe> -->
      </div>
      <img :src="pdfSrc" alt="" v-if="seeImgType === 'img'" />
    </div>
  </div>
</template>

<script>
import CPdf from "../pdf/CPdf.vue";
// import pdf from "vue-pdf";
export default {
  name: "manual",
  components: {
    CPdf,
    // pdf,
    // videoPlayer,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      pdfSrc: "",
      numPages: 0,
      seeImgType: "",
      seeImgShow: false,
      queryForm: {
        name: "",
        type: 0,
      },
      tableHeight: 0,

      tableData: [],
      tableHeader: [
        { label: "手册名称", prop: "shouceName" },
        { label: "手册类型", prop: "tableTypeName" },
        { label: "上传时间", prop: "createTime" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      //所有设备
      equipmentNameOptions: [],
      cascaderProps: {
        value: "menuID",
        label: "menuName",
        children: "children",
        multiple: true,
        emitPath: false,
      },
      title: "新增手册",
      dialogFormVisible: false,
      form: {
        type: 1,
        img: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "手册名称不能为空",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "手册类型不能为空",
            trigger: "blur",
          },
        ],
        tableID: [
          {
            required: true,
            message: "关联模具\\设备不能为空",
            trigger: "blur",
          },
        ],
        img: [
          {
            required: true,
            message: "上传文件不能为空",
            trigger: "blur",
          },
        ],
      },

      dialogFormVisibleTwo: false,
      queryCriteria: { name: "", time: "" },
      tableDataTwo: [],
      tableHeaderTwo: [
        { label: "模具名称", prop: "mojuName" },
        { label: "使用次数", prop: "mojuNub" },
        { label: "设定寿命", prop: "liftNub" },
        { label: "添加时间", prop: "createTime" },
        { label: "上次保养时间", prop: "baoyangTime" },
        { label: "上次维修时间", prop: "weixiuTime" },
      ],
      currentPageTwo: 1,
      pageSizeTwo: 10,
      totalTwo: 0,
      loading: null,

      mujuSelect: [],

      enclosureShow: false,
      enclosureList: [],
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
    this.tableHeight = this.$refs.manual.offsetHeight - 80;
    this.querymujuList();
    this.equipmentNameOptions = JSON.parse(sessionStorage.getItem("treeData"));
    this.shouceList();
    this.maintenance(this.equipmentNameOptions);
    console.log("this.equipmentNameOptions", this.equipmentNameOptions);
  },
  methods: {
    // 根据设备查保养项
    async maintenance(v) {
      for (let i = 0; i < v.length; i++) {
        if (v[i].menuType === 1 && v[i].children) {
          this.maintenance(v[i].children);
        }
        if (v[i].menuType === 2) {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.queryEquipmentConditionTwo(v[i].menuID);
          let arr = [];
          for (let y = 0; y < res.data[1].length; y++) {
            arr.push({
              menuID: res.data[1][y].proID,
              menuName: res.data[1][y].proName,
            });
          }
          if (v[i].children) {
            v[i].children = arr;
          } else {
            v[i].children = [];
            v[i].children = arr;
          }
        }
      }
    },
    //查询模具
    async querymujuList() {
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
      res = await frmKuchun.mojuList(
        this.queryCriteria.name,
        this.queryCriteria.time,
        this.pageSizeTwo,
        this.currentPageTwo - 1
      );
      console.log("模具查询: ", res);
      if (res.code === "1") {
        this.totalTwo = res.data[0]["0"];
        this.tableDataTwo = res.data[1];
        for (let i = 0; i < this.tableDataTwo.length; i++) {
          if (this.tableDataTwo[i].baoyangTime !== null) {
            this.tableDataTwo[i].baoyangTime = this.filterTime(
              this.tableDataTwo[i].baoyangTime
            );
          }
          if (this.tableDataTwo[i].createTime !== null) {
            this.tableDataTwo[i].createTime = this.filterTime(
              this.tableDataTwo[i].createTime
            );
          }
          if (this.tableDataTwo[i].weixiuTime !== null) {
            this.tableDataTwo[i].weixiuTime = this.filterTime(
              this.tableDataTwo[i].weixiuTime
            );
          }
        }
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
    handleSizeChangeTwo(val) {
      this.pageSizeTwo = val;
      this.currentPageTwo = 1;
      this.querymujuList();
    },
    handleCurrentChangeTwo(val) {
      this.currentPageTwo = val;
      this.querymujuList();
    },
    //手册列表查询
    async shouceList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.shouceList(
        this.currentPage - 1,
        this.pageSize,
        this.queryForm.type,
        0,
        this.queryForm.name
      );
      if (res.code === "1") {
        this.total = res.data[0][0];
        this.tableData = res.data[1];
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].tableType === 2) {
            this.tableData[i].tableTypeName = "模具保养手册";
          } else {
            this.tableData[i].tableTypeName = "设备保养手册";
          }
          this.tableData[i].createTime = this.filterTime(
            this.tableData[i].createTime
          );
        }
      }
      console.log("手册列表查询: ", res);
      this.loading.close();
    },
    //新增手册按钮
    addManualClick() {
      this.title = "新增手册";
      this.dialogFormVisible = true;
    },
    //选择模具
    xzmuju() {
      this.dialogFormVisibleTwo = true;
    },
    //模具选择的回调
    handleSelectionChange(val) {
      console.log("val: ", val);
      this.mujuSelect = val;
    },
    //模具选择确认
    mujuSelectClick() {
      let arr = [];
      for (let i = 0; i < this.mujuSelect.length; i++) {
        arr.push(this.mujuSelect[i].mjID);
      }
      this.form.tableID = arr;
      this.dialogFormVisibleTwo = false;
    },
    // 删除选择模具
    deleteMuju(i) {
      [this.mujuSelect[i]].forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.form.tableID.splice(i, 1);
    },
    // 选择文件
    async selectComplete() {
      console.log(111);
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.uploadImgTwo(2);
      console.log("res: ", res);
      if (res !== "") {
        this.form.img = res;
      }
      // this.form.img.push(res);
      // this.$forceUpdate();
    },
    //删除已选
    deleteChoice() {
      this.form.img = "";
      this.$forceUpdate();
    },
    //新增修改确认按钮
    dialogOK() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true,
            text: "正在上传",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            this.loading.close();
          }, 30000);
          let user = JSON.parse(localStorage.getItem("user"));
          console.log("this.form", this.form);
          let res = null;
          if (this.title !== "修改手册") {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.weibaoShouCe(
              this.form.type,
              this.form.tableID,
              this.form.img,
              user.userID,
              this.form.name
            );
          } else {
            // eslint-disable-next-line no-undef
            res = await frmKuchun.weibaoShouCeEdit(
              this.form.type,
              this.form.tableID,
              this.form.img,
              user.userID,
              this.form.name,
              this.form.scID
            );
          }
          console.log("新增修改确认按钮: ", res);
          if (res.data === "成功") {
            this.dialogFormVisible = false;
          }
          this.shouceList();
          // console.log("res: ", res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增修改手册弹窗框关闭
    dialogClose() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        type: 1,
        img: "",
      };
    },
    //查看附件
    enclosure(v) {
      console.log("v: ", v);
      if (v.houzui === ".mp4") {
        // eslint-disable-next-line no-undef
        frmKuchun.yulan(v.houzui, v.filePath);
      } else if (v.houzui === ".pdf" || v.houzui === ".PDF") {
        // window.open(v.filePath, "_blank");
        this.pdfSrc = v.filePath;
        this.seeImgType = "pdf";
        this.seeImgShow = true;
      } else {
        this.pdfSrc = v.filePath;
        this.seeImgType = "img";
        this.seeImgShow = true;
      }
    },
    // 取消附件查看
    cancelSee() {
      this.seeImgShow = false;
    },
    // 修改手册按钮
    datamodify(v) {
      console.log("v: ", v);
      let tableID = [];
      for (let i = 0; i < v.shebeiName.length; i++) {
        tableID.push(v.shebeiName[i].shebeiID);
      }
      this.title = "修改手册";
      this.dialogFormVisible = true;
      this.form = {
        name: v.shouceName,
        type: v.tableType,
        img: v.filePath,
        tableID,
        scID: v.scID,
      };
    },

    // 删除手册
    dataDelete(v) {
      this.$confirm("是否删除当前手册", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          // eslint-disable-next-line no-undef
          res = await frmKuchun.weibaoShouCeDel(v.scID);
          console.log("res: ", res);
          if (res.data === "成功") {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.shouceList();
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
      this.shouceList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.shouceList();
    },
  },
};
</script>

<style  lang="scss">
.manual {
  width: 100%;
  height: calc(100% - 60px);
  .el-form {
    margin-top: 5px;
  }
  .manual-table {
    width: 100%;
    position: relative;

    .add {
      position: absolute;
      right: 0px;
      top: -45px;
    }
  }
  .pagination {
    text-align: right;
    margin-top: 10px;
  }
  .choicePhoto {
    background: #ebeef5;
    padding: 5px 5px;
    box-sizing: border-box;
    display: flex;
    margin: 5px 0px;
    .textPhoto {
      line-height: 14px;
    }
  }

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
  .seeImg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    background: rgba(0, 0, 0, 0.7);
    left: 0px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    .pdfshow {
      width: 50%;
      height: 90%;
    }
    img {
      width: 50%;
      max-height: 99%;
    }
    .video-player {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
