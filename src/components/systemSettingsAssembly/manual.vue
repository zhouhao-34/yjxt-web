<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-10-24 10:30:04
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-25 10:21:57
 * @FilePath: \yjxt-web\src\components\systemSettingsAssembly\manual.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="manual" ref="manual">
    <el-form
      :inline="true"
      :model="queryCriteria"
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
        <el-table-column label="操作" width="100" align="center">
          <!--  eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="enclosure(scope.row)"
              >查看附件</el-button
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
          <div
            class="choicePhoto"
            v-for="(v, i) in form.img"
            :key="i"
            style="width: 300px"
          >
            <div class="textPhoto">{{ v }}</div>
            <div>
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                size="mini"
                @click="deleteChoice(i)"
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
        <pdf
          :src="pdfSrc"
          ref="pdf"
          v-for="item in numPages"
          :key="item"
          :page="item"
        ></pdf>
      </div>
      <img :src="pdfSrc" alt="" v-if="seeImgType === 'img'" />
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
// import videoPlayer from "vue-video-player";
// import "video.js/dist/video-js.css";
export default {
  name: "manual",
  components: {
    pdf,
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
      },
      title: "新增手册",
      dialogFormVisible: false,
      form: {
        type: 1,
        img: [],
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
    this.tableHeight = this.$refs.manual.offsetHeight - 100;
    this.querymujuList();
    this.queryTreeData();
    this.shouceList();
  },
  methods: {
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
    // 查询设备
    async queryTreeData() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryTreeData();

      if (res.code === "1") {
        // 所有数据
        let arr = res.data;
        console.log("arr: ", arr);
        // 筛选出来的一级菜单
        let arr1 = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parentID === 0) {
            arr1.push({
              ...arr[i],
              id: arr[i].menuID + "",
              pid: 0,
            });
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
        console.log("this.查询设备: ", this.equipmentNameOptions);
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
          array.push({
            ...arr[i],
            id: arr[i].menuID + "",
            pid: arr[i].menuID + "-" + (i + 1),
          });
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
      this.form.img.push(res);
      this.$forceUpdate();
    },
    //删除已选
    deleteChoice(i) {
      this.form.img.splice(i, 1);
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
          // eslint-disable-next-line no-undef
          let res = await frmKuchun.weibaoShouCe(
            this.form.type,
            this.form.tableID,
            this.form.img,
            user.userID,
            this.form.name
          );
          if (res.data === "成功") {
            this.dialogFormVisible = false;
          }
          this.shouceList();
          console.log("res: ", res);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增修改手册弹窗框关闭
    dialogClose() {
      this.$refs.ruleForm.resetFields();
      this.form = {};
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
        this.getNumPages();
        this.seeImgShow = true;
      } else {
        this.pdfSrc = v.filePath;
        this.seeImgType = "img";
        this.seeImgShow = true;
      }
    },
    //计算pdf页码总数
    getNumPages() {
      let loadingTask = pdf.createLoadingTask(this.pdfSrc);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
    },
    // 取消附件查看
    cancelSee() {
      this.seeImgShow = false;
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
    margin: 10px 0px;
  }
  .manual-table {
    width: 100%;
    position: relative;

    .add {
      position: absolute;
      right: 0px;
      top: -55px;
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
      overflow: auto;
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
