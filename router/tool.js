const router = require('koa-router')()
const {
  submitTask,
  getTaskLIst,
  deleteTask,
  editTaskName,
  getTaskDetail,
  checkTaskStatus
} = require('../api/tool')

// 提交任务
router.post('/task/submit', async (ctx) => {
  const params = ctx.request.body
  const res = await submitTask(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})


// 查询任务
router.post('/task/list', async (ctx) => {
  const params = ctx.request.body
  const res = await getTaskLIst(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})


// 删除任务
router.get('/task/delete', async (ctx) => {
  const params = ctx.request.query
  const res = await deleteTask(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})


// 修改任务名称
router.post('/task/edit', async (ctx) => {
  const params = ctx.request.body
  const res = await editTaskName(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 任务详情
router.post('/task/detail', async (ctx) => {
  const params = ctx.request.body
  const res = await getTaskDetail(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})

// 检查任务状态
router.post('/task/status', async (ctx) => {
  const params = ctx.request.body
  const res = await checkTaskStatus(params)
  ctx.status = res.data.code || 200
  ctx.body = res.data
})


module.exports = router
