title: ES6知识点
author: chenbin
tags:
  - js
categories: []
date: 2022-04-20 23:14:00
---
# ES6知识点

## 模板字符串

![image-20220420155140666](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420155140.png)

方便拼接字符串和变量

### 标签模板字符串

![image-20220420155934586](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420155934.png)



## 函数的默认参数

 用途：没有传参时赋一个默认值

![image-20220420164108418](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420164108.png)

有0和空字符串判定为false的问题 导致不能正常赋值

![image-20220420164224444](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420164224.png)

ES6中新写法

![image-20220420164252139](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420164252.png)

> ES5改进方法 比较复杂

![image-20220420164620503](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420164620.png)

有默认值的形参 最好放到最后

![image-20220420164809179](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420164809.png)

## 函数的剩余参数

![image-20220420170259880](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420170259.png)



## 箭头函数的补充

![image-20220420214200412](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420214200.png)

没有this argument



## 展开语法

![image-20220420214522405](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420214522.png)

![image-20220420223010492](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/20/20220420223010.png)

三个使用场景

进行的是浅拷贝操作 仅复制内存地址

