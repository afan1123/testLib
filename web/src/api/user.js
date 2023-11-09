import request from '@/request'

// 验证用户权限
export function getAuth(params = {}) {
  return request({
    url: 'user/verify',
    method: 'get',
    params,
    isLoading: false
  })
}

/* 獲取用戶信息 */
export function getUserInfo(params) {
  return request({
    url: 'user/info',
    method: 'get',
    params,
    isLoading: false
  })
}

// 修改密码
export function editPassword(data = {}) {
  return request({
    url: '/user/password',
    method: 'patch',
    data
  })
}

export function submitForm(data) {
  return request({
    url: 'auth/token',
    method: 'post',
    data
  })
}

// 修改昵称
export function editNickName(data = {}) {
  return request({
    url: '/user/nickname',
    method: 'post',
    data
  })
}

// 修改手机号
export function editPhone(data = {}) {
  return request({
    url: '/user/phone',
    method: 'post',
    data
  })
}

// 校验手机是否重复
export function CheckPhone(params = {}) {
  return request({
    url: 'user/checkPhone',
    method: 'get',
    params
  })
}

// 修改头像
export function editHeadPortrait(data = {}) {
  return request({
    url: '/user/head',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 验证任务中心是否有权限
export function VerityTaskCenter(data = {}) {
  return request({
    url: '/user/taskcenter',
    method: 'post',
    data
  })
}

/* 退出登录 */
export function Lougot(params) {
  return request({
    url: '/user/lougot',
    method: 'get',
    params
  })
}

/* 问卷调查 */
export function QuestionSurvey(data = {}) {
  return request({
    url: '/user/question',
    method: 'post',
    data
  })
}

/* 获取区域权限 */
export function getAreaVerity(params) {
  return request({
    url: '/user/areaVerity',
    method: 'get',
    params
  })
}

/* 消息订阅 */
export function Subscribe(data = {}) {
  return request({
    url: 'user/subscribe',
    method: 'post',
    data
  })
}

/* 测试openId */
export function testOpenId(params) {
  return request({
    url: 'user/openId/test',
    method: 'get',
    params
  })
}

/* 消息订阅---模板列表 */
export function getTemplateList(params) {
  return request({
    url: 'user/template/list',
    method: 'get',
    params
  })
}

// 消息订阅---订阅成功之后调的接口
export function PushSingle(params) {
  return request({
    url: 'user/template/push-single',
    method: 'get',
    params
  })
}

// 消息订阅---回显
export function EchoSubscribe(params) {
  return request({
    url: 'user/echo',
    method: 'get',
    params
  })
}

// opne-ai
export function sendGlmAi(data = {}) {
  return request({
    url: '/user/ai',
    method: 'post',
    data,
    isLoading: false
  })
}

