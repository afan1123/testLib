const request = require('../request/index')

/* 公告列表 */
async function getAfficheList(params) {
  const res =  await request({
    url: `spark-event/upgrade/list`,
    method: 'get',
    params
  })
  return res
}

/* 公告详情 */
async function getAfficheDetail(params) {
  const res =  await request({
    url: `spark-event/upgrade/${params.id}`,
    method: 'get',
    params
  })
  return res
}

/* 下载接口 */
async function DownLoadAffiche(data) {
  data.argType = 'qs'
  const res =  await request({
    url: `spark-event/upgrade/download`,
    method: 'post',
    data
  })
  return res
}

module.exports = {
  getAfficheList,
  getAfficheDetail,
  DownLoadAffiche
}