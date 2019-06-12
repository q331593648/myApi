const path = require('path');

module.exports = {
  DB_HOST:'localhost',
  DB_PORT:'3306',
  DB_USER:'root',
  DB_PASS:'111111',
  DB_NAME:'wy',
  ADMIN_PREFIX:'123456_wyxyz',
  tokenSecret:'token',//token加密字段
  HTTP_ROOT: 'http://localhost:8123',
  imgUrl:'http://localhost:8123/upload/',
  UPLOAD_DIR: path.resolve(__dirname, './static/upload'),
}