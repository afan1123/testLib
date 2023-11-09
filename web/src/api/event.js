import request from '@/request'

/* 首页资讯-事件情报 */
export function getEventsList(params) {
  return request({
    url: 'event/newest/events',
    method: 'get',
    params
  })
}

/* 首页资讯-漏洞情报 */
export function getVulnsList(params) {
  return request({
    url: 'event/newest/vulns',
    method: 'get',
    params
  })
}

/* 事件列表 */
export function getEventList(data) {
  return request({
    url: 'event/search',
    method: 'post',
    data
  })
}

/* 事件列表 */
export function getEventDetail(params) {
  return request({
    url: 'event/detail',
    method: 'get',
    params,
    isLoading: false
  })
}
