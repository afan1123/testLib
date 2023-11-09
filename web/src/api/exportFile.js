import request from '@/request'
import { Message } from 'element-ui'
/**
 * 创建a标签模拟下载文件
 *
 * @param {*} url
 */
function downloadFile(url) {
  const element = document.createElement('a')
  element.href = url
  // element.download = name
  document.body.appendChild(element)
  element.click()
  element.remove()
}

function newFileDownload(res, title = '') {
  // if (!res.status) return
  // if (res.status !== 200) {
  //   Message({
  //     message: '导出错误, 请稍后再试!',
  //     type: 'error',
  //     duration: 2 * 1000
  //   })
  //   return
  // }
  // const disposition = res.headers['content-disposition']
  // const fileName = (disposition && disposition.split('filename=')[1])
  console.log('res.data', res)
  const blob = new Blob([res], { type: 'text/csv' })
  if ('download' in document.createElement('a')) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = title
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } else { // IE10+下载
    navigator.msSaveBlob(blob)
  }
}

function newFileDownloadCopy(res, title = '') {
  if (!res.status) return
  if (res.status !== 200) {
    Message({
      message: '导出错误, 请稍后再试!',
      type: 'error',
      duration: 2 * 1000
    })
    return
  }
  const disposition = res.headers['content-disposition']
  let fileName = disposition && disposition.split('filename=')[1]
  if (fileName.slice(0, 1) === `"`) {
    fileName = fileName.slice(1, fileName.length - 1)
  }
  const blob = new Blob([res.data], { type: 'text/csv;charset=gbk', encoding: 'gbk' })
  if ('download' in document.createElement('a')) {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = title + fileName
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

// 模板下载接口
export function downLoadTpl(params) {
  return request({
    url: 'export/downTemp',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 批量查询任务下载
export async function downloadBacthTask(data) {
  const res = await request({
    url: 'export/downloadBatchTask',
    method: 'post',
    data,
    responseType: 'blob'
  })
  newFileDownloadCopy(res)
}

// 下载ioc列表
export async function downloadIoc(data) {
  const res = await request({
    url: 'export/downloadIoc',
    method: 'post',
    data,
    responseType: 'blob'
  })
  const time = (new Date()).valueOf()
  newFileDownload(res, `IOC_${time}`)
}

// 下载outioc列表
export async function downloadOutIoc(data) {
  const res = await request({
    url: 'export/downloadOutIoc',
    method: 'post',
    data,
    responseType: 'blob'
  })
  const time = (new Date()).valueOf()
  newFileDownload(res, `出站IOC_${time}`)
}

// 下载火花包
export function exportSparkBao(url) {
  downloadFile(url)
}

/**
 * 下载graph MD5
 *
 * @export
 * @param {*} [params={}]
 */
export function getGraphFile(params = {}) {
  let params_str = ''
  for (const key in params) {
    params_str = `${params_str}&${key}=${params[key]}`
  }
  if (params_str) {
    params_str = params_str.slice(1)
  }

  const url = `${process.env.BASE_API}export/graph?${params_str}`
  downloadFile(url)
}

/* 我的情报---HW模板下载 */
export function downHwTem(params) {
  return request({
    url: 'export/downHwTemp',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
