# JavaScript高级

函数调用执行过程







## 内存管理

生命周期：

申请-使用-释放

手动型-自动型



### js在定义变量时自动分配内存

![image-20220415131257149](https://ypyun-cdn.u1n1.com/img/picgo202204151312191.png)

### js垃圾回收

![image-20220415131606581](https://ypyun-cdn.u1n1.com/img/picgo202204151316621.png)

GC算法

引用计数 问题：循环引用 内存泄漏

js广泛采用：标记清除

![image-20220415132414543](https://ypyun-cdn.u1n1.com/img/picgo202204151324580.png)

## 高阶函数

函数作为参数或者作为返回值



数组函数使用 filter过滤 map映射 forEach迭代 find/findIndex查找 reduce累加 



# 闭包

狭义：一个函数访问了外层作用域的变量，那么它是一个闭包





浏览器引擎：如果自由变量在闭包中没有引用，浏览器会删除没有引用的变量（优化）

ECMA规范中是不删除的



# this指向

全局作用域：

浏览器：指向windows（global object）

node：返回{ }

很少在全局下使用，往往在函数中使用

