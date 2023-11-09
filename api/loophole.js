const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 漏洞列表 */
async function getLoopHoleList(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `vul/search`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 攻击类型列表 */
async function getVulTypes(params) {
  const res =  await request({
    url: `vul/types`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 漏洞详情 */
async function getLoopDetail(params) {
  const res =  await request({
    url: `vul/detail`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 漏洞详情---CPE */
async function getLoopDetailCPE(params) {
  const res =  await request({
    url: `vul/cpe`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 漏洞资产 */
async function getLoopCyber(params) {
  const res =  await request({
    url: `bluespace/api/v1/buckets/vulns/${params.search}`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* cve来源 */
async function getCveOrigin(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `whitzard/news/cve`,
    method: 'post',
    data
  })
  return getBody(res)
}

module.exports = {
  getVulTypes,
  getLoopHoleList,
  getLoopDetail,
  getLoopCyber,
  getCveOrigin,
  getLoopDetailCPE
}