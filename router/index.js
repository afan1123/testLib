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

/* -------任务中心接口------- */
const TASK = require('./task')
router.use('/task', TASK.routes())

/* -------用户中心接口------- */
const Center = require('./center')
router.use('/center', Center.routes())

/* -------文件导出------- */
const ExportFile = require('./exportFile')
router.use('/export', ExportFile.routes())

/* -------离线库------- */
const OFFLINE = require('./offline')
router.use('/offline', OFFLINE.routes())

/* -------安全漏洞------- */
const LOOPHOLE = require('./loophole')
router.use('/loophole', LOOPHOLE.routes())

/* -------事件------- */
const EVENT = require('./event')
router.use('/event', EVENT.routes())

/* -------事件库------- */
const AFFICHE = require('./affiche')
router.use('/affiche', AFFICHE.routes())

/* -------热点------- */
const HOTSPOT = require('./hotspot')
router.use('/hotspot', HOTSPOT.routes())

/* -------城市------- */
const CITY = require('./city')
router.use('/city', CITY.routes())

/* -------读取JSON文件------- */
const READFILE = require('./readFile')
router.use('/redfile', READFILE.routes())

/* -------hash、url、emial、证书搜索------- */
const TYPE = require('./type')
router.use('/type', TYPE.routes())

/* -------log4j------- */
const LOG4G = require('./log4j')
router.use('/log4j', LOG4G.routes())

/* -------联防------- */
const DEFENCE = require('./defence')
router.use('/defence', DEFENCE.routes())

/* -------攻击画像------- */
const ATTACK = require('./attack')
router.use('/attack', ATTACK.routes())

/* -------攻击画像------- */
const TOOL = require('./tool')
router.use('/tool', TOOL.routes())

/* -------CHATGPT------- */
const CHATGPT = require('./chatgpt')
router.use('/chatgpt', CHATGPT.routes())

module.exports = router;