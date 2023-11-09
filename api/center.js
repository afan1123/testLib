const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 情报列表 */
async function getIntellList(params) {
  const res =  await request({
    url: `spark/tasks/person`,
    method: 'get',
    params
  })
  return res
}

// 模板手动上传
async function HandUploadTpl(data = {}) {
  data.argType = 'qs'
  const res =  await request({
    url: `spark/submit/form`,
    method: 'post',
    data
  })
  return res
}

module.exports = {
  getIntellList,
  HandUploadTpl
}