const request = require('../request/index')
const { getBody } = require('./response.msg')


/* IOC列表 */
async function getIocList(params) {
  const res =  await request({
    // url: `spark-city/ioc/log4j`,
    url: 'special/topic/log4j/ioc',
    method: 'get',
    params
  })
  return getBody(res)
}

/* 最新热点列表 */
async function getHotList(params) {
  const res =  await request({
    url: 'special/topic/log4j/hot',
    method: 'get',
    params
  })
  return getBody(res)
}

/* OUTIOC列表 */
async function getOutIocList(params) {
  const res =  await request({
    url: 'special/topic/log4j/ip',
    method: 'get',
    params
  })
  return getBody(res)
}


/* 最新样本列表 */
async function getSampleList(params) {
  const res =  await request({
    url: 'special/topic/hunter/sample',
    method: 'get',
    params
  })
  return getBody(res)
}

/* 最新资讯 */
async function getArticle(params) {
  const res =  await request({
    url: 'spark/topic/information/news',
    method: 'get',
    params
  })
  return getBody(res)
}




module.exports = {
    getIocList,
    getHotList,
    getOutIocList,
    getSampleList,
    getArticle
}