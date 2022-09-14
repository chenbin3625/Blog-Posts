# 技巧

## 获取文件后缀名

123.png，返回.png

![image-20211218180936063](newNode.assets/image-20211218180936063.png)

# 问题

## 在vscode中用nodemon时报错

![image-20211210145017418](newNode.assets/image-20211210145017418.png)

解决办法

![image-20211210145002696](newNode.assets/image-20211210145002696.png)

# http模块、url模块

在vscode中输入node，选中node-http-server选项，创建web应用程序

![image-20211210143735068](newNode.assets/image-20211210143735068.png)

![image-20211210143720806](newNode.assets/image-20211210143720806.png)

解决乱码

```js

//引入http模块
const http = require('http');
/**
 *  createServer创建服务
 *  request 获取url传过来的信息
 *  response 响应信息
 */
http.createServer(function (request, response) {
  //设置响应头，解决文字乱码
  response.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
  response.write("<head><meta charset='UTF-8'></head>")
    
  response.write("你好 nodejs")

  //给页面输出一句话并且,结束响应,很重要！如果不调用end的话请求就不会结束
  response.end('Hello World');
  
  //打开8081端口
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
```

## url模块

parse解析数据，参数1是请求路径，参数2是要将query解析成json格式的布尔值

![image-20211210154425238](newNode.assets/image-20211210154425238.png)

# CommonJs和Node模块，自定义模块

## 什么是commonjs

<img src="newNode.assets/image-20211210154802040.png" alt="image-20211210154802040" style="zoom:50%;" />

## Nodejs模块分类

<img src="newNode.assets/image-20211210154915154.png" alt="image-20211210154915154" style="zoom:50%;" />



### nodejs自定义模块

<img src="newNode.assets/image-20211210155006438.png" alt="image-20211210155006438" style="zoom:67%;" />

### commonjs规范的模块导入导出

#### 通过exports.xxx暴露

- 在modules文件夹下定义模块，并且用exports.xxx暴露obj对象，被暴露的内容最终都会作为exports的属性被封装在exports对象中

![image-20211210155913020](newNode.assets/image-20211210155913020.png)

- 在commonjs01.js文件中require这个自定义的模块并且输出，注意要使用完整包名（可以省略js后缀）
  可以看到jzsp是一个对象，里面有我们暴露出来的req对象（这个属性名是暴露是的.xxx来决定的），req对象中有我们封装的get和post方法

![image-20211210160116203](newNode.assets/image-20211210160116203.png)

![image-20211210160120679](newNode.assets/image-20211210160120679.png)

- 想调用内部的方法的话

![image-20211210160242741](newNode.assets/image-20211210160242741.png)

![image-20211210160247923](newNode.assets/image-20211210160247923.png)

- exports.xxx可以在exports对象中封装很多内容

![image-20211210160541383](newNode.assets/image-20211210160541383.png)

![image-20211210160547499](newNode.assets/image-20211210160547499.png)

#### 通过module.exports暴露

修改暴露数据的代码

![image-20211210160620516](newNode.assets/image-20211210160620516.png)

在commonjs01中require获取的内容直接就是这个暴露的obj对象了，外面没有套一层exports

![image-20211210160731363](newNode.assets/image-20211210160731363.png)

**这两种使用方式是等价的**

![image-20220124210745300](newNode.assets/image-20220124210745300.png)

#### 引入node_modules文件夹中的内容

引入node_modules文件夹中的内容不需要写完整路径和index.js，只需要写包名，就会自动引入对应包下的index.js文件

<img src="newNode.assets/image-20211210162057906.png" alt="image-20211210162057906" style="zoom:50%;" />

注意，一定是对应的index.js文件，如果对应（例如axios）包下没有index文件，就会报错

![image-20211210163042029](newNode.assets/image-20211210163042029.png)

解决办法是，在对应的包的目录下，终端输入npm init初始化项目配置文件，里面的main就是入口文件

**这是因为，如果对应包下有package.json文件的话，会优先根据main的值去查找对应的文件**

<img src="newNode.assets/image-20211210163255873.png" alt="image-20211210163255873" style="zoom: 80%;" />

<img src="newNode.assets/image-20211210163326562.png" alt="image-20211210163326562" style="zoom:80%;" />





### ES6规范的模块导入导出（待完成）













# nodejs中的包、npm、第三方模块、package.json以及cnpm

## 包

<img src="newNode.assets/image-20211210163646426.png" alt="image-20211210163646426" style="zoom:67%;" />



<img src="newNode.assets/image-20211210163712855.png" alt="image-20211210163712855" style="zoom:67%;" />

<img src="newNode.assets/image-20211210163738312.png" alt="image-20211210163738312" style="zoom:67%;" />



## npm

首先npm init生成package.json文件

然后npm install安装想要的模块（在npm install的时候会自动生成node_modules包，并且在package.json的依赖属性中添加依赖，如果是cnpm install的话需要加--save才会将依赖加到package.json中）

![image-20211210165426417](newNode.assets/image-20211210165426417.png)

最后引入模块并使用

![image-20211210165513637](newNode.assets/image-20211210165513637.png)

​		注意，在发项目文件的时候，一般是不发送node_modules文件的，那没有这个文件夹不就没有模块了吗？这个时候我们只需要在终端输入**npm install**，他就会根据package.json中dependencies的属性来下载对应的模块，自动生成node_modules文件夹



卸载包的话，有两种方式

- npm uninstall xxx
- 在package.json对应的dependencies中删除掉那一行，重新npm install（可能需要删掉node_modules）



指定包名安卓的话，要加@版本号，例如

npm install jquery@1.8.0

或者在对应dependencies中去掉前缀符号，只留下版本号



## Package.json

通过npm init生成package.json文件

![image-20211212143238551](newNode.assets/image-20211212143238551.png)



## cnpm

官网https://npmmirror.com/



安装

![image-20211212143522797](newNode.assets/image-20211212143522797.png)

# NodeJs中的fs模块

如果有需要获取信息的，一般来说，回调函数都有两个参数，第一个是err，第二个是data

![image-20211212143927682](newNode.assets/image-20211212143927682.png)

## fs.stat检测文件or目录

```js
const fs = require('fs')

fs.stat('./html',(err,data)=>{
    if(err){
        console.log(err)
        return;
    }

    console.log(`是文件：${data.isFile()}`)
    console.log(`是目录：${data.isDirectory()}`)
})
```

![image-20211212144805941](newNode.assets/image-20211212144805941.png)

## fs.mkdir创建目录

![image-20211212145342254](newNode.assets/image-20211212145342254.png)

第二个参数可以不传

![image-20211212145215282](newNode.assets/image-20211212145215282.png)

存在对应目录的时候会报错

![image-20211212145307325](newNode.assets/image-20211212145307325.png)

## fs.writeFile创建写入文件

options可以不写

![image-20211212145704815](newNode.assets/image-20211212145704815.png)

如果对应文件已经存在，则会替换掉对应文件，不存在就会创建并且写入

![image-20211212145559125](newNode.assets/image-20211212145559125.png)

## fs.appendFile追加文件

用法跟writeFile一样，就是一个是追加，一个是替换

![image-20211212145948591](newNode.assets/image-20211212145948591.png)

## fs.readFile读取文件

回调函数中的data是buffer对象，要toString转换成字符串

