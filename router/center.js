const router = require('koa-router')()
const getFileData = require('../common/util').getFileData
const FormData = require('form-data')
const fs = require('fs')
const {
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
} = require('../api/center')

/* 情报列表 */
router.get('/intelList', async (ctx) => {
  const params = ctx.request.query
  const res = await getIntellList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 情报详情 */
router.get('/intelDetail', async (ctx) => {
  const params = ctx.request.query
  const res = await getIntellDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 上传模板 */
router.post('/uploadTemp', async (ctx) => {
  const params = await getFileData(ctx)
  const res = await uploadTpl(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 手动上传模板 */
router.post('/handuploadTemp', async (ctx) => {
  const params = ctx.request.body
  const res = await HandUploadTpl(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 根据用户名获取评论信息 */
router.get('/comments/author', async (ctx) => {
  const params = ctx.request.query
  const res = await getCommnetsByAuthor(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 通过用户名获取标签
router.get('/tags/author', async (ctx) => {
  const params = ctx.request.query
  const res = await getUserTagsByAuthor(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// 添加用户标签
router.post('/tags/add', async (ctx) => {
  const params = ctx.request.body
  const res = await AddUserTag(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 误报列表 */
router.get('/misreport/list', async (ctx) => {
  const params = ctx.request.query
  const res = await getDistortList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 误报列表 */
router.get('/consum/list', async (ctx) => {
  const params = ctx.request.query
  const res = await getConsumList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 增加误报 */
router.post('/misreport/add', async (ctx) => {
  const files = ctx.request.files.pictures
  try {
    const params = ctx.request.body
    const form = new FormData();
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        form.append('pictures', fs.createReadStream(files[i].path), files[i].name)
      }
    } else if (files) {
      form.append('pictures', fs.createReadStream(files.path), files.name)
    } else {
      form.append('pictures', '')
    }
    // 循环参数append
    for (const key in params) {
      form.append(key, params[key])
    }
    const options = {}
    options.headers = form.getHeaders()
    options.data = form
    options.data.Authorization = params.Authorization
    const res = await AddDistort(options)
    ctx.status = res.data.code || 200
    ctx.body= res.data
  } catch (err) {
    console.log('上传错误：', err)
    ctx.status = 500
    ctx.body = error
  }
})

/* 漏洞通告/VSRC安全周报 */
router.post('/reports/list', async (ctx) => {
  const params = ctx.request.body
  const res = await getReportList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 漏洞通告检索 */
router.post('/reports/search', async (ctx) => {
  const params = ctx.request.body
  const res = await getReportSearch(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 上传报告 */
router.post('/reports/update', async (ctx) => {
  const { report_type } = ctx.request.body
  const params = await getFileData(ctx)
  const res = await UpdateReport({ ...params, report_type })
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 修改报告 */
router.post('/reports/upload', async (ctx) => {
  const { report_type } = ctx.request.body
  const params = await getFileData(ctx)
  const res = await UploadReport({...params, report_type })
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 删除报告 */
router.post('/reports/delete', async (ctx) => {
  const params = ctx.request.body
  const res = await DeleteReport(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 报告发布（下线） */
router.post('/reports/publish', async (ctx) => {
  const params = ctx.request.body
  const res = await PublishReport(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 热点推荐 */
router.post('/reports/recommend', async (ctx) => {
  const params = ctx.request.body
  const res = await getHotRecommend(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 投递样本 */
router.post('/reports/upload-sample', async (ctx) => {
  const params = await getFileData(ctx)
  const res = await UploadSample(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 获取最近的样本 */
router.get('/sample/list', async (ctx) => {
  const params = ctx.request.query
  const res = await getRecentSample(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 安全月报-提交下载调研） */
router.post('/submitSurvey', async (ctx) => {
  const params = ctx.request.body
  const res = await submitSurvey(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* APT报告-提交下载调研） */
router.post('/submitAPTSurvey', async (ctx) => {
  const params = ctx.request.body
  const res = await submitAPTSurvey(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的情报列表 */
router.post('/myIntell/list', async (ctx) => {
  const params = ctx.request.body
  const res = await getMyIntellList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 删除情报 */
router.post('/myIntell/delete', async (ctx) => {
  const params = ctx.request.body
  const res = await deleteMyIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 编辑情报 */
router.post('/myIntell/update', async (ctx) => {
  const params = ctx.request.body
  const res = await updateMyIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 批量生效/失效 */
router.post('/myIntell/active', async (ctx) => {
  const params = ctx.request.body
  const res = await bacthActive(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 获取威胁分类 */
router.get('/myIntell/category', async (ctx) => {
  const params = ctx.request.query
  const res = await getThreatCategory(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 上传情报---多条 */
router.post('/myIntell/batch', async (ctx) => {
  const params = ctx.request.body
  const res = await batchUplodIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 上传情报---单条 */
router.post('/myIntell/one', async (ctx) => {
  const params = ctx.request.body
  const res = await singleUplodIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---基础离线库 */
router.post('/myOffline/base', async (ctx) => {
  const params = ctx.request.body
  const res = await getMyBaseOffline(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---自定义离线库 */
router.post('/myOffline/custom', async (ctx) => {
  const params = ctx.request.body
  const res = await getMyCustomOffline(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---产品类型 */
router.get('/myOffline/products', async (ctx) => {
  const params = ctx.request.query
  const res = await getOfflineProducts(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---自定义离线库删除 */
router.post('/myOffline/custom/delete', async (ctx) => {
  const params = ctx.request.body
  const res = await deleteCustomOffline(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---加载目标离线库 */
router.post('/myOffline/load', async (ctx) => {
  const params = ctx.request.body
  const res = await loadMyOffline(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---详情数据统计 */
router.get('/myOffline/detail/count', async (ctx) => {
  const params = ctx.request.query
  const res = await getOfflineDetailCount(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---详情数据 */
router.post('/myOffline/detail/list', async (ctx) => {
  const params = ctx.request.body
  const res = await getOfflineDetailData(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---情报打包 */
router.post('/myOffline/pack', async (ctx) => {
  const params = ctx.request.body
  const res = await packOfflineIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---详情删除 */
router.post('/myOffline/detail/delete', async (ctx) => {
  const params = ctx.request.body
  const res = await deleteOfflineDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---添加情报 */
router.post('/myOffline/detail/add', async (ctx) => {
  const params = ctx.request.body
  const res = await addOfflineIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的离线库---更新情报 */
router.post('/myOffline/detail/update', async (ctx) => {
  const params = ctx.request.body
  const res = await updateOfflineIntell(params)
  ctx.response.body = res.data
})

/* 我的情报---HW情报列表 */
router.get('/myIntell/hw/list', async (ctx) => {
  const params = ctx.request.query
  const res = await getHwList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的情报---上传HW模 */
router.post('/hw/upload', async (ctx) => {
  const params = await getFileData(ctx)
  const res = await uploadHwTpl(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的情报---删除HW情报 */
router.get('/myIntell/hw/delete', async (ctx) => {
  const params = ctx.request.query
  const res = await deleteHwIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的情报---模板手动上传 */
router.post('/myIntell/handUploadTel', async (ctx) => {
  const params = ctx.request.body
  const res = await HwHandUploadTpl(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 我的情报---HW情报更新 */
router.post('/myIntell/hw/update', async (ctx) => {
  const params = ctx.request.body
  const res = await updateHwIntell(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router
