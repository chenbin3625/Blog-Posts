const express = require('express')
let router = express.Router()
//配置中间件，解析post请求的请求体数据
router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/',(req,res)=>{

    res.send('首页')
})


//暴露路由
module.exports = router