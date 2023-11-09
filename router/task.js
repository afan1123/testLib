const router = require('koa-router')()
const {
  getTaskList,
  getSparkTaskList,
  getThreatTaskList,
  getIpPndsTaskList,
  getAttackTaskList,
  getCreateTask,
  getCreateSparkTask,
  getCreateThreatTask,
  getCreateIpPndsTask,
  getCreateAttackTask,
  DeletedTask,
  DeletedIpPndsTask,
  DeletedAttackTask,
  DownFile,
  DownSparkFile,
  DownThreatFile,
  DownIpPndsFile,
  RescanTask,
  getAttackDetail
} = require('../api/task')

/* 任务列表接口（网络空间资产、ip地理位置） */
router.get('/location', async (ctx)  => {
  const params = ctx.request.query
  const res = await getTaskList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 任务列表（火花情报） */
router.get('/spark', async (ctx)  => {
  const params = ctx.request.query
  const res = await getSparkTaskList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 任务列表(威胁情报)*/
router.post('/threatlist', async (ctx)  => {
  const params = ctx.request.body
  const res = await getThreatTaskList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 任务列表(IP域名反查)*/
router.get('/ippndslist', async (ctx)  => {
  const params = ctx.request.query
  const res = await getIpPndsTaskList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 任务列表(攻击画像)*/
router.get('/attacklist', async (ctx)  => {
  const params = ctx.request.query
  const res = await getAttackTaskList(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 创建任务接口（网络空间资产、ip地理位置）*/
router.post('/create', async (ctx)  => {
  const params = ctx.request.body
  const res = await getCreateTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 创建任务接口(火花情报) */
router.post('/createspark', async (ctx)  => {
  const params = ctx.request.body
  const res = await getCreateSparkTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 创建任务接口(威胁情报、whois) */
router.post('/createthreat', async (ctx)  => {
  const params = ctx.request.body
  const res = await getCreateThreatTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 创建任务接口(IP域名反查、子域名探测) */
router.post('/createippnds', async (ctx)  => {
  const params = ctx.request.body
  const res = await getCreateIpPndsTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 创建任务接口(攻击画像) */
router.post('/createattack', async (ctx)  => {
  const params = ctx.request.body
  const res = await getCreateAttackTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


/* 删除任务接口(网络空间资产、ip地理位置) */
router.post('/delete', async (ctx)  => {
  const params = ctx.request.body
  const res = await DeletedTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 删除任务接口(IP域名反查、子域名探测) */
router.post('/deleteippnds', async (ctx)  => {
  const params = ctx.request.body
  const res = await DeletedIpPndsTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 删除任务接口(攻击画像) */
router.post('/deleteattack', async (ctx)  => {
  const params = ctx.request.body
  const res = await DeletedAttackTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

/* 下载接口 （网络空间资产、ip地理位置）*/
router.get('/download', async (ctx)  => {
  const params = ctx.request.query
  const res = await DownFile(params)
  // ctx.response.body = res.data
  if (res.status === 200) {
    ctx.response.body = res.data
    ctx.response.status = 200
  } else {
    ctx.response.status = 302
    ctx.response.body = {
      data: {
        status: 302
      }
    }
  }
})

/* 下载接口 （火花情报）*/
router.get('/downspark', async (ctx)  => {
  const params = ctx.request.query
  const res = await DownSparkFile(params)
  // ctx.response.body = res.data
  if (res.status === 200) {
    ctx.response.body = res.data
    ctx.response.status = 200
  } else {
    ctx.response.status = 302
    ctx.response.body = {
      data: {
        status: 302
      }
    }
  }
})

/* 下载接口（威胁情报） */
router.get('/downthreat', async (ctx)  => {
  const params = ctx.request.query
  const res = await DownThreatFile(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


/* 下载接口（IP域名反查、子域名探测） */
router.get('/downippnds', async (ctx)  => {
  const params = ctx.request.query
  const res = await DownIpPndsFile(params)
  if (res.status === 200) {
    ctx.response.body = res.data
    ctx.response.status = 200
  } else {
    ctx.response.status = 302
    ctx.response.body = {
      data: {
        status: 302
      }
    }
  }
})

/* 重置---网络空间资产 */
router.post('/rescan', async (ctx)  => {
  const params = ctx.request.body
  const res = await RescanTask(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})


/* 攻击画像---详情 */
router.get('/detail', async (ctx)  => {
  const params = ctx.request.query
  const res = await getAttackDetail(params)
  ctx.status = res.data.code || 200
  ctx.response.body = res.data
})

module.exports = router
