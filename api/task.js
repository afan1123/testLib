const request = require('../request/index')
// const { getBody } = require('./response.msg')

/* ----------任务列表接口---------- */

/* 任务列表接口（网络空间资产、ip地理位置、JARM探测、域名反查IP、数字证书） */
async function getTaskList(params) {
  const res =  await request({
    url: `bluespace/api/v1/task/list/${params.name}`,
    method: 'get',
    params
  })
  return res
}

/* 任务列表接口（火花情报） */
async function getSparkTaskList(params) {
  const res =  await request({
    url: `spark-city/api/v1/task/list/spark`,
    method: 'get',
    params
  })
  return res
}

/* 任务列表(威胁情报)*/
async function getThreatTaskList(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/ioc/batch/task`,
    method: 'post',
    data
  })
  return res
}

/* 任务列表(IP反查域名、子域名探测)*/
async function getIpPndsTaskList(params) {
  const res =  await request({
    url: `virustango/api/v1/task/list/${params.name}`,
    method: 'get',
    params
  })
  return res
}

/* 任务列表(攻击画像)*/
async function getAttackTaskList(params) {
  const res =  await request({
    url: 'spark-persona/task/list',
    method: 'get',
    params
  })
  return res
}

/* ----------创建任务接口---------- */

/* 创建任务接口（网络空间资产、ip地理位置、JARM探测、域名反查IP、数字证书） */
async function getCreateTask(data) {
  const res = request({
    url: `bluespace/api/v1/task/create/${data.name}`,
    method: 'post',
    data
  })
  return res
}

/* 创建任务接口(火花情报) */
async function getCreateSparkTask(data) {
  const res = request({
    url: `spark-city/api/v1/task/create/spark`,
    method: 'post',
    data
  })
  return res
}

/* 创建任务接口(威胁情报、whois) */
async function getCreateThreatTask(data) {
  const res = request({
    url: `firework/${data.name}/batch`,
    method: 'post',
    data
  })
  return res
}

/* 创建任务接口(IP域名反查、子域名探测) */
async function getCreateIpPndsTask(data) {
  const res = request({
    url: `virustango/api/v1/task/create/${data.name}`,
    method: 'post',
    data
  })
  return res
}

/* 创建任务接口(攻击画像) */
async function getCreateAttackTask(data) {
  const res = request({
    url: 'spark-persona/task/submit',
    method: 'post',
    data
  })
  return res
}

/* ----------删除任务接口---------- */


/* 删除任务接口（网络空间资产、ip地理位置、JARM探测、域名反查IP、数字证书） */
async function DeletedTask(data) {
  const res = request({
    url: `bluespace/api/v1/task/delete/${data.name}/${data.task_id}`,
    method: 'post',
    data
  })
  return res
}


/* 删除任务接口（IP域名反查、子域名探测） */
async function DeletedIpPndsTask(data) {
  const res = request({
    url: `virustango/api/v1/task/delete/${data.name}/${data.task_id}`,
    method: 'post',
    data
  })
  return res
}

/* 删除任务接口（攻击画像） */
async function DeletedAttackTask(data) {
  data.argType = 'qs'
  const res = request({
    url: 'spark-persona/task/del',
    method: 'post',
    data
  })
  return res
}

/* ----------下载任务接口---------- */


/* 下载接口（网络空间资产、ip地理位置、jarm、域名反查ip、数字证书） */
async function DownFile(params) {
  const res = request({
    url: `bluespace/api/v1/task/file/${params.name}/${params.task_id}`,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
  return res
}

/* 下载接口（火花情报） */
async function DownSparkFile(params) {
  const res = request({
    url: `spark-city/api/v1/task/file/spark/${params.task_id}`,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
  return res
}

/* 下载接口（威胁情报、whois） */
async function DownThreatFile(params) {
  const res = request({
    url: `firework/ioc/batch/export`,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
  return res
}

/* 下载接口（IP域名反查、子域名探测） */
async function DownIpPndsFile(params) {
  const res = request({
    url: `virustango/api/v1/task/file/${params.name}/${params.task_id}`,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
  return res
}

/* 重置---网络空间资产 */
async function RescanTask(data) {
  const res = request({
    url: `bluespace/api/v1/task/rescan/${data.name}/${data.task_id}`,
    method: 'post',
    data
  })
  return res
}

/* 攻击画像---详情 */
async function getAttackDetail(params) {
  const res = request({
    url: 'spark-persona/task/detail',
    method: 'get',
    params
  })
  return res
}

module.exports = {
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
}