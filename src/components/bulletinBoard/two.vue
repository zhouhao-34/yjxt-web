div<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-11 16:21:35
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-07-12 12:39:32
 * @FilePath: \yjxt-web\src\components\bulletinBoard\two.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="two">
    <dv-border-box-6 :color="['rgb(64, 158, 255)', 'rgb(64, 158, 255)']">
      <div class="title">预警系统看板</div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(v, i) in navigation" :key="i">
          <span @click="breadcrumbClick(v, i)" style="cursor: pointer">
            {{ v.label }}</span
          >
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="hidejournal" @click="hidejournalClick">
        <i class="el-icon-arrow-right" v-if="journalShow"></i>
        <i class="el-icon-arrow-left" v-else></i>
      </div>
      <div class="chart-content">
        <div class="content-left" id="content-left">
          <div class="contentChart" :key="domRefresh">
            <dv-border-box-11
              :title="v.label"
              v-for="(v, i) in dataList"
              :key="i"
              :id="'enlarge' + i"
              :ref="`enlarge${i}`"
              :style="
                dataList.length > 1
                  ? { margin: '0 0.5%' }
                  : { width: '99%', height: '99%' }
              "
            >
              <div
                class="titleClick"
                @dblclick="doubleClick(v)"
                v-if="dataList.length > 1"
              ></div>
              <div class="enlarge" v-if="dataList.length > 1">
                <i
                  class="el-icon-full-screen"
                  @click="enlarge(v, i)"
                  v-if="
                    changeRecord.length === 0
                      ? true
                      : changeRecord.indexOf(i) !== -1
                      ? false
                      : true
                  "
                ></i>
                <i class="el-icon-copy-document" @click="narrow(i)" v-else></i>
              </div>
              <div class="block-content">
                <div
                  :ref="'chart' + i"
                  :id="'chart' + i"
                  style="margin: 0px 0.5%"
                  :style="{ width: '100%', height: '100%' }"
                ></div></div
            ></dv-border-box-11>
          </div>
        </div>
        <div class="content-right" id="content-right" v-if="journalShow">
          <dv-border-box-9
            ><div class="content">
              <div class="title">
                <dv-decoration-7 style="width: 200px; height: 30px"
                  >预警日志</dv-decoration-7
                >
              </div>
              <div class="data">
                <dv-border-box-4
                  :color="
                    v.type === '2'
                      ? ['#E6A23C', '#409EFF']
                      : ['#F56C6C', '#409EFF']
                  "
                  v-for="(v, i) in rizhiData"
                  :key="i"
                  :reverse="i % 2 !== 0 ? true : false"
                >
                  <div class="left">
                    <div class="top">{{ v.title }}</div>
                    <div class="bottom">
                      <img
                        v-if="v.type === '2'"
                        src="../../assets/jinggao.png"
                        alt=""
                      />
                      <img
                        v-if="v.type === '3'"
                        src="../../assets/weixian.png"
                        alt=""
                      />
                      <div class="detailed">
                        <div>{{ v.name }}</div>
                        <div>
                          <span class="label">当前值:</span
                          >{{ v.currentVal }}小时
                        </div>
                        <div>
                          <span class="label"
                            >{{ v.type === "2" ? "预警值" : "设定寿命" }}:</span
                          >{{ v.earlyWarningVal }}小时
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="right">
                    <dv-decoration-9
                      :dur="5"
                      :color="
                        v.type === '2'
                          ? ['#E6A23C', '#409EFF']
                          : ['#F56C6C', '#409EFF']
                      "
                      style="width: 150px; height: 150px"
                      >已通知</dv-decoration-9
                    >
                  </div>
                </dv-border-box-4>
              </div>
            </div></dv-border-box-9
          >
        </div>
      </div>
    </dv-border-box-6>
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
      dataList: [],
      //大小变化记录
      changeRecord: [],
      navigation: [{ label: "全部", id: 1 }],
      domRefresh: 0,
      journalShow: true,
      rizhiData: [
        {
          title: "1号楼生产车间--大型冲床生产线",
          name: "1号机械手--齿轮箱",
          currentVal: "10001",
          earlyWarningVal: "10000",
          type: "2",
        },
        {
          title: "1号楼生产车间--大型冲床生产线",
          name: "1号机械手--齿轮箱",
          currentVal: "10001",
          earlyWarningVal: "10000",
          type: "3",
        },
        {
          title: "1号楼生产车间--大型冲床生产线",
          name: "1号机械手--齿轮箱",
          currentVal: "10001",
          earlyWarningVal: "10000",
          type: "3",
        },
        {
          title: "1号楼生产车间--大型冲床生产线",
          name: "1号机械手--齿轮箱",
          currentVal: "10001",
          earlyWarningVal: "10000",
          type: "3",
        },
        {
          title: "1号楼生产车间--大型冲床生产线",
          name: "1号机械手--齿轮箱",
          currentVal: "10001",
          earlyWarningVal: "10000",
          type: "3",
        },
      ],
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
  created() {
    this.dataList = this.$store.state.bulletinBoard;
  },
  mounted() {
    for (let i = 0; i < this.dataList.length; i++) {
      this.init("chart" + i, this.dataList[i]);
    }
  },
  methods: {
    init(id, val) {
      var myChart = this.$echarts.init(document.getElementById(id));
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      for (let i = 0; i < val.subordinate.length; i++) {
        arr.push({
          value: val.subordinate[i].label,
          textStyle: {
            color: "#fff",
          },
        });
        arr1.push(val.subordinate[i].value1);
        arr2.push(val.subordinate[i].value2);
        arr3.push(val.subordinate[i].value3);
        arr4.push(val.subordinate[i].value4);
      }
      myChart.clear();
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: {
          type: "category",
          data: arr,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "已设置预警",
            type: "bar",
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              focus: "series",
            },
            data: arr1,
          },
          {
            name: "正常工作",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              focus: "series",
            },
            data: arr2,
          },
          {
            name: "到达预警值",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              focus: "series",
            },
            data: arr3,
          },
          {
            name: "到达寿命",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              focus: "series",
            },
            data: arr4,
          },
        ],
      });
    },
    dashboardInit(id, val) {
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      for (let i = 0; i < val.subordinate.length; i++) {
        arr.push({
          value: val.subordinate[i].label,
          textStyle: {
            color: "#fff",
          },
        });
        arr1.push(val.subordinate[i].value);
        arr2.push(val.subordinate[i].value2);
        arr3.push(val.subordinate[i].value3);
      }
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.clear();
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {},
        xAxis: {
          type: "category",
          data: arr,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "当前值",
            type: "bar",
            data: arr1,
            color: "#5470c6",
          },
          {
            name: "预警值",
            type: "bar",
            data: arr2,
            color: "#fac858",
          },
          {
            name: "寿命",
            type: "bar",
            data: arr3,
            color: "#ee6666",
          },
        ],
      });
    },
    hidejournalClick() {
      if (this.journalShow) {
        this.journalShow = !this.journalShow;
        document.getElementById("content-left").style.width = "100%";
        this.domRefresh++;
      } else {
        this.journalShow = !this.journalShow;
        document.getElementById("content-left").style.width = "70%";
        this.domRefresh++;
      }
      if (this.navigation.length === 1) {
        this.$nextTick(() => {
          for (let i = 0; i < this.dataList.length; i++) {
            this.init("chart" + i, this.dataList[i]);
          }
        });
      } else {
        this.breadcrumbClick(
          this.navigation[this.navigation.length - 1],
          this.navigation.length - 1
        );
      }
    },
    // 放大缩小
    enlarge(v, i) {
      document.getElementById("enlarge" + i).style.width = "99%";
      document.getElementById("enlarge" + i).style.height = "100%";
      this.$refs[`enlarge${i}`][0].$el.scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
      this.changeRecord.push(i);
      var myChart = this.$echarts.init(document.getElementById("chart" + i));
      myChart.resize();
    },
    narrow(i) {
      document.getElementById("enlarge" + i).style.width = "49%";
      document.getElementById("enlarge" + i).style.height = "45%";
      this.$refs["enlarge" + i][0].$el.scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
      var myChart = this.$echarts.init(document.getElementById("chart" + i));
      myChart.resize();
      this.changeRecord.splice(this.changeRecord.indexOf(i), 1);
    },
    breadcrumbClick(v, i) {
      if (v.id === 1) {
        this.dataList = this.$store.state.bulletinBoard;
        this.navigation = [{ label: "全部", id: 1 }];
        this.$nextTick(() => {
          for (let i = 0; i < this.dataList.length; i++) {
            this.init("chart" + i, this.dataList[i]);
            var myChart = this.$echarts.init(
              document.getElementById("chart" + i)
            );
            myChart.resize();
          }
        });
      } else {
        if (i !== this.navigation.length - 1) {
          this.navigation.splice(i + 1, this.navigation.length - i);
        }
      }
      if (v.hierarchy === "first") {
        if (v.subordinate.length > 0 && v.subordinate[0].hierarchy !== "end") {
          this.dataList = v.subordinate;
          this.$nextTick(() => {
            for (let i = 0; i < this.dataList.length; i++) {
              this.dashboardInit("chart" + i, this.dataList[i]);
              var myChart = this.$echarts.init(
                document.getElementById("chart" + i)
              );
              myChart.resize();
            }
          });
        }
      }
      if (v.hierarchy === "middle") {
        if (v.subordinate.length > 0 && v.subordinate[0].hierarchy === "end") {
          this.dataList = [];
          this.dataList.push(v);

          this.$nextTick(() => {
            for (let i = 0; i < this.dataList.length; i++) {
              this.dashboardInit("chart" + i, this.dataList[i]);
              var myChart = this.$echarts.init(
                document.getElementById("chart" + i)
              );
              myChart.resize();
            }
          });
        }
      }
    },
    doubleClick(v) {
      this.navigation.push(v);
      this.renderChart(v);
    },
    renderChart(v) {
      if (v.hierarchy === "first") {
        if (v.subordinate.length > 0 && v.subordinate[0].hierarchy !== "end") {
          this.dataList = v.subordinate;
          this.$nextTick(() => {
            for (let i = 0; i < this.dataList.length; i++) {
              this.dashboardInit("chart" + i, this.dataList[i]);
              var myChart = this.$echarts.init(
                document.getElementById("chart" + i)
              );
              myChart.resize();
            }
          });
        }
      }
      if (v.hierarchy === "middle") {
        if (v.subordinate.length > 0 && v.subordinate[0].hierarchy === "end") {
          this.dataList = [];
          this.dataList.push(v);

          this.$nextTick(() => {
            for (let i = 0; i < this.dataList.length; i++) {
              this.dashboardInit("chart" + i, this.dataList[i]);
              var myChart = this.$echarts.init(
                document.getElementById("chart" + i)
              );
              myChart.resize();
            }
          });
        }
      }
    },
  },
};
</script>

