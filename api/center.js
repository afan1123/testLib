const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 情报列表 */
async function getIntellList(params) {
  const res =  await request({
    url: `spark/tasks/person`,
    method: 'get',
    params
  })
  return res
}

/* 情报详情列表 */
async function getIntellDetail(params) {
  const res =  await request({
    url: `spark/task/indicators`,
    method: 'get',
    params
  })
  return res
}

/* 上传模板 */
async function uploadTpl(options = {}) {
  const res =  await request({
    url: `spark/submit/csv`,
    method: 'post',
    ...options
  })
  return res
}

// 模板手动上传
async function HandUploadTpl(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `spark/submit/form`,
    method: 'post',
    data
  })
  return res
}

// 根据用户名获取评论信息
async function getCommnetsByAuthor(params = {}) {
  const res =  await request({
    url: `firework/comment/get/author`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 通过用户名获取标签
async function getUserTagsByAuthor(params = {}) {
  const res =  await request({
    url: `tagging/get/user`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 添加用户标签
async function AddUserTag(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `tagging/add`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 误报列表 */
async function getDistortList(params) {
  const res =  await request({
    url: `misreport/get/user`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 添加误报 */
async function AddDistort(options) {
  const res =  await request({
    url: `misreport/add`,
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    ...options
  })
  return getBody(res)
}

/* 消费记录 */
async function getConsumList(params) {
  params.apiType = 'user'
  const res =  await request({
    url: `pay-mode/record`,
    method: 'get',
    params
  })
  return getBody(res)
}

// 漏洞通告/VSRC安全周报/安全月报/APT
async function getReportList(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/${data.report_type}/personal`,
    method: 'post',
    data
  })
  return getBody(res)
}

// 漏洞通告检索
async function getReportSearch(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/${data.report_type}/search`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 上传报告 */
async function UploadReport(options = {}) {
  const res =  await request({
    url: `firework/${options.report_type}/submit`,
    method: 'post',
    maxContentLength: 100 * 1024 * 1024,
    maxBodyLength: 100 * 1024 * 1024,
    ...options
  })
  return res
}

/* 修改报告 */
async function UpdateReport(options = {}) {
  const res =  await request({
    url: `firework/${options.report_type}/update`,
    method: 'post',
    maxContentLength: 100 * 1024 * 1024,
    maxBodyLength: 100 * 1024 * 1024,
    ...options
  })
  return res
}

/* 删除报告 */
async function DeleteReport(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/${data.report_type}/delete`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 报告发布/下线 */
async function PublishReport(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/${data.report_type}/published`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 热点推荐 */
async function getHotRecommend(data = {}) {
  const res =  await request({
    url: `firework/recommend`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 投递样本 */
async function UploadSample(options = {}) {
  const res =  await request({
    url: `vsandbox/cloudsandbox/submitfile`,
    method: 'post',
    ...options
  })
  return getBody(res)
}

/* 获取最近的样本 */
async function getRecentSample(params = {}) {
  const res =  await request({
    url: `vsandbox/user/recent-submit`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 安全月报-提交下载调研） */
async function submitSurvey(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/monthly/survey/submit`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的情报列表 */
async function getMyIntellList(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/search`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 删除情报 */
async function deleteMyIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/delete`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 编辑情报 */
async function updateMyIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/update`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 批量生效/失效 */
async function bacthActive(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/update/active`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 获取威胁分类 */
async function getThreatCategory(params = {}) {
  const res =  await request({
    url: `spark-custom/dic/category`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 上传情报---多条 */
async function batchUplodIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/insert/batch`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 上传情报---单条 */
async function singleUplodIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/ioc/insert/one`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---基础离线库 */
async function getMyBaseOffline(data = {}) {
  const res =  await request({
    url: `spark-custom/package/search/base`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---自定义离线库 */
async function getMyCustomOffline(data = {}) {
  const res =  await request({
    url: `spark-custom/package/search/custom`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---产品类型 */
async function getOfflineProducts(params = {}) {
  const res =  await request({
    url: `spark-custom/dic/product`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 我的离线库---自定义离线库删除 */
async function deleteCustomOffline(data = {}) {
  const res =  await request({
    url: `spark-custom/package/delete`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---加载目标离线库 */
async function loadMyOffline(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/load`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---详情数据统计 */
async function getOfflineDetailCount(params = {}) {
  const res =  await request({
    url: `spark-custom/package/content/count`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 我的离线库---详情数据 */
async function getOfflineDetailData(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/search`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---情报打包 */
async function packOfflineIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/pack`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---详情删除 */
async function deleteOfflineDetail(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/delete`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---添加情报 */
async function addOfflineIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/add`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的离线库---更新情报 */
async function updateOfflineIntell(data = {}) {
  const res =  await request({
    url: `spark-custom/package/content/update`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 我的情报---HW情报列表 */
async function getHwList(params = {}) {
  params.argType = 'qs'
  const res =  await request({
    url: 'spark-custom/hvv/list/person',
    method: 'get',
    params
  })
  return getBody(res)
}

/* 我的情报---上传HW模 */
async function uploadHwTpl(options = {}) {
  const res =  await request({
    url: 'spark-custom/hvv/submit/csv',
    method: 'post',
    ...options
  })
  return res
}

/* 我的情报---删除HW情报 */
async function deleteHwIntell(params = {}) {
  const res =  await request({
    url: 'spark-custom/hvv/indicator/delete',
    method: 'get',
    params
  })
  return getBody(res)
}

/* 我的情报---模板手动上传 */
async function HwHandUploadTpl(data = {}) {
  const res =  await request({
    url: 'spark-custom/hvv/submit/form',
    method: 'post',
    data
  })
  return res
}

/* 我的情报---HW情报更新 */
async function updateHwIntell(data = {}) {
  const res =  await request({
    url: 'spark-custom/hvv/indicator/update',
    method: 'post',
    data
  })
  return res
}

module.exports = {
  getIntellList,
  getIntellDetail,
  uploadTpl,
  HandUploadTpl,
  getCommnetsByAuthor,
  getUserTagsByAuthor,
  AddUserTag,
  getDistortList,
  AddDistort,
  getConsumList,
  getReportList,
  getReportSearch,
  UploadReport,
  UpdateReport,
  DeleteReport,
  PublishReport,
  getHotRecommend,
  UploadSample,
  getRecentSample,
  submitSurvey,
  getMyIntellList,
  deleteMyIntell,
  updateMyIntell,
  bacthActive,
  getThreatCategory,
  batchUplodIntell,
  singleUplodIntell,
  getMyBaseOffline,
  getMyCustomOffline,
  getOfflineProducts,
  deleteCustomOffline,
  loadMyOffline,
  getOfflineDetailCount,
  getOfflineDetailData,
  packOfflineIntell,
  deleteOfflineDetail,
  addOfflineIntell,
  updateOfflineIntell,
  getHwList,
  uploadHwTpl,
  deleteHwIntell,
  HwHandUploadTpl,
  updateHwIntell
}