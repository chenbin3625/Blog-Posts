title: Proxy/Reflect响应式原理
author: chenbin
tags:
  - js
categories: []
date: 2022-04-24 00:21:00
---
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

## promise

**异步任务的处理**

n 在ES6出来之后，有很多关于Promise的讲解、文章，也有很多经典的书籍讲解Promise
 p 虽然等你学会Promise之后，会觉得Promise不过如此，但是在初次接触的时候都会觉得这个东西不好理解;

n 那么这里我从一个实际的例子来作为切入点:
 p 我们调用一个函数，这个函数中发送网络请求(我们可以用定时器来模拟);
 p 如果发送网络请求成功了，那么告知调用者发送成功，并且将相关数据返回过去; p 如果发送网络请求失败了，那么告知调用者发送失败，并且告知错误信息;

****

**什么是Promise呢?**

n 在上面的解决方案中，我们确确实实可以解决请求函数得到结果之后，获取到对应的回调，但是它存在两个主要的 问题:

p 第一，我们需要自己来设计回调函数、回调函数的名称、回调函数的使用等;
 p 第二，对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以

```
  便可以理解它这个函数到底怎么用;
```

n 我们来看一下Promise的API是怎么样的:
 pPromise是一个类，可以翻译成 承诺、许诺 、期约;
 p 当我们需要给予调用者一个承诺:待会儿我会给你回调数据时，就可以创建一个Promise的对象; p 在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor

ü 这个回调函数会被立即执行，并且给传入另外两个回调函数resolve、reject;
 ü 当我们调用resolve回调函数时，会执行Promise对象的then方法传入的回调函数; ü 当我们调用reject回调函数时，会执行Promise对象的catch方法传入的回调函数;

****

**Promise的代码结构**

n 我们来看一下Promise代码结构:

****

n 上面Promise使用过程，我们可以将它划分成三个状态:
 p 待定(pending): 初始状态，既没有被兑现，也没有被拒绝;

ü 当执行executor中的代码时，处于该状态; p 已兑现(fulfilled): 意味着操作成功完成;

ü 执行了resolve时，处于该状态;
 p 已拒绝(rejected): 意味着操作失败;

ü 执行了reject时，处于该状态;

**Promise重构请求**

n 那么有了Promise，我们就可以将之前的代码进行重构了:

****

**Executor**

n Executor是在创建Promise时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数:

n 通常我们会在Executor中确定我们的Promise状态:
 p 通过resolve，可以兑现(fulfilled)Promise的状态，我们也可以称之为已决议(resolved); p 通过reject，可以拒绝(reject)Promise的状态;

n这里需要注意:一旦状态被确定下来，Promise的状态会被 锁死，该Promise的状态是不可更改的 p在我们调用resolve的时候，如果resolve传入的值本身不是一个Promise，那么会将该Promise的状态变成 兑

现(fulfilled);

p 在之后我们去调用reject时，已经不会有任何的响应了(并不是这行代码不会执行，而是无法改变Promise状 态);

****

**resolve不同值的区别**

n 情况一:如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数;

n 情况二:如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态:

n 情况三:如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据 then方法的结果来决定Promise的状态:

****

**then方法 – 接受两个参数**

nthen方法是Promise对象上的一个方法:它其实是放在Promise的原型上的 Promise.prototype.then

n then方法接受两个参数:
 p fulfilled的回调函数:当状态变成fulfilled时会回调的函数; p reject的回调函数:当状态变成reject时会回调的函数;

****

**then方法 – 多次调用**

n 一个Promise的then方法是可以被多次调用的:
 p 每次调用我们都可以传入对应的fulfilled回调;
 p 当Promise的状态变成fulfilled的时候，这些回调函数都会被执行;

****

**then方法 – 返回值**

n then方法本身是有返回值的，它的返回值是一个Promise，所以我们可以进行如下的链式调用: p 但是then方法返回的Promise到底处于什么样的状态呢?