![image-20211212150235213](newNode.assets/image-20211212150235213.png)

## fs.readdir读取目录

读取到了目录下的文件和目录，存储在data中（数组）

![image-20211212150616340](newNode.assets/image-20211212150616340.png)

## fs.rename重命名、移动文件

重命名

![image-20211212151052079](newNode.assets/image-20211212151052079.png)

![image-20211212151107206](newNode.assets/image-20211212151107206.png)

移动文件

![image-20211212151225317](newNode.assets/image-20211212151225317.png)

![image-20211212151244097](newNode.assets/image-20211212151244097.png)



## fs.rmdir删除目录	

删除目录必须在目录下没有文件的情况下删除

![image-20211212152039626](newNode.assets/image-20211212152039626.png)

![image-20211212152047035](newNode.assets/image-20211212152047035.png)



## fs.unlink删除文件

![image-20211212151951651](newNode.assets/image-20211212151951651.png)

![image-20211212152005922](newNode.assets/image-20211212152005922.png)

# 创建一个静态服务器，访问服务器里的文件（上）

​		现在要实现的是，在url后面跟上文件名（例如index.html），就可以访问服务器中对应的index.html的静态资源，如果放一个zip压缩文件，访问对应地址的时候就应该可以下载对应的zip包

```js
const http = require('http');
const url = require('url')
const fs = require('fs')
http.createServer(function (request, response) {

    //获取地址
    let pathname = request.url
    //通过fs模块读取文件
    if (pathname !== '/favicon.ico') {
        fs.readFile(`./static${pathname}`, (err, data) => {
            console.log(data)
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/html;charset=UTF-8' });
                response.end('这个页面不存在')
            }
            //设置响应头
            response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
            //在页面上打印数据
            response.end(data)
        })
    }

}).listen(3000);

```

到这一步还是有问题的，例如

- 响应的html页面不加载css样式
- 访问默认端口不加url的时候显示这个页面不存在

不加载样式是因为，响应头信息里的contentType中返回的是text/html

![image-20211214170607360](newNode.assets/image-20211214170607360.png)

于是我们自己写一个模块，根据文件后缀名，返回对应的响应头内容字符串

```js
let getMime = extname=>{
    switch(extname){
        case '.html': return 'text/html';break;
        case '.css': return 'text/css';break;
        case '.js': return 'text/javascript';break; 
        default:return  'text/html'
    }
}
module.exports={
    getMime
}
```

配合path模块使用(其实可以直接按.分割字符串的。。。)

![image-20211214170722397](newNode.assets/image-20211214170722397.png)

```js
const http = require('http');
const url = require('url')
const fs = require('fs')
//自定义的模块，用于根据文件后缀名，返回对应的响应头信息
const common = require('./module/common')
//path模块，可以获取文件后缀名
const path = require('path')


http.createServer(function (request, response) {

    //获取地址
    let pathname = request.url
    //解决访问默认地址的时候，后面自动加入index.html后缀
    pathname = pathname === '/'?'/index.html':pathname
    //extname为文件后缀名
    let extname = path.extname(pathname)
    //通过fs模块读取文件
    if (pathname !== '/favicon.ico') {
        fs.readFile(`./static${pathname}`, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': common.getMime(extname)+';charset=UTF-8' });
                response.end('这个页面不存在')
            }
            //设置响应头
            response.writeHead(200, { 'Content-Type': common.getMime(extname)+';charset=UTF-8' });
            //在页面上打印数据
            response.end(data)
        })
    }

}).listen(3000);

```

但是老师这里的话，获取json文件的时候输出了404

![image-20211214170814580](newNode.assets/image-20211214170814580.png)

因为多了后缀，导致path.extname模块取出的是.后面的所有内容。。。。所以要用url模块获取pathname（不加query后缀的字符串）

<img src="newNode.assets/image-20211214171244116.png" alt="image-20211214171244116" style="zoom:67%;" />

（这里哔友们找到了url模块parse被弃用的解决办法，new一个URL对象，里面有pathname属性，构造方法中后者是baseURL，前者是url）

![image-20211214173200452](newNode.assets/image-20211214173200452.png)

```js
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
    //通过fs模块读取文件
    if (pathname !== '/favicon.ico') {
        fs.readFile(`./static${pathname}`, (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': common.getMime(extname)+';charset=UTF-8' });
                response.end('这个页面不存在')
            }
            //设置响应头
            response.writeHead(200, { 'Content-Type': common.getMime(extname)+';charset=UTF-8' });
            //在页面上打印数据
            response.end(data)
        })
    }

}).listen(3000);

```

但是这里还留了个悬念，就是，当前我们自定义的模块中，只能响应一部分的文件类型，其他文件响应不了

# 创建一个静态服务器，访问服务器里的文件（下）

为了响应绝大多数的文件类型，我们找到了文件类型映射表（放在了当前笔记目录了），并且加一个映射方法，如下

<img src="newNode.assets/image-20211214175201774.png" alt="image-20211214175201774" style="zoom: 80%;" />

注意此时有一个问题，就是，在这个模块里写的相对路径字符串，**引用到其他文件中之后，相对路径会发生改变**，并不是相对原来位置的路径，所以用了绝对地址。。。修改后如下（注意，因为文件后缀名是带.的字符串，所以在获取对象属性的时候，得用数组下标形式获取）

```js
let getNewMime = extname=>{
    fs.readFile('D:\\study\\code\\nodeDemo\\fs\\data\\mime.json',(err,data)=>{
        if(err)
        {
            console.log(err)
            return
        }
        //data就是读取到的文件中的16进制buffer对象,先转成json字符串，再转成JSON对象
        let mimeDatas = JSON.parse(data.toString())
        return mimeDatas[extname]
    })
}
module.exports={
    getMime,getNewMime
}
```

结果

![image-20211214180432451](newNode.assets/image-20211214180432451.png)

此时还有一个问题，因为readFile是异步的方法，直接获取返回结果是undefined

![image-20211214180943686](newNode.assets/image-20211214180943686.png)

所以我们要将这个异步方法封装为promise，模块代码如下

```js
let getNewMime = extname=>{
    //直接返回promise对象
    return new Promise((resolve,reject)=>{
        fs.readFile('D:\\study\\code\\nodeDemo\\fs\\data\\mime.json',(err,data)=>{
            if(err)
            {
                console.log(err)
                //修改状态为失败的promise
                reject(err)
            }
            //data就是读取到的文件中的16进制buffer对象,先转成json字符串，再转成JSON对象
            let mimeDatas = JSON.parse(data.toString())
            //修改状态为成功的promise
            resolve(mimeDatas[extname])
        })
    })

}
```

服务器端代码如下

```js
const http = require('http');
const url = require('url')
const fs = require('fs')
const common = require('./module/common')
const path = require('path')

http.createServer(function (request, response) {  
    const myURL = new URL(request.url, 'http://127.0.0.1:3000/');
    let pathname = myURL.pathname;
    pathname = pathname === '/'?'/index.html':pathname
    let extname = path.extname(pathname)
    if (pathname !== '/favicon.ico') {
        //将回调函数声明为异步方法，里面使用await接收promise内保存的值
        fs.readFile(`./static${pathname}`,async (err, data) => {
            if (err) {
                response.writeHead(404, { 
                    'Content-Type':await common.getNewMime(extname)+';charset=UTF-8' 
                });
                //解决乱码
                 response.write("<head><meta charset='UTF-8'></head>")
                response.end('这个页面不存在')
            }
            response.writeHead(
                200,
                { 
                	'Content-Type': await common.getNewMime(extname)+';charset=UTF-8' 
           		});
            response.end(data)
        })
    }

}).listen(3000);
```

