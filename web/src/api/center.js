import request from '@/request'

// 情报列表接口
export function getIntellList(params) {
  return request({
    url: 'center/intelList',
    method: 'get',
    params
  })
}

// 情报详情接
export function getIntellDetail(params) {
  return request({
    url: 'center/intelDetail',
    method: 'get',
    params
  })
}

// 上传模板
export function uploadTpl(data = {}) {
  return request({
    url: 'center/uploadTemp',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 手动上传情报
export function HandUploadTpl(data) {
  return request({
    url: 'center/handuploadTemp',
    method: 'post',
    data
  })
}

// 根据用户名获取评论信息
export function getCommnetsByAuthor(params) {
  return request({
    url: 'center/comments/author',
    method: 'get',
    params
  })
}

// 通过用户名获取标签
export function getUserTagsByAuthor(params) {
  return request({
    url: 'center/tags/author',
    method: 'get',
    params
  })
}

// 添加用户标签
export function AddUserTag(data) {
  return request({
    url: 'center/tags/add',
    method: 'post',
    data
  })
}

// 误报列表接口
export function getDistortList(params) {
  return request({
    url: 'center/misreport/list',
    method: 'get',
    params
  })
}

// 增加误报
export function AddDistort(data) {
  return request({
    url: 'center/misreport/add',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 上传报告
export function UploadReport(data) {
  return request({
    url: 'center/reports/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 修改报告
export function UpdateReport(data) {
  return request({
    url: 'center/reports/update',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 消费记录
export function getConsumList(params) {
  return request({
    url: 'center/consum/list',
    method: 'get',
    params
  })
}

// 漏洞通告/VSRC安全周报
export function getReportList(data) {
  return request({
    url: 'center/reports/list',
    method: 'post',
    data
  })
}

// 漏洞通告检索
export function getReportSearch(data) {
  return request({
    url: 'center/reports/search',
    method: 'post',
    data
  })
}

// 删除报告
export function DeleteReport(data) {
  return request({
    url: 'center/reports/delete',
    method: 'post',
    data
  })
}

// 报告发布（下线）
export function PublishReport(data) {
  return request({
    url: 'center/reports/publish',
    method: 'post',
    data
  })
}

// 热点推荐
export function getHotRecommend(data) {
  return request({
    url: 'center/reports/recommend',
    method: 'post',
    data
  })
}

// 投递样本
export function UploadSample(data) {
  return request({
    url: 'center/reports/upload-sample',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
    isLoading: false
  })
}

// 获取最近的样本
export function getRecentSample(params) {
  return request({
    url: 'center/sample/list',
    method: 'get',
    params
  })
}

// 安全月报-提交下载调研
export function submitSurvey(data) {
  return request({
    url: 'center/submitSurvey',
    method: 'post',
    data
  })
}

/* 我的情报列表 */
export function getMyIntellList(data) {
  return request({
    url: 'center/myIntell/list',
    method: 'post',
    data
  })
}

/* 删除情报 */
export function deleteMyIntell(data) {
  return request({
    url: 'center/myIntell/delete',
    method: 'post',
    data
  })
}

/* 编辑情报 */
export function updateMyIntell(data) {
  return request({
    url: 'center/myIntell/update',
    method: 'post',
    data
  })
}

/* 批量生效/失效 */
export function bacthActive(data) {
  return request({
    url: 'center/myIntell/active',
    method: 'post',
    data
  })
}

// 获取威胁分类
export function getThreatCategory(params) {
  return request({
    url: 'center/myIntell/category',
    method: 'get',
    params
  })
}

/* 上传情报---多条 */
export function batchUplodIntell(data) {
  return request({
    url: 'center/myIntell/batch',
    method: 'post',
    data
  })
}

/* 上传情报---单条 */
export function singleUplodIntell(data) {
  return request({
    url: 'center/myIntell/one',
    method: 'post',
    data
  })
}

/* 我的离线库---基础离线库 */
export function getMyBaseOffline(data) {
  return request({
    url: 'center/myOffline/base',
    method: 'post',
    data
  })
}

/* 我的离线库---自定义离线库 */
export function getMyCustomOffline(data) {
  return request({
    url: 'center/myOffline/custom',
    method: 'post',
    data
  })
}

/* 我的离线库---产品类型 */
export function getOfflineProducts(params) {
  return request({
    url: 'center/myOffline/products',
    method: 'get',
    params
  })
}

/* 我的离线库---自定义离线库删除 */
export function deleteCustomOffline(data) {
  return request({
    url: 'center/myOffline/custom/delete',
    method: 'post',
    data
  })
}

/* 我的离线库---加载目标离线库 */
export function loadMyOffline(data) {
  return request({
    url: 'center/myOffline/load',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 我的离线库---详情数据统计 */
export function getOfflineDetailCount(params) {
  return request({
    url: 'center/myOffline/detail/count',
    method: 'get',
    params
  })
}

/* 我的离线库---详情数据 */
export function getOfflineDetailData(data) {
  return request({
    url: 'center/myOffline/detail/list',
    method: 'post',
    data
  })
}

/* 我的离线库---情报打包 */
export function packOfflineIntell(data) {
  return request({
    url: 'center/myOffline/pack',
    method: 'post',
    data
  })
}

/* 我的离线库---详情删除 */
export function deleteOfflineDetail(data) {
  return request({
    url: 'center/myOffline/detail/delete',
    method: 'post',
    data
  })
}

/* 我的离线库---添加情报 */
export function addOfflineIntell(data) {
  return request({
    url: 'center/myOffline/detail/add',
    method: 'post',
    data
  })
}

/* 我的离线库---更新情报 */
export function updateOfflineIntell(data) {
  return request({
    url: 'center/myOffline/detail/update',
    method: 'post',
    data
  })
}

/* 我的情报---HW情报列表 */
export function getHwList(params) {
  return request({
    url: 'center/myIntell/hw/list',
    method: 'get',
    params
  })
}

/* 我的情报---上传HW模 */
export function uploadHwTpl(data = {}) {
  return request({
    url: 'center/hw/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

/* 我的情报---删除HW情报 */
export function deleteHwIntell(params) {
  return request({
    url: 'center/myIntell/hw/delete',
    method: 'get',
    params
  })
}

/* 我的情报---模板手动上传 */
export function HwHandUploadTpl(data) {
  return request({
    url: 'center/myIntell/handUploadTel',
    method: 'post',
    data
  })
}

/* 我的情报---HW情报更新 */
export function updateHwIntell(data) {
  return request({
    url: 'center/myIntell/hw/update',
    method: 'post',
    data
  })
}
