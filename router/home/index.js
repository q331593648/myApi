const router = require('koa-router')();
const {ApiErrorNames} = require('../../libs/ApiErrorNames');
const table = "user";
const common = require('../../libs/common');

router.post("userList",async ctx=>{
  let {pageNum,pageSize} = ctx.request.fields;

  let pageNo = common.pagination(pageNum,pageSize);
  let userLists =  await ctx.db.query(`SELECT * FROM ${table} LIMIT ?,?`,[pageNo,pageSize*pageNum]);
  let total =  await ctx.db.query(`SELECT count(id) total FROM ${table}`);
  let {code,message} = ApiErrorNames.getSuccessInfo();
  ctx.body={
    code,
    message,
    data:{
      total:total[0].total,
      list:userLists,
      auth:ctx.state.user.id
    }
  }
})

router.use("userOperation",require("./userOperation"))

module.exports = router.routes();