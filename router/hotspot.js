const router = require('koa-router')()
const {
  getGTwoList,
  getHotList,
  LastUpdateTime
} = require('../api/hotspot')

/* 公告列表 */
router.get('/GtwoList', async (ctx) => {
  const params = ctx.request.query
  const res = await getGTwoList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 公告详情 */
router.get('/hotList', async (ctx) => {
  const params = ctx.request.query
  const res = await getHotList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 最新更新时间 */
router.get('/updataTime', async (ctx) => {
  const params = ctx.request.query
  const res = await LastUpdateTime(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router


