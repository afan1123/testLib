const router = require('koa-router')()
const {
    getCrosList,
    getSparkData,
    getRedteam,
    getUsermapStatistics
} = require('../api/defence')

/* 跨域情报告警 */
router.post('/getCrosList', async (ctx) => {
  const params = ctx.request.body
  const res = await getCrosList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 火花H专项情报 */
router.get('/getSparkData', async (ctx) => {
    const params = ctx.request.query
    const res = await getSparkData(params)
    ctx.status = res.data.code || 200
    ctx.response.body = res.data
})

/* 高疑似IP */
router.get('/getRedteam', async (ctx) => {
    const params = ctx.request.query
    const res = await getRedteam(params)
    ctx.status = res.data.code || 200
    ctx.response.body = res.data
})

/* 地图数据 */
router.get('/getUsermapStatistics', async (ctx) => {
    const params = ctx.request.query
    const res = await getUsermapStatistics(params)
    ctx.status = res.data.code || 200
    ctx.response.body = res.data
})

module.exports = router