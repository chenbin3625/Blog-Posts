title: 认识 JavaScript 中的对象、原型与原型链
author: chenbin
tags:
  - js
categories: []
date: 2022-04-18 16:58:00
---
继承应该是面向对象编程中讨论最多的话题之一了。绝大多数的面向对象（Object-oriented）语言都有类的概念，并且这些语言也都是通过类来实现继承的。而 JavaScirpt（ECMAScript） 中实际上是没有类这个概念的，即便现在 ES6 中引入了 class 这个关键字，但它其实也仅仅只是一个语法糖而已，与其他面向对象编程语言的类并不一样。在 JavaScript 中实现继承要比在其他面向对象的语言中复杂的多。既然在 JavaScript 中没有类，那么在 JavaScript 中究竟如何实现继承呢？

## 认识 JavaScript 中的对象、原型与原型链

JavaScript 中只有对象的概念，通常大家说的 JavaScript 中的类，其实指的是 JavaScript 的对象。当谈到继承时，JavaScript 只有一种结构：对象。在 JavaScript 中可以说是万物皆对象，函数是对象，属性也可以是对象，也可以叫（构造）函数为类（比较乱，但也希望大家加可以适应本文中对这些称呼的切换使用）。不过通常将 JavaScript 中的对象划分为**函数对象**和**普通对象**两大类。

在 JavaScript 中我们通常所说的原型，实际上指的就是对象的 __proto__ 与 prototype 这两个属性。当然它们也是对象，即原型对象。

### __proto__ 与 prototype 的区别

虽然 __proto__ 与 prototype 都是原型对象，并且 __proto__ 和 prototype 都指向同一个地方。但是 __proto__ 与 prototype 是不同的两个属性，需要特别要注意，不要混淆。

**prototype 是只存在于函数对象上的属性**，它是一个标准的属性，可以通过 obj.prototype 的方式访问。prototype 是属性，但它也是对象。prototype 对象是用来存放（函数对象）实例中共有的那部份属性和方法的（通常只存放公共方法）。

![img](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/18/20220418165253.png)

prototype 对象有两个重要的默认属性：constructor 和 __proto__：

- constructor 属性指向（函数对象）本身的构造函数，用于记录实例对象是由哪个构造函数创建的。
- __proto__ 属性指向实例对象的构造函数，用于在原型链中向上查找对象的构造函数。

**__proto__ 则是仅存在于普通对象上的属性**，同时 __proto__ 属性也是一个对象。它也有一个默认的 constructor 属性，指向实例对象的构造函数。

