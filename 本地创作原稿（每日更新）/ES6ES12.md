# ES6~ES12



## set的基本使用

![image-20220421104155346](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104155.png)

![image-20220421104627333](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104627.png)



set不允许重复数据

### 数组去重

使用算法

![image-20220421104720583](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104720.png)

使用set

![image-20220421104842862](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421104842.png)



![image-20220421105153505](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105153.png)

## weakset

![image-20220421105357882](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105357.png)

与set的区别：只能存放对象，其他类型不能存放

对对象是弱引用，如果没有其他的引用，对象会被回收

![image-20220421105942889](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421105942.png)

强引用和弱引用的区别：

弱引用在GC查找时如果没有其他引用会被回收

![image-20220421113336661](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421113336.png)

## MAP与weakMap和vue3响应式原理

![image-20220118105555091](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/21/20220421163452.png)

 

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



