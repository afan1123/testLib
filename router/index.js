const router = require('koa-router')()
const config = require('../config/index');
const request = require('../request/index')
const getIpAddress = require('../common/util').getIpAddress

/* -------通用逻辑相关------- */

// 统一处理token
router.all('*', async (ctx, next) => {
  const { authorization: token, pageid } = ctx.request.header
  const IpAddress = getIpAddress(ctx.req)
  if (IpAddress) {
    request.defaults.headers['x-forwarded-for'] = IpAddress
  }
  request.defaults.headers['Authorization'] = token || ''
  request.defaults.headers['signature'] = token || ''
  if (pageid) {
    request.defaults.headers['pageId'] = pageid
  } else {
    delete request.defaults.headers['pageId']
  }
  await next()
})

// 获取配置信息
router.get('/config', async (ctx) => {
  ctx.response.body = {
    ...config.webConfig,
    TextConfig: config.TextConfig
  }
})

/* -------用户中心接口------- */
const Center = require('./center')
router.use('/center', Center.routes())



module.exports = router;