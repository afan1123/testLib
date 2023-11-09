import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getIntellList } from '@/api/center'

const index = {
  state: {
    dialogVisible: false, // 火花情报上传抽屉开关按钮
    dialogAiVisible: false, // openAi抽屉开关按钮
    offlineSideBar: false, // 离线库下载抽屉开关按钮
    showVerityBox: false,
    intelDate: '',
    country_code: '',
    showEditPaw: false
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, flag) => {
      state.dialogVisible = flag
    },
    TOGGLE_AISIDEBAR: (state, flag) => {
      state.dialogAiVisible = flag
    },
    TOGGLE_OFFLINE: (state, flag) => {
      state.offlineSideBar = flag
    },
    INTEL_DATA: (state, data) => {
      state.intelDate = data
    },
    CHANGE_VERIFYBOX: (state, flag) => {
      state.showVerityBox = flag
    },
    CHANGE_COUNTRYCODE: (state, data) => {
      state.country_code = data
    },
    CHANGE_PASSDIOLAG: (state, flag) => {
      state.showEditPaw = flag
    }
  },
  actions: {
    // 控制上传火花情报抽屉的打开or关闭
    toggleUploadDrawer({ commit }, flag) {
      commit('TOGGLE_SIDEBAR', flag)
    },
    // 控制openAi打开or关闭
    toggleAiDrawer({ commit }, flag) {
      commit('TOGGLE_AISIDEBAR', flag)
    },
    // 控制离线库下载抽屉的打开or关闭
    toggleOffflineDrawer({ commit }, flag) {
      commit('TOGGLE_OFFLINE', flag)
    },
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