也可以改写成同步方法（文件操作都有对应的同步和异步方法），但是异步操作会阻塞线程，效果感觉不太好

![image-20211214191107166](newNode.assets/image-20211214191107166.png)

至此，访问对应的url就可以获取到对应的文件了

<img src="newNode.assets/image-20211214190813953.png" alt="image-20211214190813953" style="zoom:67%;" />

<img src="newNode.assets/image-20211214190835138.png" alt="image-20211214190835138" style="zoom:67%;" />

<img src="newNode.assets/image-20211214190854084.png" alt="image-20211214190854084" style="zoom:67%;" />

封装上面的静态web服务

```js
const fs = require('fs')
const path = require('path')

//仅仅供下面那个函数使用
let getNewMime = extname=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('D:\\study\\code\\nodeDemo\\fs\\data\\mime.json',(err,data)=>{
            if(err)
            {
                console.log(err)
                reject(err)
            }
            //data就是读取到的文件中的16进制buffer对象,先转成json字符串，再转成JSON对象
            let mimeDatas = JSON.parse(data.toString())
            console.log(mimeDatas[extname]) 
            resolve(mimeDatas[extname])
        })
    })
}

//封装的静态web服务，传入req,res,和对应要访问文件的根目录
let saticWeb = function(request,response,staticPath){
        //new一个URL对象
        const myURL = new URL(request.url, 'http://127.0.0.1:3000/');
        //通过pathname属性获取到对应的url（不含query后缀）
        let pathname = myURL.pathname;
        //如果访问的是默认的端口不加url的话，默认访问index.html
        pathname = pathname === '/'?'/index.html':pathname
        //根据路径名获取文件后缀（就是最后一个'.'到末尾的字符串）
        let extname = path.extname(pathname)
        //过滤掉url为favicon.ico的请求
        if (pathname !== '/favicon.ico') {
            //拼接staticPath
            fs.readFile(`./${staticPath}${pathname}`,async (err, data) => {
                //如果报错了，就打印错误信息
                if (err) {
                    response.writeHead(404, { 'Content-Type':await getNewMime(extname)+';charset=utf-8' });
                    response.write("<head><meta charset='UTF-8'></head>")
                    response.end('error')
                }
                //成功，设置对应的响应头类型以及打印内容
                response.writeHead(200, { 'Content-Type': await getNewMime(extname)+';charset=UTF-8' });
                response.end(data)
            })
        }
}
module.exports={
    saticWeb
}
```

![image-20211214193539811](newNode.assets/image-20211214193539811.png)

# 原生POST传值

![image-20211214200932855](newNode.assets/image-20211214200932855.png)

# 路由

根据不同的url，处理不同的业务逻辑

![image-20211214193722568](newNode.assets/image-20211214193722568.png)

​		老师的代码里就是根据url去处理不同的逻辑，大概的写了一下，我这先不做笔记，截个图（这里需要注意的是，routes.static对应的方法是异步的，访问的时候返回的是页面不存在，因为在它还没执行完异步方法的时候就已经进入else分支了，所以有两种方法，一种是封装到promise中，分支if放在then里，一种是改成同步方法

<img src="newNode.assets/image-20211214194332157.png" alt="image-20211214194332157" style="zoom:80%;" />

## 模块化路由封装

我改写成了如下代码，利用promise，这样就可以保证在进行后面路由判断的时候，静态web服务已经执行完毕了，也不用修改原来module中的异步方法

```js
const http = require('http');
const app = require('./module/routes')
const url = require('url')

http.createServer(function (request, response) {
    //首先访问staticWeb中的内容，如果访问到了，就不执行then方法，如果没访问到，就向下匹配其他url
    //如果不这么写的话，多次response.end()会报错
    app.saticWeb(request,response,'static').catch(err=>{
        let pathname = url.parse(request.url,true).pathname
        try {
            //如果没报错就说明能找到对应的路由
            app[pathname.replace('/','')](request,response)    
        } catch (error) {
            //如果报错了就执行err的路由里的操作
            app['err'](request,response)
        }
    })
}).listen(3000);
```

```js
const fs = require('fs')
const path = require('path')

//仅仅供下面那个函数使用
let getNewMime = extname=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('D:\\study\\code\\nodeDemo\\fs\\data\\mime.json',(err,data)=>{
            if(err)
            {
                console.log(err)
                reject(err)
            }else{
                //data就是读取到的文件中的16进制buffer对象,先转成json字符串，再转成JSON对象
                let mimeDatas = JSON.parse(data.toString())
                console.log(mimeDatas[extname]) 
                resolve(mimeDatas[extname])
            }
        })
    })
}

//封装的静态web服务，传入req,res,和对应要访问文件的根目录
let saticWeb = function(request,response,staticPath){
    return new Promise((resolve,reject)=>{
        //new一个URL对象
        const myURL = new URL(request.url, 'http://127.0.0.1:3000/');
        //通过pathname属性获取到对应的url（不含query后缀）
        let pathname = myURL.pathname;
        //如果访问的是默认的端口不加url的话，就默认访问index.html
        pathname = pathname === '/'?'/index.html':pathname
        //根据路径名获取文件后缀（就是‘.’+最后一个'.'到末尾的字符串）
        let extname = path.extname(pathname)
        //过滤掉url为favicon.ico的请求
        if (pathname !== '/favicon.ico') {
            //拼接staticPath
            fs.readFile(`./${staticPath}${pathname}`,async (err, data) => {
                console.log(1)
                //如果报错了，就打印错误信息
                if (err) {
                    reject('err')
                }else{
                //成功，设置对应的响应头类型以及打印内容
                response.writeHead(200, { 'Content-Type': await getNewMime(extname)+';charset=UTF-8' });
                response.end(data)
                resolve(data)
                }
            })
        }
    })
}
let app = {
    saticWeb,
    login(req,res){
        //处理登录业务的逻辑
        res.end('login')
    },
    news(req,res){
        //处理news业务的逻辑
        res.end('news')
    }, 
    err(req,res){
        //处理news业务的逻辑
        res.end('err')
    },
}
module.exports=app

```

## 原生node封装类似express框架的路由

### app.get()封装

route模块代码如下

```js
const url = require('url')

//G对象用于保存配置好的各种路由以及对应的方法（key是路由，value是回调函数）
let G = {

}

//入口函数，每次发起请求的时候都会经过这个app函数，在这里进行路由判断
let app = (req,res)=>{
    let pathname = url.parse(req.url).pathname
    //如果此时url对应的路由存在，就执行对应路由回调函数
    if(G[pathname]){
        G[pathname](req,res)
    }else{
        //否则就404
        res.writeHead(404,{'Content-Type':'text/html;charset="utf-8"'})
        res.end('页面丢失')
    }
}

//app.get('login',function(req,res){})
//配置get请求的时候，会传入url和对应的处理业务的函数，所以我们要在这里封装一下
app.get = (str,cb) => {
    //将传入的处理业务的函数封装到全局的G对象中,key值是路由路径
    G[str] = cb
}

module.exports = app
```

