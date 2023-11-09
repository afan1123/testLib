const router = require('koa-router')()
const {
    getIocList,
    getHotList,
    getOutIocList,
    getSampleList,
    getArticle
} = require('../api/log4j')



/* IOC列表 */
router.get('/getIocList', async (ctx) => {
  const params = ctx.request.query
  const res = await getIocList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 最新热点列表 */
router.get('/getHotList', async (ctx) => {
  const params = ctx.request.query
  const res = await getHotList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* OUTIOC列表 */
router.get('/getOutIocList', async (ctx) => {
  const params = ctx.request.query
  const res = await getOutIocList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


/* 最新样本列表 */
router.get('/getSampleList', async (ctx) => {
  const params = ctx.request.query
  const res = await getSampleList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 最新资讯 */
router.get('/getArticle', async (ctx) => {
  const params = ctx.request.query
  const res = await getArticle(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})




module.exports = router
