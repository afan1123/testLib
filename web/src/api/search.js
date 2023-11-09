import request from '@/request'

/**
 *  查询IP的开放端口
 * @param {*} params
 */
export function getOpenPorts(params) {
  return request({
    url: 'host/openports',
    method: 'get',
    params
  })
}

/**
 *  查询IP的组件
 * @param {*} params
 */
export function getComponents(params) {
  return request({
    url: 'host/components',
    method: 'get',
    params
  })
}

/**
 *  查询IP的证书
 * @param {*} params
 */
export function getCerts(params) {
  return request({
    url: 'host/certs',
    method: 'get',
    params
  })
}

/**
 *  查询IP的漏洞
 * @param {*} params
 */
export function getVulns(params) {
  return request({
    url: 'host/vulns',
    method: 'get',
    params
  })
}

/**
 *  关联样本接口
 * @param {*} params
 */
export function getRelationshipFiles(params) {
  return request({
    url: 'host/relationship',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/**
 *  pdns接口
 * @param {*} params
 */
export function getPdns(params) {
  return request({
    url: 'host/pdns',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/**
 *  蜜罐接口
 * @param {*} params
 */
export function getHoney(params) {
  return request({
    url: 'host/honey',
    method: 'get',
    params
  })
}

/**
 *  漏洞详情接口
 * @param {*} data
 */
export function getVulDetail(data) {
  return request({
    url: 'host/vuldetail',
    method: 'post',
    data
  })
}

/* 威胁情报接口 */
export function getIntelligence(data) {
  return request({
    url: 'host/intelligence',
    method: 'post',
    data
  })
}

/* whois接口 */
export function getWhoIs(params) {
  return request({
    url: 'host/whois',
    method: 'get',
    params
  })
}

/* ICP备案接口 */
export function getICP(params) {
  return request({
    url: 'host/icp',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/* 火花情报接口 */
export function getSpark(params) {
  return request({
    url: 'host/spark',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/* IP高精度 */
export function getAccurateIp(params) {
  return request({
    url: 'host/accurateip',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/* IP使用者 */
export function getIpUser(params) {
  return request({
    url: 'host/ipuser',
    method: 'get',
    params,
    isTimestamp: true,
    isLoading: false
  })
}

/* 根据ip/domain获取评论信息 */
export function getCommentsByTopic(params) {
  return request({
    url: 'host/comments/topic',
    method: 'get',
    params,
    isLoading: false
  })
}

/* 添加用户评论 */
export function AddComments(data) {
  return request({
    url: 'host/comments/add',
    method: 'post',
    data
  })
}

/* 根据ip/domain获取评论信息 */
export function getUserTags(params) {
  return request({
    url: 'host/user/tags',
    method: 'get',
    params,
    isLoading: false
  })
}

/* 查询地理位置 */
export function getLocation(params) {
  return request({
    url: 'host/location',
    method: 'get',
    params
  })
}

/* 域名解析接口 */
export function getDomainSoa(data) {
  return request({
    url: 'host/domain/soa',
    method: 'post',
    data
  })
}

/* 域名whois接口 */
export function getDomainWhois(data) {
  return request({
    url: 'host/domain/whois',
    method: 'post',
    data
  })
}

/* 域名whois接口 */
export function getDomainCerts(data) {
  return request({
    url: 'host/domain/certs',
    method: 'post',
    data
  })
}

/* 态势报告 */
export function getSituationReports(data) {
  return request({
    url: 'host/reports',
    method: 'post',
    data
  })
}
/* 态势报告-根据id获取链接 */
export function getReportUrlById(data) {
  return request({
    url: 'host/report-url',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 安全月报 */
export function getMonthReportUrlById(data) {
  return request({
    url: 'host/getMonthReportUrlById',
    method: 'post',
    data
  })
}

/* AI小结 */
export function getAiResult(data) {
  return request({
    url: 'host/Ai/glm',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 网页结果 */
export function getWebResult(params = {}) {
  return request({
    url: 'host/urlsandbox/ioc/search',
    method: 'get',
    params,
    isLoading: false
  })
}
