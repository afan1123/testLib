import request from '@/request'

// 公告列表接口
export function getAfficheList(params) {
  return request({
    url: 'affiche/afficheList',
    method: 'get',
    params
  })
}

// 公告详情接口
export function getAfficheDetail(params) {
  return request({
    url: 'affiche/afficheDetail',
    method: 'get',
    params
  })
}

// 下载接口
export function afficheDownLoad(data) {
  return request({
    url: 'affiche/afficheDownLoad',
    method: 'post',
    data
  })
}

