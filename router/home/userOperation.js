const router = require('koa-router')();
const {ApiErrorNames} = require('../../libs/ApiErrorNames');
const common = require('../../libs/common');
const path = require('path');
const table = "user";

router.get("/del/:id/",async ctx=>{
  let {UPLOAD_DIR}=ctx.config;
  let {id}=ctx.params;
  let {code,message} = ApiErrorNames.getSuccessInfo();
  let data = await ctx.db.query(`select url  from ${table} where id = ?`, [id]);
  await ctx.db.query(`delete  from ${table} where id = ?`, [id]);
  let url = data[0].url;
  await common.unlink(path.resolve(UPLOAD_DIR, url));
  ctx.body={
    code,
    message
  }
})

module.exports = router.routes();