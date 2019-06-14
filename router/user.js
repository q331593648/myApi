const router = require('koa-router')();
const common = require('../libs/common');
const path = require('path');
const addtoken = require('../token/addtoken');
const {ApiErrorNames} = require('../libs/ApiErrorNames');

const table = "user";

router.post("login",async ctx=>{
   /* 获取帐号密码*/
   let {
    username,
    password
  } = ctx.request.fields;

  /* 检查帐号密码*/

  /* 查询帐号信息*/
  let datas = await ctx.db.query(`SELECT * FROM ${table} where username = ?`, [username]);

  /* 判断帐号*/
  let data = {};
  let {code,message} = ApiErrorNames.getSuccessInfo();
  if (!datas[0]) {//帐号不存在
    ({code,message} = ApiErrorNames.getErrorInfo("USER_NOT_EXIST"));
  } else if (datas[0].password != common.md5(ctx.config.ADMIN_PREFIX + password)) {//密码错误
    ({code,message} = ApiErrorNames.getErrorInfo("USER_LOGIN_ERROR"));
  } else {//返回token给前端
    let id = datas[0].id;
    let token = addtoken({username:datas[0].username,id})  //token中要携带的信息，自己定义
    data={
      username,
      token
    };
    await ctx.redis.hset("tokens",id,token);
  }
  /* 返回页面参数*/
    ctx.body = {
      code,
      message,
      data
    };  
})
router.post('register', async ctx => {
  let {UPLOAD_DIR}=ctx.config;
  /* 获取帐号密码*/
  let {username,password,file} = ctx.request.fields;
  let url =  path.basename(file[0].path);
  // let url = file[0].path;
  /* 查询帐号信息*/
  let count =  await ctx.db.query(`SELECT count(username) num FROM ${table} where username = ?`, [username]);
  let num = count[0].num;
  let {code,message} = ApiErrorNames.getSuccessInfo();
  /* 判断帐号*/
  if(num){
    ({code,message} = ApiErrorNames.getErrorInfo("USER_HAS_EXISTED"));
    await common.unlink(path.resolve(UPLOAD_DIR, url));
  }else{//插入数据
    let passwordMD5 =  common.md5(ctx.config.ADMIN_PREFIX + password);
    await ctx.db.query(`INSERT INTO ${table} (username,password,url) VALUES(?,?,?)`, [username,passwordMD5,url]);
  }
  /* 返回页面参数*/
    ctx.body = {
      code,
      message
    };
});

module.exports = router.routes();