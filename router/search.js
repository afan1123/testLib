const router = require('koa-router')()
const config = require('../config/index');
const WGS84ToBd09ll = require('../common/util').WGS84ToBd09ll
const pointToAddress = require('../common/util').pointToAddress

const {
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
} = require('../api/search')

/* 查询IP的开放端口 */
router.get('/openports', async (ctx) => {
  const params = ctx.request.query
  const res = await getOpenPorts(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 查询IP的组件 */
router.get('/components', async (ctx) => {
  const params = ctx.request.query
  const res = await getComponents(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 查询IP的证书 */
router.get('/certs', async (ctx) => {
  const params = ctx.request.query
  const res = await getCerts(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 查询IP的漏洞 */
router.get('/vulns', async (ctx) => {
  const params = ctx.request.query
  const res = await getVulns(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 关联样本接口 */
router.get('/relationship', async (ctx) => {
  const params = ctx.request.query
  const res = await getRelationshipFiles(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
}
)
/* pdns接口 */
router.get('/pdns', async (ctx) => {
  const params = ctx.request.query
  const res = await getPdns(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 蜜罐接口 */
router.get('/honey', async (ctx) => {
  const params = ctx.request.query
  const res = await getHoney(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 漏洞详情接口 */
router.post('/vuldetail', async (ctx) => {
  const params = ctx.request.body
  const res = await getVulDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* domain的IOC接口 */
router.post('/intelligence', async (ctx) => {
  const params = ctx.request.body
  const res = await getIntelligence(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* whois接口 */
router.get('/whois', async (ctx) => {
  const params = ctx.request.query
  const res = await getWhoIs(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* ICP备案接口 */
router.get('/icp', async (ctx) => {
  const params = ctx.request.query
  const res = await getICP(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 火花情报接口 */
router.get('/spark', async (ctx) => {
  const params = ctx.request.query
  const res = await getSpark(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* IP高精度 */
router.get('/accurateip', async (ctx) => {
  const params = ctx.request.query
  const res = await getAccurateIp(params)
  try {
    if (res.data.data && res.data.data.multiAreas && res.data.data.multiAreas.length) {
      const multiAreas = res.data.data.multiAreas[0]
      const { lng, lat } = multiAreas
      const coordinates = await WGS84ToBd09ll({ lng, lat })
      const formatted = await pointToAddress({ lat: coordinates.lat, lng: coordinates.lng })
      res.data.data.multiAreas[0] = {
        ...multiAreas,
        ...coordinates,
      }
      res.data.data.formatted = formatted
    }
  } catch (error) {
    console.error(error)
  }
  ctx.status = res.data.code || 200
  ctx.response.body = res.data

})

/* 根据ip获取使用者 */
router.get('/ipuser', async (ctx) => {
  const params = ctx.request.query
  const res = await getIpUser(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 根据ip/domain获取评论信息 */
router.get('/comments/topic', async (ctx) => {
  const params = ctx.request.query
  const res = await getCommentsByTopic(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 添加用户评论 */
router.post('/comments/add', async (ctx) => {
  const params = ctx.request.body
  const res = await AddComments(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 用户标签接口 */
router.get('/user/tags', async (ctx) => {
  const params = ctx.request.query
  const res = await getUserTags(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 查询地理位置 */
router.get('/location', async (ctx) => {
  const params = ctx.request.query
  const res = await getLocation(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 域名解析接口 */
router.post('/domain/soa', async (ctx) => {
  const params = ctx.request.body
  const res = await getDomainSoa(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 域名whois接口 */
router.post('/domain/whois', async (ctx) => {
  const params = ctx.request.body
  const res = await getDomainWhois(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 域名证书接口 */
router.post('/domain/certs', async (ctx) => {
  const params = ctx.request.body
  const res = await getDomainCerts(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 谷歌插件-火花情报 */
router.get('/spark-city/ip', async (ctx) => {
  const params = ctx.request.query
  const res = await getChromeSpark(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 态势报告 */
router.post('/reports', async (ctx) => {
  const params = ctx.request.body
  const res = await getSituationReports(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 态势报告-根据id获取链接 */
router.post('/report-url', async (ctx) => {
  const params = ctx.request.body
  const res = await getReportUrlById(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 安全月报 */
router.post('/getMonthReportUrlById', async (ctx) => {
  const params = ctx.request.body
  const res = await getMonthReportUrlById(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* AI小结 */
router.post('/Ai/glm', async (ctx) => {
  const params = ctx.request.body
  const res = await getAiResult(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 网页结果 */
router.get('urlsandbox/ioc/search', async (ctx)  => {
  const params = ctx.request.query
  const res = await getWebResult(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

module.exports = router;