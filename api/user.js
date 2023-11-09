const request = require('../request/index')
const { error } = require('./response.msg')

/* 用户权限验证 */
async function getAuth(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'auth/product/verify',
    method: 'get',
    params
  })
  return res || error
}

// 获取用户信息
async function getUserInfo(params) {
  params.apiType = 'user'
  const res = request({
    url: 'auth/user',
    method: 'get',
    params
  })
  return res || error
}

// 修改密码
async function editPassword(data) {
  data.apiType = 'user'
  const res = request({
    url: 'user/modify-password',
    method: 'post',
    data
  })
  return res || error
}

// 修改昵称
async function editNickName(data) {
  data.apiType = 'user'
  data.argType = 'qs'
  const res = request({
    url: 'user/modify-nickname',
    method: 'post',
    data
  })
  return res || error
}


// 修改手机号
async function editPhone(data) {
  data.apiType = 'user'
  data.argType = 'qs'
  const res = request({
    url: 'user/modify-phone',
    method: 'post',
    data
  })
  return res || error
}

// 校验手机是否重复
async function CheckPhone(params) {
  params.apiType = 'user'
  const res = await request({
    url: 'user/check-phone',
    method: 'get',
    params
  })
  return res || error
}

// 修改头像
async function editHeadPortrait(options) {
  options.data.apiType = 'user'
  const res = request({
    url: 'user/modify-avatar',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    ...options
  })
  return res || error
}

// 验证任务中心是否有权限
async function VerityTaskCenter(data, access_token) {
  data.apiType = 'user'
  const res = request({
    url: 'auth/batch/verify',
    method: 'post',
    params: { 'access_token': access_token },
    data
  })
  return res || error
}

// 退出登录
async function Lougot(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'auth/logout',
    method: 'get',
    params
  })
  return res || error
}

// 问卷调查
async function QuestionSurvey(data) {
  data.argType = 'qs'
  const res = request({
    url: 'spark/questionnaire/add',
    method: 'post',
    data
  })
  return res
}

// 区域权限
async function getAreaVerity(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'auth/data-role/verify',
    method: 'get',
    params
  })
  return res
}

// 立即订阅
async function Subscribe(data) {
  data.argType = 'qs'
  data.apiType = 'user'
  const res = request({
    url: 'user/subscribe/bind',
    method: 'post',
    data
  })
  return res
}

// 测试openId
async function testOpenId(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'user/subscribe/test',
    method: 'get',
    params
  })
  return res
}

// 消息订阅---模板列表
async function getTemplateList(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'subscribe/template/list',
    method: 'get',
    params
  })
  return res
}

// 消息订阅---订阅成功之后调的接口
async function PushSingle(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'subscribe/template/push-single',
    method: 'get',
    params
  })
  return res
}

// 消息订阅---回显
async function EchoSubscribe(params) {
  params.apiType = 'user'
  const res =  await request({
    url: 'user/subscribe/status',
    method: 'get',
    params
  })
  return res
}

// opne-ai
async function sendGlmAi(data) {
  data.argType = 'qs'
  const res = request({
    url: 'firework/glm/ai',
    method: 'post',
    data
  })
  return res
}

module.exports = {
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
}