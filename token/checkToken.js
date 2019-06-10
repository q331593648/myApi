 const jwt = require('jsonwebtoken');
 const secret = 'token';  //密钥，不能丢
 module.exports =(tokens) => {
   if (tokens){
     // 解析
     let payload = jwt.decode(tokens.split(' ')[1], secret);
     return payload;
   }
 };