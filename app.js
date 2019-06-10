const Koa = require('koa');
const router = require('koa-router')();
const body = require('koa-better-body');
const cors = require('koa2-cors');
const config=require('./config');

let app = new Koa();

app.use(body());
app.use(cors({credentials: true}));

//数据库
app.context.db = require('./libs/database');
app.context.config=config;

router.use('/', require('./router/index'));
router.use('/demo1/', require('./router/demo1'));

app.use(router.routes());

app.listen(8123,()=>{
  console.log('运行成功，端口号8123');
})