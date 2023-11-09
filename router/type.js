const router = require('koa-router')()
const {
  getHashProfile,
  getHashStatic,
  getHashVirus,
  getGraph,
  getIOCInfo,
  getCertInfo,
  getUrlInfo,
  getEmailInfo,
  getHashHeader,
  getFileState,
  getPermaLink,
  getSandboxReport,
  getWebResult,
  getWebResultCount
} = require('../api/type')

/* 获取hash头部信息 */
router.post('/header', async (ctx) => {
  const params = ctx.request.body
  const res = await getHashHeader(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})


/* 获取hash基本信息 */
router.post('/hash/intelligence', async (ctx) => {
  const params = ctx.request.body
  const res = await getHashProfile(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

/* 获取hash静态分析 */
router.post('/static', async (ctx) => {
  const params = ctx.request.body
  const res = await getHashStatic(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

/* 获取hash动态分析 */
router.post('/virus', async (ctx) => {
  const params = ctx.request.body
  const res = await getHashVirus(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// graph 数据
router.get('/graph/query', async (ctx)  => {
  const params = ctx.request.query
  const res = await getGraph(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 获取威胁情报IOC相关数据
router.get('/getIOCInfo', async (ctx)  => {
  const params = ctx.request.query
  const res = await getIOCInfo(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 证书接口
router.post('/cert/intelligence', async (ctx) => {
  const params = ctx.request.body
  const res = await getCertInfo(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// URL接口
router.post('/url/intelligence', async (ctx) => {
  const params = ctx.request.body
  const res = await getUrlInfo(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// email接口
router.post('/email/intelligence', async (ctx) => {
  const params = ctx.request.body
  const res = await getEmailInfo(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 文件执行状态获取
router.get('/file/type', async (ctx)  => {
  const params = ctx.request.query
  const res = await getFileState(params)
  // ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 动态报告连接获取
router.post('/file/link', async (ctx) => {
  const params = ctx.request.body
  const res = await getPermaLink(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 沙箱文件扫描结果
router.get('/file/sandbox', async (ctx)  => {
  const params = ctx.request.query
  const res = await getSandboxReport(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 网页结果列表
router.get('/urlsandbox/ioc/search', async (ctx)  => {
  const params = ctx.request.query
  const res = await getWebResult(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 网页结果列表
router.get('/urlsandbox/ioc/count', async (ctx)  => {
  const params = ctx.request.query
  const res = await getWebResultCount(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

module.exports = router
