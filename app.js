'use strict'

const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const favicon = require('koa-favicon')
const koaBody = require('koa-body')
const errorhandler = require('errorhandler');
const morgan = require('koa-morgan')
const FileStreamRotator = require('file-stream-rotator')
const history = require('./middleware/koa2-connect-history-api-fallback')
const route = require('./router/index')
const config = require('./config');

const getLocalIP = require('./common/util').getLocalIP
const cors = require('./common/cors')
// 日志组件
const logger = require('./common').logger

const app = new Koa()

// 处理post 请求 strict 参数:如果启用，则不解析GET，HEAD，DELETE请求，默认为true
app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true, // 保持文件的后缀
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))

// HTTP请求记录器中间件---生产环境下
if (process.env.APP_ENV !== 'development') {
  const logDirectory = path.join(__dirname, 'logs')
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, '%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
  morgan.token('localDate',function getDate(req) {
    let date = new Date();
    return date.toLocaleString()
  })
  morgan.format('combined', `{time:":localDate",origin:":remote-addr",method:":method",router:":url",HTTP:":http-version",status:":status",contentLength:":res[content-length]",referrer:":referrer",ms:":response-time"}`)
  app.use(morgan('combined', {stream: accessLogStream}))
}
// HTTP请求记录器中间件---开发环境下
if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'))
}
// 处理跨域请求
app.use(cors)

// 挂载路由处理
app.use(route.routes())

// 托管前端history
app.use(history())

// 静态目录地址
const staticPath = './public'
const main = serve(path.join(__dirname, staticPath))
// 托管静态资源
app.use(main)

// 处理ico
// app.use(favicon(path.join(__dirname, staticPath, 'favicon.png')))

app.use(ctx => {
  // 如果状态是404 则返回对应的
  ctx.response.status = 404
  ctx.response.body = "404,Can not find pages~"
});

if (process.env.APP_ENV !== 'production') {
  // 挂载开发环境错误处理程序中间件
  app.use(errorhandler());
}


app.on('error', async (err, ctx, next) => {
  console.log('err.message')
  logger.error(err)
  next()
})

app.use((err, ctx) => {
  // logger 记录 error 状态
  logger.error(err);
  // 如果状态是500 则返回对应的
  ctx.response.status = 500
  ctx.response.body = "500,Something goes wrong~"
});



// 开启服务
app.listen(config.port, (error) => {
  if (error) {
    logger.error('app.js(error:app.listen(port)):' + error);
  }
  logger.debug('[%s] listening on http://%s:%d in  %s mode', config.pkg.name, getLocalIP(), config.port, process.env.APP_ENV || '');
})