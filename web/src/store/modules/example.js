import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getIntellList } from '@/api/center'

const index = {
  state: {
    intelDate: ''
  },
  mutations: {
    INTEL_DATA: (state, data) => {
      state.intelDate = data
    }
  },
  actions: {
    // 火花情报列表
    getIntelData({ commit }, params) {
      return new Promise(resolve => {
        getIntellList(params).then(res => {
          if (res.data.code === 200) {
            commit('INTEL_DATA', res.data.data)
            resolve(res)
          }
        })
      })
    }
  }
}
export default index
