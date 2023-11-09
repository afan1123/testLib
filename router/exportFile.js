const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

const {
  downLoadTpl,
  getImage,
  getGraphFile,
  downloadIoc,
  downloadOutIoc,
  downloadBacthTask,
  downHwTem
} = require('../api/exportFile')

function formatHeaders(ctx, oldHeaders) {
  const headers = {
    'Content-Type': 'application/octet-stream;charset=gbk' //告诉浏览器这是一个二进制文件
  }
  const disposition = oldHeaders['content-disposition']
  const filename = (disposition && disposition.split('filename=')[1])
  if (filename) {
    headers['Content-Disposition'] = `attachment; filename=${filename}`
  }
  ctx.set(headers)
  return Promise.resolve()
}

/* 下载模板 */
router.get('/downTemp', async (ctx) => {
  const params = ctx.request.query
  const res = await downLoadTpl(params)
  if (res.headers['content-length'] === '34') {
    ctx.status = 401
    return false
  }
  ctx.response.body = res.data
})

router.post('/downloadIoc', async (ctx)  => {
  const params = ctx.request.body
  const res = await downloadIoc(params)
  ctx.status = res.status || 200
  await formatHeaders(ctx, res.headers)
  ctx.body = res.data
})

router.post('/downloadOutIoc', async (ctx)  => {
  const params = ctx.request.body
  const res = await downloadOutIoc(params)
  ctx.status = res.status || 200
  await formatHeaders(ctx, res.headers)
  ctx.body = res.data
})

router.post('/downloadBatchTask', async (ctx)  => {
  const params = ctx.request.body
  const res = await downloadBacthTask(params)
  ctx.status = res.status || 200
  await formatHeaders(ctx, res.headers)
  ctx.body = res.data
})

/* 获取图片 */
router.get('/image', async (ctx)  => {
  const params = ctx.request.query
  const filename = `${params.filename}.${params.type}`
  const res = await getImage({filename})
  // ctx.status = res.status || 200
  const imageType = params.type.toLocaleUpperCase()
  if (['EMF', 'WMF'].includes(imageType)) {
    const headers = {
      'Content-Type': `image/png`
    }
    ctx.set(headers)
    const imgPath = path.join(__dirname, `../assets/images/${imageType}.png`)
    ctx.body = fs.createReadStream(imgPath)
    return false
  }
  const headers = {
    'Content-Type': `image/${params.type}`
  }
  ctx.set(headers)
  // await formatHeaders(ctx, res.headers)
  ctx.body = res.data
})

/* 导出 Graph 数据*/
router.get('/graph', async (ctx)  => {
  const params = ctx.request.query
  const res = await getGraphFile(params)
  ctx.status = res.status || 200
  await formatHeaders(ctx, res.headers)
  ctx.body = res.data
})

/* 我的情报---HW模板下载 */
router.get('/downHwTemp', async (ctx) => {
  const params = ctx.request.query
  const res = await downHwTem(params)
  ctx.body = res.data
})

module.exports = router
