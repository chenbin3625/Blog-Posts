const express = require('express')
const nav = require('./admin/nav')
const user = require('./admin/user')
let router = express.Router()
//配置中间件，解析post请求的请求体数据
router.use(express.json())
router.use(express.urlencoded({extended:false}))
//挂载
router.use('/user',user)
router.use('/nav',nav)

router.get('/',(req,res)=>{
    res.send('admin的首页')
})


router.post('/doLogin',(req,res)=>{
    console.log(req.body)
    res.send('/login/doLogin')
})

//暴露路由
module.exports = router