​		使用这个模块，说明：注册路由的时候，http.createServer中传入的app并没有执行，因为此时服务器刚开起来初始化，并没有发送请求。等到有请求时，会进入app方法查找对应的路由，并且执行函数中的业务逻辑

```js
var http = require('http');
//导入模块
const app = require('./module/route')
//app是入口函数，每次发起请求的时候都会去这个函数里判断是否注册过对应的路由
http.createServer(app).listen(3000);

//注册路由
app.get('/',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
    res.end('首页')
})

//注册路由
app.get('/news',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
    res.end('新闻页')
})
```

### 封装post

对上面的代码进行了修改，route模块代码如下

注意，下面读取post请求体的数据的方法，返回结果是一个xxx=xxx&xxx=xxx的query字符串，可以通过node内置的模块querystring的parse方法解析成对象

```js
//将query字符串转换成对象，好像已经被废弃了
const querystring = require('querystring')
querystring.parse(String)
```

```js
const url = require('url')
//将get和post请求的要进行的函数分别封装在两个对象中
let G = {}
G._get={}
G._post={}

let app = (req,res)=>{
    //封装res.send方法
    res.send = (data)=>{
        res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
        res.end(data)
    }

    let pathname = url.parse(req.url,true).pathname
    //获取请求类型
    let method = req.method.toLowerCase()
    //根据请求类型进行判断
    if(G['_'+method][pathname]){
        switch (method){
            //如果存在且是get请求，直接执行对应的逻辑就行
            case 'get':
                G['_'+method][pathname](req,res);
                break;
            //如果存在且是post请求，那么要接收post传值，顺便封装到req.body中，并且执行对应的逻辑方法
            case 'post':{
                let postData = ''
                req.on('data',chunk=>{
                    postData+=chunk
                })
                req.on('end',()=>{
                    req.body = postData
                    G['_'+method][pathname](req,res)
                })
            }break;
            default:{
                res.writeHead(500,{'Content-Type':'text/html;charset="utf-8"'})
                res.end('请联系管理员')
            }
        }
        //找不到就404
    }else{
        res.writeHead(404,{'Content-Type':'text/html;charset="utf-8"'})
        res.end('页面丢失')
    }
}
app.get = (str,cb) => {
    G._get[str] = cb
}

//封装方法跟get一样，注意这里修改为了G._post
app.post = (str,cb) => {
    //将传入的处理业务的函数封装到全局的G对象中
    G._post[str] = cb
}
module.exports = app
```

使用模块

```js
var http = require('http');
const app = require('./module/route')
http.createServer(app).listen(3000);

app.get('/',(req,res)=>{
    res.send('首页')
})

app.get('/news',(req,res)=>{
    res.send('新闻页')
})
//由于封装了send方法，这里就不用每次都写那两行了
app.post('/news',(req,res)=>{
    res.send(req.body)
})
```

### 封装静态web服务

routes.js代码如下

```js
const url = require('url')
//下面三个个模块调用静态web服务的时候用到了
const fs = require('fs')
const path = require('path')
const staticWebService = require('./staticweb')

let G = {
    _get:{},
    _post:{},
    //默认静态web目录是static，可以调用app.static方法修改目录
    staticPath: 'static'
}

let app = (req,res)=>{
    res.send = (data)=>{
        res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
        res.end(data)
    }

    //在匹配路由之前，配置静态web服务，静态web服务的目录在G.staticPath中
    staticWebService(req,res,G.staticPath).catch(err=>{
        let pathname = url.parse(req.url,true).pathname
        let method = req.method.toLowerCase()
    
        if(G['_'+method][pathname]){
            switch (method){
                case 'get':
                    G['_'+method][pathname](req,res);
                    break;
                case 'post':{
                    let postData = ''
                    req.on('data',chunk=>{
                        postData+=chunk
                    })
                    req.on('end',()=>{
                        req.body = postData
                        G['_'+method][pathname](req,res)
                    })
                }break;
                default:{
                    res.writeHead(500,{'Content-Type':'text/html;charset="utf-8"'})
                    res.end('请联系管理员')
                }
            }
        }else{
            res.writeHead(404,{'Content-Type':'text/html;charset="utf-8"'})
            res.end('页面丢失')
        }
    })
}
app.get = (str,cb) => {
    G._get[str] = cb
}
app.post = (str,cb) => {
    G._post[str] = cb
}
//配置静态web服务
app.static = staticPath => {
    G.staticPath = staticPath
}
module.exports = app
```

​		将之前静态web服务的模块也复制过来（上面已经导入了），再次说明，staticWeb方法是返回的promise，如果这个promise是失败的，说明没有匹配到对应的文件，此时应该是继续向下匹配路由。如果promise是成功的，就不需要匹配路由了

```js
const fs = require('fs')
const path = require('path')

//获取mime映射
let getNewMime = extname=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('D:\\study\\code\\nodeDemo\\nodeToExpress\\data\\mime.json',(err,data)=>{
            if(err)
            {
                console.log(err)
                reject(err)
            }
            //data就是读取到的文件中的16进制buffer对象,先转成json字符串，再转成JSON对象
            let mimeDatas = JSON.parse(data.toString())
            resolve(mimeDatas[extname])
        })
    })
}

//封装的静态web服务，传入req,res,和对应要访问文件的根目录
let saticWeb = function(request,response,staticPath){
    return new Promise((resolve,reject)=>{
        //new一个URL对象
        const myURL = new URL(request.url, 'http://127.0.0.1:3000/');
        //通过pathname属性获取到对应的url（不含query后缀）
        let pathname = myURL.pathname;
        //如果访问的是默认的端口不加url的话，就默认访问index.html
        pathname = pathname === '/'?'/index.html':pathname
        //根据路径名获取文件后缀（就是‘.’+最后一个'.'到末尾的字符串）
        let extname = path.extname(pathname)
        //过滤掉url为favicon.ico的请求
        if (pathname !== '/favicon.ico') {
            //拼接staticPath
            fs.readFile(`./${staticPath}${pathname}`,async (err, data) => {
                //如果报错了，就打印错误信息
                if (err) {
                    reject('err')
                }else{
                    //成功，设置对应的响应头类型以及打印内容
                    response.writeHead(200, { 'Content-Type': await getNewMime(extname)+';charset=UTF-8' });
                    response.end(data)
                    resolve(data)
                }

            })
        }
    })
}
module.exports = saticWeb

```

# nodejs操作MongoDb数据库

- 首先要创建package.json，也就是npm init
- 安装mongodb模块，也就是npm install mongodb --save

