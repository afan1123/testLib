const router = require('koa-router')()
const config = require('../config/index')
const FormData = require('form-data')
const fs = require('fs')
const { VerityArea, flatMap } = require('../common/util')
const {
  getAuth,
  getUserInfo,
  editPassword,
  editNickName,
  editPhone,
  CheckPhone,
  editHeadPortrait,
  VerityTaskCenter,
  Lougot,
  QuestionSurvey,
  getAreaVerity,
  Subscribe,
  testOpenId,
  getTemplateList,
  PushSingle,
  EchoSubscribe,
  sendGlmAi
} = require('../api/user')

/* 退出登录 */
router.get('/lougot', async (ctx)  => {
  const params = {
    access_token: ctx.header.authorization
  }
  const res = await Lougot(params)
  ctx.body = res.data
})

/* 用户权限验证 */
router.get('/verify', async (ctx)  => {
  const params = {
    access_token: ctx.header.authorization || ctx.request.query.token,
    product_name: config.webConfig.PRODUCT_NAME
  }
  const res = await getAuth(params)
  ctx.body = res.data
})

// 获取用户信息
router.get('/info', async (ctx) => {
  const params = {
    access_token: ctx.header.authorization,
    product_name: config.webConfig.PRODUCT_NAME
  }
  const res = await getUserInfo(params)
  ctx.response.body = res.data
})

// 修改密码
router.patch('/password', async (ctx) => {
  const params = ctx.request.body
  const res = await editPassword(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 修改昵称
router.post('/nickname', async (ctx) => {
  const params = ctx.request.body
  const res = await editNickName(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 验证任务中心是否有权限
router.post('/taskcenter', async (ctx) => {
  const params = ctx.request.body
  const access_token = ctx.header.authorization
  const res = await VerityTaskCenter(params, access_token)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 修改手机号
router.post('/phone', async (ctx) => {
  const params = ctx.request.body
  const res = await editPhone(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 校验手机是否重复
router.get('/checkPhone', async (ctx) => {
  const params = ctx.request.query
  const res = await CheckPhone(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 修改头像
router.post('/head', async (ctx) => {
  const files = ctx.request.files.file
  try {
    const params = ctx.request.body
    const form = new FormData();
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        form.append('file', fs.createReadStream(files[i].path), files[i].name)
      }
    } else if (files) {
      form.append('file', fs.createReadStream(files.path), files.name)
    }
    // 循环参数append
    for (const key in params) {
      form.append(key, params[key])
    }
    const options = {}
    options.headers = form.getHeaders()
    options.data = form
    options.data.Authorization = params.Authorization
    const res = await editHeadPortrait(options)
    ctx.status = res.data.code || 200
    ctx.response.body = res.data  
  } catch (err) {
    ctx.status = 500
    ctx.body = error
  }

})

// 跳转登录验证
router.get('/redirect', async (ctx) => {
  const { redirectUrl, userPath } = ctx.request.query
  const { PRODUCT_NAME, USER_URL} = config.webConfig
  const USER_PATH = userPath || '/login'
  const url = `${USER_URL}#${USER_PATH}?product_name=${PRODUCT_NAME}&redirectUrl=${redirectUrl}`
  const headers = {
    'VE-Redirect': encodeURIComponent(url)
  }
  ctx.set(headers)
  ctx.body = {
    code: 200
  }
})

// 跳转Tip
router.get('/toTip', async (ctx) => {
  const params = ctx.request.query
  const TIP_URL = config.webConfig.TIP_URL
  const url = `${TIP_URL}#/${params.path}`
  const headers = {
    'VE-Redirect': encodeURIComponent(url)
  }
  ctx.set(headers)
  ctx.body = {
    code: 200
  }
})

// 问卷调查
router.post('/question', async (ctx) => {
  const params = ctx.request.body
  const res = await QuestionSurvey(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 获取区域权限
router.get('/areaVerity', async (ctx) => {
  const { cityName } = ctx.request.query
  const params = {
    access_token: ctx.header.authorization
  }
  const { data: res } = await getAreaVerity(params)
  const flag = VerityArea(res, cityName)
  ctx.body = {
    code: flag ? 200 : 500,
    msg: flag ? '有权限' : '暂无权限!'
  }
})


// 消息订阅
router.post('/subscribe', async (ctx) => {
  const params = ctx.request.body
  const res = await Subscribe(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 测试openId
router.get('/openId/test', async (ctx) => {
  const params = ctx.request.query
  const res = await testOpenId(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


// 消息订阅---模板列表
router.get('/template/list', async (ctx) => {
  const params = ctx.request.query
  const res = await getTemplateList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 消息订阅---订阅成功之后调的接口
router.get('/template/push-single', async (ctx) => {
  const params = ctx.request.query
  const res = await PushSingle(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 消息订阅---回显
router.get('/echo', async (ctx) => {
  const params = ctx.request.query
  const res = await EchoSubscribe(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// opne-ai
router.post('/ai', async (ctx) => {
  const params = ctx.request.body
  const res = await sendGlmAi(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router
