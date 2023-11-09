const router = require('koa-router')()
const getFileData = require('../common/util').getFileData
const {
  applyKey,
  getAiDetail,
  getFreeNum
} = require('../api/chatgpt')

/* 录入Key */
router.post('/apply', async (ctx) => {
  const params = ctx.request.body
  const res = await applyKey(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 查询 */
router.post('/search', async (ctx) => {
  const params = await getFileData(ctx)
  const res = await getAiDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 获取免费次数 */
router.post('/free', async (ctx) => {
  const params = ctx.request.body
  const res = await getFreeNum(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router