```js
//这里用了es6解构赋值，引入mongodb对应的MongoClient
const {MongoClient} = require('mongodb')

//定义数据库连接的地址，可以在cmd中敲mongo查看
const url = 'mongodb://127.0.0.1:27017'

//定义要操作的数据库名
const dbName = 'itying'

//实例化MongoClient，传入数据库连接地址
const client = new MongoClient(url)

//连接数据库
client.connect(err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('数据库连接成功')
    //获取数据库对象,之后就可以通过db对象来操作数据库了
    let db = client.db(dbName)
    
    //1、查找数据
    db.collection('order').find({}).toArray((err,data)=>{
        if(err) {
            console.log(err)
            client.close()
            return 
        }
        console.log(data)
         //操作数据库完毕之后一定要关闭数据库连接
        client.close()
    })

    //2、添加数据
    db.collection('users').insertOne({
        "username":"nodejs操作mongodb",
        "age":10
    },(err,res)=>{
        if(err){
            console.log(err)
            client.close()
            return
        }
        console.log('增加成功')
        //res中最常用的是insertedId，是插入的对象的_id对象
        console.log(res)
        client.close()
    })

    //3、修改数据
    db.collection("users").updateOne({
        "name":"wjj10"
    },{
        $set:{
            "age":1000
        }
    },(err,res)=>{
        if(err){
            console.log(err)
            client.close()
            return
        }
        console.log(res)
        client.close()
    })

    //4、删除数据
    db.collection("users").deleteMany({
        "username":"nodejs操作mongodb"
    },(err,res)=>{
        if(err){
            console.log(err)
            client.close()
            return
        }
        //{ acknowledged: true, deletedCount: 5 }
        console.log(res)
        console.log("删除成功")
        client.close()
    })
})
```

# 结合前面封装的类express框架使用mongodb

这里面有第二种连接数据库的方法

```js
var http = require('http');
const app = require('./module/route')
const {MongoClient} = require('mongodb')

//将query字符串转换成对象，好像已经被废弃了
const querystring = require('querystring')

let dbName = 'itying'
const url = 'mongodb://127.0.0.1:27017'
let client = new MongoClient(url)

http.createServer(app).listen(3000);

app.get('/find',(req,res)=>{
    client.connect(err=>{
        if(err){
            console.log(err)
            return
        }
        let db = client.db(dbName)
        db.collection('order').find({}).toArray((err,data)=>{
            if(err){
                console.log(err)
                return 
            }
            console.log(data)
            client.close()
            res.send("首页")
        })
    })
    
})

app.post('/users/regist',(req,res)=>{
    //第二种数据库连接方法
    MongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err)
            return
        }
        let db = client.db(dbName)
        console.log(querystring.parse(req.body))
        db.collection('users').insertOne(
            querystring.parse(req.body)
        )
    })  
})
```

# Express框架

## 安装

npm install express --save

## 简单使用

```js
//引入
const express = require('express')
//实例化express
const app = express()

//配置路由,支持多级目录（多个'/'）
//还支持post，put，delete
app.get("/",(req,res)=>{
    res.send("你好express")
})

//监听端口
app.listen(3000)
```

### 动态路由

配置路由的时候要注意顺序，前者匹配了，后者就不会匹配，加入前面有一个/user的get方法，那么后面的动态路由就不会响应了

```js
const express = require('express')
const app = express()
//动态路由，在user后面可以传入值，保存在了req.params中
app.get("/user/:id",(req,res)=>{
	let id = req.params["id"]
    res.send("你好express")
})
app.listen(3000)
```

### get传值

```js
const express = require('express')
const app = express()
//get传值保存在req.query中(对象)
app.get("/user",(req,res)=>{
	let query = req.query
    res.send("你好express")
})
app.listen(3000)
```

## ejs模板引擎

- npm install ejs --save
- 在根目录创建一个views文件
- 在实例化的express对象（也就是app）调用app.set("view engine","ejs")方法配置
- 通过res.render(path,data)来渲染ejs文件，注意pah会默认去views中找，不需要写全

```js
const express = require('express')
const app = express()
app.set("view engine","ejs")
//动态路由，在user后面可以传入值，保存在了req.params中
app.get("/",(req,res)=>{
    let title = "jzsp"
    res.render('index',{
        title
    })
})
app.listen(3000)
```

views目录下的index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- 通过 尖括号百分号等号  来 读取传过来的值-->
    <h1><%= title %></h1>
	<!--解析html字符串-->
    <%-data%>
    
    <!--嵌入js代码-->
    <% if(data === true){ %>
	    <h1>yes</h1>
    <%}%>
</body>
</html>
```



## Express.static静态文件托管

静态web目录是，匹配路由前，先看对应目录中有没有对应文件，有则返回，没有就继续向下匹配路由

<img src="newNode.assets/image-20211217185108540.png" alt="image-20211217185108540" style="zoom:67%;" />

<img src="newNode.assets/image-20211217185132197.png" alt="image-20211217185132197" style="zoom:67%;" />

![image-20211217183231739](newNode.assets/image-20211217183231739.png)

托管之后

![image-20211217183157417](newNode.assets/image-20211217183157417.png)

## 中间件

### 介绍

中间件就是匹配路由之前或者匹配路由完成做的一系列的操作

![image-20211217192144570](newNode.assets/image-20211217192144570.png)

使用use注册全局中间件

<img src="newNode.assets/image-20211222204607141.png" alt="image-20211222204607141" style="zoom:67%;" />

传入路由就是局部中间件，根据路由中中间件的顺序先后执行，可以传入多个中间件（其实路由最后的req,res也是一个中间件，只不过不向下匹配罢了，没有next）

![image-20211222204758603](newNode.assets/image-20211222204758603.png)

注意事项

![image-20211222205012439](newNode.assets/image-20211222205012439.png)



### 应用级中间件

​		常用于权限判断，类似于拦截器

​		直接传入一个回调函数，这个回调函数有三个参数，前两个参数是req和res，第三个参数是next，调用之后表示继续向下匹配。每次匹配路由的时候，都会先经过这个中间件，一定要调用next不然不会向下匹配的！！！

<img src="newNode.assets/image-20211217201118422.png" alt="image-20211217201118422" style="zoom:67%;" />

### 路由级中间件（用的比较少）

<img src="newNode.assets/image-20211217201408586.png" alt="image-20211217201408586" style="zoom:67%;" />

### 错误处理中间件

因为app.use可以匹配所有路由，所以放在尾部，如果没匹配到的话就404，但是总感觉不是这么用的。。。

<img src="newNode.assets/image-20211217201746503.png" alt="image-20211217201746503" style="zoom:67%;" />

### 内置中间件

用于配置静态web目录（放在路由最前面）

![image-20211217183231739](newNode.assets/image-20211217183231739.png)

### 第三方中间件

#### body-parser

获取post提交的数据

<img src="newNode.assets/image-20211217212151756.png" alt="image-20211217212151756" style="zoom:50%;" />

但是已经被弃用了。。。直接用express即可，这个中间件本质上就是解析了post请求的数据，修改req对象（将数据封装成body对象封装在req对象中）

<img src="newNode.assets/image-20211217212856956.png" alt="image-20211217212856956" style="zoom: 80%;" />

![image-20211217213041150](newNode.assets/image-20211217213041150.png)

记住一定要在app声明的下面配置，并且在所有路由前配置

配置完成之后就可以通过req.body获取到表单提交的数据了，它封装在req.body对象中

#### Cookie

npm install cookie-parser --save

![image-20211217213938483](newNode.assets/image-20211217213938483.png)

 简单使用



<img src="newNode.assets/image-20211217220236401.png" alt="image-20211217220236401" style="zoom:67%;" />

```js
const express = require('express')
const app = express()
//配置cookieParser中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get("/",(req,res)=>{
    //设置cookie，(cookieName,cookieValue,options)
    res.cookie("name","zhangsan",{
        //设置过期时间，即使浏览器关闭,如果cookie没过期，就还是会存在的
        maxAge:1000*60*60,
	    //设置cookie是否(签名)加密
        signed:true,
        //设置cookie过期的日期，传入的是Date对象,用的较少
        expires: new Date()
        //设置为true之后，cookie只能在后端访问，前端js中访问不到了
        httpOnly:true
        //path是设置cookie访问目录，下面表示cookie只能在/article路由中访问
        path:"/article"
        //domain表示域名。多个域名(二级域名)共享cookie，下面的代码表示:aaa.itying.com以及各种xxx.itying.com都可以共享这个cookie
        domain:".itying.com",
        //secure设置为true时，cookie在http中无效，在https中有效,默认都有效
        secure:false,
    })
    res.send("hello cookie")

})
app.get("/find",(req,res)=>{
    //获取cookie
    console.log(req.cookies)   // {name:"zhangsan"}
    let username = req.cookies.name
    res.send("hello cookie")
})

