'use strict';

const request = require('../request/index')
const config = require('../config/index')
const { getBody } = require('./response.msg')

/* 查询IP的开放端口 */
async function getOpenPorts(params) {
  const res = await request({
    url: `bluespace/api/v1/ip/${params.arguement}`,
    method: 'get',
    params
  })
  return res
}

/* 查询IP的组件 */
async function getComponents(params) {
  const res = await request({
    url: `bluespace/api/v1/ip/${params.arguement}/components`,
    method: 'get',
    params
  })
  return res
}

/* 查询IP的证书 */
async function getCerts(params) {
  const res = await request({
    url: `bluespace/api/v1/ip/${params.arguement}/cert`,
    method: 'get',
    params
  })
  return res
}

/* 查询IP的漏洞 */
async function getVulns(params) {
  const res = await request({
    url: `bluespace/api/v1/ip/${params.arguement}/vulns`,
    method: 'get',
    params
  })
  return res
}

/* 关联样本接口 */
async function getRelationshipFiles(params) {
  const res = await request({
    url: `virustango/api/v1/${params.name}/${params.arguement}/report`,
    method: 'get',
    params
  })
  return res
}

/* pds接口 */
async function getPdns(params) {
  const res = await request({
    url: `virustango/api/v1/${params.name}/${params.arguement}/pdns`,
    method: 'get',
    params
  })
  return res
}

/* 蜜罐接口 */
async function getHoney(params) {
  const res = await request({
    url: `honeypot/api/v1/ip/${params.arguement}`,
    method: 'get',
    params
  })
  return res
}

/* 漏洞详情接口 */
async function getVulDetail(data) {
  data.argType = 'qs'
  const res = await request({
    url: 'firework/vul/detail',
    method: 'post',
    data
  })
  return res
}

/* domain的IOC接口 */
async function getIntelligence(data) {
  data.argType = 'fd'
  const res = await request({
    url: `resolving/${data.name}/${data.search}`,
    method: 'post',
    data
  })
  return res
}

/* ip的whois接口 */
async function getWhoIs(params) {
  const res = await request({
    url: `virustango/api/v1/ip/${params.arguement}/whois`,
    method: 'get',
    params
  })
  return res
}

/* ICP备案接口 */
async function getICP(params) {
  const res = await request({
    url: `virustango/api/v1/domain/${params.arguement}/icp`,
    method: 'get',
    params
  })
  return res
}

/* 火花情报接口 */
async function getSpark(params) {
  const res = await request({
    url: `spark-city/api/v1/ip`,
    method: 'get',
    params
  })
  return res
}

/* IP高精度接口 */
async function getAccurateIp(params) {
  const res = await request({
    url: `bluespace/api/v1/ip-street/${params.ip}`,
    method: 'get',
    params
  })
  return res
}

/* IP使用者 */
async function getIpUser(params) {
  const res = await request({
    url: `bluespace/api/v1/ip-user/${params.ip}`,
    method: 'get',
    params
  })
  return res
}

/* 根据ip/domain/hash/emial获取评论信息 */
async function getCommentsByTopic(params) {
  const res = await request({
    url: `firework/comment/get/topic`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 添加用户评论 */
async function AddComments(data) {
  data.argType = 'qs'
  const res = await request({
    url: `firework/comment/add`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 用户标签接口 */
async function getUserTags(params) {
  const res = await request({
    url: `tagging/get/tags`,
    method: 'get',
    params
  })
  return getBody(res) 
}

/* 地理位置 */
async function getLocation(params) {
  const res = await request({
    url: `${config.webConfig.IPGEO_URL}${params.arguement}`,
    method: 'get',
    params
  })
  return res
}

/* 域名解析接口 */
async function getDomainSoa (data) {
  data.argType = 'fd'
  const res = await request({
    url: `resolving/domain/soa/${data.arguement}`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 域名的whois接口（包含头部） */
async function getDomainWhois (data) {
  data.argType = 'fd'
  const res = await request({
    url: `resolving/domain/whois/${data.arguement}`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 域名的证书 */
async function getDomainCerts (data) {
  data.argType = 'fd'
  const res = await request({
    url: `resolving/domain/certs/${data.arguement}`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 谷歌插件-火花情报 */
async function getChromeSpark (params) {
  const res = await request({
    url: `spark-city/ip/${params.ip}`,
    method: 'get',
    params
  })
  return getBody(res) 
}

/* 态势报告 */
async function getSituationReports (data) {
  const res = await request({
    url: `firework/situation/reports`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 态势报告-根据id获取链接 */
async function getReportUrlById (data) {
  data.argType = 'fd'
  const res = await request({
    url: `firework/situation/reports/url?id=${data.id}`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 安全月报 */
async function getMonthReportUrlById (data) {
  data.argType = 'qs'
  const res = await request({
    url: `firework/monthly/url`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* AI小结 */
async function getAiResult (data) {
  data.argType = 'qs'
  const res = await request({
    url: `/ai/template`,
    method: 'post',
    data
  })
  return getBody(res) 
}

/* 网页结果 */
async function getWebResult(params = {}) {
  const res =  await request({
    url: `urlsandbox/ioc/search`,
    method: 'get',
    params
  })
  return getBody(res)
}

module.exports = {
  getOpenPorts,
  getComponents,
  getCerts,
  getVulns,
  getRelationshipFiles,
  getPdns,
  getHoney,
  getVulDetail,
  getIntelligence,
  getWhoIs,
  getICP,
  getSpark,
  getAccurateIp,
  getIpUser,
  getCommentsByTopic,
  AddComments,
  getUserTags,
  getLocation,
  getDomainSoa,
  getDomainWhois,
  getDomainCerts,
  getChromeSpark,
  getSituationReports,
  getReportUrlById,
  getMonthReportUrlById,
  getAiResult,
  getWebResult
}