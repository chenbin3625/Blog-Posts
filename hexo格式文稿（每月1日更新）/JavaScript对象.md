title: JavaScript对象
author: chenbin
tags:
  - js
categories:
  - js
date: 2022-04-13 13:10:00
---
# JavaScript对象

## [对象基础](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#对象基础)

对象是一个包含相关数据和方法的集合（通常由一些变量和函数组成，我们称之为对象里面的属性和方法）

所以发生了什么？一个对象由许多的成员组成，每一个成员都拥有一个名字（像上面的name、age），和一个值（如['Bob', 'Smith']、32）。每一个名字/值（name/value）对被逗号分隔开，并且名字和值之间由冒号（:）分隔，语法规则如下所示：

```
var objectName = {
  member1Name : member1Value,
  member2Name : member2Value,
  member3Name : member3Value
}
```

Copy to Clipboard

对象成员的值可以是任意的，在我们的person对象里有字符串(string)，数字(number)，两个数组(array)，两个函数(function)。前4个成员是资料项目，被称为对象的属性(property)，后两个成员是函数，允许对象对资料做一些操作，被称为对象的方法(method)

一个如上所示的对象被称之为对象的字面量(literal)——手动的写出对象的内容来创建一个对象。不同于从类实例化一个对象，我们会在后面学习这种方式。

当你想要传输一些有结构和关联的资料时常见的方式是使用字面量来创建一个对象，举例来说，发起一个请求到服务器以存储一些数据到数据库，发送一个对象要比分别发送这些数据更有效率，而且比起数组更为易用，因为你使用名字(name)来标识这些资料。

### [子命名空间](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#子命名空间)

可以用一个对象来做另一个对象成员的值。例如将name成员

```
name : ['Bob', 'Smith'],
```

Copy to Clipboard

改成

```
name : {
  first : 'Bob',
  last : 'Smith'
},
```

Copy to Clipboard

这样，我们实际上创建了一个子命名空间，听起来有点复杂，但用起来很简单，你只需要链式的再使用一次点表示法，像这样：

```
person.name.first
person.name.last
```

Copy to Clipboard

## [括号表示法](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#括号表示法)

另外一种访问属性的方式是使用括号表示法(bracket notation)，替代这样的代码

```
person.age
person.name.first
```

Copy to Clipboard

使用如下所示的代码：

```
person['age']
person['name']['first']
```

Copy to Clipboard

这看起来很像访问一个数组的元素，从根本上来说是一回事儿，你使用了关联了值的名字，而不是索引去选择元素。难怪对象有时被称之为关联数组(associative array)了——对象做了字符串到值的映射，而数组做的是数字到值的映射。

## [设置对象成员](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#设置对象成员)

目前我们仅仅看到了如何访问对象的成员，而你其实也可以设置对象成员的值，通过声明你要设置的成员，像这样：

```
person.age = 45
person['name']['last'] = 'Cratchit'
```

Copy to Clipboard

尝试这些代码，然后再查看这些成员是否已经被改变了

```
person.age
person['name']['last']
```

Copy to Clipboard

设置成员并不意味着你只能更新已经存在的属性的值，你完全可以创建新的成员，尝试以下代码：

```
person['eyes'] = 'hazel'
person.farewell = function() { alert("Bye everybody!") }
```

Copy to Clipboard

现在你可以测试你新创建的成员

```
person['eyes']
person.farewell()
```

Copy to Clipboard

括号表示法一个有用的地方是它不仅可以动态的去设置对象成员的值，还可以动态的去设置成员的名字。

比如说，我们想让用户能够在他们的数据里存储自己定义的值类型，通过两个input框来输入成员的名字和值，通过以下代码获取用户输入的值：

```
var myDataName = nameInput.value
var myDataValue = nameValue.value
```

Copy to Clipboard

我们可以这样把这个新的成员的名字和值加到person对象里：

```
person[myDataName] = myDataValue
```

Copy to Clipboard

## ["this"的含义](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#this的含义)

你也许在我们的方法里注意到了一些奇怪的地方，看这个例子：

```
greeting: function() {
  alert('Hi! I\'m ' + this.name.first + '.');
}
```

Copy to Clipboard