<style  lang="scss">
.two {
  color: #fff;
  .dv-border-box-6 {
    .border-box-content {
      padding: 20px;
      box-sizing: border-box;

      .title {
        font-size: 18px;
        text-align: center;
      }
      .el-breadcrumb {
        position: absolute;
        top: 20px;
        .el-breadcrumb__item {
          .el-breadcrumb__inner {
            color: #fff;
            font-size: 18px;
          }
        }
        .el-breadcrumb__item:last-child {
          .el-breadcrumb__inner {
            color: #409eff;
            font-size: 18px;
          }
        }
      }
      .hidejournal {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      .chart-content {
        height: calc(100% - 24px);
        display: flex;
        .content-left {
          height: 100%;
          width: 70%;
          .contentChart {
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            overflow-y: scroll;
            .dv-border-box-11 {
              width: 49%;
              height: 45%;
              .border-box-content {
                position: relative;
                .titleClick {
                  position: absolute;

                  width: 250px;
                  height: 60px;
                  left: calc(50% - 125px);
                  top: 0px;
                }
                .enlarge {
                  position: absolute;
                  right: 20px;
                  top: 40px;
                }
                .enlarge:hover {
                  color: #409eff;
                  cursor: pointer;
                }
                .block-content {
                  margin-top: 40px;
                  height: calc(100% - 40px);
                  display: flex;
                  flex-wrap: wrap;
                }
              }
            }
          }
        }
        .content-right {
          width: 30%;
          height: 100%;
          .content {
            position: absolute;
            color: #fff;
            left: 20px;
            top: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
            .title {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              font-size: 20px;
            }
            .data {
              height: calc(100% - 80px);
              overflow-y: scroll;
              .dv-border-box-4 {
                height: 230px;
                padding: 25px;
                box-sizing: border-box;
                margin-bottom: 20px;
                .border-box-content {
                  display: flex;
                  justify-content: space-between;
                  .left {
                    .top {
                      margin-bottom: 10px;
                    }
                    .bottom {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-top: 20px;
                      img {
                        width: 60px;
                        height: 60px;
                      }
                      .detailed {
                        margin-left: 10px;
                        > div {
                          margin: 10px 0px;
                        }
                        .label {
                          display: inline-block;
                          width: 80px;
                          text-align: right;
                        }
                      }
                    }
                  }
                  .right {
                    font-size: 24px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
