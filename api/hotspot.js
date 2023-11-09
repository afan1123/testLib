const request = require('../request/index')

/* G2事件情报列表 */
async function getGTwoList(params) {
  const res =  await request({
    url: `spark-event/hvv/D2`,
    method: 'get',
    params
  })
  return res
}

/* 热点事件情报列表 */
async function getHotList(params) {
  const res =  await request({
    url: `spark-event/hvv/hot`,
    method: 'get',
    params
  })
  return res
}

/* 最新更新时间 */
async function LastUpdateTime(params) {
  const res =  await request({
    url: `spark-event/hvv/newest/release`,
    method: 'get',
    params
  })
  return res
}
module.exports = {
  getGTwoList,
  getHotList,
  LastUpdateTime
}