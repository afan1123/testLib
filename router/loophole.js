const router = require('koa-router')()
const {
  getVulTypes,
  getLoopHoleList,
  getLoopDetail,
  getLoopCyber,
  getCveOrigin,
  getLoopDetailCPE
} = require('../api/loophole')

/* 漏洞列表 */
router.post('/vul/search', async (ctx) => {
  const params = ctx.request.body
  const res = await getLoopHoleList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 攻击类型列表 */
router.get('/vul/types', async (ctx) => {
  const params = ctx.request.query
  const res = await getVulTypes(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 漏洞详情 */
router.get('/vul/detail', async (ctx) => {
  const params = ctx.request.query
  const res = await getLoopDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 漏洞详情 --- CPE */
router.get('/vul/cpe', async (ctx) => {
  const params = ctx.request.query
  const res = await getLoopDetailCPE(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 漏洞资产 */
router.get('/vul/cyber', async (ctx) => {
  const params = ctx.request.query
  const res = await getLoopCyber(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* cve来源 */
router.post('/vul/cve-origin', async (ctx) => {
  const params = ctx.request.body
  const res = await getCveOrigin(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router
