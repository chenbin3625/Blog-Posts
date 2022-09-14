const express = require('express')
const app = express()
const admin = require('./routes/admin')
const api = require('./routes/api')
const index = require('./routes/index')

//配置解析post body
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//配置静态web目录
app.use(express.static('static'))
//挂载login模块
app.use('/admin',admin)
app.use('/api',api)
app.use('/',index)

app.listen(3000)