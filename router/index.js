const router = require('koa-router')();

router.get("getLike", async ctx => {
  ctx.body = {
    code:0,
    data:[{id:1,name:"wy"},{id:2,name:"wg"}]
  }
});

module.exports = router.routes();