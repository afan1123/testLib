const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 城市地图数据 */
async function getCityList(params) {
  const res =  await request({
    url: `spark/joint-defence/statistics`,
    method: 'get',
    params
  })
  return getBody(res)
  // const res = {
  //   code: 200,
  //   data: {"code":200,"data":[{"province":"北京","allCount":10,"category":4,"payload":0},{"province":"甘肃","allCount":10,"category":4,"payload":0},{"province":"广东","allCount":10,"category":4,"payload":0},{"province":"青海","allCount":10,"category":1,"payload":0},{"province":"陕西","allCount":10,"category":4,"payload":0},{"province":"山东","allCount":10,"category":3,"payload":0},{"province":"四川","allCount":55,"category":6,"payload":29}],"msg":"操作成功"}
  // }
  // return res
}


/* 服务号订阅 - 获取国家统计排名前20 */
async function getCountryTop20(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/country-statistic`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 服务号订阅 - 获取城市统计排名前20 */
async function getCityTop20(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/city-statistic`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 服务号订阅 - 获取场景统计排名前20 */
async function getScenesTop20(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/scenes-statistic`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 服务号订阅 - 获取类型统计排名前20 */
async function getCategoriesTop20(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/categories-statistic`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 服务号订阅 - 分页获取IP列表 */
async function getIPList(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/ip-list`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 服务号订阅 - 获取按照时间进行趋势统计 */
async function getTrendData(params) {
  // params.apiType = 'city'
  const res =  await request({
    url: `spark/city/ip-time-trend`,
    method: 'get',
    params
  })
  return getBody(res)
}

module.exports = {
  getCityList,
  getCountryTop20,
  getCityTop20,
  getScenesTop20,
  getCategoriesTop20,
  getIPList,
  getTrendData
}