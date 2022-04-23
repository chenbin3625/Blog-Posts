# ES6~ES12特性

## ES6



### set的基本使用

![image-20220421104155346](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104155.png)

![image-20220421104627333](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104627.png)



set不允许重复数据

### 数组去重

使用算法

![image-20220421104720583](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104720.png)

使用set

![image-20220421104842862](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104842.png)



![image-20220421105153505](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105153.png)

### weakset

![image-20220421105357882](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105357.png)

与set的区别：只能存放对象，其他类型不能存放

对对象是弱引用，如果没有其他的引用，对象会被回收

![image-20220421105942889](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105942.png)

强引用和弱引用的区别：

弱引用在GC查找时如果没有其他引用会被回收

![image-20220421113336661](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421113336.png)

### MAP与weakMap和vue3响应式原理

![image-20220118105555091](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421163452.png)

![image-20220422103641794](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422103641.png)

 

 map创建与Object.entries结合

```
JS
const school = {
  name:'wjj',
  age:18,
  height:180
}
//entries,传入一个对象,他获取到的是一个数组
//数组里面是一个数组，这个数组只有两个值，对应了key和value，这种结构方便创建map
//[[1,'a'],[2,'b'],[3,'c']]
let map = new Map(Object.entries(school))
console.log(map)
```

[![image-20220120122544448](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421163503.png)](https://cdn.u1n1.com/img/picgo202204152343072.png)



## ES7

### array—includes方法

![image-20220421163730206](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421163730.png)

可以判断NAN



![image-20220421163919424](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421163919.png)

新增运算符，可以直接乘方

## ES8

### object values

在ES8前，可以通过Object.key获取key

![image-20220422103935351](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422103935.png)



获取value

### object extries

![image-20220422104542734](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422104542.png)

将key和value放到一个数组中

### String Padding

字符串填充 支持首尾

![image-20220422104929990](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422104930.png)



### trailing commas

支持函数参数末尾添加逗号吗，不会报错



### async

后期到promise细讲

## ES9

![image-20220422105547360](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422105547.png)

## ES10

### flat flatmap

![image-20220422121735706](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422121735.png)



### fromEntries

![image-20220422122353295](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422122353.png)

转化为对象

### trimStart

![image-20220422122646702](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422122646.png)

去除空格

## ES11

#### BigInt

![image-20220422125220778](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422125220.png)

![image-20220422125650764](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422125650.png)

![image-20220422125658047](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422125658.png)

### Nullish Coalescing Operator空值合并操作

![image-20220422130210438](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422130210.png)

### Optional Chaining

可选链

> 判断前面的属性是否是undefined

### 全局对象获取GlobalThis

自动识别浏览器/node环境获取全局对象

![image-20220422130930946](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422130930.png)

![image-20220422131024477](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422131024.png)

### for...in标准化

![image-20220422131612089](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422131612.png)

## ES12

### finalizationRegistry

### WeakRef弱引用

**deref方法**获取弱引用指向的对象，如果没有被销毁就能获取，否则就返回undefined

[![image-20220120143549256](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422132305.png)](https://ypyun-cdn.u1n1.com/img/picgo202204152343074.png)

```
JS
//注意要在浏览器环境下运行哦
//这个类是用于注册要监听的对象，如果被gc回收的时候执行传入的函数，这个函数的参数是register实例方法传入的第二个参数，用于标识当前销毁的是哪个对象
const finalRegistry = new FinalizationRegistry((v)=>{
  console.log("寄！",v)
})
let obj = {}
//这里直接赋值是强引用，obj2指向obj指向的对象，那么将obj设置为空的话，因为还有引用指着他，所以它不会被gc回收
//let obj2 = obj

//这样创建的就是弱引用了，当obj赋值为null的时候，obj会被销毁
let info = new WeakRef(obj)
//弱引用可以用dref获取弱引用指向的对象，然后就是正常使用
console.log(info.deref())

//注册监听
finalRegistry.register(obj,'jzsp1')

obj = null
```



