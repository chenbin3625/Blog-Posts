# Proxy/Reflect响应式原理

## 监听对象的操作

可以用`Object.defineProperty`来实现对**完整对象（不需要删除，增加属性）**的属性的监听

![image-20220422151124892](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422151124.png)

## proxy基本使用

![image-20220422151535123](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422151535.png)

![image-20220422163219259](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422163219.png)

## Proxy（代理）类

也就是说，如果我们希望监听一个obj对象的相关操作，那么我们可以创建一个代理对象（Proxy），对obj对象的所有操作，都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作（有十三种）

[![image-20220120161725718](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422163809.png)](https://ypyun-cdn.u1n1.com/img/picgo202204152343077.png)

[![image-20220120165507212](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/22/20220422163810.png)](https://ypyun-cdn.u1n1.com/img/picgo202204152343078.png)

> apply和construct是针对函数对象的，通过Proxy对函数对象执行apply或者new的时候

### 简单使用（可以监听深层属性）

我们使用的是第二种new的方式来创建Proxy的

[![image-20220120162401793](https://ypyun-cdn.u1n1.com/img/picgo202204152343079.png)](https://ypyun-cdn.u1n1.com/img/picgo202204152343079.png)

```
JS
const obj = {
    name:'wjj',
    age:20
}
//第一个参数是要代理的目标对象，第二个参数是重写的handler，传入空对象是默认不重写handler
const objProxy = new Proxy(obj,{})

//可以通过Proxy来获取，以及修改原来对象的属性
console.log(objProxy.name)   //wjj

objProxy.name = 'jzsp'
//来检验原来的对象中的name属性是否被修改了
console.log(obj.name)    //jzsp
```

### handler：set和get

> `proxy`中的`get`中`return target[key]` 是不会造成递归调用的，而`Object.defineProperty`会

[![image-20220120164701359](https://ypyun-cdn.u1n1.com/img/picgo202204152343080.png)](https://ypyun-cdn.u1n1.com/img/picgo202204152343080.png)

### preventExtensions

> 有些handler对返回值有明确规定的，需要查看mdn来判断

```
JS
let obj = {
  name:"jzsp"
}
let p = new Proxy(obj,{
  preventExtensions(target) {
    target.canEvolve = false;
    //执行对应的操作
    Object.preventExtensions(target);
    return true;
  }
})

Object.preventExtensions(p)
```

## 响应式原理实现

