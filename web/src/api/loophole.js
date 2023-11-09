import request from '@/request'

// 漏洞列表
export function getLoopHoleList(data) {
  return request({
    url: 'loophole/vul/search',
    method: 'post',
    data
  })
}

// 攻击类型列表
export function getVulTypes(params) {
  return request({
    url: 'loophole/vul/types',
    method: 'get',
    params
  })
}

// 获取漏洞详情
export function getLoopDetail(params) {
  return request({
    url: 'loophole/vul/detail',
    method: 'get',
    params
  })
}

// 获取漏洞详情 -- cpe
export function getLoopDetailCPE(params) {
  return request({
    url: 'loophole/vul/cpe',
    method: 'get',
    params
  })
}

// 漏洞资产
export function getLoopCyber(params) {
  return request({
    url: 'loophole/vul/cyber',
    method: 'get',
    params
  })
}

// 漏洞列表
export function getCveOrigin(data) {
  return request({
    url: 'loophole/vul/cve-origin',
    method: 'post',
    data
  })
}