app.listen(3000 )
```

![image-20211217220722662](newNode.assets/image-20211217220722662.png)

##### domain

domain是设置cookie的第三个options对象中的其中一个属性，用于域名之间共享cookie。要做测试，首先得将127.0.0.1域名的映射地址修改一下

![image-20211217223404780](newNode.assets/image-20211217223404780.png)

![image-20211217223416184](newNode.assets/image-20211217223416184.png)

​		如果不设置domain的话，先进入aaa.wjj.com:3000设置cookie，进入bbb.wjj.com:3000/find验证是否可以共享cookie，老师那边显示的是不行，输出的是空，设置了domain为wjj.com之后，所有xxx.wjj.com的地址都可以共享该cookie

![image-20211217225231415](newNode.assets/image-20211217225231415.png)

![image-20211217225258587](newNode.assets/image-20211217225258587.png)

控制台输出空

![image-20211217225252751](newNode.assets/image-20211217225252751.png)

设置了domain之后，先进入aaa.wjj.com:3000进入'/'路由设置cookie

![image-20211217225404268](newNode.assets/image-20211217225404268.png)

再进入bbb.wjj.com:3000/find输出cookie

![image-20211217225552589](newNode.assets/image-20211217225552589.png)

查看存储中的Cookie，跟前面进入aaa.wjj.com设置的cookie是同一个

![image-20211217225602928](newNode.assets/image-20211217225602928.png)

代码如下

```js
const express = require('express')
const app = express()
//配置cookieParser中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get("/",(req,res)=>{
    //设置cookie，（cookieName,cookieValue,options)
    res.cookie("name","zhangsan",{
        //设置过期时间
        maxAge:1000*60*60,
        httpOnly:true
        // domain:'.wjj.com'
    })
    res.send("hello cookie")

})
app.get("/find",(req,res)=>{
    //获取cookie
    console.log(req.cookies)
    let username = req.cookies.name
    res.send("hello cookie")
})

app.listen(3000)
```

##### signed(cookie加密)

cookie加密需要在设置cookieParser中间件时传入加密的参数，参数可以随意，获取加密cookie的话需要调用signedCookies

<img src="newNode.assets/image-20211217230158397.png" alt="image-20211217230158397" style="zoom:67%;" />

```js
const express = require('express')
const app = express()
//配置cookieParser中间件
const cookieParser = require('cookie-parser')
//传入加密的参数
app.use(cookieParser("wjjjzsp"))

app.get("/",(req,res)=>{
    res.cookie("name","zhangsan",{
        maxAge:1000*60*60,
        //加密cookie
        signed:true
    })
    res.send("hello cookie")

})
app.get("/test1",(req,res)=>{
    //获取cookie（如果signed是true就获取不到了）
    console.log(req.cookies)
    res.send("hello cookie")
})

app.get("/test2",(req,res)=>{
    //获取加密cookie
    console.log(req.signedCookies)
    res.send("hello cookie")
})

app.listen(3000)
```

加密之后，如果在这里修改cookie的值，那么cookie的值会变为false

![image-20211217230447023](newNode.assets/image-20211217230447023.png)

##### 总结

​		cookie可以实现不同页面的数据共享，将数据写入cookie的时候，在其他路由都可以通过req.cookies获取未加密的cookie。**cookie是存放在浏览器中的**，其他人可以修改cookie的值，所以我们需要对cookie进行加密，加密后的cookie如果修改了值，会变成false

#### Session

npm install express-session --save

<img src="newNode.assets/image-20211218121447818.png" alt="image-20211218121447818" style="zoom:67%;" />

​							 <img src="newNode.assets/image-20211218121517834.png" alt="image-20211218121517834" style="zoom:67%;" />

##### 基本使用

```js
const express = require('express')
//引入session模块
const session = require('express-session')

const app = express()
//配置session中间件
app.use(session({
    secret:'this is session',       //服务器生成session的签名
    name:'wjj',                     //修改cookie的名字
    resave:false,                   //强制保存session即使他没有变化（这条和下面那条必须配置，否则会有提示）
    saveUninitialized:true,         //强制将未初始化的session存储
    cookie:{                        //session是基于cookie的，所以可以配置cookie
        secure:false,
        maxAge:1000*60*30
    },
    rolling:true                    //在每次请求时强行设置cookie（如果cookie没有过期），这将重置cookie的过期时间，默认为false
}))

app.get('/',(req,res)=>{
    //获取session
    console.log(req.session.age)
    console.log(req.session.username)
    if(req.session.username){
        res.send(req.session.age + req.session.username+"已经登录" )
    }else{
        res.send("没有登录")
    }
    
})

app.get('/login',(req,res)=>{
    //设置session
    req.session.username = "张三"
    //再设置一个session，用于测试销毁session
    req.session.age = 20
    res.send('hello session')
})

app.get('/logout',(req,res)=>{
    //1、设置session的过期事时间为0,会销毁所有的session
    req.session.cookie.maxAge = 0
    //2、将指定session设置为空(销毁指定session)
    req.session.age = ""
    //3、销毁session(所有)
    req.session.destroy(err=>{
        if(err)
        console.log(err)
    })
    res.send("退出登录")
})
app.listen(3000)
```

##### session存数据库

分布式架构，多服务器负载均衡，场景是这样的，有三台服务器，如果是北京服务器设置了session，那么session是保存在服务器中的，上海服务器就获取不到session了，session存数据库，假设要存到mongodb中，那么下面演示如何存储session到mongodb

<img src="newNode.assets/image-20211218124012642.png" alt="image-20211218124012642" style="zoom:67%;" />

#### connect-mongo

```js
const express = require('express')
const session = require('express-session')
//引入（记得安装mongodb的依赖，不然用这个包会报错）
const MongoStore = require('connect-mongo');

