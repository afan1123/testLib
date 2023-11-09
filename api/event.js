const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 首页资讯-事件情报 */
async function getEventsList(params) {
  const res =  await request({
    url: `spark-event/newest`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 首页资讯-漏洞情报 */
async function getVulnsList(params) {
  const res =  await request({
    url: `intelligence/newest/vuls`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 事件列表 */
async function getEventList(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `spark-event/search`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 事件详情 */
async function getEventDetail(params) {
  const res =  await request({
    url: `spark-event/${params.id}`,
    method: 'get',
    params
  })
  return getBody(res)
}

/* 谷歌插件事件 */
async function getChromeEvent(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `spark-event/chromizer/hvv`,
    method: 'post',
    data
  })
  return getBody(res)
}

module.exports = {
  getEventsList,
  getVulnsList,
  getEventList,
  getEventDetail,
  getChromeEvent
}