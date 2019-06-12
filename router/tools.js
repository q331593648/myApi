const router = require('koa-router')();

router.get("getOneTip",async ctx=>{
  let oneTips = await ctx.get('https://v1.hitokoto.cn/', null, {
    'User-Agent': 'koa-http-request'
});
  ctx.body =oneTips;
  
})

module.exports = router.routes();