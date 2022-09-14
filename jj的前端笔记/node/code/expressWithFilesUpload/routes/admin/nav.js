const express = require('express')
const { upload } = require('../../model/tools')

let router = express.Router()

//设置key值以及一次性选中的文件最大数量
let cpUpload = upload.array('photos',12)
//多个文件上传的配置
router.post('/doLogin',cpUpload,(req,res)=>{
    //{ name: 'jzsp', password: 'jzsp' }  req.body中是不包含文件的，文件在req.file或者req.files中
    console.log(req.body)
    res.send({
        body:req.body,
        //多个文件上传的信息会被放在req.files中
        files:req.files
    })
})

module.exports = router