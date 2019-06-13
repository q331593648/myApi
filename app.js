const Koa = require('koa');
const router = require('koa-router')();//路由
const body = require('koa-better-body');//处理接口参数
const cors = require('koa2-cors');//处理跨域问题
const config=require('./config');//引入配置文件
const koajwt = require('koa-jwt');//token验证
const static=require('./router/static');//请求img、js、css等文件时，不需要其他逻辑，只需要读取文件
const koaRequest = require('koa-http-request');//请求第三方接口
let app = new Koa();

// 错误处理
app.use(async (ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
        ctx.body = {
          code:70002,
          message:"无效token"
        }
      }else{
          throw err;
      }
  })
})
//使用中间键
app.use(body({
  uploadDir: config.UPLOAD_DIR,//上传目录
}));//处理请求数据
app.use(cors({credentials: true}));//处理跨域
app.use(koaRequest({//请求第三方接口
  json: true, //json格式
  timeout: 3000//超时3s
}));

//验证token
app.use(koajwt({
  secret: config.tokenSecret//token加密密钥
}).unless({
	path: [/\/user/,/\/upload/] //不验证token的路由
}));
//数据库
app.context.db = require('./libs/database');//数据库信息存context下的db
app.context.config=config;//配置信息存context下的config

router.use('/', require('./router/index'));
router.use('/tools/', require('./router/tools'));
router.use('/user/', require('./router/user'));
router.use('/home/', require('./router/home'));

app.use(router.routes()).use(router.allowedMethods());//使用路由

static(router);//处理文件

app.listen(8123,()=>{//服务器启动端口
  console.log('运行成功，端口号8123');
})