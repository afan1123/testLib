import axios from 'axios'
import { Message } from 'element-ui'
import { isNeedPageId } from './url'
import { startLoading, endLoading } from '@/utils/loading'
import { getToken, getPageId } from '@/utils/auth'
let ReuNum = 0
let hasLoading = false
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 120 * 1000 // request timeout
})

axios.defaults.responseType = 'json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// request interceptor
service.interceptors.request.use(
  async config => {
    const method = config.method.toUpperCase() === 'GET' ? 'params' : 'data'
    if (config.isLoading !== false) {
      ReuNum++
      hasLoading = true
      startLoading()
    }
    // 参数增加时间戳，防止缓存(消耗积分的接口)
    if (config.isTimestamp) {
      config[method] = {
        t: Date.parse(new Date()) / 1000,
        ...config[method]
      }
    }
    // 增加pageId
    const pageId = getPageId()
    if (pageId && isNeedPageId(pageId, config.url)) {
      config.headers['pageId'] = pageId
      // console.log(config.url + '-----------' + pageId, 'pageId')
    }

    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }

    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    CloseLoading()
    return Promise.reject(error)
  })

// respone interceptor
service.interceptors.response.use(
  response => {
    CloseLoading()
    const res = response.data
    const urls = ['export/downloadBatchTask', 'export/downHwTemp']
    if (!res.code && !urls.includes(response.config.url)) {
      return res
    }
    return response
  },

  error => {
    CloseLoading()
    if (error.response) {
      // return
      /* 下面代码用来处理后期状态统一管理---还未补全 */
      const data = error.response
      if (data.status === 302) {
        return Promise.resolve(error.response)
      }

      if (data.status === 401) {
        Message({
          message: '暂无权限',
          type: 'error',
          duration: 3 * 1000
        })
      }
      if (data.status === 410) {
        Message({
          message: '积分不足',
          type: 'error',
          duration: 3 * 1000
        })
      }

      // if (data.status === 500) {
      //   return Message({
      //     message: '服务繁忙,请稍候再试',
      //     type: 'error',
      //     duration: 3 * 1000
      //   })
      // }
    } else if (error.message) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.resolve(error.response)
  })

export default service

function CloseLoading() {
  (ReuNum > 0 && ReuNum--)
  if (ReuNum <= 0 && hasLoading) {
    endLoading()
  }
}
