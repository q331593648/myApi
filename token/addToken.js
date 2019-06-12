const jwt = require('jsonwebtoken');
const {tokenSecret} = require('../config');  //密钥，不能丢
module.exports = (userinfo) => { //创建token并导出
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username: userinfo.username,
    id: userinfo.id,
  }, tokenSecret);
  return token;
};