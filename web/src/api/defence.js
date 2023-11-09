import request from '@/request'

/* 跨域情报告警 */
export function getCrosList(data) {
  return request({
    url: 'defence/getCrosList',
    method: 'post',
    data
  })
}

/* 火花H专项情报 */
export function getSparkData(params) {
  return request({
    url: 'defence/getSparkData',
    method: 'get',
    params
  })
}

/* 高疑似IP */
export function getRedteam(params) {
  return request({
    url: 'defence/getRedteam',
    method: 'get',
    params
  })
}

/* 地图数据 */
export function getUsermapStatistics(params) {
  return request({
    url: 'defence/getUsermapStatistics',
    method: 'get',
    params
  })
}
