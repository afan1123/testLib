const router = require('koa-router')()
const {
  getCityList,
  getCountryTop20,
  getCityTop20,
  getScenesTop20,
  getCategoriesTop20,
  getIPList,
  getTrendData
} = require('../api/city')

/* 城市地图数据 */
router.get('/citys', async (ctx) => {
  const params = ctx.request.query
  const res = await getCityList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


  /* 服务号订阅 - 获取国家统计排名前20 */
  router.get('/getCountryTop20', async (ctx) => {
    const params = ctx.request.query
    const res = await getCountryTop20(params)
    ctx.status = res.data.code || 200
    ctx.response.body = res.data
  })

/* 服务号订阅 - 获取城市统计排名前20 */
router.get('/getCityTop20', async (ctx) => {
const params = ctx.request.query
const res = await getCityTop20(params)
ctx.status = res.data.code || 200
ctx.response.body = res.data
})

/* 服务号订阅 - 获取场景统计排名前20 */
router.get('/getScenesTop20', async (ctx) => {
const params = ctx.request.query
const res = await getScenesTop20(params)
ctx.status = res.data.code || 200
ctx.response.body = res.data
})

/* 服务号订阅 - 获取类型统计排名前20 */
router.get('/getCategoriesTop20', async (ctx) => {
const params = ctx.request.query
const res = await getCategoriesTop20(params)
ctx.status = res.data.code || 200
ctx.response.body = res.data
})

/* 服务号订阅 - 分页获取IP列表 */
router.get('/getIPList', async (ctx) => {
const params = ctx.request.query
const res = await getIPList(params)
ctx.status = res.data.code || 200
ctx.response.body = res.data
})

/* 服务号订阅 - 获取按照时间进行趋势统计 */
router.get('/getTrendData', async (ctx) => {
const params = ctx.request.query
const res = await getTrendData(params)
ctx.status = res.data.code || 200
ctx.response.body = res.data
})

module.exports = router