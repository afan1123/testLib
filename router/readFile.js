const router = require('koa-router')()
const orgList = require('../json/orgList.json')
const orgDetail = require('../json/orgDetail.json')
const {
  getReportgData,
  submitAPTSurvey,
  DownLoadAptReport
} = require('../api/readFile')

// APT组织列表
router.get('/orglist', async (ctx) => {
  ctx.body = {
    code: 200,
    data: orgList
  }
})

// APT报告列表
router.post('/reportlist', async (ctx) => {
  const params = ctx.request.body
  const res = await getReportgData(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

// APT组织详情
router.get('/orgdetail', async (ctx) => {
  const { name } = ctx.request.query
  const data = orgDetail.data[name]
  ctx.body = {
    code: 200,
    data
  }
})

/* APt报告-提交下载调研） */
router.post('/submit', async (ctx) => {
  const params = ctx.request.body
  const res = await submitAPTSurvey(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* APT报告-下载 */
router.post('/downLoad', async (ctx) => {
  const params = ctx.request.body
  const res = await DownLoadAptReport(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})



module.exports = router

