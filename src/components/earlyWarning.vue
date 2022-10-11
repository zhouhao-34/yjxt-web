<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-07 08:27:34
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-08 15:17:16
 * @FilePath: \yjxt-web\src\components\earlyWarning.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="earlyWarning">
    <div class="dialog">
      <dv-border-box-13
        :color="
          earlyData.type !== '1' ? ['red', 'red'] : ['#E6A23C', '#E6A23C']
        "
        :backgroundColor="'rgba(0, 14, 41,0.8)'"
      >
        <div :class="earlyData.type !== '1' ? 'warning' : 'warning1'">警告</div>
        <dv-decoration-5
          :dur="1"
          style="width: 100%; height: 30px"
          :color="
            earlyData.type !== '1' ? ['red', 'red'] : ['#E6A23C', '#E6A23C']
          "
        />
        <div class="text">
          <div class="left">
            <img
              v-if="earlyData.type !== '1'"
              src="../assets/weixian.png"
              alt=""
              srcset=""
            />
            <img v-else src="../assets/jinggao.png" alt="" />
          </div>
          <div class="right">
            <div>{{ earlyData.name }}</div>
            <div>预警值:{{ earlyData.data.yujingValue }}</div>
            <div>当前值:{{ earlyData.data.DValue }}</div>
            <div :class="earlyData.type !== '1' ? 'color' : 'color1'">
              已超过预警值
            </div>
          </div>
        </div>
        <div class="button">
          <dv-decoration-11
            style="width: 200px; height: 60px"
            :color="closeColor"
          >
            <div
              @mouseover="mouseOver(1)"
              @mouseleave="mouseLeave(1)"
              @click="close"
            >
              关闭
            </div></dv-decoration-11
          >
          <!-- <dv-decoration-11
            style="width: 200px; height: 60px"
            :color="seeColor"
          >
            <div
              @mouseover="mouseOver(2)"
              @mouseleave="mouseLeave(2)"
              @click="close"
            >
              查看
            </div>
          </dv-decoration-11> -->
        </div>
      </dv-border-box-13>
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
    // show: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      closeColor: ["rgb(230, 162, 60,0.5)", "rgb(253, 226, 226,0.5)"],
      seeColor: ["rgb(64, 158, 255,0.5)", "rgb(253, 226, 226,0.5)"],
      earlyData: this.$store.state.earlyData,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    mouseOver(i) {
      if (i === 1) {
        this.closeColor = ["rgb(230, 162, 60)", "rgb(253, 226, 226)"];
      } else {
        this.seeColor = ["rgb(64, 158, 255)", "rgb(253, 226, 226)"];
      }
    },
    mouseLeave(i) {
      if (i === 1) {
        this.closeColor = ["rgb(230, 162, 60,0.5)", "rgb(253, 226, 226,0.5)"];
      } else {
        this.seeColor = ["rgb(64, 158, 255,0.5)", "rgb(253, 226, 226,0.5)"];
      }
    },
    close() {
      this.$store.commit("setEarlyWarningShow", false);
    },
  },
};
</script>

<style  lang="scss">
.earlyWarning {
  width: 100%;
  height: 100%;
  background: #303133b9;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    width: 600px;
    height: 500px;
    margin-bottom: 100px;
    .dv-border-box-13 {
      .border-box-content {
        padding: 20px;
        box-sizing: border-box;
        .warning {
          color: red;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
        }
        .warning1 {
          color: #e6a23c;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
        }
        .text {
          height: calc(100% - 150px);
          display: flex;
          align-items: center;
          justify-content: space-around;
          .left {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .right {
            width: 300px;
            display: flex;
            flex-direction: column;
            color: #fff;
            font-size: 18px;
            line-height: 50px;
            .color {
              color: red;
            }
            .color1 {
              color: #e6a23c;
            }
          }
        }
        .button {
          color: #fff;
          display: flex;
          justify-content: space-around;
          .dv-decoration-11 {
            cursor: pointer;
            .decoration-content {
              > div {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
