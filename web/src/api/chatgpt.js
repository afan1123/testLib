import request from '@/request'

/* 录入Key */
export function applyKey(data) {
  return request({
    url: 'chatgpt/apply',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 查询 */
export function getAiDetail(data) {
  return request({
    url: 'chatgpt/search',
    method: 'post',
    data,
    isLoading: false
  })
}

/* 获取免费次数 */
export function getFreeNum(data) {
  return request({
    url: 'chatgpt/free',
    method: 'post',
    data,
    isLoading: false
  })
}

