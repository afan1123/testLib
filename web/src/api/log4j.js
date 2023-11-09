import request from '@/request'

// 获取IOC列表
export function getIocList(params) {
  return request({
    url: 'log4j/getIocList',
    method: 'get',
    params
  })
}

// 获取最新热点列表
export function getHotList(params) {
  return request({
    url: 'log4j/getHotList',
    method: 'get',
    params
  })
}

// 获取OUTIOC列表
export function getOutIocList(params) {
  return request({
    url: 'log4j/getOutIocList',
    method: 'get',
    params
  })
}

// 最新样本列表
export function getSampleList(params) {
  return request({
    url: 'log4j/getSampleList',
    method: 'get',
    params
  })
}

// 最新资讯
export function getArticle(params) {
  return request({
    url: 'log4j/getArticle',
    method: 'get',
    params
  })
}
