const router = require('koa-router')()
const {
  getAttackBaseInfo,
  getAttackSegment,
  getAttackGroupCount,
  getAttackRegeo,
  getAttackTrend
} = require('../api/attack')


/* 基本信息 */
router.get('/baseInfo', async (ctx) => {
  const params = ctx.request.query
  const res = await getAttackBaseInfo(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* C段IP信息 */
router.get('/segment', async (ctx) => {
  const params = ctx.request.query
  const res = await getAttackSegment(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 分组统计信息 */
router.get('/groupCount', async (ctx) => {
  const params = ctx.request.query
  const res = await getAttackGroupCount(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 获取regeo */
router.get('/regeo', async (ctx) => {
  const params = ctx.request.query
  const res = await getAttackRegeo(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 攻击趋势 */
router.get('/trend', async (ctx) => {
  const params = ctx.request.query
  const res = await getAttackTrend(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router


