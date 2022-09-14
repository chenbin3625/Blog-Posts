# 1、数据类型

## 分类

### 基本数据类型

String Number Boolean undefined null

### 对象（引用类型）

Object  任意对象（）

Function     一种特别的对象（可以执行）

Array   一种特别的对象（有下标，内部数据有序）

## 判断基本数据类型

### typeof   

返回数据类型的字符串表达，undefined 返回 ’undefined'

```js
//可以判断
var a ;
console.log(typeof a=== 'undefined')

a = 4;
console.log(typeof a=== 'number')

a = 'atguigu'
console.log(typeof a === 'string')

a = true
console.log(typeof a === 'boolean')

```

### instanceof

专门用来判断**对象**的具体类型（Array或是Function都是特殊的Object对象），不能用于基本数据类型的判断

```js
  var b3 = 'string'
  console.log(b3 instanceof String)    //false
```

### ===/==

专门用来判断undefined 和 null

```js
console.log(a === undefined)
console.log(a === null)
```

## 判断对象

```js
  var b1 = {
    b2: [2, 'abc', console.log],
    b3: function () {
      console.log('b3()')
    }
  }
```

### typeof

```js
console.log(typeof b1.b3 === 'function')   //true
console.log(typeof b1.b2[2] === 'function')   //true

//不能判断nulll与Object
var a = null
console.log(typeof a) //输出‘object

//不能判断Object与Array
console.log(typeof b1.b2)  //输出object
```

### instanceof

```js
  console.log(b1 instanceof Object, typeof b1) // true 'object'
  console.log(b1.b2 instanceof Array, typeof b1.b2) // true 'object'   typeof不能判断array
  console.log(b1.b3 instanceof Function, typeof b1.b3) // true 'function'
```

# 数据类型2

## undefined和null的区别***

undefined只是定义了未赋值，null是有值但是值是null

```js
var a;
console.log(a);
a = null;
console.log(a);
```

关于null

```js
// 2. 什么时候给变量赋值为null呢?
  //初始
var a3 = null
  //中间
var name = 'Tom'
var age = 12
a3 = {
  name: name,
  age: age
}
  //结束，让a3指向的对象成为垃圾对象，被gc回收
a3 = null
```

##  严格区别变量类型与数据类型

```

  * js的变量本身是没有类型的, 变量的类型实际上是变量内存中数据的类型
  * 变量类型:
    * 基本类型: 保存基本类型数据的变量
    * 引用类型: 保存对象地址值的变量
  * 数据对象
    * 基本类型
    * 对象类型
```