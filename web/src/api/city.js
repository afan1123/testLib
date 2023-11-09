import request from '@/request'

/* 首页资讯-事件情报 */
export function getCityList(params) {
  return request({
    url: 'city/citys',
    method: 'get',
    params
  })
}

/* 获取国家统计排名前20 */
export function getCountryTop20(params) {
  params.noLoading = true
  return request({
    url: 'city/getCountryTop20',
    method: 'get',
    params
  })
}

/* 获取城市统计排名前20 */
export function getCityTop20(params) {
  params.noLoading = true
  return request({
    url: 'city/getCityTop20',
    method: 'get',
    params
  })
}

/* 获取场景统计排名前20 */
export function getScenesTop20(params) {
  params.noLoading = true
  return request({
    url: 'city/getScenesTop20',
    method: 'get',
    params
  })
}

/* 获取类型统计排名前20 */
export function getCategoriesTop20(params) {
  params.noLoading = true
  return request({
    url: 'city/getCategoriesTop20',
    method: 'get',
    params
  })
}

/* 分页获取IP列表 */
export function getIPList(params) {
  params.noLoading = true
  return request({
    url: 'city/getIPList',
    method: 'get',
    params
  })
}

/* 获取按照时间进行趋势统计 */
export function getTrendData(params) {
  params.noLoading = true
  return request({
    url: 'city/getTrendData',
    method: 'get',
    params
  })
}
