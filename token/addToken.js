const jwt = require('jsonwebtoken');
 const secret = 'token';  //密钥，不能丢
module.exports = (userinfo) => { //创建token并导出
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (1 * 60),
    username: userinfo.username,
    id: userinfo.id,
  }, secret);
  return token;
};