![img](http://www.yaohaixiao.com/wp-content/uploads/2021/08/inheritance-02.png)

与 prototype 不同，__proto__ 是非标准属性，不能直接使用 obj.__proto__来访问它。而使人混乱的是在规范中，__proto__ 属性是通过 [[Prototype]] 被调用的。虽然 __proto__ 是非标准属性，但各大主流浏览器都实现了 __proto__ 属性，它又成了事实上的标准属性。

如果要访问一个对象的原型对象 __proto__，建议使用 ES6 新增的 Reflect.getPrototypeOf() 或者 Object.getPrototypeOf() 方法。同样地，当改变一个对象的原型时，最好也使用 ES6 提供的 Reflect.setPrototypeOf() 或 Object.setPrototypeOf() 方法。

### 认识原型链

JavaScript 中的每个（实例）对象都有一个私有属性 **__proto__** 指向它的**构造函数的原型对象 prototype**，而该原型对象 prototype 也有一个自己的原型对象__proto__。

当访问对象实例的某个属性时，如果实力对象自身定义了这个属性，则立刻返回。如果在实力对象没有找到，则会通过实力对象的 __proto__ 去它的构造函数（constructor 属性）的原型对象 prototype 中查找。如果在构造数的原型对象 prototype 找到该属性，则立刻返回该属性。如果还找不到，则继续通过 prototype 的 __proto__ 属性继续查找。这样层层向上的原型对象（__proto__ 和 prototype）的链接（查询）就是所谓的原型链。

![img](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/18/20220418165527.png)

原型链层层向上直到一个对象的原型（__proto__）对象为 null 为止。根据定义，null 没有原型，所以 null 就作为这个原型链中的最后一个环节。在 JavaScript 中 Object 对象的原型（prototype）对象的 __proto__ 为 null，因此在 JavaScript 中 Object 对象就是原型链的尽头。几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

### 原型和原型链的意义

（构造）函数对象的原型对象 prototype 是用来存放(创建的)对象实例中共有的那部份属性和方法的。JavaScript 引擎会通过实例对象的 __proto__ 属性链接到其构造函数的原型对象 prototype，并将其中包含的公共的方法和属性视为在实例对象本身上一样。也就是说，实例对象通过原型链可以像访问它自己的属性或者方法一样访问其构造函数原型对象 prototype 中的属性或方法。

借助原型链的这种能力，只用在构造函数的原型对象 prototype 中保存一份共有的那部份属性和方法，其所有的实例对象就都可以通用自己的原型对象 __proto__ 来使用这些属性和方法。这种设计大大减少了内存的消耗，这也是当初在 JavaScript 采用中原型链设计的初衷。

在 JavaScript 中实现继承，就必须通过对象的原型链来实现的。尽管这种原型继承通常被认为是 JavaScript 的弱点之一，但是原型继承模型本身实际上比经典（基于类）的继承模型更强大。

## 如何在 JavaScript 中创建对象？

JavaScript 中的对象是一个可以保存许多不同值的变量，可以将对象视为“键：值”对的集合，它充当一组相关值的容器。在 JavaScript 中，对象可以存储两种值：静态值的属性、动态值的方法。

在 JavaScript 中可以通过 4 种不同的方式创建：

- 使用对象字面量
- 使用 Object.create() 方法
- 使用构造函数
- 使用 ECMAScript 6 类

### 对象字面量（Object Iiteral）

使用对象字面量（一对大括号{}）创建对象，应该是在 JavaScript 中创建对象最简单方法。在 JavaScript 中对象也是变量，所以可以像变量一样实例化它们。

```
const Person = {
    name: 'Robert Yao',
    age: 18,
    sayHello: function () {
       console.log('Hello, my name is ' + this.name) 
    }
}
```

示例中就是将对象赋值给变量 Person，其中包含了 name 和 age 两个属性，以及 sayHello() 方法。我们可以很容易的调用这些属性和方法。

```
Person.name // => 'Your Name'
Person.age // => 18
Person.sayHell // => "Hello, my name is Rober Yao"
```

但是我们也可以调用一些没有在 Person 中定义的方法，例如：

```
Person.toString() // => '[object Object]'
Person.hasOwnProperty('age') // => true
```

不用觉得奇怪，因为对象字面量是 JavaScript 的全局 Object() 对象的实例。toString() 和 hasOwnProperty() 方法是 Person 对象通过原型链在其构造函数 Object() 的的原型对象 Object.prototype 中找到的两个方法。所以 Person 对象可以像调用自己的方法一样调用这些方法。

![img](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/18/20220418165534.png)

通过上图，可以清晰的看到 Person.__proto__（也就是图中的 [[Prototype]]），它的 constructor 对象的 name 属性是 Object。这说明 Person 对象是 Object() 的一个实例，也就是说对象字面量是 Object() 对象的实例。通过这个例子大家应该初步感受到原型链的能力了吧！

#### hasOwnProperty() 方法

原型链的这种特性在给我们的开发带来便利的同时也会带来一些困惑，或者说是问题。当访问对象本身不存在的属性时会遍历整个原型链。而在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。再例如，在需要确定某个属性或者方法是否为对象本身定义的，而不是通过原型链查找到的该怎么办？

这个时候，可以使用 hasOwnProperty() 方法。hasOwnProperty() 方法返回一个布尔值，指示对象是否将指定的属性作为自己的属性（而不是继承的）。这对于检查对象调用的属性（或方法）是来自于原型链（从构造函数继承），还是是它自己的属性很有用。

```
// sayHello() 方法是 Person 对象的方法
Person.hasOwnProperty('sayHello') // => true
// hasOwnProperty() 方法不是 Person 对象中的方法
Person.hasOwnProperty('hasOwnProperty') // => false
```

并且即使检测的属性的值为 null 或者 undefined，使用 hasOwnProperty() 方法检测也返回 true 。

```
Person.career = null
Person.hasOwnProperty('career') // => true
```

前面提到过，在 JavaScript 中所有对象的原型链最终都指向 Object.prototype, 因此所有对象都可以调用 hasOwnProperty() 方法。

#### 使用自调用函数（Self Invoking Functions）封装

在了解如何判断某个属性和方法是否为对象本身定义的后，让我们再回到 Person 对象。大家会注意到，Person 对象的所有属性和方法都是对外公开的，属于“门户大开型”对象。而为对象创建私有成员（属性和方法）是任何面向对象语言中最基础和有用的特性之一。通过将属性或者方法声明为私有的，可以让对象的实现细节对其他对象保密已降低对象之间的耦合，同时可以保持数据的完整性并对其修改方式加以约束。有没有办法将使用对象字面量创建的对象进行封装呢？

答案是肯定的，就是使用自调用函数封装。不过在介绍自调用函数之前，首先来看看私有属性。私有属性就其本质而言就是在对象外部无法直接访问它。在 JavaScript 中，只有函数具有作用域（暂时抛开 ES6 中块级作用域不管）。也就是说，在函数内部声明的变量在函数外部是无法访问的，只有在函数内部才可以访问。因此，函数内部变量就符合私有属性拒绝外部访问的特性。所以为实现私有变量这种拒绝外部访问的特性，借助于 JavaScript 函数的作用域的想法就十分自然了。

接着让我们再来了解一下什么是自调用函数。自调用的函数实现方式有两种：

```
// 实现方式 1
function(){
}()

// 实现方式 2
(function(){
})()
```

示例中的函数都是匿名函数，在定义之后就使用“()”立刻执行调用。这样的函数就称为自调用函数（也称为立即调用函数表达式或 IIFE ）。包装自调用函数的目的就是控制函数内其成员的可见性。那么，如何使用自调用函数创建和封装对象呢？还是以 Person 对象为例，通过自调用函数形式进行封装后。代码如下：

```
const Person = function () {
  let name = 'Robert Yao'
  let age = 28

  return {
    sayHello () {
      console.log('Hello, my name is ' + name)
      return this
    },
    getAge () {
      return age
    },
    setAge (newAge) {
      age = newAge
      return this
    },
    getName () {
      return name
    },
    setName (newName) {
       name = newName  
       return this
    }
  }
}()
```

封装后的代码与之前直接用对象字面量创建对象最大的不同是 name 和 age 现在变成了自调用函数的局部变量了。这样函数内部的变量 age 和 name 就无法直接在对象外部调用了。

另外一个不同就是对象字面量不是直接复制给 Person 变量，而是在自调用函数执行后，使用 return 关键字，将对象字面量作为值返回。这样的效果就跟之前一样，最终将对象字面量赋值给了变量 Person，从而创建了一个新对象。但与之前不同的是，这里的对象字面量在函数执行完成后，仍然可以访问自动用函数内部的变量，从而达到了封装私有变量的效果。

通过自调用函数封装的过程有没有一种似成相识的感觉？是不是感觉和闭包很相似。都是在外部函数执行完成后，还可以访问外部函数中的变量。只是通常我们见到的闭包返回的一个函数，而这里返回的是一个对象字面量。其实，在自调用函数执行完成后，使用 return 关键字返回对象字面量或者函数，都是形成了闭包。

我们用到的这种封装方式就设计模式中是常见的 Module（模块）模式。而 Module 模式最初就是被定义为在传统软件工程中为类（JavaScript 里的对象）提供私有和公有封装的方法。如果仔细看看，大家会发现 jQuery 或者其他支持 AMD 和 CommandJS 规范 JavaScript 库，最终打包出来的代码其实都是使用的 Module 模式封装的。

而在采用 Module 模式封装之前那个“门户大开型”的封装方式，在设计模式中也有一个专有的名称，叫做 Singleton（单体）模式。Module 模式和 Singleton 模式应该是我们在日常开发中使用的最多的设计模式了。而这两个设置模式的用途和功能都差不多，在用来划分命名空间和提供工具类方法集合的时候，都应该尽量使用这两种模式。由于本文不是介绍设计模式的文章，这里就不详细介绍了。

还是回过头来看看经过模块模式封装后，再次访问 age 和 name 属性，会发现无法在 Person 对象外部访问 age 和 name 了。

```
console.log(Person.age) // => undefined
console.log(Person.name) // => undefined
```

只能通过 getAge() 和 getName() 方法才可以访问到函数内部的 age 和 name 属性。

```
console.log(Person.getAge()) // => 18
console.log(Person.getName()) // => Robert Yao
```

而要想改变 age 和 name 属性，也只能通过 setAge() 和 setName() 方法。

```
console.log(Person.setAge(28).getAge()) // => 28
console.log(Person.setName('Robert Lee').getName()) // => Robert Lee
```

封装后的对象是不是做了：“可以让对象的实现细节对其他对象保密已降低对象之间的耦合，同时可以保持数据的完整性并对其修改方式加以约束。”

### Object.create()

在 JavaScript 中创建对象的另一种选择就是使用 Object.create() 方法。它是 JavaScript 内置 Object 对象的一个标准的静态方法，Object.create() 方法创建一个新对象，使用现有的对象来作为新创建的对象的原型 __proto__。 它有两个参数：

- proto：该对象应该是新创建的对象的 __proto__；
- propertiesObject： 可选的，且需要传入一个对象。该传入对象的自有可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）将作为新创建的对象的属性。propertiesObject 也就是一个扩展对象，用来扩展第一个参数 proto 上没有的一些属性。但与第一参数不同的是，propertiesObject 对象上的属性将会直接作为新创建对象自身的属性，而不是它的 __proto__（原型）上的属性；

![img](http://www.yaohaixiao.com/wp-content/uploads/2021/08/inheritance-05-1024x343.png)

Object.create() 方法的浏览器支持情况也是不错的，所以大家可以放心的使用它。如果你需要支持更“古老”的浏览器，也可以参考 MDN 的 Polyfill 。

Object.create() 方法创建的对象可以是普通对象，也可以是函数对象，主要取决于传递的第一个参数 proto 的对象类型。如果参数 proto 是普通类型对象，则创建的新对象就是普通对象，如果参数 proto 是函数类型的对象，那么创建的新对象则是函数对象。来看看它的具体用法吧：

```
// 只参入第一个参数
const me = Object.create(Person);
// 给 selina 扩展 weight 属性
const selina = Object.create(Person, { 
  weight: {
    writable:true,
    configurable:true,
    value: "48kg"
  }
})
selina.setName('Selina Hoo')

console.log(me.name) // => Robert Yao
console.log(me.weight) // => undefined，因为  Person 中没有 weight 属性
console.log(selina.name) // => Selina Hoo
console.log(selina.weight) // => 48kg，从第二参数获取到的扩展属性
```

只看示例代码还看不出 me 和 selina 对象的区别，让我把两个对象的原型链的结构打印出来就看出区别了。

![img](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/18/20220418165253.png)

me 对象没有属于自身的属性，从 Person 对象中获取的属性和方法都在 me 对象的原型 __proto__ 上（就是图片中的 [[Prototype]]）。因为 Person 是一个普通对象，me 对象也是一个普通对象。所以 me 的原型 __proto__ 对象的原型 __proto__ 的 constructor 指向了 Object。接着来看看 selina 对象。

![img](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/18/20220418165254.png)

selina 对象的结构就和 me 对象不一样了，它自身有一个 weight 属性。这是应为 selina 对象创建的时候使用了 Object.create() 方法的第二个参数，所有将 weight 属性直接作为了selina 对象本身的属性。然后是以 Person 对象作为原型的 __proto__ 属性，里面包含了 Person 对象的所有属性和方法。接着沿着原型链继续向上，最终也指向了 Object 对象。

我们在用之前介绍过的 hasOwnProperty() 方法来检测下截图中的这些属性是否属于 me 和 selina 对象本身。

```
me.hasOwnProperty('age') // => false
selina.hasOwnProperty('age') // => false
selina.hasOwnProperty('weight') // => true
```

通过 hasOwnProperty() 方法的检测，应该会发现使用 Object.create() 创建对象，如果没有传递第二个参数的话，将始终返回一个新的空对象。

另外，Object.create() 方法最重要的特性应该是指定新对象的原型 __proto__。这意味着可以通过 Object.create() 方法实现普通对象的继承，当然也可以借助它实现函数对象的继承，这个在稍后会具体介绍，目前你只需要牢记 Object.create() 方法可以帮助我们实现继承就可以了。

### 构造函数

在 JavaScript 中另一种常见的创建对象的方法就是通过在构造函数前面添加 new 关键字，通过构造函数的 constructor （构造器）实例化一个新对象。这种创建对象的方法类似于在基于类的语言中创建对象的方式。

```
const obj = new Object()
```

示例代码就是通过 Object() 构造函数来实例化一个新对象。不过真实的开发中，很少这么干。因为这样处理只是创建了一个空对象。等同于：

```
const obj = {}
```

让我们来看看实际开发中是如何使用构造函数来创建对象的。首先来看看实际开发中用到的构造函数：

```
/**
 * 构造函数
 * @constructor
 * @param {String} name - 姓名
 * @param {Number} age - 年龄
 * @returns {Person}
 **/
function Person (name, age) {
  // （约定熟成）私有属性
  this._name = 'Your Name'
  this._age = 28
  
  return this
}
/**
 * 静态方法，判断此人是否为明星
 * @static
 * @param {Object} person - Person() 对象的实例
 * @returns {boolean}
 */
Person.isStar = function (person) {
  return (person instanceof Person) && person.name === 'Robert Yao'
}
// 以下是 Person() 对象的原型方法，Person() 对象的所有实例公共的方法
/**
 * 打招呼方法，告诉大家自己的名字
 * @returns {Person}
 */
Person.prototype.sayHello = function () {
  console.log('Hello, my name is ' + name)
  return this
}
/**
 * 获取年龄的方法，返回 _age 属性值
 * @returns {Number}
 */
Person.prototype.getAge = function () {
  return this._age
}
/**
 * 设置年龄的方法，更新 _age 属性的值
 * @param {Number} age - 新的年龄值
 * @returns {Person}
 */
Person.prototype.setAage = function (age) {
  this._age = age
  return this
}
/**
 * 获取姓名的方法，返回 _name 属性值
 * @returns {String}
 */
Person.prototype.getName = function () {
  return this._name
}
/**
 * 设置姓名的方法，更新 _name 属性值
 * @param {String} name - 新的姓名值
 * @returns {Person}
 */
Person.prototype.setName = function (name) {
   this._name = name
   return this
}
```

在 Person() 构造函数中只定义了两个（私有）属性。当然，也可以在构造函数中定义方法。不过必须清楚，在构造函数内创建的属性和方法，在通过这个构造函数创建出来的每个实例中都会复制一份。除非明确的希望每个实例都复制一份属于自己的，否则建议像实例代码中那样将所有方法放到构造函数的原型 prototype 对象中。

看看 Person() 对象（JavaScript 函数也是对象，希望大家习惯这种称呼的变化）原型链的结构（之所以反复分析对象的原型链，是因为这个对于理解 JavaScript 的继承是非常有帮助的）：

![img](http://www.yaohaixiao.com/wp-content/uploads/2021/08/inheritance-08-1024x962.png)

Person() 对象是一个函数对象，所以它有一个原型对象 prototype，里面包含了之前定义的所有实例的公共方法。而 prototype 对象默认有一个 constructor 属性，指向 Person() 构造函数本身，用于它的记录实例对象是由哪个构造函数创建的。Person.prototype 对象又有自己的原型 __prooto__（[[Prototype]]），而原型 __prooto__ 的 constructor 属性又指向了 Person() 构造函数的构造函数 Function() 。

另外，我们也看到了静态方法 isStart() 。细心的你应该会发现，没有找到 _name 和 _age 这两个属性。这是因为这两个属性只有在实例对象中才可以访问。

```
// 通过构造函数创建一个实例对象 me
const me = new Person('Robert Lee', 28)
```

让我们再来看看 Person() 的实例对象 me 的原型链的结构吧：

![img](http://www.yaohaixiao.com/wp-content/uploads/2021/08/inheritance-09.png)

现在我们可以在实例对象 me 中看到 _name 和 _age 属性了，并且这两个属性是 me 对象自身的属性。前文介绍过，在构造函数定义的属性，在它的每个实例对象中会复制一份。

实例对象 me 是就是一个普通对象，因此它没有 prototype 属性了，因为 prototype 属性只存在于函数对象上。它的原型 __proto__，指向的就它的构造函数 Person() 的原型 Person.ptototype，因此可以看到之前定义的公共方法。

原型 __proto__ 的 constructor 属性指向的是构造函数 Person() 。Person() 对象是函数对象，所以有 prototype 属性，而 Person() 对象 的原型 __proto__ 则是 Funciont() 对象的原型 Fucntion.prototype. 所以我们看到 Function.prototype.constructor 指向的是 Funciont() 构造函数。

而对象 me 原型 __proto__ 的原型 __proto__ 又指向了 Object.prototype。 到此对象 me 的原型链就到了尽头了。

#### 原型链阻断

有很多开发者（尤其是从其他面向对象开发语言转过来的开发者）会很不习惯 JavaScript 中构造函数原型方法的写法。就像实例代码中那样，每个方法都是在对象外部编写的。

```
Person.prototype.sayHello = function () {
  console.log('Hello, my name is ' + name)
  return this
}
Person.prototype.getAge = function () {
  return this._age
}
```

看上去不像一个类，感（视）觉上不是一个整体。所以会你会看到有的代码写成这样：

```
function Person (name, age) {
  // （约定熟成）私有属性
  this._name = 'Your Name'
  this._age = 28
  return this感觉
}
Person.prototype = {
  sayHello: function () {
    console.log('Hello, my name is ' + name)
    return this
  },
  getAge: function () {
    return this._age
  },
  setAage: function (age) {
    this._age = age
    return this
  },
  getName: function () {
    return this._name
  },
  setName: function (name) {
    this._name = name    
    return this
  }
}
Person.isStar = function (person) {
  return (person instanceof Person) && person.name === 'Robert Yao'
}
```

这种编码风格看上去觉更像一个类，不过这会导致 Person() 对象的原型链阻断。因为这种编码方式直接将 Person() 对象的原型 Person.prototype 指向了对象字面量，而对象字面量的原型 __proto__ 是指向的是 Object() 对象的原型 Object.prototype，而原本 Person.prototype 的原型 __proto__ 应该是 Function() 对象的原型 Function.prototype 的。

如果你依旧更喜欢现在的编码风格，而又不想阻断 Person() 对象的原型链。就需要在对象字面量中手动指定一个 constructor 对象，代码如下：

```
function Person (name, age) {
  // （约定熟成）私有属性
  this._name = 'Your Name'
  this._age = 28

  return this
}
Person.prototype = {
  // 手动指定
  constructor: Person,
  sayHello: function () {
    console.log('Hello, my name is ' + name)
    return this
  }
  // 省略其他方法
}
```

这样手动添加一个 constructor 属性，将其值设置为 Person() 构造函数，这样就不会阻断 Person() 对象的原型链了。这一点大家千万要注意。

### ECMAScript 6 类

在最新的 ECMAScript 6 规范中引入了一套新的关键字用来创建类。这些新的关键字包括 class, constructor，static，extends 和 super。现在可以很方便的通过 class 创建对象了。

```
class Person {
    // 以 “#” 号开始的为私有属性
    #name
    #age
    constructor(name, age) {
        this.#name = name
        this.#age = age
    }
    sayHello() {
        console.log('Hello, my name is ' + this.#name)
        return this
    }
    getAge() {
        return this.#age
    }
    setAage(age) {
        this.#age = age
        return this
    }
    getName() {
        return this.#name
    }
    setName(name) {
        this.#name = name
        return this
    }
    static isStar(person) {
        return (person instanceof Person) && person.name === 'Robert Yao'
    }
}
```

这段使用 ECMAScript 6 的 class 创建的对象，使用基于类语言的开发人员会对这些结构感到熟悉，但它们是不同的。JavaScript 仍然基于原型。本质上与之前使用构造函数编写创建的几乎对象是一样的。ES6 引入的 class 实际上只是一个语法糖，如果你使用 typeof 检测新创建的对象：

```
typeof Person // => function
```

它还是一个（构造）函数对象。不过新的编码方式就和其他面向对象语言一样了，所有方法设属性都包装在了一起，看上去要更优雅了。特别是对于有强迫症（对类有强烈执念）的开发者简直就是救命了。

说说使用 ES6 的 class 关键字创建对象带来的一些新的变化。

首先，构造函数中的 this.#name 和 this.#age 是真正的私有变量了。

```
let me = new Person('Rober Yao', 28)
consle.log(me.name) // => undefined
```

nam 和 age 属性在对象 me 的外部无法直接调用了，必须使用 getName() 和 getAge() 方法获取了。而之前使用构造函数的方式创建的对象实例还是可以使用 me._name 的方式访问的。另外，在 ES6 中使用私有属性，必须要在 class 中明确声明：

```
class Person {
    // 以 “#” 号开始的为私有属性
    // 必须明确声明
    #name
    #age
}
```

不像公共的属性，不用强制在 class 中申明，直接在构造函数中声明就可以了。并且私有变量使用 hasOwnProperty() 方法也无法检测到：

```
me.hasOwnProperty('name') // => false
```

来看看使用 ES6 class 实例化的对象 me 的原型链：

![img](http://www.yaohaixiao.com/wp-content/uploads/2021/08/inheritance-10.png)

实例对象 me 的原型 __proto__ 链接的的是 class Person，而 class Person 的原型 __proto__，链接的是 Fucntion() 对象的原型 Function.prototype，Function.prototype.constructor 则是 Function() 构造函数。当然原型链最后还是在 Object() 对象终止。

可以看，到使用 ES6 的 class 创建的实例对象和前文使用构造函数创建的实例对象的原型链几乎一样。

另外，ES6 中引入了 static 关键字，可以直接定义静态方法了：

```
class Person {
    // 省略其他方法
    static isStar(person) {
        return (person instanceof Person) && person.name === 'Robert Yao'
    }
}
```

到此为止，在 JavaScript 中创建对象的方法就都介绍完了。并且在介绍的过程中和大家反复分析了如何查看对象的原型链，接下来就正式介绍 JavaScript 中如何实现继承。

## 如何在 JavaScript 中实现继承？

在理解了 JavaScript 的原型与原型链，并且理解了前文介绍的 JavaScript 中对象的原型链解析的过程后，要理解 JavaScript 中如何实现继承其实是很简单的一件事情了。因为 JavaScript 中继承的实现，本质上就是指定对象（普通对象的__proto__属性，函数对象的 prototype 属性）原型，然后对象就会通过自己的原型链查找原型链上所有构造函数的原型方法。

### 类式的继承

JavaScript 中没有实际的类，这里的类指的是构造函数。类式的继承，其实就是 JavaScript 将构造函数当作类来模拟类式的继承。而构造函数本质上又是函数对象，所以类式的继承本质上就是通过设置构造函数的原型 prototype 来实现继承。前文我们已经有了 Person() 类了，现在来看看 JavaScript 具体是如何实现类式的继承的。

让我们来传创建一个新的构造函数 Programmer()：

```
function Programmer (name, age, gender, career) {
    Person.call(this, name, age)
    this.gender = gender
    this.career = career
    return this
}
```

创建 Programer() 函数与之前创建 Person() 不同的地方在于这里使用了 call() 方法。这并没有（完整地）实现继承，（在我看来）仅仅只是为避免编写重复代码的一个技巧。call() 方法允许你调用在其他地方定义的函数，但在当前上下文中。这里 call() 方法的起到的作用类似于在 ES6 中在构造函数调用 supper() 方法。调用后只能将父类构造函数中的方法和属性复制一份到当前子类。这样 Programmer () 创建出来的实例对象，就有了4个属性：name、age、gender 和 career，但父类原型 prototype 对象中的方法是访问不到的。

要完整地实现 Programmer () 对 Person() 的继承，就必须将 Programmer() 对象原型 Programmer.prototype 指向 Person() 对象的实例：

```
Programmer.prototype = new Person()
// 或者(还有一些其他的方式，就不一一列举了)
Programmer.prototype = Object.create(Person.prototype)
并且同时还要指定原型 Programmer.prototype 的 constructor 为 Programmer：
Programmer.prototype.constructor = Programmer
```

此时的你是不是会有疑惑，为什么要这么处理？为什么要将 Programmer.prototype 指向 Person() 对象的实例，而不是直接设置 Person.prototype？为什么还要指定 constructor，不指定不行吗？

让我们一起再来回顾一下前文提到的函数对象的 prototype 属性相关知识点。prototype 有两个默认属性 __proto__ 和 construcotor。设置 Programmer.prototype = new Person() 其实就是在设置 Programmer() 对象的原型 Programmer.prototype 的原型 __proto__。那能不能这么处理：

```
Programmer.prototype = Person.prototype
```

不行。因为 Person.prototype 的原型 __proto__ 指向的是 Object()，而 new Person() 的原型 __proto__ 才是 Pergrammer()。只有设置 Programmer.prototype = new Person() 才没有阻断原型链。

同理，设置 Programmer.prototype.constructor = Programmer 也是为了确保 Programmer() 对象实例的原型链不被阻断。因为在设置 Programmer.prototype = new Person() 时，如果没有任何处理措施， 那么Programmer.prototype.constructor = Person，其原理就和前文在介绍原型链的阻断一样。因为 new Person() 的原型 __proto__ 的 constructor 属性将被赋值给 Programmer.prototype.constructor。

#### extend() 方法

在其他面向对象语言中都有一个 extend() 方法，用于方便的派生子类。在了解了 JavaScript 中实现类式继承的原理后，封装一个 extend() 方法也就很简单了。先上代码再解释：

```
const extend = (subClass, superClass) => {
  const sp = superClass.prototype
  const F = function () {}
  // 使用空函数作为过渡父类
  F.prototype = sp
  // 实现继承
  subClass.prototype = new F()
  subClass.prototype.constructor = subClass
  // 设置静态属性 superClass
  subClass.superClass = sp
  if (superClass != Object && sp.constructor == Object.prototype.constructor) {
    sp.constructor = superClass;
  }
} 
```

这里的实现与之的实现方式最大的不同就是使用了一个空白函数作为过渡的父类，然后设置空函数的原型 F.prototype = superClass.prototype，这样等于复制了一份父类 superClass，但是空白的构造函数中没有任何的属性和方法。这样处理的好处是，当给子类原型 subClass.prototype 指定原型 __proto__ 的时候，不需要复制原始父类（构造函数）中的属性和方法，因为它们可能会很多，而且还有可能会式一些复杂耗时的操作。使用空白函数作为过渡，就不会产生这些额外的消耗。

另外，这里的实现还进行了一些扩展，给 subClass() 添加了 superClass 静态属性，里面包含了父类原型的所有方法。有了 superClass 属性后，就可以直接调用父类中的方法了。这在既要重写超类的方法，而同时又想调用父类的同名方法时就十分有用了。看看如何使用 entend() 方法来实现之前的继承：

```
function Programmer (name, age, gender, career) {
    Person.call(this, name, age)
    this.gender = gender
    this.career = career
    return this
} 
extend(Programer, Person)
Programmer.prototype.sayHello () {    
   const name = Programmer.superClass.getName.call(this)
   return 'Hi, I\'m ' + name + '. I\' a programmer.'  
}
```

这样一来就不用每次重复给子类指定 prototype 和 constructor 属性了。而且也可以直接在子类的原型方法中调用父类同名的方法了。

#### ES6 中的 extends 关键字

ES6 中引入新的关键 extends，用来创建一个普通类或者内建对象的子类。所以使用 ES6 实现类的继承就可以像其他面向对象语言一样使用 extends 关键字去实现继承了：

```
class Programmer extends Person {
  constructor (name, age, gender, career){
    super(name, age)    
  }
  sayHell(){
    const name = this._name
    return 'Hi, I\'m ' + name + '. I\' a programmer.'     
  }
}
```

extends 还可以用于创建 JavaScript 内置的对象，但这不是本文的重点，这里就不具体介绍了，感兴趣的朋友可以查看 MDN 的相关文档。这里要重点介绍的是 extends 实现继承的核心代码：

```
function _inherits(subClass, superClass) {
  // 通过 Object.create() 方法指定子类的原型 
  // subClass.prototype 的原型 __proto__ 
  // 而 Object.create() 方法创建的是一个空对象
  // 这于我们前面通过空函数过渡的效果（原理）一样 
  subClass.prototype = Object.create(superType && superClass.prototype, {
    // 指定  constructor 属性，避免原型链的阻断
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  // 使用 Object.setPrototypeOf() 方法设置子类的原型 
  // subClass.__proto__ 为 superClass
  if (subClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
  }
}
```

不出所料，也是通过指定原型链来实现的。针对函数对象的原型 subClass.prototype 的处理方式和前文的 extend() 函数的处理方式如出一辙。都是通过一个空对象对象做中转。只是这里使用的是 Object.creeat() 方法创建空对象。然后都手动设置了原型的 constructor 属性。用来指定 subClass 的构造函数，以确保不阻断 subClass 的原型链。

### 原型式继承

原型式继承主要式针对普通对象实现继承的一种方法。使用原型式继承时，并不需要像类式继承那样定义对象的结构（声明构造函数，指定原型 prototype 和 construtor），只需要直接创建一个对象即可。也就是只用指定对象的原型 __proto__ 即可，其余都交给原型链就可以了。

#### clone() 方法

为方便实现设置对象的原型 __proto__，这里我们也创建一个类似 extend() 方法的 clone() 方法。来看看 clone() 方法的实现吧：

```
const clone = (supClass) => {
  function F()
  F.prototype = subClass  
  return new F()
}
```

一眼看过去是不是感觉和 extend() 方法很像？但实际的实现机制还是有一定的区别的。clone() 方法和 extend() 方法也都是通过一个空白函数作为中转，并将空函数 F() 的原型 F.prototype 指向 superClass。 不同的是 clone() 方法直接将空函数的实例返回了，并没有设置设置空函数 F() 原型 F.prototype.constructor，也没有指定子对象的原型 prototype。

这样处理的原因很简单。现在是针对是普通函数实现继承，普通对象是没有 prototype 属性的。没有设置 F.prototype.constructor，是因为这里就是希望阻断 F.prototype 的原型链，期望的就是 F.prototype.constructor = superClass。这样在返回 F() 对象的实例后，new F() 实例对象的原型 __proto__ 就是 superClass，这正是我们期望的原型链。

clone() 方法的调用也很简单：

```
// 这里的 Person 对象是使用独享字面量创建的
const programmer = clone(Person)
```

细心的彭勇应该发现，clone() 方法所作的一切其实就是 Object.create() 方法的实现。前面我提到了 MDN 对 Object.create() 的 Polyfil，现在来看看它的实现吧：

```
if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object: " + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }
    if (typeof propertiesObject != "undefined") {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );
    }
    function F() {}
    F.prototype = proto;
    return new F();
  };
}
```

核心的代码逻辑是不是就是 clone() 方法？

## 总结

Ok，到此为止关于在 JavaScript 中如何实现继承的相关内容就基本介绍完毕了。可能有朋友看到过其他文章中有介绍一些其他的继承方式例如：组合继承、寄生式继承等等，其实都是基于类式继承和原型式继承的基础扩展出的一些方法。

要完全理解 JavaScript 中实现继承的原理，关键还是要了解在 JavaScript 如何创建对象，以及普通对象和函数对象的特点。而关键中的关键就是要理解原型（普通对象：__proto__，函数对象：prototype）和原型链。需要要多练习如何分析一个对象的原型链的结构。因为在 JavaScript 中实现继承，无论是采用那种继承方式，最根本原理都是利用 JavaScript 中的原型链实现继承。