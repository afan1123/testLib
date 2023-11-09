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

/* -------获取用户信息进行验证等------- */
const USER = require('./user')
router.use('/user', USER.routes())

/* -------搜索IP查询数据------- */
const SEARCH = require('./search')
router.use('/host', SEARCH.routes())

/* -------用户中心接口------- */
const Center = require('./center')
router.use('/center', Center.routes())

/* -------hash、url、emial、证书搜索------- */
const TYPE = require('./type')
router.use('/type', TYPE.routes())

module.exports = router;