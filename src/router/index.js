/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-06 11:33:08
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-24 19:35:59
 * @FilePath: \yjxt-web\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'linnei',
        component: () => import(/* webpackChunkName: "linnei" */ '../components/bulletinBoard/linnei.vue')
      },
      {
        path: '/overview',
        name: 'overview',
        component: () => import(/* webpackChunkName: "overview" */ '../components/overview.vue')
      },
      {
        path: '/1',
        name: '1',
        component: () => import(/* webpackChunkName: "1" */ '../components/bulletinBoard/index.vue')
      },
      {
        path: '/2',
        name: '2',
        component: () => import(/* webpackChunkName: "2" */ '../components/bulletinBoard/two.vue')
      },
      {
        path: 'dataList',
        name: 'dataList',
        component: () => import(/* webpackChunkName: "dataList" */ '../components/dataList.vue'),
        children: [
          {
            path: '/',
            name: 'equipment',
            component: () => import(/* webpackChunkName: "equipment" */ '../components/equipment.vue')
          },
        ]
      },
      {
        path: 'troubleshooting',
        name: 'troubleshooting',
        component: () => import(/* webpackChunkName: "troubleshooting" */ '../components/troubleshooting.vue'),
      },
      {
        path: 'alarmLog',
        name: 'alarmLog',
        component: () => import(/* webpackChunkName: "alarmLog" */ '../components/alarmLog.vue'),
      },
      {
        path: 'systemSettings',
        name: 'systemSettings',
        component: () => import(/* webpackChunkName: "systemSettings" */ '../components/systemSettings.vue'),
        children: [
          {
            path: '/',
            name: 'plc',
            component: () => import(/* webpackChunkName: "plc" */ '../components/systemSettingsAssembly/plc.vue')
          },
          {
            path: 'user',
            name: 'user',
            component: () => import(/* webpackChunkName: "user" */ '../components/systemSettingsAssembly/user.vue')
          },
          {
            path: 'model',
            name: 'model',
            component: () => import(/* webpackChunkName: "model" */ '../components/systemSettingsAssembly/model.vue')
          },
          {
            path: 'classes',
            name: 'classes',
            component: () => import(/* webpackChunkName: "classes" */ '../components/systemSettingsAssembly/classes.vue')
          },
          {
            path: 'production',
            name: 'production',
            component: () => import(/* webpackChunkName: "production" */ '../components/systemSettingsAssembly/production.vue')
          },
          {
            path: 'viewing',
            name: 'viewing',
            component: () => import(/* webpackChunkName: "viewing" */ '../components/systemSettingsAssembly/viewing.vue')
          },
          {
            path: 'read',
            name: 'read',
            component: () => import(/* webpackChunkName: "read" */ '../components/systemSettingsAssembly/read.vue')
          },
          {
            path: 'manual',
            name: 'manual',
            component: () => import(/* webpackChunkName: "manual" */ '../components/systemSettingsAssembly/manual.vue')
          },
        ]
      },
      // 仓库管理
      {
        path: '/warehouse',
        name: 'warehouse',
        component: () => import(/* webpackChunkName: "warehouse" */ '../components/warehouse.vue')
      },
      // 入库列表
      {
        path: '/cangkuIn',
        name: 'cangkuIn',
        component: () => import(/* webpackChunkName: "cangkuIn" */ '../components/cangkuIn.vue')
      },
      // 出库列表
      {
        path: '/cangkuOut',
        name: 'cangkuOut',
        component: () => import(/* webpackChunkName: "cangkuOut" */ '../components/cangkuOut.vue')
      },
      // 模具管理
      {
        path: '/moidManagement',
        name: 'moidManagement',
        component: () => import(/* webpackChunkName: "moidManagement" */ '../components/moidManagement.vue')
      },
      // 模具维保记录
      {
        path: '/mouldRecord',
        name: 'mouldRecord',
        component: () => import(/* webpackChunkName: "mouldRecord" */ '../components/mouldRecord.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
