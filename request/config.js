
const Qs = require('qs')
const retData = require('../common/util').retData
const ENV = require('../config/index')

module.exports = function config(config) {
  // 获取body体name
  let method = 'params'
  if (config.method.toUpperCase() !== 'GET') {
    method = 'data'
  }
  /* 不同接口 */
  if (config[method] && config[method].apiType) {
    switch (config[method].apiType) {
      case 'user':
        config.baseURL = ENV.USER_API
        break
      default:
        break
    }
  }

  // 处理请求数据
  if (config.params) {
    delete config.params.name
    // delete config.params.apiType
  }

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
  }
  
  if (config.data && config.data.argType  === 'qs') {
    config.data = Qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  if (config.data && config.data.argType === 'fd') {
    config.headers['Content-Type'] = 'application/form-data'
  }

  // 删掉时间戳参数
  if (config[method]) {
    delete config[method].t
  }
  delete config[method].apiType
  delete config[method].argType
  // console.log('config-----------------------------------', config)
  return config
}