你也许想知道"this"是什么，关键字"this"指向了当前代码运行时的对象( 原文：the current object the code is being written inside )——这里即指person对象，为什么不直接写person呢？当你学到下一篇[Object-oriented JavaScript for beginners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)文章时，我们开始使用构造器(constructor)时，"this"是非常有用的——它保证了当代码的上下文(context)改变时变量的值的正确性（比如：不同的person对象拥有不同的name这个属性，很明显greeting这个方法需要使用的是它们自己的name）。

## [你一直在使用对象](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics#你一直在使用对象)

当你使用过这些例子之后，你可能会发现你对点表示法并不陌生，这是因为我们在这个课程里一直在使用它，每次我们学习的示例使用浏览器内建的API和JavaScript的一些对象时，我们就在使用对象，因为，这些功能是由跟我们所看到的对象同样的结构来构建的，虽然比我们自己定义的要复杂许多。

所以当我们这样使用字符串的方法时：

```
myString.split(',');
```

Copy to Clipboard

你正在使用一个字符串实例上可用的方法，你随时都可以在代码里使用字面量创建一个字符串，字符串会自动的被创建为字符串(`String`)的实例，因此会有一些常见的方法和属性可用。

当你这样访问document对象时：

```
var myDiv = document.createElement('div');
var myVideo = document.querySelector('video');
```

Copy to Clipboard

你正在使用`Document`实例上可用的方法。每个页面在加载完毕后，会有一个Document的实例被创建，叫做document，它代表了整个页面的结构，内容和一些功能，比如页面的URL。同样的，这意味document有一些可用的方法和属性。

这同样适用许多其他内建的对象或API，你使用过有—— `Array`，`Math`， 等。

请注意内建的对象或API不会总是自动地创建对象的实例，举例来说，这个 [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)——允许浏览器发起系统通知，需要你为每一个你想发起的通知都使用构造器进行实例化。

## [从零开始面向对象的程序设计](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#从零开始面向对象的程序设计)

首先，我们从高维度且简化的角度看看 面向对象的程序（Object-oriented programming ，OOP）是什么。我们将简单描述OOP，因为OOP该概念已变得很复杂，如果完整地描述OOP将使读者难以理解。OOP 的基本思想是：在程序里，我们通过使用对象去构建现实世界的模型，把原本很难（或不可能）被使用的功能，简单化并提供出来，以供访问。

对象可以包含相关的数据和代码，这些数据和代码用于表示 你所建造的模型是什么样子，以及拥有什么样的行为或功能。对象包（object package，或者叫命名空间 namespace）存储（官方用语：**封装**）着对象的数据（常常还包括函数），使数据的组织和访问变得更容易了；对象也常用作 数据存储体（data stores），用于在网络上运输数据，十分便捷。

## [构建函数和对象](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#构建函数和对象)

有些人认为 JavaScript 不是真正的面向对象的语言，比如它没有像许多面向对象的语言一样有用于创建class类的声明。JavaScript 用一种称为**构建函数**的特殊函数来定义对象和它们的特征。构建函数非常有用，因为很多情况下您不知道实际需要多少个对象（实例）。**构建函数**提供了创建您所需对象（实例）的有效方法，将对象的数据和特征函数按需联结至相应对象。

不像“经典”的面向对象的语言，从构建函数创建的新实例的特征并非全盘复制，而是通过一个叫做原形链的参考链链接过去的。（参见 [Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)），所以这并非真正的实例，严格的讲， JavaScript 在对象间使用和其它语言的共享机制不同。

1. 将之前的代码用如下代码代替：

   ```
   function Person(name) {
     this.name = name;
     this.greeting = function() {
       alert('Hi! I\'m ' + this.name + '.');
     };
   }
   ```

   Copy to Clipboard

这个构建函数是 JavaScript 版本的类。您会发现，它只定义了对象的属性和方法，除了没有明确创建一个对象和返回任何值和之外，它有了您期待的函数所拥有的全部功能。这里使用了`this`关键词，即无论是该对象的哪个实例被这个构建函数创建，它的 `name` 属性就是传递到构建函数形参`name`的值，它的 `greeting()` 方法中也将使用相同的传递到构建函数形参`name`的值。

### [创建我们最终的构造函数](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#创建我们最终的构造函数)

上面的例子仅仅是简单地介绍如何开始。让我们现在开始创建`Person()`构造函数。

1. 移除掉您之前写的所有代码， 用如下构造函数替代 —— 实现原理上，这与我们之前的例子并无二致， 只是变得稍稍复杂了些：

   ```
   function Person(first, last, age, gender, interests) {
     this.name = {
       'first': first,
       'last': last
     };
     this.age = age;
     this.gender = gender;
     this.interests = interests;
     this.bio = function() {
       alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
     };
     this.greeting = function() {
       alert('Hi! I\'m ' + this.name.first + '.');
     };
   };
   ```

   Copy to Clipboard

