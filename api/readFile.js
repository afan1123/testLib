const request = require('../request/index')
const { getBody } = require('./response.msg')

// 获取左侧菜单列表
async function getReportgData(data = {}) {
  const res =  await request({
    url: `firework/security/reports`,
    method: 'post',
    data
  })
  return getBody(res)
}


/* APT报告-提交下载调研 */
async function submitAPTSurvey(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `firework/security/reports/submit`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* APT报告-下载 */
async function DownLoadAptReport(data) {
  data.argType = 'fd'
  const res = await request({
    url: `firework/situation/reports/url?id=${data.id}`,
    method: 'post',
    data
  })
  return getBody(res) 
}

module.exports = {
  getReportgData,
  submitAPTSurvey,
  DownLoadAptReport
}