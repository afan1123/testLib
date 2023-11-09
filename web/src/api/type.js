import request from '@/request'

/* 获取hash头部信息 */
export function getHashHeader(data) {
  return request({
    url: 'type/header',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 获取hash基本信息 */
export function getHashProfile(data) {
  return request({
    url: 'type/hash/intelligence',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 获取hash静态分析 */
export function getHashStatic(data) {
  return request({
    url: 'type/static',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 获取hash动态分析 */
export function getHashVirus(data) {
  return request({
    url: 'type/virus',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 获取graph图 */
export function getGraph(params) {
  return request({
    url: 'type/graph/query',
    method: 'get',
    params,
    isLoading: false
  })
}

/**
 * 获取威胁情报IOC的相关数据
 * @param params
 * @returns {*}
 */
export function getIOCInfo(params = {}) {
  return request({
    url: 'type/getIOCInfo',
    method: 'get',
    params,
    isLoading: false
  })
}

/* 证书 */
export function getCertInfo(data) {
  return request({
    url: 'type/cert/intelligence',
    method: 'post',
    data
  })
}

/* url */
export function getUrlInfo(data) {
  return request({
    url: 'type/url/intelligence',
    method: 'post',
    data
  })
}

/* email */
export function getEmailInfo(data) {
  return request({
    url: 'type/email/intelligence',
    method: 'post',
    data
  })
}

// 文件执行状态获取
export function getFileState(params = {}) {
  return request({
    url: 'type/file/type',
    method: 'get',
    params,
    isLoading: false
  })
}

/* 动态报告连接获取 */
export function getPermaLink(data) {
  return request({
    url: 'type/file/link',
    method: 'post',
    data,
    isLoading: false
  })
}

// 沙箱文件扫描结果
export function getSandboxReport(params = {}) {
  return request({
    url: 'type/file/sandbox',
    method: 'get',
    params,
    isLoading: false
  })
}

// 网页结果列表
export function getWebResult(params = {}) {
  return request({
    url: 'type/urlsandbox/ioc/search',
    method: 'get',
    params,
    isLoading: false
  })
}
// 网页结果列表统计条数
export function getWebResultCount(params = {}) {
  return request({
    url: 'type/urlsandbox/ioc/count',
    method: 'get',
    params,
    isLoading: false
  })
}
