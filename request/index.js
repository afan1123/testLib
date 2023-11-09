const axios = require('axios')
const config = require('./config')
const ENV = require('../config'); 

const service = axios.create({
  baseURL: ENV.BASE_API, // api的base_url
  timeout: 120 * 1000 // request timeout
})


axios.defaults.responseType = 'json'
// axios.defaults.params = params
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */

// request interceptor
service.interceptors.request.use(
  config,
  error => {
  // Do something with request error
    // console.log(error) // for debug
    return error
    // return Promise.reject(error)
  })

// respone interceptor
service.interceptors.response.use(
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    // console.log('response', response)
    const res = response.data

    return response

  },

  error => {
    // console.log('error', error)
    return error.response
    // return Promise.resolve(error.response)
  })

module.exports = service

