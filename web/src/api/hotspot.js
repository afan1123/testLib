import request from '@/request'

// 公告列表接口
export function getGTwoList(params) {
  return request({
    url: 'hotspot/GtwoList',
    method: 'get',
    params
  })
}

// 公告详情接口
export function getHotList(params) {
  return request({
    url: 'hotspot/hotList',
    method: 'get',
    params
  })
}

// 最新更新时间
export function LastUpdateTime(params) {
  return request({
    url: 'hotspot/updataTime',
    method: 'get',
    params
  })
}

