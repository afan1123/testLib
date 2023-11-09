const request = require('../request/index')
const { getBody } = require('./response.msg')

// 提交任务
async function submitTask(data = {}) {
  const res =  await request({
    url: 'firework/tool/batch',
    method: 'post',
    data
  })
  return getBody(res)
}

// 查询任务
async function getTaskLIst(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: 'firework/tool/batch/task',
    method: 'post',
    data
  })
  return getBody(res)
}

// 删除任务
async function deleteTask(params = {}) {
  const res =  await request({
    url: 'firework/tool/task/delete',
    method: 'get',
    params
  })
  return getBody(res)
}

// 修改任务名称
async function editTaskName(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: 'firework/tool/task/update',
    method: 'post',
    data
  })
  return getBody(res)
}

// 任务详情
async function getTaskDetail(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: '/firework/tool/task/detail',
    method: 'post',
    data
  })
  return getBody(res)
}

// 检查任务状态
async function checkTaskStatus(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: '/firework/tool/task/status',
    method: 'post',
    data
  })
  return getBody(res)
}

module.exports = {
  submitTask,
  getTaskLIst,
  deleteTask,
  editTaskName,
  getTaskDetail,
  checkTaskStatus
}