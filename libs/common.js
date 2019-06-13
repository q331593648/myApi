const crypto = require('crypto');
const fs = require('await-fs');

module.exports={
  md5(buffer){
    let obj = crypto.createHash('md5');
    obj.update(buffer);

    return obj.digest('hex');
  },
  unlink(path){
    return new Promise((resolve, reject)=>{
      fs.unlink(path, (err)=>{
        if(err){
          reject(err);
        }else{
          resolve();
        }
      });
    });
  },
  pagination(pageNum,pageSize){
    let pageNo = 0;
    if(pageNum >1){
      pageNo = (pageNum - 1) * pageSize
    }
    return pageNo
  }
}