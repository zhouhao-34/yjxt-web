<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-10-23 11:16:52
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-26 15:13:17
 * @FilePath: \yjxt-web\src\components\mould.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mould" ref="mould">
    <el-form :inline="true" size="mini" :model="form" class="demo-form-inline">
      <el-form-item label="维保类型">
        <el-select v-model="form.type" clearable placeholder="请选择">
          <el-option label="全部" :value="0"> </el-option>
          <el-option label="保养" :value="1"> </el-option>
          <el-option label="维修" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryList">查询</el-button>
      </el-form-item>
    </el-form>
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
        <el-carousel-item v-for="item in imgList" :key="item">
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
      form: { type: 0 },
      tableData: [],
      tableHeader: [
        { label: "模具名称", prop: "mojuName" },
        { label: "维保类型", prop: "typeName" },
        { label: "使用次数", prop: "mojuNub" },
        { label: "设定寿命", prop: "liftNub" },
        { label: "添加时间", prop: "createTime" },
        { label: "上次维修/保养时间", prop: "boayangTime" },
      ],
      tableHeight: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: null,
      seeImgShow: false,
      imgList: [],
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
    console.log("this.$route.query.type: ", this.$route.query.type);
    if (this.$route.query.type === "保养") {
      this.form.type = 1;
    } else {
      this.form.type = 2;
    }
    this.tableHeight = this.$refs.mould.offsetHeight - 120;
    this.queryList();
  },
  methods: {
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
      res = await frmKuchun.mojuweibaoList(
        this.currentPage - 1,
        this.pageSize,
        this.form.type
      );
      console.log("模具查询: ", res);
      if (res.code === "1") {
        this.total = res.data[0]["0"];
        this.tableData = res.data[1];
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type === 1) {
            this.tableData[i].typeName = "保养";
          } else {
            this.tableData[i].typeName = "维修";
          }
          this.tableData[i].createTime = this.filterTime(
            this.tableData[i].createTime
          );
          this.tableData[i].boayangTime = this.filterTime(
            this.tableData[i].boayangTime
          );
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
    // 取消图片查看
    cancelSee() {
      this.seeImgShow = false;
      this.imgList = [];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    async attachments(v) {
      console.log("v: ", v);
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.weibaoImg(v.byID, 1);
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

<style  lang="scss">
.mould {
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
