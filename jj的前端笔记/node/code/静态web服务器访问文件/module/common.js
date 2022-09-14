const fs = require('fs')
let getMime = extname=>{
    switch(extname){
        case '.html': return 'text/html';break;
        case '.css': return 'text/css';break;
        case '.js': return 'text/javascript';break; 
        default:return  'text/html'
    }
}
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
module.exports={
    getMime,getNewMime
}