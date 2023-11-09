const { log } = require('../common/logger')
const request = require('../request/index')
const { getBody } = require('./response.msg')

// 下载模板
async function downLoadTpl(params) {
  const res =  await request({
    url: `spark/submit/csv/tpl`,
    method: 'get',
    params,
    responseType: 'stream'
  })
  return res
}

// 下载IOC
async function downloadIoc(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `special/topic/log4j/export`,
    method: 'post',
    data,
    responseType: 'stream'
  })
  return res
}

// 下载出站IOC
async function downloadOutIoc(data) {
  const res =  await request({
    url: `special/topic/log4j/export/ip`,
    method: 'post',
    data,
    responseType: 'stream'
  })
  return res
}

/**
 * 获取图片
 *
 * @param {*} params
 * @returns
 */
 async function getImage(params) {
  const res = await request({
    url: 'orion/profilereport/image',
    method: 'get',
    params,
    headers: {
      'Content-Type': 'image/png'
    },
    responseType: 'stream'
  })
  return getBody(res)
}

/**
 * 下载 Graph图表 MD5数据
 * 
 * @param {*} [params={}]
 * @returns
 */
 async function getGraphFile(params = {}) {
  const res = await request({
    url: 'graph/hunting/download',
    method: 'get',
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: params.token || ''
    },
    params,
    responseType: 'stream'
  })
  return getBody(res)
}


// 导出批量任务
async function downloadBacthTask(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/tool/batch/export`,
    method: 'post',
    data,
    responseType: 'stream'
  })
  return res
}

/* 我的情报---HW模板下载 */
async function downHwTem(params = {}) {
  const res =  await request({
    url: 'spark-custom/hvv/template',
    method: 'get',
    params,
    responseType: 'stream'
  })
  return res
}

module.exports = {
  downLoadTpl,
  getImage,
  getGraphFile,
  downloadIoc,
  downloadOutIoc,
  downloadBacthTask,
  downHwTem
}