const http = require('http');
const url = require('url')
const fs = require('fs')
//自定义的模块，用于根据文件后缀名，返回对应的响应头信息
const common = require('./module/common')
//path模块，可以获取文件后缀名
const path = require('path')


http.createServer(function (request, response) {
    //1.获取地址    
    const myURL = new URL(request.url, 'http://127.0.0.1:3000/');
    let pathname = myURL.pathname;
    //解决访问默认地址的时候，后面自动加入index.html后缀
    pathname = pathname === '/'?'/index.html':pathname
    //extname为文件后缀名
    let extname = path.extname(pathname)
    console.log( common.getNewMime(extname))
    //通过fs模块读取文件
    if (pathname !== '/favicon.ico') {
        fs.readFile(`./static${pathname}`,async (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type':await common.getNewMime(extname)+';charset=utf-8' });
                response.write("<head><meta charset='UTF-8'></head>")
                response.end('这个页面不存在')
            }
            //设置响应头
            response.writeHead(200, { 'Content-Type': await common.getNewMime(extname)+';charset=UTF-8' });
            //在页面上打印数据
            response.end(data)
        })
    }

}).listen(3000);
