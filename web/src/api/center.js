import request from '@/request'

// 情报列表接口
export function getIntellList(params) {
  return request({
    url: 'center/intelList',
    method: 'get',
    params
  })
}

// 手动上传情报
export function HandUploadTpl(data) {
  return request({
    url: 'center/handuploadTemp',
    method: 'post',
    data
  })
}

