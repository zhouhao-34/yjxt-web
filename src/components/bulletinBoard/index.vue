<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-08 08:41:09
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-07-29 15:51:08
 * @FilePath: \yjxt-web\src\components\bulletinBoard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="index">
    <dv-border-box-2 :color="['rgb(64, 158, 255)', 'rgb(64, 158, 255)']">
      <div class="title">
        <div class="text">预警系统看板</div>
        <div class="decorate">
          <dv-decoration-8 style="width: 300px; height: 50px" />
          <dv-decoration-8 style="width: 300px; height: 50px" :reverse="true" />
        </div>
      </div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(v, i) in navigation" :key="i">
          <span @click="breadcrumbClick(v, i)" style="cursor: pointer">
            {{ v.label }}</span
          >
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="chart-content">
        <div class="left">
          <dv-border-box-13>
            <div class="container-13">
              <dv-border-box-11
                v-for="(v, i) in dataList"
                :key="i"
                :title="v.label"
                :style="
                  dataList.length > 1
                    ? { margin: '0.5% 0.5%' }
                    : { width: '99%', height: '99%' }
                "
                :id="'enlarge' + i"
                :ref="`enlarge${i}`"
              >
                <div
                  class="titleClick"
                  @dblclick="doubleClick(v)"
                  v-if="dataList.length > 1"
                ></div>
                <div class="enlarge" v-if="dataList.length > 1">
                  <i
                    class="el-icon-full-screen"
                    @click="enlarge(i)"
                    v-if="
                      changeRecord.length === 0
                        ? true
                        : changeRecord.indexOf(i) !== -1
                        ? false
                        : true
                    "
                  ></i>
                  <i
                    class="el-icon-copy-document"
                    @click="narrow(i)"
                    v-else
                  ></i>
                </div>
                <div class="container">
                  <div
                    v-for="(x, y) in v.subordinate"
                    :key="y"
                    :ref="'chart' + i + y"
                    :id="'chart' + i + y"
                    style="margin: 0px 0.5%"
                    :style="
                      dataList.length > 1
                        ? { width: '49%', height: '100%' }
                        : { height: '49%', height: '50%' }
                    "
                  ></div>
                </div>
              </dv-border-box-11>
            </div>
          </dv-border-box-13>
        </div>
        <div class="content-right">
          <dv-border-box-9
            ><div class="content">
              <div class="title">
                <!-- <dv-decoration-11 style="width: 200px; height: 50px"
              >预警日志</dv-decoration-11
            > -->
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
    </dv-border-box-2>
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
      // 导航
      navigation: [{ label: "全部", id: 1 }],
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
  computed: {
    bulletinBoard() {
      return this.$store.state.bulletinBoard;
    },
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
    // this.init();

    for (let i = 0; i < this.dataList.length; i++) {
      for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
        this.init("chart" + i + y, this.dataList[i].subordinate[y]);
      }
    }
  },
  methods: {
    // 饼图
    init(id, val) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.clear();
      myChart.setOption({
        // 标题
        title: {
          text: val.label,
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        // 提示框
        tooltip: {
          trigger: "item",
        },
        // 图例
        legend: {
          orient: "horizontal",
          left: "center",
          top: "bottom",
          textStyle: {
            color: "#fff",
          },
        },

        series: [
          {
            // name: "Access From",
            type: "pie",
            radius: ["40%", "50%"],
            label: {
              show: false,
            },
            data: [{ value: val.value1, name: "已设置预警" }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            // name: "Access From",
            type: "pie",
            radius: [0, "30%"],
            label: {
              show: false,
            },
            data: [
              { value: val.value2, name: "正常" },
              { value: val.value3, name: "已达到预警" },
              { value: val.value4, name: "到达设定寿命" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    // 仪表盘
    dashboardInit(id, val) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.clear();
      myChart.setOption({
        // 标题
        title: {
          text: val.label,
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}",
        },
        series: [
          {
            name: val.label + "寿命",
            type: "gauge",
            min: 0,
            max: val.value3 + val.value3 / 10,
            anchor: {
              show: true,
              // showAbove: true,
              size: 18,
            },

            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10,
                color: [
                  [
                    Math.floor(
                      (val.value2 / (val.value3 + val.value3 / 10)) * 100
                    ) / 100,
                    "#67C23A",
                  ],
                  [
                    Math.floor(
                      (val.value3 / (val.value3 + val.value3 / 10)) * 100
                    ) / 100,
                    "#E6A23C",
                  ],
                  [1, "#F56C6C"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -10,
              length: 5,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              distance: -10,
              length: 10,
              lineStyle: {
                color: "#fff",
                width: 4,
              },
            },
            axisLabel: {
              color: "auto",
              distance: 25,
              fontSize: 14,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
              color: "#fff",
              width: 40,
              height: 14,
              fontSize: 14,
              backgroundColor: "auto",
              borderRadius: 3,
            },
            data: [
              {
                name: "当前值",
                value: val.value,
                title: {
                  offsetCenter: ["-80%", "95%"],
                  color: "#fff",
                },
                detail: {
                  offsetCenter: ["-80%", "115%"],
                  fontSize: 16,
                },
              },
              {
                name: "预警值",
                value: val.value2,
                title: {
                  offsetCenter: ["0%", "95%"],
                  color: "#fff",
                },
                detail: {
                  offsetCenter: ["0%", "115%"],
                  fontSize: 16,
                },
              },
              {
                name: "寿命",
                value: val.value3,
                title: {
                  offsetCenter: ["80%", "95%"],
                  color: "#fff",
                },
                detail: {
                  offsetCenter: ["80%", "115%"],
                  fontSize: 16,
                },
              },
            ],
          },
        ],
      });
    },
    // 放大缩小
    enlarge(i) {
      document.getElementById("enlarge" + i).style.width = "99%";
      document.getElementById("enlarge" + i).style.height = "99%";
      this.$refs[`enlarge${i}`][0].$el.scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
      this.changeRecord.push(i);
      for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
        document.getElementById("chart" + i + y).style.height = "50%";
        var myChart = this.$echarts.init(
          document.getElementById("chart" + i + y)
        );
        myChart.resize();
      }
    },
    narrow(i) {
      document.getElementById("enlarge" + i).style.width = "49%";
      document.getElementById("enlarge" + i).style.height = "47%";
      this.$refs[`enlarge${i}`][0].$el.scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐。默认值
      });
      for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
        document.getElementById("chart" + i + y).style.height = "100%";
        var myChart = this.$echarts.init(
          document.getElementById("chart" + i + y)
        );
        myChart.resize();
      }
      this.changeRecord.splice(this.changeRecord.indexOf(i), 1);
    },
    doubleClick(v) {
      this.navigation.push(v);

      if (v.hierarchy === "first") {
        if (v.subordinate.length > 0 && v.subordinate[0].hierarchy !== "end") {
          this.dataList = v.subordinate;
          this.$nextTick(() => {
            for (let i = 0; i < this.dataList.length; i++) {
              for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
                this.dashboardInit(
                  "chart" + i + y,
                  this.dataList[i].subordinate[y]
                );
              }
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
              for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
                this.dashboardInit(
                  "chart" + i + y,
                  this.dataList[i].subordinate[y]
                );
              }
            }
          });
        }
      }
    },
    breadcrumbClick(v, i) {
      if (v.id === 1) {
        this.dataList = this.$store.state.bulletinBoard;
        this.navigation = [{ label: "全部", id: 1 }];
        this.$nextTick(() => {
          for (let i = 0; i < this.dataList.length; i++) {
            for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
              this.init("chart" + i + y, this.dataList[i].subordinate[y]);
            }
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
              for (let y = 0; y < this.dataList[i].subordinate.length; y++) {
                this.dashboardInit(
                  "chart" + i + y,
                  this.dataList[i].subordinate[y]
                );
              }
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
.index {
  color: #fff;
  .dv-border-box-2 {
    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
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
      .title {
        text-align: center;
        font-size: 22px;
        position: relative;
        .text {
          position: absolute;
          width: 100%;
          top: -10px;
        }
        .decorate {
          align-items: center;
          justify-content: center;
          display: flex;
        }
      }
      .chart-content {
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
        .left {
          width: 70%;
          height: 100%;
          .dv-border-box-13 {
            .border-box-content {
              .container-13 {
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                overflow-y: scroll;
                ::-webkit-scrollbar {
                  width: 7px;
                  height: 7px;
                  background-color: #f5f5f5;
                }
                .dv-border-box-11 {
                  width: 49%;
                  height: 47%;
                  .border-box-content {
                    padding: 60px 20px 20px 20px;
                    box-sizing: border-box;
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
                    .container {
                      overflow-y: scroll;
                      display: flex;
                      flex-wrap: wrap;
                      width: 100%;
                      height: 100%;
                    }
                  }
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
                height: 200px;
                padding: 25px;
                box-sizing: border-box;
                margin-bottom: 20px;
                .border-box-content {
                  display: flex;
                  .left {
                    .top {
                      margin-bottom: 10px;
                    }
                    .bottom {
                      display: flex;
                      margin-top: 20px;
                      .detailed {
                        margin-left: 10px;
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
