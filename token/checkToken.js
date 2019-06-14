 const jwt = require('jsonwebtoken');
 const {tokenSecret} = require('../config');  //密钥，不能丢
 module.exports = async(ctx,next) => {
   const tokens = ctx.header.authorization;
   const reg = /^\/(upload|user)\//;
   ctx.request.fileds;
   ctx.state.user;
   if(!reg.test(ctx.request.url)){
    let payload = jwt.decode(tokens.split(' ')[1], tokenSecret);
    if(!payload){
      ctx.throw(401,"INVALID_TOKEN");
    }
   let reidsTonken =await ctx.redis.hget("tokens",payload.id);
   if(reidsTonken != tokens.split(' ')[1]){
    ctx.throw(401,"ELSE_TOKEN");
   }
     ctx.state.user=payload;
   }
   await next();
 };