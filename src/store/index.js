/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-07-07 10:32:41
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-10-24 19:36:17
 * @FilePath: \yjxt-web\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //页面数据刷新开关
    refresh:{bool:false,name:''},
    earlyWarningShow:false,
    earlyData:{},
    nodeData:[],
    // 看板数据
    bulletinBoard:[
      {
        label: "一号楼生产车间",
        hierarchy:'first',
        subordinate: [
          {
            label: "大型冲床产线1",
            value1: 2000,
            value2: 1800,
            value3: 50,
            value4: 150,
            hierarchy:'middle',
            subordinate: [
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000,value:300 },
            ],
          },
          {
            label: "大型冲床产线2",
            value1: 2000,
            value2: 1350,
            value3: 500,
            value4: 150,  hierarchy:'middle',  
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
            ],
          },
          {
            label: "大型冲床产线3",
            value1: 2000,
            value2: 1200,
            value3: 350,
            value4: 450,   hierarchy:'middle', 
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
            ],
          },
        ],
      },
      {
        label: "二号楼生产车间", 
        hierarchy:'first',
        subordinate: [
          {
            label: "大型冲床产线1",
            value1: 2000,
            value2: 1800,
            value3: 50,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
            ],
          },
          {
            label: "大型冲床产线2",
            value1: 2000,
            value2: 1350,
            value3: 500,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
            ],
          },
          {
            label: "大型冲床产线3",
            value1: 2000,
            value2: 1200,
            value3: 350,
            value4: 450, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000,value:300 },
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 ,value:300},
            ],
          },
        ],
      },
      {
        label: "三号楼生产车间",
        hierarchy:'first',
        subordinate: [
          {
            label: "大型冲床产线1",
            value1: 2000,
            value2: 1800,
            value3: 50,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
            ],
          },
          {
            label: "大型冲床产线2",
            value1: 2000,
            value2: 1350,
            value3: 500,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
            ],
          },
          {
            label: "大型冲床产线3",
            value1: 2000,
            value2: 1200,
            value3: 350,
            value4: 450, hierarchy:'middle',
            subordinate: [
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1",hierarchy:'end',  value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
              { label: "机械手1", hierarchy:'end', value2: 2800, value3: 3000 },
            ],
          },
        ],
      },
      {
        label: "四号楼生产车间",
        hierarchy:'first',
        subordinate: [
          {
            label: "大型冲床产线1",
            value1: 2000,
            value2: 1800,
            value3: 50,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
            ],
          },
          {
            label: "大型冲床产线2",
            value1: 2000,
            value2: 1350,
            value3: 500,
            value4: 150, hierarchy:'middle',
            subordinate: [
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
            ],
          },
          {
            label: "大型冲床产线3",
            value1: 2000,
            value2: 1200,
            value3: 350,
            value4: 450, hierarchy:'middle',
            subordinate: [
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
              { label: "机械手1",  value2: 2800, value3: 3000 },
            ],
          },
        ],
      },
    ]
    
  },
  getter :{},
  mutations: {
    setrefresh(state,val){ state.refresh=val},
    setEarlyWarningShow(state,val){
      state.earlyWarningShow=val
    },
    setEarlyData(state,val){
      state.earlyData=val
    },
    setNodeData(state,val){
      state.nodeData=val
    }
  },
  actions: {
  },
  modules: {
  }
})
