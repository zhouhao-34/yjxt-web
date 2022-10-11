<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 09:23:10
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-07 10:39:31
 * @FilePath: \yujing-vue\src\components\overview.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overview">
    <div class="left">
      <div class="title">
        <dv-decoration-7 style="width: 200px; height: 30px"
          >预警系统看板</dv-decoration-7
        >
      </div>
      <dv-border-box-10>
        <div class="roll">
          <dv-border-box-11
            :title="v.menuName"
            v-for="(v, i) in kanbanData"
            :key="i"
          >
            <div class="secondLevel">
              <dv-border-box-1
                v-for="(x, y) in v.childs"
                :key="y"
                :color="
                  x.probaojing === 0 && x.proyujing === 0
                    ? ['#67C23A', '#67C23A']
                    : x.probaojing === 0 && x.proyujing > 0
                    ? ['#E6A23C', '#E6A23C']
                    : ['#F56C6C', 'rgb(253, 226, 226)']
                "
              >
                <div class="secondLevel-top">
                  <span> {{ x.menuName }}</span>
                </div>
                <div class="secondLevel-bottom">
                  <div class="img">
                    <img
                      v-if="x.probaojing === 0 && x.proyujing === 0"
                      src="../assets/zhengcang.png"
                      alt=""
                      srcset=""
                    />
                    <img
                      v-if="x.probaojing === 0 && x.proyujing > 0"
                      src="../assets/jinggao.png"
                      alt=""
                      srcset=""
                    />
                    <img
                      v-if="x.probaojing > 0"
                      src="../assets/weixian.png"
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div class="text">
                    <div>
                      已设置预警：
                      <span style="color: #67c23a">{{ x.proCount }}</span
                      >个
                    </div>
                    <div>
                      达到预警值：
                      <span style="color: #e6a23c">{{ x.proyujing }}</span
                      >个
                    </div>
                    <div>
                      达到报警值：
                      <span style="color: #f56c6c">{{ x.probaojing }}</span
                      >个
                    </div>
                  </div>
                </div>
              </dv-border-box-1>
            </div>
          </dv-border-box-11>
        </div>
      </dv-border-box-10>
    </div>
    <div class="right">
      <dv-border-box-9
        ><div class="content">
          <div class="title">
            <!-- <dv-decoration-11 style="width: 200px; height: 50px"
              >预警日志</dv-decoration-11
            > -->
            <dv-decoration-7 style="width: 200px; height: 30px"
              >预警日志</dv-decoration-7
            >
            <div class="division">
              <dv-decoration-8 style="width: 50%; height: 30px" />
              <dv-decoration-8
                :reverse="true"
                style="width: 50%; height: 30px"
              />
            </div>
          </div>
          <div class="data">
            <dv-border-box-4
              :color="
                v.manageType === '预警'
                  ? ['#E6A23C', '#409EFF']
                  : ['#F56C6C', '#409EFF']
              "
              v-for="(v, i) in rizhiData"
              :key="i"
              :reverse="i % 2 !== 0 ? true : false"
            >
              <div class="left">
                <div class="top" :title="v.menuName">{{ v.menuName }}</div>
                <div class="bottom">
                  <img
                    v-if="v.manageType === '预警'"
                    src="../assets/jinggao.png"
                    alt=""
                  />
                  <img
                    v-if="v.manageType === '报警'"
                    src="../assets/weixian.png"
                    alt=""
                  />
                  <div class="detailed">
                    <div>
                      <span class="label">设备名称 :</span
                      ><span class="ellipsis" :title="v.proName">{{
                        v.proName
                      }}</span>
                    </div>
                    <div>
                      <span class="label">当前值:</span
                      ><span
                        class="ellipsis"
                        :title="v.DValue"
                        :style="{
                          'font-size': '16px',
                          color:
                            v.manageType === '预警' ? '#E6A23C' : '#F56C6C',
                        }"
                        >{{ v.DValue }}</span
                      >
                    </div>
                    <div v-if="v.manageType === '预警'">
                      <span class="label">预警值 :</span
                      ><span class="ellipsis" :title="v.yujingValue">{{
                        v.yujingValue
                      }}</span>
                    </div>
                    <div v-else>
                      <span class="label">设备寿命:</span
                      ><span class="ellipsis" :title="v.lifeValue">{{
                        v.lifeValue
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <dv-decoration-9
                  :dur="5"
                  :color="
                    v.manageType === '预警'
                      ? ['#E6A23C', '#409EFF']
                      : ['#F56C6C', '#409EFF']
                  "
                  style="width: 100%; height: 100%"
                  >已通知</dv-decoration-9
                >
              </div>
            </dv-border-box-4>
          </div>
        </div></dv-border-box-9
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      activeNames: "1",
      kanbanData: [],
      rizhiData: [],
      loading: null,
      timer: null,
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
    setTimeout(() => {
      this.queryList();
      this.queryBulletinBoard();
    }, 1000);
    this.timer = setInterval(() => {
      this.queryList();
      this.queryBulletinBoard();
    }, 60000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    } //利用vue的生命周期函数
  },
  methods: {
    async queryList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.proLogList(100, 1, 0, "");

      this.total = res.data[0]["0"];
      for (let i = 0; i < res.data[1].length; i++) {
        res.data[1][i].createTime = this.filterTime(res.data[1][i].createTime);
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
      this.rizhiData = res.data[1];
      this.loading.close();
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
    // 看板查询
    async queryBulletinBoard() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.indexPanel();

      this.kanbanData = res.data;
    },
  },
};
</script>

