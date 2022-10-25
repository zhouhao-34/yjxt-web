/*
 * @Author: your name
 * @Date: 2021-07-07 12:52:18
 * @LastEditTime: 2022-10-24 17:24:16
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: In User Settings Edit
 * @FilePath: \tableERP\vue.config.js
 */


module.exports = {

  // 基本路径
  publicPath: "./",
  // 项目打包的目录
  outputDir: "dist",

  devServer: {
    port: 8080,
    // proxy: {
    //   //配置跨域
    //   "/api": {
    //     // target: "http://192.168.3.51:8010/",
    //     // target: "http://yujingapi.s-easy.cn/",
    //     target:'http://yujingapi-ceshi.s-easy.cn/',
    //     changOrigin: true, //允许跨域
    //     pathRewrite: {
    //       "^/api": "api",
    //     },
    //   },
    // },
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         postcss
  //       ]
  //     }
  //   }
  // }
};
