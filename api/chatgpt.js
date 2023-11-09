const request = require('../request/index')

/* 录入Key */
async function applyKey(data) {
  const res =  await request({
    url: `firework/gpt/key?key=${data.key}`,
    method: 'post',
    data
  })
  return res
}

/* 查询 */
async function getAiDetail(options) {
  const res =  await request({
    url: `firework/gpt/ai`,
    method: 'post',
    ...options
  })
  return res
}

/* 获取免费次数 */
async function getFreeNum(data) {
  const res =  await request({
    url: `firework/gpt/free`,
    method: 'post',
    data
  })
  return res
}

module.exports = {
  applyKey,
  getAiDetail,
  getFreeNum
}