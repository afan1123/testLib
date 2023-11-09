import request from '@/request'

// APT组织接口
export function getOrgData(params) {
  return request({
    url: 'redfile/orglist',
    method: 'get',
    params
  })
}
// APT组织报告接口
export function getReportgData(data) {
  return request({
    url: 'redfile/reportlist',
    method: 'post',
    data
  })
}

// APT组织详情接口
export function getOrgDetail(params) {
  return request({
    url: 'redfile/orgdetail',
    method: 'get',
    params
  })
}

/* APt报告-提交下载调研） */
export function submitAPTSurvey(data) {
  return request({
    url: 'redfile/submit',
    method: 'post',
    data
  })
}

/* APt报告-下载 */
export function DownLoadAptReport(data) {
  return request({
    url: 'redfile/downLoad',
    method: 'post',
    data
  })
}
