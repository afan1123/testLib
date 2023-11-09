const getLocalIP = require('./util').getLocalIP
const cors = require('koa2-cors')

module.exports = cors({
  origin: (ctx) => { //设置允许来自指定域名请求
    // return `http://172.16.70.174:8080`; //只允许http://localhost:8080这个域名的请求
    return `http://${getLocalIP()}:8080`; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
})