2. 接下来加上这样一行代码， 用来创建它的一个对象：

   ```
   var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
   ```

   Copy to Clipboard

这样，您就可以像我们定义第一个对象一样访问它的属性和方法了：

```
person1['age']
person1.interests[1]
person1.bio()
// etc.
```

Copy to Clipboard

## [创建对象的其他方式](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#创建对象的其他方式)

到现在为止，我们了解到了两种不同的创建对象的方式 —— [声明一个对象的语法](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#object_basics)， 与使用构造函数(回顾上面)。

这些方法都是很有用的， 但仍有其他的方法 —— 我们希望您能熟悉这些，以免您在Web世界的旅行中碰到它们。

### [Object()构造函数](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#object构造函数)

首先, 您能使用`Object()`构造函数来创建一个新对象。 是的， 一般对象都有构造函数，它创建了一个空的对象。

1. 尝试在您浏览器中的Javascript控制台中输入以下代码：

   ```
   var person1 = new Object();
   ```

   Copy to Clipboard

2. 这样就在

   ```
   person1
   ```

   变量中存储了一个空对象。然后, 可以根据需要, 使用点或括号表示法向此对象添加属性和方法；试试这个例子：

   ```
   person1.name = 'Chris';
   person1['age'] = 38;
   person1.greeting = function() {
     alert('Hi! I\'m ' + this.name + '.');
   }
   ```

   Copy to Clipboard

3. 还可以将对象文本传递给Object() 构造函数作为参数， 以便用属性/方法填充它。请尝试以下操作：

   ```
   var person1 = new Object({
     name : 'Chris',
     age : 38,
     greeting : function() {
       alert('Hi! I\'m ' + this.name + '.');
     }
   });
   ```

### [使用create()方法](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript#使用create方法)

JavaScript有个内嵌的方法`create()`, 它允许您基于现有对象创建新的对象。

1. 在 JavaScript 控制台中尝试此操作：

   ```
   var person2 = Object.create(person1);
   ```

   Copy to Clipboard

2. 现在尝试这个：

   ```
   person2.name
   person2.greeting()
   ```

   Copy to Clipboard

您可以看到，`person2`是基于`person1`创建的， 它们具有相同的属性和方法。这非常有用， 因为它允许您创建新的对象而无需定义构造函数。缺点是比起构造函数，浏览器在更晚的时候才支持create()方法（IE9,  IE8 或甚至以前相比）， 加上一些人认为构造函数让您的代码看上去更整洁 —— 您可以在一个地方创建您的构造函数， 然后根据需要创建实例， 这让您能很清楚地知道它们来自哪里。

## [基于原型的语言？](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes#基于原型的语言？)

JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的`prototype`属性上，而非对象实例本身。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

那么，调用 `person1` 的“实际定义在 `Object` 上”的方法时，会发生什么？比如：

```
person1.valueOf()
```

Copy to Clipboard

这个方法仅仅返回了被调用对象的值。在这个例子中发生了如下过程：

- 浏览器首先检查，`person1` 对象是否具有可用的 `valueOf()` 方法。
- 如果没有，则浏览器检查 `person1` 对象的原型对象（即 `Person`构造函数的prototype属性所指向的对象）是否具有可用的 `valueof()` 方法。
- 如果也没有，则浏览器检查 `Person()` 构造函数的prototype属性所指向的对象的原型对象（即 `Object`构造函数的prototype属性所指向的对象）是否具有可用的 `valueOf()` 方法。这里有这个方法，于是该方法被调用。

## [prototype 属性：继承成员被定义的地方](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes#prototype_属性：继承成员被定义的地方)

那么，那些继承的属性和方法在哪儿定义呢？如果你查看 `Object` 参考页，会发现左侧列出许多属性和方法——大大超过我们在 `person1` 对象中看到的继承成员的数量。某些属性或方法被继承了，而另一些没有——为什么呢？

原因在于，继承的属性和方法是定义在 `prototype` 属性之上的（你可以称之为子命名空间 (sub namespace) ）——那些以 `Object.prototype.` 开头的属性，而非仅仅以 `Object.` 开头的属性。`prototype` 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中。

于是 `Object.prototype.watch()、``Object.prototype.valueOf()` 等等成员，适用于任何继承自 `Object()` 的对象类型，包括使用构造器创建的新的对象实例。

`Object.is()`、`Object.keys()`，以及其他不在 `prototype` 对象内的成员，不会被“对象实例”或“继承自 `Object()` 的对象类型”所继承。这些方法/属性仅能被 `Object()` 构造器自身使用。

**注意**：这看起来很奇怪——构造器本身就是函数，你怎么可能在构造器这个函数中定义一个方法呢？其实函数也是一个对象类型，你可以查阅 `Function()` 构造器的参考文档以确认这一点。

**重要**：`prototype` 属性大概是 JavaScript 中最容易混淆的名称之一。你可能会认为，`this` 关键字指向当前对象的原型对象，其实不是（还记得么？原型对象是一个内部对象，应当使用` __proto__` 访问）。`prototype` 属性包含（指向）一个对象，你在这个对象中定义需要被继承的成员。

**create()**

我们曾经讲过如何用 `Object.create()` 方法创建新的对象实例。

1. 例如，在上个例子的 JavaScript 控制台中输入：

   ```
   var person2 = Object.create(person1);
   ```

   Copy to Clipboard

2. ```
   create()
   ```

    

   实际做的是从指定原型对象创建一个新的对象。这里以

    

   ```
   person1
   ```

    

   为原型对象创建了

    

   ```
   person2
   ```

    

   对象。在控制台输入：

   ```
   person2.__proto__
   ```

   Copy to Clipboard

结果返回对象`person1`。

## [constructor 属性](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes#constructor_属性)

每个实例对象都从原型中继承了一个constructor属性，该属性指向了用于构造此实例对象的构造函数。

1. 例如，在控制台中尝试下面的指令：

   ```
   person1.constructor
   person2.constructor
   ```

   Copy to Clipboard

   都将返回 `Person()` 构造器，因为该构造器包含这些实例的原始定义。

   一个小技巧是，你可以在 `constructor` 属性的末尾添加一对圆括号（括号中包含所需的参数），从而用这个构造器创建另一个对象实例。毕竟构造器是一个函数，故可以通过圆括号调用；只需在前面添加 `new` 关键字，便能将此函数作为构造器使用。

2. 在控制台中输入：

   ```
   var person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);
   ```

   Copy to Clipboard

3. 现在尝试访问新建对象的属性，例如：

   ```
   person3.name.first
   person3.age
   person3.bio()
   ```

   Copy to Clipboard

正常工作。通常你不会去用这种方法创建新的实例；但如果你刚好因为某些原因没有原始构造器的引用，那么这种方法就很有用了。

此外，`constructor` 属性还有其他用途。比如，想要获得某个对象实例的构造器的名字，可以这么用：

```
instanceName.constructor.name
```

Copy to Clipboard

具体地，像这样：

```
person1.constructor.name
```

Copy to Clipboard

事实上，一种极其常见的对象定义模式是，在构造器（函数体）中定义属性、在 `prototype` 属性上定义方法。如此，构造器只包含属性定义，而方法则分装在不同的代码块，代码更具可读性。例如：

```
// 构造器及其属性定义

function Test(a,b,c,d) {
  // 属性定义
};

// 定义第一个方法

Test.prototype.x = function () { ... }

// 定义第二个方法

Test.prototype.y = function () { ... }

// 等等……
```

# JavaScript 中的继承

## [原型式的继承](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Classes_in_JavaScript#原型式的继承)

到目前为止我们已经了解了一些关于原型链的实现方式以及成员变量是如何通过它来实现继承，但是之前涉及到的大部分都是浏览器内置函数（比如 `String`、`Date`、`Number` 和 `Array`），那么我们如何创建一个继承自另一对象的JavaScript对象呢？

正如前面课程所提到的，有些人认为JavaScript并不是真正的面向对象语言，在经典的面向对象语言中，您可能倾向于定义类对象,然后您可以简单地定义哪些类继承哪些类（参考[C++ inheritance](http://www.tutorialspoint.com/cplusplus/cpp_inheritance.htm)里的一些简单的例子），JavaScript使用了另一套实现方式，继承的对象函数并不是通过复制而来，而是通过原型链继承（通常被称为 **原型式继承 ——** **prototypal inheritance）**。

让我们通过具体的例子来解释上述概念

## [对象成员总结](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Classes_in_JavaScript#object_member_summary)

总结一下，你需要在实践中考虑到下面四类属性或方法

1. 那些定义在构造器函数中，用于给予对象实例的属性或方法。它们都很容易发现——在您自己的代码中，它们是构造函数中使用`this.x = x`类型的行；在浏览器内已经构建好的代码中，它们是可用于对象实例的成员（这些对象实例通常使用`new`关键字调用构造函数来创建，例如`var myInstance = new myConstructor()`）。
2. 那些直接在构造函数上定义，仅在构造函数上可用的属性或方法。它们通常仅在浏览器的内置对象中可用，并通过被直接链接到构造函数来识别，而不是实例。例如`Object.keys()`。**它们一般被称作静态属性或静态方法**。
3. 那些在构造函数原型上定义，由所有实例和对象类继承的属性或方法。它们包括在构造函数的原型属性上定义的任何成员，如`myConstructor.prototype.x()`。
4. Those available on an object instance, which can either be an object created when a constructor is instantiated like we saw above (so for example `let teacher1 = new Teacher( 'Chris' );` and then `teacher1.name`), or an object literal (`let teacher1 = { name : 'Chris' }` and then `teacher1.name`).

# 使用JSON

## [什么是 JSON?](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON#什么是_json)

[JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON) 是一种按照JavaScript对象语法的数据格式，这是 [Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford) 推广的。虽然它是基于 JavaScript 语法，但它独立于JavaScript，这也是为什么许多程序环境能够读取（解读）和生成 JSON。 

JSON可以作为一个对象或者字符串存在，前者用于解读 JSON 中的数据，后者用于通过网络传输 JSON 数据。 这不是一个大事件——JavaScript 提供一个全局的 可访问的 [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) 对象来对这两种数据进行转换。

一个 JSON 对象可以被储存在它自己的文件中，这基本上就是一个文本文件，扩展名为 `.json`， 还有 [MIME type](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) 用于 `application/json`.

### [JSON 结构](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON#json_结构)

我们已经可以推测出 JSON 对象就是基于 JavaScript 对象，而且这几乎是正确的。您可以把 JavaScript 对象原原本本的写入 JSON 数据——字符串，数字，数组，布尔还有其它的字面值对象。这允许您构造出一个对象树

如果我们要加载对象进入 JavaScript 程序，以保存为一个名为 `superHeroes `对象为例，我们使用 . 或 [] 访问对象内的数据（关于. 和 []概念，见 [对象基础](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) ）。如：

```
superHeroes.hometown
superHeroes["active"]
```

Copy to Clipboard

为了访问对象中的对象，您只需简单地链式访问（通过属性名和数组索引）。例如，访问 superHeroes 对象中的 members 数组对象的第二个元素的 powers 数组对象的第三个元素，您可以这样做：

```
superHeroes["members"][1]["powers"][2]
```

Copy to Clipboard

1. 首先我们有变量名 `superHeroes`，储存对象 。
2. 在对象中我们想访问 `members` 属性，所以我们使用 `["members"]`。
3. `members `包含有对象数组，我们想要访问第二个元素，所以我们使用`[1]`。
4. 在对象内，我们想访问 `powers` 属性，所以我们使用 `["powers"]`。
5. `powers` 属性是一个包含英雄技能的数组。我们想要第三个，所以我们使用`[2]`。

### [JSON 数组](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON#json_数组)

前面我们已经说过，”我们已经可以推测出 JSON 对象就是基于 JavaScript 对象，而且这几乎是正确的“——我们说几乎正确的原因是数组对象也是一种合法的 JSON 对象

### [其他注意事项](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON#其他注意事项)

- JSON 是一种纯数据格式，它只包含属性，没有方法。
- JSON要求在字符串和属性名称周围使用双引号。 单引号无效。
- 甚至一个错位的逗号或分号就可以导致  JSON 文件出错。您应该小心的检查您想使用的数据(虽然计算机生成的 JSON 很少出错，只要生成程序正常工作)。您可以通过像 [JSONLint](http://jsonlint.com/) 的应用程序来检验 JSON。
- JSON 可以将任何标准合法的 JSON 数据格式化保存，不只是数组和对象。比如，一个单一的字符串或者数字可以是合法的 JSON 对象。虽然不是特别有用处……
- 与 JavaScript 代码中对象属性可以不加引号不同，JSON 中只有带引号的字符串可以用作属性。