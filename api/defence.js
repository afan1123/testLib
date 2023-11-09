const request = require('../request/index')
const { getBody } = require('./response.msg')

/* 跨域情报告警 */
async function getCrosList(data) {
  const res =  await request({
    url: `firework/defence-events`,
    method: 'post',
    data
  })
  return getBody(res)
}

/* 火花H专项情报 */
async function getSparkData(params) {
      const res =  await request({
        url: `spark/defence/statistics`,
        method: 'get',
        params
      })
      return getBody(res)
    }

/* 高疑似IP */
async function getRedteam(params) {
      const res =  await request({
        url: `spark-log/defence/statistics`,
        method: 'get',
        params
      })
      return getBody(res)
    }
/* 地图数据 */
async function getUsermapStatistics(params) {
      const res =  await request({
        url: `spark/usermap/statistics`,
        method: 'get',
        params
      })
      return getBody(res)
      // const res = {
      //   status: 200,
      //   data: {"code":200,"data":{"all":{"山东":43,"福建":29,"台湾":0,"河北":31,"河南":37,"重庆":16,"湖北":41,"湖南":27,"江西":18,"海南":14,"黑龙江":21,"天津":16,"贵州":10,"陕西":16,"新疆":23,"澳门":0,"江苏":39,"安徽":26,"西藏":6,"吉林":8,"上海":18,"山西":29,"甘肃":17,"宁夏":11,"香港":0,"四川":49,"北斗":30,"浙江":23,"广西":18,"云南":16,"内蒙古":6,"辽宁":39,"广东":103,"青海":18,"北京":990},"source":{"山东":{"people":1,"intelligence":8},"黑龙江":{"people":1,"intelligence":2},"辽宁":{"people":1,"intelligence":3},"广东":{"people":1,"intelligence":1},"天津":{"people":1,"intelligence":622},"四川":{"people":1,"intelligence":5},"河南":{"people":1,"intelligence":1},"北斗":{"people":1,"intelligence":22},"海南":{"people":1,"intelligence":1714},"北京":{"people":19,"intelligence":52696}},"vip":{"山东":1,"福建":1,"台湾":0,"河北":1,"河南":2,"重庆":1,"湖北":5,"湖南":1,"江西":0,"海南":5,"黑龙江":4,"天津":6,"贵州":1,"陕西":3,"新疆":2,"澳门":0,"江苏":5,"安徽":3,"西藏":0,"吉林":1,"上海":1,"山西":8,"甘肃":2,"宁夏":1,"香港":0,"四川":5,"北斗":13,"浙江":1,"广西":1,"云南":0,"内蒙古":0,"辽宁":5,"广东":4,"青海":2,"北京":153}},"msg":"操作成功"}
      // }
      // return res
}

module.exports = {
    getCrosList,
    getSparkData,
    getRedteam,
    getUsermapStatistics
}