import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

// 获取ip配置信息
export default async function getConfig() {
  try {
    const res = await axios.get(`${process.env.BASE_API}config`)
    if (res.status === 200 || res.status === 304) {
      Vue.prototype.$VE_CONFIG = res.data
      Vue.prototype.$b = res.data.TextConfig
    }
  } catch (error) {
    Message.error('网络错误，请重试！')
  }
}
