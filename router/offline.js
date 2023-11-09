const router = require('koa-router')()

const {
  getProductName,
  getPackageList,
  DownSparkBao,
  getMenuList
} = require('../api/offline')

// 获取产线名称列表
router.post('/types', async (ctx) => {
  const params = ctx.request.body
  const res = await getProductName(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 获取火花包列表
router.post('/packagelist', async (ctx) => {
  const params = ctx.request.body
  const res = await getPackageList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 火花包下载
router.post('/down', async (ctx) => {
  const params = ctx.request.body
  const res = await DownSparkBao(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


// 获取左侧菜单列表
router.get('/getMenuList', async (ctx) => {
  const params = ctx.request.query
  const res = await getMenuList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router