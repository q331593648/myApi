const router = require('koa-router')();
const {ApiErrorNames} = require('../../libs/ApiErrorNames');
const table = "user";


router.get("userList",async ctx=>{

  let userLists =  await ctx.db.query(`SELECT * FROM ${table}`);
  let {code,message} = ApiErrorNames.getSuccessInfo();
  ctx.body={
    code,
    message,
    data:userLists
  }
})

router.use("userOperation",require("./userOperation"))

module.exports = router.routes();