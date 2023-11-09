import request from '@/request'

// 任务列表接口（网络空间资产、ip地理位置）
export function getTaskList(params) {
  return request({
    url: 'task/location',
    method: 'get',
    params
  })
}

// 任务列表接口（火花情报）
export function getSparkTaskList(params) {
  return request({
    url: 'task/spark',
    method: 'get',
    params
  })
}

// 任务列表（威胁情报）
export function getThreatTaskList(data) {
  return request({
    url: 'task/threatlist',
    method: 'post',
    data
  })
}

// 任务列表（IP域名反查）
export function getIpPndsTaskList(params) {
  return request({
    url: 'task/ippndslist',
    method: 'get',
    params
  })
}

// 任务列表（攻击画像）
export function getAttackTaskList(params) {
  return request({
    url: 'task/attacklist',
    method: 'get',
    params
  })
}

// 创建任务接口（网络空间资产、ip地理位置）
export function getCreateTask(data) {
  return request({
    url: 'task/create',
    method: 'post',
    data,
    isTimestamp: true
  })
}

// 创建任务接口（火花情报）
export function getCreateSparkTask(data) {
  return request({
    url: 'task/createspark',
    method: 'post',
    data,
    isTimestamp: true
  })
}

// 创建任务接口（威胁情报、whois）
export function getCreateThreatTask(data) {
  return request({
    url: 'task/createthreat',
    method: 'post',
    data,
    isTimestamp: true
  })
}

// 创建任务接口（IP域名反查、子域名探测）
export function getCreateIpPndsTask(data) {
  return request({
    url: 'task/createippnds',
    method: 'post',
    data,
    isTimestamp: true
  })
}

// 创建任务接口（攻击画像）
export function getCreateAttackTask(data) {
  return request({
    url: 'task/createattack',
    method: 'post',
    data,
    isTimestamp: true
  })
}

// 删除任务接口（网络空间资产、ip地理位置）
export function DeletedTask(data) {
  return request({
    url: 'task/delete',
    method: 'post',
    data
  })
}

// 删除任务接口（IP域名反查）
export function DeletedIpPndsTask(data) {
  return request({
    url: 'task/deleteippnds',
    method: 'post',
    data
  })
}

// 删除任务接口（攻击画像）
export function DeletedAttackTask(data) {
  return request({
    url: 'task/deleteattack',
    method: 'post',
    data
  })
}

// 下载文件接口（网络空间资产、ip地理位置）
export function DownFile(params) {
  return request({
    url: 'task/download',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 下载文件接口（火花情报）
export function DownSparkFile(params) {
  return request({
    url: 'task/downspark',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 下载接口（威胁情报）
export function DownThreatFile(params) {
  return request({
    url: 'task/downthreat',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

// 下载接口（IP域名反查）
export function DownIpPndsFile(params) {
  return request({
    url: 'task/downippnds',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

/* 重置---网络空间资产 */
export function RescanTask(data) {
  return request({
    url: 'task/rescan',
    method: 'post',
    data
  })
}

/* 攻击画像---详情 */
export function getAttackDetail(params) {
  return request({
    url: 'task/detail',
    method: 'get',
    params
  })
}
