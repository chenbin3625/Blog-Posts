const path = require('path')
const multer = require('multer')
const sd = require('silly-datetime')
//mkdirp，创建目录（内置了判断是否存在目录，不需要做判断）
const mkdirp = require('mkdirp')
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        let day = sd.format(new Date(),'YYYYMMDD')
        let dir = `static/upload/${day}`
        mkdirp(dir).then(res=>{
            cb(null,dir)
        })
        
    },
    filename:function(req,file,cb){
        console.log(file)
        let extname = path.extname(file.originalname)
        cb(null,file.fieldname + '-' + Date.now() + extname)
    }
})
const upload = multer({storage:storage})
module.exports = {
    upload
}