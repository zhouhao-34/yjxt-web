/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-01 17:27:21
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-02 08:03:02
 * @FilePath: \yjxt-web\src\config\rem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 基准大小
const baseSize = 10
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}