<style  lang="scss">
.overview {
  height: calc(100% - 60px);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  // background-image: url("../assets/beijing.jpg");
  // background-size: 100% 100%;
  // background-attachment: fixed;
  //   opacity: 0.4;
  display: flex;
  .left {
    width: 75%;
    .title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      margin-bottom: 5px;
    }
    .dv-border-box-10 {
      height: calc(100% - 40px);
      .border-box-content {
        padding: 20px;
        box-sizing: border-box;
        .roll {
          height: 100%;
          .dv-border-box-11 {
            width: calc(100% - 40px);
            height: 40%;
            max-height: 300px;
            margin: 20px;

            .secondLevel {
              position: absolute;
              top: 60px;
              left: 20px;
              width: calc(100% - 40px);
              height: calc(100% - 80px);
              // overflow-y: scroll;
              overflow: auto;
              display: flex;
              flex-wrap: wrap;
              .dv-border-box-1 {
                width: 300px;
                color: #fff;
                .border-box-content {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  .secondLevel-top {
                    font-size: 18px;
                    margin-bottom: 5%;
                  }
                  .secondLevel-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .img {
                      width: 30%;
                    }
                    .text {
                      margin-left: 40px;
                      width: 60%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-direction: column;
                      > div {
                        margin: 3% 0px;
                        span {
                          font-size: 16px;
                          font-weight: 600;
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
    }
  }
  .right {
    width: 30%;
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
        .division {
          width: 100%;
          display: flex;
        }
      }
      .data {
        height: calc(100% - 80px);
        overflow: auto;
        .dv-border-box-4 {
          height: 30%;
          max-height: 200px;
          padding: 25px;
          box-sizing: border-box;
          margin-bottom: 1%;
          .border-box-content {
            display: flex;
            align-items: center;
            .left {
              width: 80%;
              .top {
                margin-bottom: 5%;
                font-size: 18px;
                font-weight: 600;
                /* //溢出内容隐藏 */
                overflow: hidden;
                /* //文本溢出部分用省略号表示 */
                text-overflow: ellipsis;
                /* //特别显示模式 */
                display: -webkit-box;
                /* //行数 */
                -webkit-line-clamp: 1;
                line-clamp: 1;
              }
              .bottom {
                display: flex;
                align-items: center;
                > img {
                  width: 20%;
                  height: 30%;
                }
                .detailed {
                  margin-left: 2%;
                  width: 80%;
                  > div {
                    margin: 1% 0px;
                    display: flex;
                  }
                  .label {
                    display: inline-block;
                    width: 70px;
                    text-align: right;
                    line-height: 19px;
                  }
                  .ellipsis {
                    margin-left: 2%;
                    display: inline-block;
                    width: calc(100% - 80px);
                    line-height: 19px;
                    /* //溢出内容隐藏 */
                    overflow: hidden;
                    /* //文本溢出部分用省略号表示 */
                    text-overflow: ellipsis;
                    /* //特别显示模式 */
                    display: -webkit-box;
                    /* //行数 */
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                  }
                }
              }
            }
            .right {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              max-width: 100px;
              max-height: 100px;
              width: 30%;
              height: 80%;
            }
          }
        }
      }
    }
  }
}
</style>
