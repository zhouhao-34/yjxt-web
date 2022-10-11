/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 11:32:24
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-08-02 08:11:40
 * @FilePath: \yjxt-web\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import store from './store'
import * as echarts from 'echarts'
// import './config/rem'  //px转rem
Vue.prototype.$echarts = echarts; 
Vue.use(dataV)
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
 router,
 store,
 render: h => h(App)
}).$mount('#app')
