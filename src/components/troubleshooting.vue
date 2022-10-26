<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-14 10:21:06
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 15:33:10
 * @FilePath: \yjxt-web\src\components\troubleshooting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="troubleshooting" ref="troubleshooting">
    <div>
      <el-form
        :inline="true"
        size="mini"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="产线/设备">
          <el-cascader
            clearable
            v-model="formInline.menuID"
            :options="equipmentNameOptions"
            :props="cascaderProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="维保类型">
          <el-select v-model="formInline.type" clearable placeholder="请选择">
            <el-option label="全部" :value="0"> </el-option>
            <el-option label="保养" :value="1"> </el-option>
            <el-option label="维修" :value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
        </el-form-item>
      </el-form>
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
        <el-table-column label="操作" width="100" align="center">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <el-button @click="attachments(scope.row)" type="text" size="small"
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
    <div class="seeImg" @click="cancelSee" v-if="seeImgShow">
      <el-carousel>
        <el-carousel-item v-for="(item, i) in imgList" :key="i">
          <img
            style="width: 100%; height: 100%"
            :src="item.imgPath"
            alt=""
            srcset=""
          />
        </el-carousel-item>
      </el-carousel>
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
      formInline: { menuID: [], type: 0 },
      equipmentNameOptions: [],
      cascaderProps: {
        children: "children",
        label: "menuName",
        checkStrictly: true,
        value: "menuID",
      },
      tableHeight: 0,
      tableData: [],
      tableHeader: [
        { label: "序号", prop: "CLID", width: "50" },
        { label: "产线/设备", prop: "menuName" },
        { label: "保养内容", prop: "proName" },
        { label: "设置寿命", prop: "lifeValue" },
        { label: "预警值", prop: "yujingValue" },
        { label: "当前值", prop: "DValue" },
        { label: "单位", prop: "unit" },
        { label: "处理方式", prop: "typeCLName" },
        { label: "设置预警值", prop: "yujingValue" },
        { label: "处理人", prop: "userName" },
        { label: "处理时间", prop: "createTimeCL" },
        { label: "备注", prop: "mark" },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      imgList: [],
      seeImgShow: false,
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {0
    //
    //}
    //}
  },
  created() {},
  mounted() {
    if (this.$route.query.type === "保养") {
      this.formInline.type = 1;
    } else {
      this.formInline.type = 3;
    }
    this.tableHeight = this.$refs.troubleshooting.offsetHeight - 120;
    this.equipmentNameOptions = JSON.parse(sessionStorage.getItem("treeData"));
    this.queryList();
  },
  methods: {
    async queryList() {
      let res = null;
      this.tableData = [];

      // eslint-disable-next-line no-undef
      res = await frmKuchun.proLogListCL(
        this.currentPage,
        this.pageSize - 1,
        this.formInline.menuID.length > 0
          ? this.formInline.menuID[this.formInline.menuID.length - 1]
          : 0,
        this.formInline.type
      );
      console.log("res: ", res);
      this.total = res.data[0]["0"];
      for (let i = 0; i < res.data[1].length; i++) {
        if (res.data[1][i].typeCL === 1) {
          res.data[1][i].typeCLName = "保养";
        } else {
          res.data[1][i].typeCLName = "维修";
        }
        res.data[1][i].createTimeCL = this.filterTime(
          res.data[1][i].createTimeCL
        );
        // eslint-disable-next-line no-undef
        let res2 = await frmKuchun.getSysMenu(res.data[1][i].menuID);
        res.data[1][i].menuName = res2.join("/");
        res.data[1][i].type = "";
        // eslint-disable-next-line no-undef
        let res3 = await frmKuchun.manageSendList(res.data[1][i].MID);
        for (let y = 0; y < res3.length; y++) {
          if (res.data[1][i].type.indexOf(res3[y].type) === -1) {
            res.data[1][i].type += res3[y].type + " ";
          }
          res.data[1][i].userName = "";
          // eslint-disable-next-line no-undef
          let res4 = await frmKuchun.userList_U(res3[y].userID);
          for (let x = 0; x < res4.length; x++) {
            if (res.data[1][i].userName.indexOf(res4[x].type) === -1) {
              res.data[1][i].userName += res4[x].userName + " ";
            }
          }
        }
      }
      this.tableData = res.data[1];
      console.log("this.tableData: ", this.tableData);
    },
    // 时间转换
    filterTime(time) {
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
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    // 取消图片查看
    cancelSee() {
      this.seeImgShow = false;
      this.imgList = [];
    },
    async attachments(v) {
      console.log("v: ", v);
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.weibaoImg(v.CLID, 2);
      console.log("res: ", res);
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].houzui === ".png" ||
            res.data[i].houzui === ".PNG" ||
            res.data[i].houzui === ".jpg" ||
            res.data[i].houzui === ".JPG"
          ) {
            this.imgList.push(res.data[i]);
          }
        }
        this.seeImgShow = true;
      } else {
        this.$message({
          message: "暂无附件",
          type: "warning",
        });
      }

      console.log("this.imgList: ", this.imgList);
    },
  },
};
</script>

<style scoped lang="scss">
.troubleshooting {
  height: calc(100% - 60px);
  width: 100%;
  box-sizing: border-box;
  background: #ebeef5;
  padding: 20px;
  .pagination {
    text-align: right;
    margin-top: 10px;
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
    .el-carousel {
      width: 50%;
      height: 50%;
      .el-carousel__container {
        height: calc(100%);
      }
    }
  }
}
</style>
