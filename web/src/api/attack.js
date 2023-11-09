import request from '@/request'

/* 基本信息 */
export function getAttackBaseInfo(params) {
  return request({
    url: 'attack/baseInfo',
    method: 'get',
    params
  })
}

/* C段IP信息 */
export function getAttackSegment(params) {
  return request({
    url: 'attack/segment',
    method: 'get',
    params
  })
}

/* 分组统计信息 */
export function getAttackGroupCount(params) {
  return request({
    url: 'attack/groupCount',
    method: 'get',
    params
  })
}

/* 获取regeo */
export function getAttackRegeo(params) {
  return request({
    url: 'attack/regeo',
    method: 'get',
    params
  })
}

/* 攻击趋势 */
export function getAttackTrend(params) {
  return request({
    url: 'attack/trend',
    method: 'get',
    params
  })
}

