/* pageId相关url */
const PageIdCommon = ['host/user/tags', 'host/comments/topic'] // 公共接口: 用户标签、评论
const PageIdIp = ['host/location', 'host/intelligence', 'host/spark', ...PageIdCommon] // ip
const PageIdDomain = ['host/domain/whois', 'host/intelligence', 'host/spark', ...PageIdCommon] // domain
const PageIdUrl = ['type/url/intelligence', 'host/spark', ...PageIdCommon] // url
const PageIdCert = ['type/cert/intelligence', 'host/comments/topic'] // 证书
const PageIdEmail = ['type/email/intelligence', ...PageIdCommon] // 邮箱
const PageIdHash = ['type/hash/intelligence', 'hunting/hash/profile', 'center/sample/list', 'type/getIOCInfo', 'type/file/type', 'host/spark', ...PageIdCommon] // hash
const PageIdLog4j = ['log4j/getHotList', 'log4j/getIocList'] // Log4j
const PageIdUatopics = ['log4j/getHotList', 'log4j/getArticle', 'log4j/getSampleList'] // uatopics
const PageIdIntellLibrary = ['offline/getMenuList', 'offline/types', 'offline/packagelist'] // 情报库
const PageIdVulnList = ['loophole/vul/types', 'loophole/vul/search'] // 漏洞列表
const PageIdVulnDetail = ['loophole/vul/detail', 'loophole/vul/cve-origin', 'loophole/vul/cpe'] // 漏洞详情
const PageIdDefence = ['defence/getCrosList', 'defence/getSparkData', 'defence/getRedteam', 'defence/getUsermapStatistics', 'hotspot/GtwoList'] // 联防

// 所有需要加pageId的接口
const pageIdAll = [PageIdIp, PageIdDomain, PageIdUrl, PageIdCert, PageIdEmail, PageIdHash, PageIdLog4j, PageIdUatopics, PageIdIntellLibrary, PageIdVulnList, PageIdVulnDetail, PageIdDefence]
// 判断接口是否需要增加pageId
export function isNeedPageId(id, url) {
  return id && pageIdAll.some(item => item.includes(url))
}