const app = express()
app.use(session({
    secret:'this is session',       
    name:'wjj',                     
    resave:false,                   
    saveUninitialized:true,         
    cookie:{                        
        secure:false,
        maxAge:1000*60*30
    },
    rolling:true,
    //配置分布式数据库
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/itying',
        touchAfter:24*3600   //不管发送多少请求，在24小时内只更新一次session（除非手动改变session）
      })              
}))
```

可以看到，session已经保存在了itying的sessions数据库中

![image-20211218133720455](newNode.assets/image-20211218133720455.png)

#### token



## 路由模块化

通过express.Router来配置路由 ，实例化的对象(router)跟express实例化的对象(app)是一样使用的

![image-20211218140650311](newNode.assets/image-20211218140650311.png)

![image-20211218140832278](newNode.assets/image-20211218140832278.png)

![image-20211218140743315](newNode.assets/image-20211218140743315.png)

​		将admin.js中的router暴露，挂载到index.js中，而admin.js中又挂载了nav和user模块中导出的路由，**使得访问/admin的时候会在admin.js中匹配路由，而访问/admin/nav的时候会在nav.js中匹配路由**

​		这个时候可能会有疑问：如果admin.js中后面有匹配/admin/nav的路由请求，那么这个会被响应吗？答案是不会的，因为他会在前面挂载的中间件中就已经进入nav.js中匹配路由了，不会在admin.js向下匹配

## Express应用程序生成器

```
安装：cnpm install -g express-generator

创建项目：express --view=ejs projectName

运行项目:先npm i安装依赖 node ./bin/www 或者  npm start
```

![image-20211218143017009](newNode.assets/image-20211218143017009.png)

![image-20211218143231099](newNode.assets/image-20211218143231099.png)

## 结合Multer上传文件

npm install multer --save

### 简单使用

<img src="newNode.assets/image-20211218180046005.png" alt="image-20211218180046005"  />

在apifox中想要上传文件的话，需要进行如下配置（类型选择file，选择form-data）

![image-20211218180159163](newNode.assets/image-20211218180159163.png)

```js
const express = require('express')
//引入文件上传的包
const multer = require('multer')
//配置上传文件的目录,上传之前目录必须存在，否则没法上传
const upload = multer({dest:'static/upload'})
let router = express.Router()
router.get('/',(req,res)=>{
    res.send('/admin/nav的首页')
})
//第二个参数配置接收上传过来的图片，里面的字符串是表单提交的对应file的key值
router.post('/doLogin',upload.single("file"),(req,res)=>{
    res.send({
        body:req.body,
        //上传的信息会被放在req.file中
        file:req.file
    })
})
//暴露路由
module.exports = router
```

结果

![image-20211218180339678](newNode.assets/image-20211218180339678.png)

但是这样的话，保存到upload的文件名是随机的，并且也没有后缀名

![image-20211218184404342](newNode.assets/image-20211218184404342.png)

### 指定文件名的上传（single）

配置

```js
const express = require('express')
//获取文件后缀名用
const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage({
    //配置上传目录
    destination:function(req,file,cb){
        cb(null,'static/upload')
    },
    //修改上传后的文件名（cb的第二个参数）
    filename:function(req,file,cb){
        console.log(file)
        //1、获取后缀名
        let extname = path.extname(file.originalname)
        //2、根据时间戳生成文件名
        cb(null,file.fieldname + '-' + Date.now() + extname)
    }
})
//传入storage
const upload = multer({storage:storage})
let router = express.Router()

router.post('/doLogin',upload.single("file"),(req,res)=>{
    res.send({
        body:req.body,
        //上传的信息会被放在req.file中
        file:req.file
    })
})

module.exports = router
```

![image-20211218184436712](newNode.assets/image-20211218184436712.png)

封装一下，使用更加方便哦~

![image-20211218182959084](newNode.assets/image-20211218182959084.png)

![image-20211218183008411](newNode.assets/image-20211218183008411.png)

### 根据上传日期分包存储

用了mkdirp和sd包，用mkdirp的话是不需要判断目录是否存在的，里面做了处理。另外，**mkdirp是异步方法哦**

![image-20211218190618278](newNode.assets/image-20211218190618278.png)

### 多文件上传

<img src="newNode.assets/image-20211218190921458.png" alt="image-20211218190921458"  />

#### 第一种：分别选中不同的文件进行上传(fields)

这里沿用了上面的tools下的代码

![image-20211218191349132](newNode.assets/image-20211218191349132.png)

```js
const express = require('express')
const { upload } = require('../../model/tools')

let router = express.Router()

//配置name以及数量（name要跟表单提交的key一致）
let cpUpload = upload.fields([{
    name:'pic1',
    maxCount:1
},{
    name:'pic2',
    maxCount:1
}])
//多个文件上传的配置
router.post('/doLogin',cpUpload,(req,res)=>{
    res.send({
        body:req.body,
        //多个文件上传的信息会被放在req.files中
        files:req.files
    })
})

module.exports = router
```

结果

![image-20211218191555367](newNode.assets/image-20211218191555367.png)

<img src="newNode.assets/image-20211218191609124.png" alt="image-20211218191609124"  />

#### 第二种：一次性选中多个文件进行上传（array）

<img src="newNode.assets/image-20211218192158641.png" alt="image-20211218192158641"  />

![image-20211218192005146](newNode.assets/image-20211218192005146.png)



# 使用mongoose操作mongodb

npm i mongoose --save

## 简单使用

schema的type参数

![image-20211219184557495](newNode.assets/image-20211219184557495.png)

创建model的参数说明

![image-20211219141300590](newNode.assets/image-20211219141300590.png)

```js
//1、用关系型数据库的操作方式来操作非关系型数据库
const mongoo = require('mongoose')

//2、建立连接
mongoo.connect('mongodb://127.0.0.1:27017/itying')
//有账号密码连接数据库
//mongoo.connect('mongodb://eggadmin:123456@localhost:27017/eggcms');

//3、操作users表（集合）  定义一个schema,可以对字段的格式进行要求
//schema里的key值需要和数据库里的一一对应
let UserSchema = mongoo.Schema({
    name: String,
    age: Number,
    status: Number
})


//4、定义model模型，可以操作数据库，可以传入两个参数或者三个参数
//第一个参数是模型名称，注意：首字母要大写，并且这个模型会操作数据库中是模型名称复数的集合（下面模型名称是User,那么操作users集合）
//第二个参数是Schema，用于规定集合（表）结构
//第三个参数是要操作的数据库中的集合名称，如果有第三个参数的话，那么默认会直接操作第三个参数对应的集合，而不是去找第一个参数对应的复数集合
let User = mongoo.model('User', UserSchema)

//接下来就是利用model进行crud
//5、查询集合
User.find({},(err,doc)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(doc)
})

//6、增加数据
//    首先，实例化model增加数据，注意，这里实例化的数据必须得跟Schema对应，多的属性是不会添加到数据库中的
//    然后，实例.save()增加数据
let u = new User({
    name: 'wjj',
    age: 20,
    status: 1
})
u.save(err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('成功')
})

//7、更新数据
//mongoose对objectId做了优化，不需要"_id":new ObjectId("61becf2f4ede9241219cbc11")
User.updateOne({"_id":"61becf2f4ede9241219cbc11"},{"name":"wjj222"},(err,doc)=>{
    if(err){
        console.log(err)
        return
    }
    /*
        {
            acknowledged: true,
            modifiedCount: 0,
            upsertedId: null,
            upsertedCount: 0,
        }
     */
    console.log(doc)
})

//8、删除数据
User.deleteOne(
    {"_id":"61becf2f4ede9241219cbc11"},
    (err,res) => {
        if(err){
            console.log(err)
            return
        }
        /*
            { deletedCount: 1 }
        */
        console.log(res)
    }
)

