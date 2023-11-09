const request = require('../request/index')
const { getBody } = require('./response.msg')

// 获取hasht头部信息
async function getHashHeader(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: 'hunting/hash/profile',
    method: 'post',
    data
  })
  return getBody(res)
}


// 获取hash基本信息
async function getHashProfile(data = {}) {
  data.argType = 'fd'
  const res =  await request({
    url: `resolving/hash/${data.hash}`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 获取hash静态分析
async function getHashStatic(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: 'hunting/hash/static',
    method: 'post',
    data
  })
  return getBody(res)
}

// 获取hash动态分析
async function getHashVirus (data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: 'hunting/hash/virus ',
    method: 'post',
    data
  })
  return getBody(res)
}

/**
 * 获取Graph图表数据
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
 async function getGraph(params = {}) {
  const res = await request({
    url: 'graph/hunting/query-by-group',
    method: 'get',
    params
  })
  return getBody(res)
}

// 获取hash威胁情报IOC的相关数据
async function getIOCInfo(params = {}) {
  const res = await request({
    url: 'graph/hunting/ioc-extract',
    method: 'get',
    params
  })
  return getBody(res) 
}

// 证书接口
async function getCertInfo(data = {}) {
  data.argType = 'fd'
  const res =  await request({
    url: `resolving/cert/${data.cert}`,
    method: 'post',
    data
  })
  return getBody(res)
}

// url接口
async function getUrlInfo(data = {}) {
  const res =  await request({
    url: `resolving/url/`,
    method: 'post',
    data
  })
  return getBody(res)
}

// email接口
async function getEmailInfo(data = {}) {
  data.argType = 'fd'
  const res =  await request({
    url: `resolving/email/${data.email}`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 文件执行状态获取
async function getFileState(params = {}) {
  const res =  await request({
    url: `vsandbox/sandbox/v1/file/sandboxtypes`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 动态报告连接获取
async function getPermaLink(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `vsandbox/sandbox/v1/file/report/permalink`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 沙箱文件扫描结果
async function getSandboxReport(params = {}) {
  const res =  await request({
    url: `vsandbox/sandbox/v1/file/report/summary`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 网页结果列表
async function getWebResult(params = {}) {
  const res =  await request({
    url: `urlsandbox/ioc/search`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 网页结果列表统计
async function getWebResultCount(params = {}) {
  const res =  await request({
    url: `urlsandbox/ioc/count`,
    method: 'get',
    params
  })
  return getBody(res)
}

module.exports = {
  getHashProfile,
  getHashStatic,
  getHashVirus,
  getGraph,
  getIOCInfo,
  getCertInfo,
  getUrlInfo,
  getEmailInfo,
  getHashHeader,
  getFileState,
  getPermaLink,
  getSandboxReport,
  getWebResult,
  getWebResultCount
}