const router = require('koa-router')()
const {
  getAfficheList,
  getAfficheDetail,
  DownLoadAffiche
} = require('../api/affiche')

/* 公告列表 */
router.get('/afficheList', async (ctx) => {
  const params = ctx.request.query
  const res = await getAfficheList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 公告详情 */
router.get('/afficheDetail', async (ctx) => {
  const params = ctx.request.query
  const res = await getAfficheDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 下载接口 */
router.post('/afficheDownLoad', async (ctx) => {
  const params = ctx.request.body
  const res = await DownLoadAffiche(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router