```

## mongoose中Schema的默认参数

默认数就是，增加数据的时候如果不传入数据，会使用默认配置的数据

**图错了，是没有设置date喝status**

![image-20211219145923650](newNode.assets/image-20211219145923650.png)

## mongoose模块化

模块化使得代码更加简介，提高复用（如果连接以及配置model和schema的代码都放在业务逻辑代码界面的话，会显得很冗杂，所以封装一下）

- 数据库连接的封装，暴露mongoose对象

![image-20211219150808882](newNode.assets/image-20211219150808882.png)

- schema和model的封装，一个集合（表）对应一个模块，注意，require获取的mongoose是来自于db下暴露的mongoose

![image-20211219150859456](newNode.assets/image-20211219150859456.png)

- 使用来就非常方便了

![image-20211219150943412](newNode.assets/image-20211219150943412.png)

## mongoose性能问题

​		可能会问，如果在app.js（业务逻辑代码页面）**导入了多个封装的操作集合的模块**，而每个模块里又导入了db模块（连接数据库模块），会导致数据库反复连接吗？答案是不会的，底层做了处理，第一次连接的时候相当于开启了mongo服务，后面就直接连接了，所以只有第一次连接数据库的时间会慢一些，下面是验证

<img src="newNode.assets/image-20211219151228135.png" alt="image-20211219151228135" style="zoom:67%;" />

## 预（自）定义模式修饰符

**required必须传入**

![image-20211219175052743](newNode.assets/image-20211219175052743.png)

**enum是枚举类型，值是一个数组，规定枚举类型之后就只能传入数组中的值了**

![image-20211219152725294](newNode.assets/image-20211219152725294.png)

<img src="newNode.assets/image-20211219151627674.png" alt="image-20211219151627674" style="zoom: 50%;" />

例子

![image-20211219151918663](newNode.assets/image-20211219151918663.png)

![image-20211219151946914](newNode.assets/image-20211219151946914.png)

### set

但是官方给的预定义模式操作符有时候达不到我们要的效果，这时候就可以使用**自定义模式操作符**

```js
const mongoose = require('./db')

const focusSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    pic:String,
    redirect:{
        type:String,
        //增加数据的时候对数据进行处理,参数就是redirect的值，返回的数据就是redirect在数据库实际保存的值
        set(data){
            console.log(data)
            /**
             *    www.baidu.com          ->  http://www.baidu.com
             *    http://www.baidu.com   ->  http://www.baidu.com
             */
            if(!data){
                return ''
            }else{
                return (data.indexOf('http://') != 0 && data.indexOf('https://') != 0) ? 'http://'+data : data 
            }
        },
        //并不是从数据库中获取redirect数据时进行格式化，而是在后端xxx.redirect的时候进行格式化,并且会先经过set再经过get
        get(data){
            return 'aaa'+data
        }
    },
    status:{
        type:Number,
        default:1
    }
})

const focus = mongoose.model('Focus',focusSchema,'focus')
module.exports = focus
```

```js
const Focus = require('./model/focus')
let u = new Focus({
    title:'我是一个新闻',
    pic:'http://www.xxx.com/x.png',
    redirect:'www.baidu.com'
})
//调用get
console.log(u.redirect)
u.save(err=>{
    if(err){
        console.log(err)
        return
    }
    Focus.find({},(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(doc)
    })
    
})
```



![image-20211219160947380](newNode.assets/image-20211219160947380.png)

### 设置索引

设置完索引之后，操作数据库的话，得先删除原来的集合才能加上索引



![image-20211219175328139](newNode.assets/image-20211219175328139.png)

<img src="newNode.assets/image-20211219161156114.png" alt="image-20211219161156114" style="zoom:67%;" />

### 数据校验

![image-20211219175802628](newNode.assets/image-20211219175802628.png)

![image-20211219175756235](newNode.assets/image-20211219175756235.png)

![image-20211219175816033](newNode.assets/image-20211219175816033.png)

自定义数据校验（返回值为false的时候就无法插入数据）

![image-20211219184113296](newNode.assets/image-20211219184113296.png)



## 拓展mongoose的model的静态方法和实例方法

### 静态方法

拓展静态方法的两种方法

![image-20211219174427919](newNode.assets/image-20211219174427919.png)

注意，这里拓展静态方法前面要加.statics，里面的this指向的是model

![image-20211219170905637](newNode.assets/image-20211219170905637.png)

![image-20211219170918368](newNode.assets/image-20211219170918368.png)

![image-20211219170929371](newNode.assets/image-20211219170929371.png)

### 实例方法

实例方法要.methods，是给实例化的对象调用的

![image-20211219173616153](newNode.assets/image-20211219173616153.png)

![image-20211219173637366](newNode.assets/image-20211219173637366.png)

这里输出了this就是这个实例化的对象

![image-20211219173658524](newNode.assets/image-20211219173658524.png)

## 聚合管道

### 两表关联

沿用之前的order表和order_item表，所以这里定义这两个模块（下面只展示一个）

![image-20211219191003390](newNode.assets/image-20211219191003390.png)

使用聚合管道

```js
//不需要引入被关联的表的模块
const order = require('./model/order')

//查询order表对应每个订单的数据
//order表关联orderItem表
order.aggregate([
    {
        $lookup:{
            from:"order_item",
            localField:"order_id",
            foreignField:"order_id",
            as:"items"
        }
    },{
        $match:{
            "all_price":{$gte:90}
        }
    }
],(err,docs)=>{
    //直接输出docs会显示    items: [ [Object], [Object] ]
    //所以我们JSON.stringfy()
    console.log(JSON.stringify(docs))
})
```

**实例**

要求：先找到orderItem集合中酸奶的order_id，然后根据这个order_id去order表中找对应的信息

- 第一种方法：两次查询

下面JSON.parse是数组深拷贝？？？，待研究

<img src="newNode.assets/image-20211219191546097.png" alt="image-20211219191546097" style="zoom:67%;" />

- 第二种方法：表关联

注意图中在mongoose获取ObjectId的方法

![image-20211219192424543](newNode.assets/image-20211219192424543.png)

![image-20211219192302215](newNode.assets/image-20211219192302215.png)

### N表关联

需求：中间的文章表里面对应了左边的**文章分类**以及	右边的**文章发表人**（其实就是多次使用lookup管道罢了。。。）

![image-20211219202532792](newNode.assets/image-20211219202532792.png)

- 数据准备



![image-20211219205602402](newNode.assets/image-20211219205602402.png)

![image-20211219205607189](newNode.assets/image-20211219205607189.png)

![image-20211219205612175](newNode.assets/image-20211219205612175.png)

如果Schema对应的type是ObjectId，那么如果传入字符串，保存到数据库就会自动转换类型

![image-20211219205653581](newNode.assets/image-20211219205653581.png)

<img src="newNode.assets/image-20211219210123132.png" alt="image-20211219210123132" style="zoom:150%;" />

![image-20211219210252360](newNode.assets/image-20211219210252360.png)

代码如下

![image-20211219210408177](newNode.assets/image-20211219210408177.png)

其实可以通过mongo compass生成

![image-20211219210432226](newNode.assets/image-20211219210432226.png)

# 接口

![image-20211220144436631](newNode.assets/image-20211220144436631.png)

![image-20211220145555932](newNode.assets/image-20211220145555932.png)