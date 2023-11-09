const request = require('../request/index')

/* 基本信息 */
async function getAttackBaseInfo(params) {
  const res =  await request({
    url: 'spark-persona/hvvattcaker/baseinfo',
    method: 'get',
    params
  })
  return res
}

/* C段IP信息 */
async function getAttackSegment(params) {
  const res =  await request({
    url: 'spark-persona/hvvattcaker/segment',
    method: 'get',
    params
  })
  return res
}

/* 分组统计信息 */
async function getAttackGroupCount(params) {
  const res =  await request({
    url: 'spark-persona/hvvattcaker/groupcount',
    method: 'get',
    params
  })
  return res
}

/* 获取regeo */
async function getAttackRegeo(params) {
  const res =  await request({
    url: 'spark-persona/hvvattcaker/regeo',
    method: 'get',
    params
  })
  return res
}

/* 攻击趋势 */
async function getAttackTrend(params) {
  const res =  await request({
    url: 'spark-persona/hvvattcaker/trend',
    method: 'get',
    params
  })
  return res
}

module.exports = {
  getAttackBaseInfo,
  getAttackSegment,
  getAttackGroupCount,
  getAttackRegeo,
  getAttackTrend
}