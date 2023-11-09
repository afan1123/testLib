import request from '@/request'

// 产线名称接口
export function getProductName(data) {
  return request({
    url: 'offline/types',
    method: 'post',
    data
  })
}

// 获取火花包列表
export function getPackageList(data) {
  return request({
    url: 'offline/packagelist',
    method: 'post',
    data,
    isLoading: false
  })
}

// 火花包下载
export function DownSparkBao(data) {
  return request({
    url: 'offline/down',
    method: 'post',
    data
  })
}

// 获取左侧菜单栏数据
export function getMenuList(params) {
  return request({
    url: 'offline/getMenuList',
    method: 'get',
    params
  })
}
