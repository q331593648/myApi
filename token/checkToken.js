 const jwt = require('jsonwebtoken');
 const {tokenSecret} = require('../config');  //密钥，不能丢
 module.exports =(tokens) => {
   if (tokens){
     // 解析
     let payload = jwt.decode(tokens.split(' ')[1], tokenSecret);
     return payload;
   }
 };