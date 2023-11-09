const router = require('koa-router')()
const getFileData = require('../common/util').getFileData
const FormData = require('form-data')
const fs = require('fs')
const {
  getIntellList,
  HandUploadTpl
} = require('../api/center')

/* 情报列表 */
router.get('/intelList', async (ctx) => {
  const params = ctx.request.query
  const res = await getIntellList(params)
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


module.exports = router
