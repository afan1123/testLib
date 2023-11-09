const request = require('../request/index')
const { getBody } = require('./response.msg')

// 获取产线名称
async function getProductName(data = {}) {
  const res =  await request({
    url: `firework/package/types`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 获取火花包列表
async function getPackageList(data = {}) {
  const res =  await request({
    url: `offlibrary/packagelist`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 火花包下载
async function DownSparkBao(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/package/addr`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 获取左侧菜单列表
async function getMenuList(params = {}) {
  const res =  await request({
    url: `firework/officelibrary/type`,
    method: 'get',
    params
  })
  return res
}

module.exports = {
  getProductName,
  getPackageList,
  DownSparkBao,
  getMenuList
}