n Promise有三种状态，那么这个Promise处于什么状态呢?
 p 当then方法中的回调函数本身在执行的时候，那么它处于pending状态;
 p 当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会将结果作为resolve的参数;

ü 情况一:返回一个普通的值;
 ü 情况二:返回一个Promise;
 ü 情况三:返回一个thenable值;

p 当then方法抛出一个异常时，那么它处于reject状态;

****

**catch方法 – 多次调用**

ncatch方法也是Promise对象上的一个方法:它也是放在Promise的原型上的 Promise.prototype.catch

n 一个Promise的catch方法是可以被多次调用的:
 p 每次调用我们都可以传入对应的reject回调;
 p 当Promise的状态变成reject的时候，这些回调函数都会被执行;

****

**catch方法 – 返回值**

n 事实上catch方法也是会返回一个Promise对象的，所以catch方法后面我们可以继续调用then方法或者catch方法: p 下面的代码，后续是catch中的err2打印，还是then中的res打印呢?
 p 答案是res打印，这是因为catch传入的回调在执行完后，默认状态依然会是fulfilled的;

n 那么如果我们希望后续继续执行catch，那么需要抛出一个异常:

****

**finally方法**

n finally是在ES9(ES2018)中新增的一个特性:表示无论Promise对象无论变成fulfilled还是reject状态，最终都会 被执行的代码。

n finally方法是不接收参数的，因为无论前面是fulfilled状态，还是reject状态，它都会执行。

****

**resolve方法**

n 前面我们学习的then、catch、finally方法都属于Promise的实例方法，都是存放在Promise的prototype上的。 p 下面我们再来学习一下Promise的类方法。

n有时候我们已经有一个现成的内容了，希望将其转成Promise来使用，这个时候我们可以使用 Promise.resolve 方 法来完成。

pPromise.resolve的用法相当于new Promise，并且执行resolve操作:

n resolve参数的形态:
 p 情况一:参数是一个普通的值或者对象

p 情况二:参数本身是Promise p 情况三:参数是一个thenable

****

**reject方法**

n reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject状态。 nPromise.reject的用法相当于new Promise，只是会调用reject:

n Promise.reject传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的。

****

**all方法**

n 另外一个类方法是Promise.all:
 p 它的作用是将多个Promise包裹在一起形成一个新的Promise; p 新的Promise状态由包裹的所有Promise共同决定:

ü 当所有的Promise状态变成fulfilled状态时，新的Promise状态为fulfilled，并且会将所有Promise的返回值 组成一个数组;

ü 当有一个Promise状态为reject时，新的Promise状态为reject，并且会将第一个reject的返回值作为参数;

****

**allSettled方法**

n all方法有一个缺陷:当有其中一个Promise变成reject状态时，新Promise就会立即变成对应的reject状态。 p 那么对于resolved的，以及依然处于pending状态的Promise，我们是获取不到对应的结果的;

n在ES11(ES2020)中，添加了新的API Promise.allSettled:
 p 该方法会在所有的Promise都有结果(settled)，无论是fulfilled，还是reject时，才会有最终的状态; p 并且这个Promise的结果一定是fulfilled的;

n 我们来看一下打印的结果:
 p allSettled的结果是一个数组，数组中存放着每一个Promise的结果，并且是对应一个对象的; p 这个对象中包含status状态，以及对应的value值;

****

**race方法**

n 如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法: p race是竞技、竞赛的意思，表示多个Promise相互竞争，谁先有结果，那么就使用谁的结果;

****

**any方法**

n any方法是ES12中新增的方法，和race方法是类似的:
 p any方法会等到一个fulfilled状态，才会决定新Promise的状态;
 p 如果所有的Promise都是reject的，那么也会等到所有的Promise都变成rejected状态;

n 如果所有的Promise都是reject的，那么会报一个AggregateError的错误。