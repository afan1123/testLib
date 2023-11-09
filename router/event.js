const router = require('koa-router')()
const {
  getEventsList,
  getVulnsList,
  getEventList,
  getEventDetail,
  getChromeEvent
} = require('../api/event')

/* 首页资讯-事件情报 */
router.get('/newest/events', async (ctx) => {
  const params = ctx.request.query
  const res = await getEventsList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 首页资讯-漏洞情报 */
router.get('/newest/vulns', async (ctx) => {
  const params = ctx.request.query
  const res = await getVulnsList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 事件列表 */
router.post('/search', async (ctx) => {
  const params = ctx.request.body
  const res = await getEventList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 事件详情 */
router.get('/detail', async (ctx) => {
  const params = ctx.request.query
  const res = await getEventDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 谷歌插件事件接口 */
router.post('/chromizer/hvv', async (ctx) => {
  const params = ctx.request.body
  const res = await getChromeEvent(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router
