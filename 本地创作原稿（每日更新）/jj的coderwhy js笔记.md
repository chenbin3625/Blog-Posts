# 0

## 关于赋值语句

![image-20220106222518568](https://cdn.u1n1.com/img/picgo202204152343891.png)

## 关于变量

![image-20220106221801132](https://cdn.u1n1.com/img/picgo202204152343892.png)

## 立即执行函数的另一种写法

如果function不在开头，那么就是函数表达式，在前面加!取反，让函数变成函数表达式

![image-20220301111544272](https://cdn.u1n1.com/img/picgo202204152343893.png)

# 00、数据类型

## 数组、字符串和数字

- 数组也是对象

数组也是对象，所以数组也可以包含字符串键值和属性（这并不计算在数组长度中）。数组长度是根据最后一个有效的下标决定的，如果是空数组，但是给下标位999的位置赋值，那么长度就是1000

```js
var a = []
a[0] = 1
a["foot"] = 'jzsp'
a["2"] = 'jzsp'        //这种方式的话，是给数组中添加元素哦~跟键值不一样
console.log(a.length)  //3
console.log(a.foot)    //jzsp
```







- 字符串是不可变的，数组是可变的

```js
let a = '123'
a[1] = '5'
console.log(a)   //123
```

- 数字的语法

数字前面的0可以省略

```js
var a = .42
```

后面的0可以省略

```js
var a = 42.
```

对于点运算符，需要特别注意，因为它是一个有效的数字字符，会被优先识别位数字常量的一部分

```js
42.toFixed(3)  //SyntaxError

//有效语法
(42).toFixed(3)
42..toFixed(3)  
0.42.toFixed(3)
```





## 判断数据类型

------

### typeof

- typeof无法判断引用类型

```js
console.log(typeof 1)          //number
console.log(typeof '1')        //string
console.log(typeof false)      //boolean
console.log(typeof undefined)  //undefined
console.log(typeof Symbol())   //symbol
console.log(typeof null)       //object
console.log(typeof {})         //object
console.log(typeof [])         //object
```

- typeof判断null类型

`typeof null === 'object'` 是一个历史遗留问题

```js
if(!a && typeof a === 'object')
```

- typeof判断undeclared类型

可以看到，即使b没有定义，是undeclared，但是由于typeof的安全机制，这段代码并不会报错

```js
var a
typeof a   //undefined
typeof b   //undefined  
```









# 01、浏览器工作原理和v8引擎

## 浏览器的工作原理  

访问某个ip地址的时候，首先是下载html文件，然后解析到link标签css的时候去发送请求下载css，解析到script标签的时候去发送请求下载js代码，下载script的时候会阻塞浏览器，所以基本上都将script标签放到html后面

![image-20211229204314171](https://cdn.u1n1.com/img/picgo202204152343894.png)

## 浏览器的解析

浏览器获取到html文件之后就开始解析，遇到script标签就去下载js，link标签就下载css，浏览器是不能直接解析HTML数据的，所以解析**第一步**是需要将它转换成浏览器能理解的DOM树结构，生成DOM树之后根据CSS样式表计算出DOM树中所有节点的样式，最后**计算DOM元素的布局信息**，使其都保存在布局树中，然后绘制到浏览器页面上。因为js代码会停止解析HTML（因为接下来的 JavaScript **可能要修改当前已经生成的 DOM 结构**），所以要将script标签尽量放在末尾，

- 在HTML页面提交给渲染引擎，渲染引擎会将HTML**解析成dom树**
- 将css转化成浏览器可以理解的styleSheets，计算出所有dom树节点的样式
- 创建布局树，计算出所有节点的位置，保存在**布局树**中
- 网页其实是由一个个**图层构成**的，对布局树**进行分层**，生成分层树

浏览器的页面实际上被分成了很多图层，这些**图层叠加后合成了最终的页面**

![image-20220305172832080](https://cdn.u1n1.com/img/picgo202204152343895.png)

通常情况下，浏览器并不会为每一个节点都创建一个图层。只有满足以下特定条件才会将节点提升为单独的一层

**拥有层叠上下文属性的元素（会给html元素三维的概念）**

![image-20220305173045278](https://cdn.u1n1.com/img/picgo202204152343896.png)

**固定div，内容被裁剪隐藏的元素**

![image-20220305173059799](https://cdn.u1n1.com/img/picgo202204152343897.png)

- 为每个图层**生成绘制列表**，提交给合成线程

完成图层树的构建后，**渲染引擎**会对图层树中的每个图层进行**绘制**，进行绘制之前会生成**绘制列表**，绘制列表其实是一个个小的**绘制指令的集合**

![image-20220305173339471](https://cdn.u1n1.com/img/picgo202204152343898.png)

- 当图层的**绘制列表**准备好之后，主线程会把该绘制列表提交（commit）给合成线程，合成线程将图层分成图块，在**光栅化**线程池中将**图块转化成位图**

主线程将图层绘制列表交给合成线程之后

![image-20220305173533196](https://cdn.u1n1.com/img/picgo202204152343899.png)

首先将**图层分为一个个图块**，合成线程会按照视口附近的图块优先生成位图。

![image-20220305173921781](https://cdn.u1n1.com/img/picgo202204152343901.png)

生成位图的操作是由**栅格化线程**来执行的，

![image-20220305174216527](https://cdn.u1n1.com/img/picgo202204152343902.png)

- 一旦所有图块都被光栅化，合成线程发送**绘制图块指令DrawQuad**给浏览器进程，浏览器进程就会根据**DrawQuad**消息生成页面

![image-20211229205024880](https://cdn.u1n1.com/img/picgo202204152343903.png)

## 为什么js会阻塞dom解析？

解析到script标签时，渲染引擎判断**这是一段脚本**，此时 HTML 解析器就会暂停 DOM 的解析，因为接下来的 JavaScript 可**能要修改当前已经生成的 DOM 结构**。

![image-20220305182131879](https://cdn.u1n1.com/img/picgo202204152343904.png)

## js引擎介绍

![image-20211229205352156](https://cdn.u1n1.com/img/picgo202204152343905.png) 

<img src="https://cdn.u1n1.com/img/picgo202204152343906.png" alt="image-20211229205746318" style="zoom:80%;" />

## v8引擎

![image-20211229210352642](https://cdn.u1n1.com/img/picgo202204152343907.png)

### v8过程介绍

将JavaScript代码进行词法、语法分析转化成抽象语法树，**抽象语法树**经过解释器转化成字节码，字节码再转成对应cpu平台的机器指令。v8引擎对转换成机器指令的步骤做了优化，内部有一个库可以收集一些信息，如果是高频使用的函数会被标记成热函数，然后在进行解析的时候就直接会转化成对应的机器指令，省去了一个步骤。因为js没有类型声明，如果sum函数被标记成了热函数，但是如果这个时候，传入了两个字符串，对应的机器指令就无法完成函数的功能，会反编译，转成对应功能的机器指令，所以有类型声明会提高性能优化

- astexplorer.net(生成抽象语法树的网页 )

![image-20211229210511406](https://cdn.u1n1.com/img/picgo202204152343908.png)

跨平台的字节码（之所以是跨平台的，是因为本质上是先将字节码转换成**汇编代码**，然后再转化成在**不同的cpu平台上运行的cpu指令**，也就是机器指令 ）

v8引擎的性能优化：TurboFan库可以由Ignition收集**函数的执行信息**（如果是高频的函数会被标记成**hot热函数**，这个被标记的热函数会**直接转换成要被执行的机器指令**，这样就可以**省去了中间转换成汇编指令的过程，性能更高**）

 但是有一个问题就是，例如下图的sum函数，假设被标记成了热函数，转成了对应的机器指令。

![image-20211229212135659](https://cdn.u1n1.com/img/picgo202204152343909.png)

如果一直都是传入两个数字的话，那么这个机器指令的功能是不会出现问题的。**但是突然传入两个字符串，本质上就是做拼串操作了，那么这个机器指令（它的本质是做相加操作）就无法使用**，这个时候就要生成新的机器指令了，所以有了**Deoptimization**过程（反优化，也就是**重新将机器指令转换为字节码**） ，还原，并且重新进行“**字节码 -> 汇编指令 -> 机器指令”**的过程。所以用ts写的代码编译成的js代码有了类型约束，代码的执行效率就会很高（底层不需要执行Deoptimization）

  

![image-20211229213223427](https://cdn.u1n1.com/img/picgo202204152343910.png)

------

### 细节（预解析PreParser）

<img src="https://cdn.u1n1.com/img/picgo202204152343911.png" alt="image-20211229221225169" style="zoom:80%;" />

<img src="https://cdn.u1n1.com/img/picgo202204152343912.png" alt="image-20211229221216554" style="zoom:67%;" />

<img src="https://cdn.u1n1.com/img/picgo202204152343913.png" alt="image-20211229230234722" style="zoom:67%;" />

# 02、作用域

在传统编译语言的流程中，程序中的一段源代码在执行前会经历三个步骤，统称为**编译**

- 词法分析

  这个过程会将由字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元。例如，考虑程序`var a = 2`。这段程序通常会被分解称为下面这些词法单元：var 、a 、 = 、 2 、

- 语法分析

  这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套锁组成的代表了程序语法结构的树。这个树被称为**“抽象语法树AST”**

- 代码生成

  将AST转换为可执行的过程被称为代码生成，这个过程与语言、平台等信息相关

## LHS和RHS查询

在遇到`var a = 2`时，编译器会进行如下处理

- 遇到`var a`，**编译器**会询问**作用域**是否已经有一个该名称的变量存在于同一个作用域的集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量并命名为a
- 接下来编译器会为**引擎**生成运行时所需要的代码，这些代码被用来处理`a = 2`这个赋值操作。引擎运行时会首先询问作用域，在当前的作用域集合中是否存在一个叫做a的变量，如果是，引擎就会使用这个变量，否则就会继续查找该变量

编译器在编译过程的第二部中生成了代码，引擎执行它时，会通过查找变量a来判断它是否已声明过。查找到过程由作用域进行协助。引擎会为变量进行两种查询：**LHS查询和RHS查询**

- RHS查询是简单地查找某个变量的值，也就是谁是赋值操作的源头

- LHS查询是试图找到变量的容器本身，从而可以对其进行赋值，也就是赋值操作的目标是谁

考虑以下代码

```js
console.log(a)
```

其中对a的引用是一个**RHS**引用，因为这里a并**没有赋予任何值**，反而我们需要查找并获取a的值传递给`console.log(...)`

相比之下，例如：

```js
a = 2
```

这里对a的引用就是**LHS**引用，实际上我们不关心当前的值是什么，只想要为`= 2`这个赋值操作找到一个**目标**

考虑下面的程序

```js
function foo(a){
    //对a的引用，RHS查询
    //console.log本身也是需要一个引用才能执行，所以对console对象进行了RHS查询，并且查询得到的值中是否有一个叫做log的方法
    console.log(a)  
}
//这里的foo函数的调用是要对foo进行RHS查询
//这里隐含了一个对a的LHS查询，也就是将2传给a
foo(2)    
```

```js
//LHS:c..,b..,a=2   (三次)
//RHS:foo(..),=a,a...,b...  (四次)

function foo(a){
    var b = a
    return a + b
}
var c = foo(2)
```

### 为什么要区分LHS和RHS?

考虑如下代码：

```js
function foo(a){
    console.log(a+b)
    b = a
}
foo(2)
```

第一次多b进行RHS查询时是无法找到该变量的，也就是说，这是一个未声明变量，因为在任何相关的作用域中都无法找到它

如果RHS查询在所有嵌套的的作用域中都找不到所需的变量，引擎就会抛出**ReferenceError异常**，如果RHS查询到了一个变量，但是你厂时对这个变量的值进行不合理的操作（例如对一个非函数类型的值进行函数调用），那么引擎会抛出一个**TypeError**异常

> ReferenceError同**作用域判别失败**相关，TypeError表示作用域判别成果了，但是对**结果的操作是非法的**

相比之下，当引擎执行LHS查询时，如果在顶层作用域中也无法找到目标变量，**全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎**，前提是程序在非严格模式下。

## 函数作用域

考虑下面的代码：

```js
var a = 2
function foo(){
    var a = 3
    function bar(){
        
    }
}
console.log(a)   //2
```

函数作用域的是指，**属于这个函数的全部变量都可以在整个函数的范围内使用以及复用（嵌套的作用域bar中也可以使用）**。外层作用域无法访问内层作用域，内层作用域可以访问外层作用域。

这个foo函数将内部变量和函数的**定义**隐藏起来了，外部作用域无法访问函数内部的任何内容。虽然这样可以解决一些问题（规避命名冲突），但是这个foo本身污染了所在的作用域（在上面例子中是全局作用域）。其次，必须显式地调用函数才能执行函数内部的代码。

### 函数声明和函数表达式

> 区分函数声明和函数表达式最简单的方法就是看function关键字出现在声明中的位置（不仅仅是在第一行代码中的位置，而是在整个声明中的位置）。**如果function是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式**

- 函数声明

```js
function foo(){
    
}
```

- 函数表达式

```js
//1、用一个括号将整个函数包裹，那么这个函数会被当作函数表达式来处理(第一个词不是function了)
//可以在后面紧跟着()来调用函数
(function(){
    console.log('jzsp')
})

//2、一般的函数声明
var foo = function(){
    
}
```

```js
var a = 1;   //这个分号是必须要加的
//紧跟着的括号内是可以传入参数的，下面这个例子中，传入的参数是一个函数对象，在函数表达式内部执行传入的函数对象
(function (def){
    def(window)
})(function (global){
    var a = 3
    console.log(a)   //3
    console.log(global.a)    //1
})
/*---------------------------------------------------------x*/
var a = 1;
(function (global){
    var a = 3
    console.log(a)   
    console.log(global.a)   
})(window)
```

## 作用域提升

编译阶段中的一部分工作就是**找到所有的声明，并用合适的作用域将它们关联起来**。当你看到`var a = 2`时，可能会认为这是一个声明。但是JS实际上会将其看成两个声明`：var a`和 `a = 2`。**第一个定义声明是在编译阶段进行的（提升到最上面），第二个赋值声明会被留在原地等待执行阶段**

> 函数内部也会对var和function的定义进行提升

但是类似于 `var a = function bar(){}`里面的函数是不会提升的，也就是说，只对函数声明进行提升，函数表达式是不提升的，并且**函数提升优先于变量提升**

## 函数默认参数的作用域

![image-20220127160229348](https://cdn.u1n1.com/img/picgo202204152343914.png)

```js
var x = 10;
function f( x,y=()=>{x=20;console.log(x);} ){// 20
    console.log( x );// undefined
    y();
    var x = 30;
    console.log( x );// 30
}
f();
console.log( x );//10
```

![image-20220127160344265](https://cdn.u1n1.com/img/picgo202204152343915.png)

![image-20220127160435089](https://cdn.u1n1.com/img/picgo202204152343916.png)



```js
function f1( x=1,y=()=>{x=10;} ){
    y();
    console.log( x );    //1,用默认参数作用域中的x给作用域内部的x赋初值
    var x = 'abc';
}
f1();
function f2( x=1,y=()=>{x=10;} ){
    y();	
    console.log( x );    //10，函数作用域内部没有声明x，往上层作用域(参数作用域查找)
    //var x = 'abc';
}
f2();
```



## js代码的执行过程

### VO

![image-20211230162606740](https://cdn.u1n1.com/img/picgo202204152343917.png)

### 全局代码执行过程（变量）

在js引擎中是如何执行下面的简单代码的

![image-20211229222233481](https://cdn.u1n1.com/img/picgo202204152343918.png)

- 首先，**执行代码前**，代码被解析，v8引擎内部会帮助我们创建一个对象（GlobalObject简称GO），扫描所有的代码，将一些内置的类和函数，**挂载到GO对象的属性上**，同时也挂载在代码中被**定义的一些var 变量名**（例如上图的num1），但是这些被挂载的**变量名是作为属性值的，并没有被赋值（undefined）**

<img src="https://cdn.u1n1.com/img/picgo202204152343919.png" alt="image-20211229223455706" style="zoom:67%;" />

firfox

![image-20211230141830563](https://cdn.u1n1.com/img/picgo202204152343920.png)

chrom 

![image-20211230142126612](https://cdn.u1n1.com/img/picgo202204152343921.png)

- 第二步，为了执行代码，v8引擎内部会有一个**执行上下文栈**（Execution Context Stack）

<img src="https://cdn.u1n1.com/img/picgo202204152343922.png" alt="image-20211229223603261" style="zoom:67%;" />

- 第三步，为了执行全局代码，v8引擎会在执行代码时，创建全局执行上下文栈（Global execution context），放入ECS中。GEC放入ECS中有两个步骤，**第一步就是创建VO(variable object)指向GO，第二步是依次执行全局代码**（也就是`var name = "why"`)，此时如果第二行执行`console.log(num1)`的话会undefined，因为此时**VO指向的GO中的num1变量还没有被赋值**，是初值undefined，只有在执行到第三行代码的时候才会被赋值为20.

<img src="https://cdn.u1n1.com/img/picgo202204152343923.png" alt="image-20211229223611345" style="zoom:80%;" />

<img src="https://cdn.u1n1.com/img/picgo202204152343924.png" alt="image-20211229223214571" style="zoom: 80%;" />



### 全局代码执行过程（函数）

在编译的时候， **`foo()`是执行语句，不会被执行**，检测到`function foo()函数声明`的时候 ，会在内存中开辟一个**函数存储空间（函数对象）**，这个存储空间中保存了两个东西：**父级作用域以及代码块**。并且GO中会挂载一个**foo属性**指向这个内存空间。

> 注意，只有函数声明才有声明提前，函数表达式是不会声明提前的，例如`var a = function ()`

![image-20211230143158059](https://cdn.u1n1.com/img/picgo202204152343925.png)

**在执行函数的前，会创建一个函数执行上下文**（functional execution object）**以及AO**（Activation Object，会先将代码块里的变量名和形参都挂载到AO上，初值也是undefined），并且将函数执行上下文**入栈**，函数执行上下文里面也包括**两个步骤**，第一步也是创建VO，但是它指向的是AO（activation object）而不是GO，第二步是执行代码，执行代码的过程跟GO中的代码执行过程差不多，都是依次给AO中的属 性赋值。

![image-20211230144203192](https://cdn.u1n1.com/img/picgo202204152343926.png)

函数执行完了之后会将函数执行上下文出栈，并且跟AO一起销毁**（因为是VO指向AO，如果函数执行上下文出栈了，VO没了，就没有变量指向AO，那么AO会被回收）**

![image-20211230144300187](https://cdn.u1n1.com/img/picgo202204152343927.png)

如果在函数执行的过程中，调用了某个变量，v8引擎会进行查找，真实的查找路径是沿着作用域链来进行的。**作用域链就是当前VO指向的AO以及函数在编译时保存的parent scope**（父级作用域）（图中写错了，是AO+parentScope），如果在当前作用域中VO找不到变量，就会去父级作用域去查找。在父级作用域中也是如此。

![image-20211230152312410](https://cdn.u1n1.com/img/picgo202204152343928.png)

### 全局代码的执行过程（函数嵌套）

首先进入编译阶段，对全局代码进行编译，产生GO对象，将name（undefined）保存到GO中，同时开辟一个foo的函数存储空间，并挂载到GO对象中。

进入运行阶段，给name赋值，执行到`foo(123)`的时候，会创建一个函数执行上下文（包括AO）并且入栈，这个执行上下文包括两步，**第一步**是将函数中的**变量名**都挂载到AO上并且赋值undefined，检测到有函数声明（`function bar()`）的话也会开辟一个新的**函数存储空间**，并且将这个存储空间的**内存地址挂载到AO上**。**第二步**是依次执行代码，给AO中的属性赋值，如果此时执行了bar函数，又会创建一个**新的函数执行上下文**（含有属于bar函数的AO，也是两个步骤）并且入栈，由于bar函数中没有声明变量，所以AO是空对象，进入第二步执行代码阶段，执行`console.log(name)`的时候，**由于AO中没有，它就依据作用域链去查找，先查找bar函数存储空间中保存的parentScope，如果父级作用域中也没有name属性的话，就会向父级作用域的parentScope中去查找。直到找到全局。**执行完bar函数之后，bar函数的函数执行上下文出栈，随之就是foo函数执行结束，foo函数的执行上下文出栈。 

![image-20211230153259513](https://cdn.u1n1.com/img/picgo202204152343929.png)

### 函数调用函数执行过程（面试题）

首先是全局代码的预编译阶段，创建一个GO，将message挂载到go上（值为undefined），**在检测到`function foo()`时创建了foo的函数存储空间，里面保存了父级作用域（GO）以及自身的代码块**（检测到`function bar()`也是如此），在GO上挂载foo属性，指向foo的函数存储空间。

进入全局代码执行阶段，会在**执行调用栈**里创建GEC（第一步将VO指向GO，第二步依次执行全局代码），执行到`bar()`代码的时候，会创建bar函数的函数执行上下文并且入栈，第一步创建VO指向bar的AO对象，属性为message值为undefined，第二步执行代码块中的代码

**执行到`foo()`的时候会新建foo函数的执行上下文并且入栈**，第一步创建VO指向AO对象，这个AO对象为空，第二步执行代码块的代码

执行到`console.log(message)`时**发现foo执行上下文中保存的AO中没有message属性值**，就去parentScope父级作用域中去找，此时的**父级作用域是在foo函数存储空间在创建时就保存的**，这个父级作用域指向GO，GO中有message，于是输出GO中的Hello Global。

然后foo的执行上下文和bar的执行上下文依次出栈。

![image-20211230160421614](https://cdn.u1n1.com/img/picgo202204152343930.png)

### 注意

函数在**编译阶段**只是创建**函数存储空间（函数对象）**，里面保存了作用域以及代码块，**只有在执行的时候才会创建AO对象**，将内部声明的一些变量挂载到AO上。

### 最新的ECMA规范修改了对VO的描述

![image-20211230163005490](https://cdn.u1n1.com/img/picgo202204152343931.png)

### 作用域补充

![image-20211230165525849](https://cdn.u1n1.com/img/picgo202204152343932.png)

函数内定义变量m本应该是var m = 100，但是没写var，js引擎把它当做特殊语法处理，直接挂载到GO中

### 作用域提升（面试题）

------

![image-20211230163420690](https://cdn.u1n1.com/img/picgo202204152343933.png)

因为foo函数执行上下文中的AO中没有n属性，就会在作用域链上找，找到GO的n并且赋值给200，所以输出200

------

![image-20211230163750675](https://cdn.u1n1.com/img/picgo202204152343934.png)

执行foo的时候会创建AO，AO对象中有n为undefined，执行第一个`console.log`的时候n为undefined，执行到`var n = 200`时给AO中的n赋值为200，第二个`console.log`输出200（因为foo执行上下文中的AO中有n属性，就不会去父级作用域中去找n了）

------

![image-20211230164051393](https://cdn.u1n1.com/img/picgo202204152343935.png)

执行foo2的时候，foo2的函数执行上下文的AO中有n，所以中间的`console.log()`输出的是200，然后执行foo1，foo1的函数执行上下文中的AO里没有n，就去parentScope（GO，**在函数被编译时生成的函数存储空间中保存了parentScope**）中去找，所以另外两个clg输出的是100

------

![image-20211230164359588](https://cdn.u1n1.com/img/picgo202204152343936.png)

 在执行foo的时候，入栈foo的函数执行上下文，并且生成AO，**在编译阶段是不会去管执行代码的，所以return后面的代码声明的变量的变量名依然会被挂载到AO中**。此时ao中有a但是为undefined。第二步是执行代码，输出的是undefined，然后return掉了。

------

![image-20211230164943706](https://cdn.u1n1.com/img/picgo202204152343937.png)

a是not define 报错

b是10

![image-20211230165812906](https://cdn.u1n1.com/img/picgo202204152343938.png)

------

块级作用域中的函数提升

<img src="https://cdn.u1n1.com/img/picgo202204152343939.png" alt="image-20220124211006369" style="zoom:67%;" />

------

![image-20220123175745352](https://cdn.u1n1.com/img/picgo202204152343940.png)

------

![image-20220123175625857](https://cdn.u1n1.com/img/picgo202204152343941.png)

分析第一个例子的执行流程。首先创建GO对象，对全局代码进行预编译，扫描var变量和函数的定义。

发现var foo = 1时，在GO中声明一个属性名为foo的undefined的值

发现function foo(){}时，会在堆内存创建这个函数的函数对象，里面保存了两个部分（父级作用域GO以及代码块）并在GO中创建foo变量指向这个函数对象（此时已经有foo变量了，无需创建）

然后将GEC（全局执行上下文）入栈，执行两个步骤：创建VO指向GO；执行代码块中的代码。

执行第一行的时候，在VO指向的GO中寻找foo的定义，找到的foo是指向函数对象的，输出Function

执行第二行的时候，本质上执行的是`foo = 1`赋值语句，将原来指向函数对象的foo的值改为1

------

参数的作用域

```js
function f1( x=1,y=()=>{x=10;} ){
    y();
    console.log( x );    //1,用默认参数作用域中的x给作用域内部的x赋初值
    var x = 'abc';
}
f1();
function f2( x=1,y=()=>{x=10;} ){
    y();	
    console.log( x );    //10，函数作用域内部没有声明x，往上层作用域(参数作用域查找)
    //var x = 'abc';
}
f2();
```

#  03、 内存

## 内存管理 

![image-20211230170845185](https://cdn.u1n1.com/img/picgo202204152343942.png)

## gc

![image-20211230170947434](https://cdn.u1n1.com/img/picgo202204152343943.png)

- gc算法1：引用计数

当引用类型的对象，被引用的次数为0的时候，GC就会自动回收掉该对象，释放对应的堆空间

![image-20211230171133747](https://cdn.u1n1.com/img/picgo202204152343944.png)

存在问题，就是内存泄漏

![image-20211230171330034](https://cdn.u1n1.com/img/picgo202204152343945.png)

- gc算法2：标记清除

![image-20211230171543390](https://cdn.u1n1.com/img/picgo202204152343946.png)





# 04、闭包

## 高阶函数

函数是一等公民，可以作为另外一个函数的参数，也可以作为另外一个函数的返回值来使用。

如果一个函数**接收**另外一个函数作为参数，或者该函数会**返回**另外一个函数作为返回值，那么这个函数就成为是一个**高阶函数**

> 下面的高阶函数都可以传入第二个参数，来修改this的绑定

### map映射

![image-20211231213836510](https://cdn.u1n1.com/img/picgo202204152343947.png)

```js
//map接收一个函数作为参数
//这个函数在map内部也会被调用共数组长度次，返回值作为新数组中对应index的内容
//下面实现的是，给数组中所有元素*10并存入新数组
var nums = [1,2,3,45,6,7,,3,234,1]
var newNums2 = nums.map(function(item){
	return item*10
})
```

### filter过滤

```js
//filter接收一个函数
//这个函数有三个参数item,index,arr（可以只传item）,返回值是boolean值，
//在filter内部会自动调用函数共数组长度次，如果调用函数之后返回值为true，则将当前item加入新数组中，否则就不加
//如此过滤，下面的结果是返回偶数
var nums = [1,2,3,45,6,7,,3,234,1]
var newNums = nums.filter(function(item,index,arr){
    return item % 2 === 0
})

```

### reduce（累加）

![image-20211231215425429](https://cdn.u1n1.com/img/picgo202204152343948.png)

```js
//reduce有两个参数，第一个是回调函数，这个callback函数有四个参数，第一个是上一次执行return的值，第二个是当前遍历到的item的值，第三个是index，第四个是arr
//第二个是initialValue，初始化值，也就是第一次执行回调时的第一个参数中对应的上一次执行return的值。
//每次调用回调函数的返回值会作为下一次回调的第一个参数，整个reduce的返回值是累加的结果
```

```js
nums.filter((pre,item)=>pre+item,0)
```

### find`/`findIndex（查找）

```js
//find传入一个函数，如果这个函数的返回值为true，那么find就返回当前遍历到的item
//findIndex返回的是item对应的index
var nums = [
    { id: "1", name: "jzsp1" }, 
    { id: "1", name: "jzsp1" }
]
var item = nums.find(function (item) {
    return item.id === '1'
})
console.log(item)
```

![image-20211231214959361](https://cdn.u1n1.com/img/picgo202204152343949.png)

### forEach（遍历）

forEach是不能跟定时器一起使用的，内部是执行了while循环

```js
var nums = ['1','2']
nums.forEach(function(item,index,arr){
    console.log(item,index,arr)
    //不会改变原数组的值
    item = 10
})
```

![image-20211231214607298](https://cdn.u1n1.com/img/picgo202204152343950.png)

## 闭包的定义

- 计算机科学领域的闭包解释

> 头等函数就是指，函数是一等公民，词法绑定的话，可以在解析函数，创建函数对象时保存父级作用域以及代码块
> 结构体是指，闭包（严格意义上的闭包）存储的是两个部分：函数和自由变量
> 最后一句是**重点**

![image-20211231220821635](https://cdn.u1n1.com/img/picgo202204152343951.png)

- js中闭包的解释

> 第一句说明，闭包是函数和自由变量

这种函数也是闭包，自由变量是全局中的name

![image-20220101131244966](https://cdn.u1n1.com/img/picgo202204152343952.png)

![image-20211231220904747](https://cdn.u1n1.com/img/picgo202204152343953.png)

- 总结

广义的是**可以访问**，狭义的是**访问了**

![image-20211231235524465](https://cdn.u1n1.com/img/picgo202204152343954.png)

### 高阶函数在内存中的执行过程

![image-20211231232714480](https://cdn.u1n1.com/img/picgo202204152343955.png)

首先是编译阶段，创建`GlobalObject`对象，扫描全局代码，扫描到`function foo()`代码，会在堆内存中创建函数存储空间（函数对象，里面保存了父级作用域以及代码块），并且挂载这个地址给GO对象，扫描到`var fn = foo()`时并不会执行`foo()`，但是会在GO中挂载值为undefined的`fn`属性。

![image-20211231233019414](https://cdn.u1n1.com/img/picgo202204152343956.png)

执行阶段，第一步将GEC中的VO指向GO，第二部执行全局代码。执行到`var fn = foo()`时，会执行`foo()`，此时会将foo的函数执行上下文入栈，同时经过两步（**第一步**创建AO并且VO指向AO，AO创建的时候扫描代码块中的代码，扫描到`function bar()`，就会创建bar的函数存储空间，扫描结束，**第二步**执行代码，也就是执行return bar），执行完两步之后将foo函数的执行上下文出栈，然后将bar的函数存储空间的地址赋值给fn，此时`var fn = foo()`代码结束

​	![image-20211231233601969](https://cdn.u1n1.com/img/picgo202204152343957.png)

下面执行`fn()`，因为是函数执行，所以也要创建函数执行上下文并且入栈，以及创建属于fn的AO对象等等，执行完代码块的代码之后也将函数执行上下文出战

![image-20211231233722552](https://cdn.u1n1.com/img/picgo202204152343958.png)

### 闭包到底是什么

**闭包是两部分组成的**：函数+可以访问的自由变量

![image-20211231234403417](https://cdn.u1n1.com/img/picgo202204152343959.png)

在foo函数执行完之后，本来里面的内容应该销毁的（执行完函数，foo的函数执行上下文本应该出栈，并且AO应该被销毁），但是在执行fn的时候又能访问到name。

这是因为**bar这个函数以及bar函数内部可以访问到的自由变量**（name）组成了闭包，使得foo的AO没有销毁。

本质上是GO中的fn指向bar函数对象（因为return了bar将bar的函数对象地址赋值给了fn），所以bar函数对象不会销毁。**bar函数对象的parentScope中指向了foo中的AO ，所以foo的AO不会销毁。**

![image-20220101134032604](https://cdn.u1n1.com/img/picgo202204152343960.png)

![image-20220101134245272](https://cdn.u1n1.com/img/picgo202204152343961.png)

### 闭包的内存泄漏

![image-20220101134702729](https://cdn.u1n1.com/img/picgo202204152343962.png)

这种情况下，bar函数只被调用一次，但是bar的函数对象一直在堆内存中保存（因为全局中有一个fn一直指向着bar函数对象），进而导致bar的parentScope（也就是AO）也一**直在堆内存中保存**（因为bar的parentScope指向foo函数的AO），导致了内存泄漏（本应被回收的却没被回收）。

只需要将fn置为null即可解决内存泄漏问题，此时虽然在GO中仍然存有foo的函数对象的引用，但是fn指向了null而非指向bar函数对象，**虽然此时bar函数对象和foo的AO对象形成了循环引用**，但是根据gc垃圾回收的新算法，即便他们之间有循环引用，**但是从根开始访问不到**他们俩，那么他们俩就会被回收

![image-20220101135255206](https://cdn.u1n1.com/img/picgo202204152343963.png)

![image-20220101135305443](https://cdn.u1n1.com/img/picgo202204152343964.png)

#### 极端的案例

```js
function createFnArray(){
    //创建1024*1024长度的数组，并且填充内容
    //整数是4个字节，字符是8个字节，
    //这个数组占了1024*1024*4字节 = 4MB
    var arr = new Array(1024*1024).fill(1)
    return function(){
        console.log(arr.length)
    }
}

var arrayFns = []
for(var i = 0 ; i < 100 ; i++){
    //在push之前，会执行一次createFnArray函数
    //执行函数的前会先将该函数的执行上下文入栈，创建该函数的AO，
    //扫描到第五行的时候AO里面是arr:undefined
    //扫描到return function()时，在堆内存中创建了匿名函数的对象（里面有父级作用域AO以及代码块），并且挂载地址到AO中
    //第二步是执行代码，先是给arr赋值了长度为4兆的数组，然后返回AO中函数的地址
    //此时，createFnArray的函数执行上下文出栈
    //并且将返回的AO中的函数地址存入arrayFns中，此时即使createFnArray的上下文出栈了，但是在GO中有arrayFns保存了一个函数的地址
    //这个函数地址指向了堆中对应的匿名函数，而这个匿名函数中也有父级作用域（也就是原来createFnArray函数的AO）
    //所以即使createFnArray出栈了，但是AO仍然不会销毁，会停留在堆内存中
    arrayFns.push(createFnArray())
}
setTimeout(()=>{
    arrayFns = null
},2000)

```

![image-20220101173039197](https://cdn.u1n1.com/img/picgo202204152343966.png)

![image-20220101174001594](https://cdn.u1n1.com/img/picgo202204152343967.png)

设置定时器后

![image-20220101183409069](https://cdn.u1n1.com/img/picgo202204152343968.png)

点击![image-20220101183340768](https://cdn.u1n1.com/img/picgo202204152343969.png)并且手动刷新页面，可以看到一段时间之后内存被GC销毁了

![image-20220101174359090](https://cdn.u1n1.com/img/picgo202204152343970.png)

其实就是，执行了一百次的push操作，push的是`createFnArray()`返回的**函数地址**，而在调用createFnArray的时候解析到有`function()`会创建对应的函数对象，在这个函数对象中保存了**父级作用域**（也就是createFnArray函数的AO）。这些函数地址一直保存在数组中，所以从**根开始可以访问到每次执行函数创建的AO**，所以那些AO会留在堆内存中，导致内存泄漏。

> 注意，函数的AO只有在执行函数的时候才会创建

![image-20220101190645445](https://cdn.u1n1.com/img/picgo202204152343971.png)

### 闭包引用的自由变量的销毁

> AO中**没有被用到的属性**会被v8引擎回收，下面是验证（图中的Closure foo是指bar和外面的自由变量组成的闭包访问的是foo中的自由变量）

```js
function foo(){
    var name = "wjj"
    var age = 123
    function bar(){
        //写debugger的话，网页中运行代码到这行debugger的时候，会停下来，并且可以查看内存等情况
        debugger
        console.log(name)
    }
    return bar
}
var fn = foo()
fn()
```

![image-20220101194300668](https://cdn.u1n1.com/img/picgo202204152343972.png)

![image-20220101194320943](https://cdn.u1n1.com/img/picgo202204152343973.png)

# 05、this

注意，this指向的是**对象**

## this在全局作用域中的指向

- 浏览器环境下：window（GlobalObject）

- Node环境：{}，因为 

![image-20220101195954363](https://cdn.u1n1.com/img/picgo202204152343974.png)

> 在node中，声明的变量不会挂载到全局的this上

![image-20220109185002319](https://cdn.u1n1.com/img/picgo202204152343975.png)

## this在函数中的指向

![image-20220101200324928](https://cdn.u1n1.com/img/picgo202204152343976.png)

![image-20220101200409620](https://cdn.u1n1.com/img/picgo202204152343977.png)

## this的绑定规则

### 默认绑定

**独立的**函数调用，我们可以理解成函数没有绑定到**某个对象**上进行调用

> 注意区别  `a.foo1()`和 `let b = a.foo1 ; b()`

```js
//案例1
function foo1(){
    console.log(this)     
}
function foo2(){
    console.log(this)
    foo1()
}
function foo3(){
    console.log(this)
    foo2()
}
foo3()   //输出三次window

//案例2
var obj = {
    name:"wjj",
    foo:function(){
        console.log(this)
    }
}
//这里只是将obj中的foo属性值赋值给fn
//这个属性值保存的是function的指向
//fn是独立的函数调用，没有依赖于其他的任何对象
var fn = obj.foo
fn()   //输出window



function foo(){
    function bar(){
        console.log(this)
    }
    return bar
}
var fn = foo()
fn()    //输出window
```

注意

```js
var name = "222";
var a = {
	name: "111",
	say: function () {
		console.log(this.name);
	}
}
var fun = a.say;
fun();		
a.say();	
 
var b = {
	name : "333",
	say: function (func){
		func();
	}
}

b.say(a.say);	 //这个也是默认绑定哦，因为输出的this是say内部的func，而这个func没有使用任何绑定规则

b.say = a.say;	
b.say();
```

### 隐式绑定

![image-20220101203823889](https://cdn.u1n1.com/img/picgo202204152343978.png)

`object.fn()`     object对象会被作为函数中的this

> 前提是**fn属性保存的必须是函数的引用**

```js
//案例1
function foo(){
    console.log(this)
}
var obj = {
    name:'wjj'
    foo:foo
}

obj.foo()    //输出obj

//案例2
var obj1 = {
    name:"obj1",
    foo:function(){
        console.log(this)
    }
}
var obj2 = {
    name:"obj2",
 	//在bar属性中保存的是function的指向，所以输出的是obj2
    bar:obj1.foo
}
//通过obj2运行function
obj2.bar()

```

### 显示绑定

通过call，apply，bind来调用函数

![image-20220101210100851](https://cdn.u1n1.com/img/picgo202204152343985.png)

- call和apply

```js
function foo(){
    console.log(this)
}
foo.call()
foo.apply()
//call和apply有什么区别？主要是传参的区别，
//apply第二个参数是一个数组，里面保存了要传入function的参数
//call要传入的参数放在第二个参数及以后
function sum(num1,num2,num3){
    console.log(num1+num2+num3,this.name)
}
sum.call({name:"wjj1"},1,2,3)         //this指向的是对象{name:"wjj1"}
sum.apply({name:"wjj2"},[1,2,3])    //this指向的是对象{name:"wjj2"}

```

![image-20220101211136666](https://cdn.u1n1.com/img/picgo202204152343986.png)

- bind

![image-20220102195639858](https://cdn.u1n1.com/img/picgo202204152343987.png)

```js
function foo(){
    console.log(this)
}
//bind函数会生成一个新的函数对象，
//这里默认绑定和显示绑定发生冲突，高优先级（显示绑定）
//并且bind函数不会影响原函数
var newFoo = foo.bind("aaa")
newFoo()
```

### new绑定

![image-20220101211626210](https://cdn.u1n1.com/img/picgo202204152343988.png)

构造函数，**通过new执行方法**，每次会创建一个新的对象，返回的是this的指向（也就是创建的对象的引用）

![image-20220101211752136](https://cdn.u1n1.com/img/picgo202204152343989.png)

注意，变量和对象的属性的区别

![image-20220109181312970](https://cdn.u1n1.com/img/picgo202204152343990.png)

### 特殊规则

#### 忽略显示绑定

```js
function foo(){
	console.log(this)
}
foo.call(null)		//输出window
foo.call(undefined)    //输出window
```

#### 间接函数引用

> 注意，`(obj1.foo)()`跟`obj1.foo()`是一样的，而`(obj2.bar = obj1.foo)()`这个赋值语句的返回值是obj1.foo，**本质上是取出了obj1.foo的地址，独立函数调用**

```js
var obj1 = {
    name:"obj1",
    foo:function(){
        console.log(this)
    }
}
var obj2 = {
    name:"obj2"
};//注意一定要写这个;号，不然无法解析，会报错，解析器会以为代码还没结束，吧{}()当成一个整体了

//将obj1.foo赋值给obj2.bar，这是个赋值表达式
//赋值表达式的话会取出obj1.foo并且返回
//返回的是function的内存地址，在这里进行调用
//这里其实就是独立函数调用了，输出的是window
(obj2.bar = obj1.foo)()


//区分的点。下面的代码跟执行obj1.foo是一个效果的
(obj1.foo)()
```

关于()的话，我个人的理解是，里面可以放一句js代码，返回这个js代码的结果

![image-20220101231241299](https://cdn.u1n1.com/img/picgo202204152343991.png)

关于分号，下图中的obj定义的末尾也要写分号，不然会报错，他会把`{id:'awesome'}[1,2,3]`当做一个整体，这个整体不是数组，自然会报错

![image-20220101231520233](https://cdn.u1n1.com/img/picgo202204152343992.png)

### 箭头函数的this获取

> 箭头函数中的this不适用上面介绍的四种绑定规则。

应用场景

![image-20220101235140409](https://cdn.u1n1.com/img/picgo202204152343993.png)

![image-20220101235235497](https://cdn.u1n1.com/img/picgo202204152343994.png)

总而言之，箭头函数中的this绑定的是**定义时**所在的作用域。

> 注意，如果箭头函数是在普通function中定义的，那么箭头函数的this会指向这个function，当function的this因为四种绑定规则而改变时，箭头函数的this也会跟着改变。
>

- 当箭头函数是声明为**字面量对象的方法**时，因为**对象是没有独立的作用域的**，所以会向上找this的定义。
- 如果箭头函数是在**构造方法里面声明成对象的方法**，因为函数是有作用域的，所以这个对象的方法的箭头函数中的this指向的是构造方法中的this



## this绑定规则细节

### 一些内置函数的this分析△△△△△

------

`setTimeout`在函数实现的地方是通过独立调用函数来执行函数的，所以传入的`function`中输出的this指向window

![image-20220101220345463](https://cdn.u1n1.com/img/picgo202204152343995.png)

![image-20220101220335772](https://cdn.u1n1.com/img/picgo202204152343996.png)

------

监听事件

![image-20220101220535878](https://cdn.u1n1.com/img/picgo202204152343997.png)

输出的this是dom元素

![image-20220101220615873](https://cdn.u1n1.com/img/picgo202204152343998.png)

内部是通过`boxDiv.onclick`隐式调用来绑定的（可能）

------

数组的`forEach/map/filter/find`

这个**thisArg**的参数要表达的是，**第二个参数可以传入以修改this的指向**

![image-20220101221104762](https://cdn.u1n1.com/img/picgo202204152343999.png)

```js
var names = [1,2,3]
//forEach的第二个参数是传入this的绑定对象
//如果不传入第二个参数，会默认this绑定window
names.forEach(function(){
	console.log(this)   //window
})
```

### this绑定规则的优先级

总结：默认 < 隐式 < 显示 < new

#### 1、默认绑定优先级最低

#### 2、显示绑定高于隐式绑定

```js
function foo(){
    console.log(this)
}

var newFoo = foo.bind("123")

let obj = {
    name:'wjj',
    foo:foo,
    newFoo
}

//隐式绑定
obj.foo()       //Object{name:'wjj',foo:foo()}

//显示绑定
foo.call("abc")   //String("abc")

//显示绑定＋隐式绑定 （call/apply)
obj.foo.call("abcd")   //String("abcd")  
 
//显示绑定＋隐式绑定 （bind）
obj.newFoo()    //String("123")


```

> 注意，bind的优先级高于call和apply

#### 3、new绑定优先于隐式绑定

![image-20220101222634641](https://cdn.u1n1.com/img/picgo202204152343000.png)

#### 4、new绑定优先于显示绑定

new关键字不能和  apply / call一起来使用

![image-20220101222858415](https://cdn.u1n1.com/img/picgo202204152343001.png)

![image-20220101223118003](https://cdn.u1n1.com/img/picgo202204152343002.png)

## 面试题

```js
var name = "222";
var a = {
	name: "111",
	say: function () {
		console.log(this.name);
	}
}
var fun = a.say;
fun();		//222
a.say();	//111
 
var b = {
	name : "333",
	say: function (func){
		func();
	}
}

 
b.say(a.say);	//222
b.say = a.say;	
b.say();		//333
```

上面倒数第二个输出222是因为，**在say内部调用的函数没有使用任何绑定规则**，使用默认绑定

```js
var name = "window"
var person = {
    name:"person",
    sayName:function(){
        console.log(this.name)
    }
}

function sayName(){
    //默认绑定，将function的地址赋值给sss，然后独立调用
    var sss = person.sayName
    sss();    //window

    //隐式绑定
    person.sayName();     //person

    //相当于是person.sayName(),隐式调用
    (person.sayName)();    //person

    //获取person.sayName的地址，独立调用
    (b=person.sayName)();  //window
}
sayName()
```



关于闭包和this，在网上有这种说法：

1：在闭包函数中，**不使用this**对变量进行访问时，函数会通过文法环境中的外部引用，一级一级地向上找（**作用域链**），直到找到（或者最终找不到）对应的变量。这个作用域链是在**函数定义的时候就决定**了的

2：在函数闭包中，**使用this**对变量进行访问时，和大多数语言不同，JavaScript的this保存的是**调用环境的上下文**。也就是说this中的内容是在**调用的时候决定**的，所以访问到的是当前环境下的对应的变量，并不会像前一种情况一样进行逐级查找。

```js
var name = "window"
var person1 = {
    name:"person1",
    foo1:function(){
        console.log(this.name)
    },
    foo2:()=>console.log(this.name),
    foo3:function(){
        return function(){
            console.log(this.name)
        }
    },
    foo4:function(){
        return ()=>{
            console.log(this.name)
        }
    },
    foo5:{
        foo6:()=>{
            console.log(this.name)
        }
    }
}

var person2 = {name:'person2'}

person1.foo1()    //person1，隐式调用
person1.foo1.call(person2)   //person2，隐式调用和显示调用结合

person1.foo2()   //window，对象是没有作用域的，所以箭头函数处在的作用域是window
person1.foo2.call(person2)   //箭头函数不适用绑定规则，且对象是没有作用域的，所以箭头函数处在的作用域是window


person1.foo3()()  //调用函数，获取函数的引用，然后独立调用，输出window
person1.foo3.call(person2)()   //window，独立函数调用
person1.foo3().call(person2)   //person2，显示绑定

person1.foo4()()    //person1,因为箭头函数的上层this是person1隐式绑定调用的function的this
person1.foo4.call(person2)()   //person2，因为箭头函数的上层this是person2显示绑定调用的function中的this 
person1.foo4().call(person2)    //person1，因为箭头函数的上层this是person1隐式调用的function，用call来绑定是不会改变this的指向的


person1.foo5.foo6()    //windwo,对象是没有作用域的，所以foo6定义的箭头函数的this指向的是window
```



我个人的总结，**对象`{}`是没有作用域的**，在这个`{}`对象中声明箭头函数作为方法，会向这个对象外去找作用域的定义，而通过**构造方法创建的对象**，在这个对象中声明箭头函数，**因为构造方法（函数）是有作用域的**，那么在这个对象中声明的箭头函数**作为方法**，那么这个箭头函数的this指向的就是构造方法中的`this`

```js

function person(name){
    this.name = name
    this.foo1 = function(){
        console.log(this.name)
    },
    this.foo2 = ()=>console.log(this.name),
    this.foo3 = function (){
        return function(){
            console.log(this.name)
        }
    },
    this.foo4 = function(){
        return ()=>{
            console.log(this.name)
        }
    }
    this.me = {
        name:"wjj",
        do:()=>{
            console.log(this.name)
        }
    }
}
var person1 = new person('person1')
var person2 = new person('person2')


person1.foo1()                 //person1
person1.foo1.call(person2)     //person2

person1.foo2()                 //person1，因为函数是有作用域的，箭头函数定义的地方向外找，发现有一层function围住了，所以箭头函数的this取决于这个function的this
person1.foo2.call(person2)     //person1，call对箭头函数的this不起作用

person1.foo3()()               //window,独立函数调用
person1.foo3.call(person2)()   //window，独立函数调用
person1.foo3().call(person2)   //person2

person1.foo4()()               //person1，person1.foo4调用的话，function指向的是person1，那么function中的箭头函数的this指向的就是这个function中的this
person1.foo4.call(person2)()   //person2，通过person1.foo4.call(person2)调用function，那么这个function中的this指向的是person2，那么箭头函数指向的就是这个functino中的this
person1.foo4().call(person2)   //person1，foo4使得function中的this绑定的是person1，那么箭头函数的this也是person1

person1.me.do()                //person1，因为对象字面量是没有作用域的，所以this处于的作用域是构造方法的作用域，指向构造方法的this
```

箭头函数总结

```js
//对于下面这种代码形式，箭头函数是写在function函数中的，那么此时，箭头函数的this取决于这个function函数的this指向
foo2:function(){
    return ()=>{
        console.log(this.name)
    }
}
//对于下面这种代码形式，箭头函数是作为对象字面量的方法的，对象字面量没有作用域，那么箭头函数中的this就会向这个对象a外面去找，直到找到window或者有this 的定义为止
var a = {
    b : ()=>{
		console.log(this)
    }
}
//对于下面这种代码形式，箭头函数是构造方法中声明的，作为对象的方法，由于这个箭头函数外部有一层function包裹（function是有作用域的），所以这里的箭头函数的this指向的是构造方法创建出来的对象
function Person(){
    this.say = ()=>{console.log(this)}
}
```

```js
var name = 'window'
function Person(name){
    this.name = name
    this.obj = {
        name:"obj",
        foo1:function(){
            return function(){
                console.log(this.name)
            }
        },
        foo2:function(){
            return ()=>{
                console.log(this.name)
            }
        }
    }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()                //window，独立函数调用
person1.obj.foo1.call(person2)()    //window,独立函数调用
person1.obj.foo1().call(person2)   //person2，显示绑定

person1.obj.foo2()()                //obj，通过person.obj.foo2()调用的function，function内部的this指向obj，因为这里的箭头函数所处的作用域取决于foo2这个函数，所以this指向也是obj
person1.obj.foo2.call(person2)()    //person2，通过person1.obj.foo2.call(person2)调用的function，funciton内部指向的是person2，所以function内部所处的作用域指的this指向的是person2
person1.obj.foo2().call(person2)   //obj，通过person.obj.foo2()调用的function，function内部的this指向obj，所以this指向也是obj，call无法改变箭头函数的this
```

总结：**如果是判断箭头函数的this的话，需要先向外找作用域（看看有没有被某个function包裹，没有就是全局）**

```js
const foo = function(fn){
  fn()   //独立调用，输出window
}
new foo(function(){
  console.log(this)   
})

new foo(()=>{
  console.log(this)   
})

```



# 06、call、apply和bind的实现

下面的实现都还有一些问题，例如传入参数显示绑定的时候，我们是将fn（也就是后面要执行的函数对象）挂载到传入**参数的fn属性**上的，假如传入的参数是一个对象，里面有fn属性，那就会造成影响（这个时候就要用es6的**symbol**来解决）



下面的fn是用于获取调用方法的**函数对象**，thisArg用于**隐式绑定**this

## call实现

```js
//给所有的函数添加一个wjjCall方法，第二个参数为“剩余参数”
Function.prototype.wjjCall = function(thisArg,...args){
    //2、对类thisArg转换成对象类型（防止它传入的是非对象的值）
    //另外还要考虑传入的是null和undefined的情况，这个情况的this指向window 
    //不能像下面直接这样，不然传入0或者是空字符串的话就会绑定window
    //thisArg = thisArg ? Object(thisArg) : window
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    //1、获取函数对象，因为是通过function.wjjCall来调用的方法，有隐式绑定，可以通过this获取到调用时的function对象
    var fn = this

    //系统的call方法可以传入参数作为函数的this
    //这里给传入的参数添加一个fn属性，值为fn，相当于隐式绑定
    thisArg.fn = fn


    //通过thisArg.fn()调用函数，隐式绑定，fn中的this指向的就是thisArg了
    //但是有一个缺点就是，输出的this中会有fn属性 
    //传参的话用展开运算符来传参
    //3、调用需要被执行的函数
    var res = thisArg.fn(...args)

    delete thisArg.fn
    //4、返回结果
    return res
}

function foo(arr){
    console.log("foo函数被执行",this,arr)
}

//系统的call方法
// foo.call("jzsp")
foo.wjjCall({},123)
```

## apply实现

```js
Function.prototype.wjjApply = function(thisArg,arr){
    //获取函数对象
    var fn = this

    //修改thisArg防止传入的是非对象的值,如果是null或者是undefined，就指向window
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
    thisArg.fn = fn

    //处理无参调用，因为接收的时候没有用剩余参数运算符，没传入参数的话会是undefined（否则是空数组）
    arr = arr || []
    var res = thisArg.fn(...arr)
    delete thisArg.fn

    return res
}

function foo (){
    console.log(this)
}

//系统的apply方法中传入一个参数的话也必须要放到一个数组中，否则会报错，所以我们这里不需要处理
// foo.wjjApply("wjj",1)

//系统的apply方法可以不传入参数，就是无参调用
foo.wjjApply(0)
foo.apply(0)
```

## bind实现

```js
//这里的argArray接收的是bind传入的参数，充当返回的函数的默认参数用
Function.prototype.wjjBind = function(thisArg,...argArray){
    //1、获取到真实需要调用的函数
    var fn = this
    
    //2、绑定this
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg):window
    //这里的arr接收的是调用函数的时候传的参数
    return function(...arr){
        //3、隐式绑定this
        thisArg.fn = fn
        //这里需要将两处传入的参数进行拼接，并且bind的参数在前，调用function传入的参数在后
        var res = thisArg.fn(...argArray,...arr)
        delete thisArg.fn
        return res
    }
}

function foo (num1,num2,num3,num4){
    console.log(this,num1,num2,num3,num4)
    return 20
}
var bar = foo.wjjBind("abc",10,20)
var bar2 = foo.bind("abc",10,20)

console.log(bar(30,40))
console.log(bar2(30,40))
```

## arguments

arguments对象的属性描述如下

![image-20220118203130155](https://cdn.u1n1.com/img/picgo202204152343003.png)

![image-20220102203807083](https://cdn.u1n1.com/img/picgo202204152343004.png)

### 将arguments转成数组

#### 第一种方法(prototype)

```js
function f(){
    //因为arguments不是数组类型，所以不能调用slice方法（slice方法可以将选中的内容封装到数组中）
    //获取到slice方法之后，通过call方法显示绑定this给原型
    var newArr = Array.prototype.slice.call(arguments)
    //也可以这么写
    //[].slice.call(arguments)
    console.log(newArr)
}

f(1,2,3,4,5,123,12,12,5,)
```

slice内部**大致**是像下面一样实现的(但是下面没有判断传入的第二个参数为负数的情况)

![image-20220102205019754](https://cdn.u1n1.com/img/picgo202204152343005.png)

#### 第二种方法(Array.from)

![image-20220102211457399](https://cdn.u1n1.com/img/picgo202204152343006.png)

#### 第三种方法(...)

```js
var newArr = [...arguments]
```

### 箭头函数没有arguments

因为箭头函数中没有arguments，那么会向上层作用域中去找。有两种情况

- **node中的全局**是有arguments的，因为**模块**本质上是把他放到了函数中运行
- **浏览器全局**是没有arguments的

没有arguments的话，要怎么在箭头函数中获取多余的参数呢？答案是用es6的剩余参数运算符来接收其他的参数

```js
var foo = (num1,...nums)=>{
    console.log(nums)     //[2,3]
}
foo(1,2,3)
```

# 07、JS函数式编程（编程范式）

## 纯函数（Pure function）

![image-20220102223028684](https://cdn.u1n1.com/img/picgo202204152343007.png)

![image-20220115101454510](https://cdn.u1n1.com/img/picgo202204152343008.png)

**严格意义上来说**，`console.log`是不允许出现在纯函数中的，因为进行了输出设备**输出**，但是它可以在测试的时候用。。

副作用

![image-20220115101549926](https://cdn.u1n1.com/img/picgo202204152343009.png)

### 数组的两个函数对比

```js
var names = [1,2,3,4,5]
//slice是一个纯函数，对于同一个数组来说，传入同样的值，返回的值也是确定的
//slice不会修改原数组
var newname = names.slice(0,3)


//splice会修改掉调用该函数的数组，修改这个操作就是副作用
//那么这个splice就不是一个纯函数了
var name2 = names.splice(2)
```

#### 练习，判断是否是纯函数

```js
function test (info){
    return {
        ...info,
        age:100
    }
}
var obj = {}
test(obj)   //是纯函数，相同输入会有相同输出，并且没有修改原来的值
```

```js
function test (info){
	info.age = 100
}
var obj = {}
test(obj)   //不是纯函数，修改了原来的值，产生了副作用
```

## 柯里化

![image-20220115110922342](https://cdn.u1n1.com/img/picgo202204152343010.png)

![image-20220115111454707](https://cdn.u1n1.com/img/picgo202204152343011.png)

例子

```js
function add(n1,n2,n3,n4){
	return n1+n2+n3+n4
}

function a(n1){
	return function(n2){
		return function(n3){
			return function(n4){
				return n1+n2+n3+n4   //有闭包，可以找到外面的变量
			}
		}
	}
}
//用箭头函数简化柯里化
var a1 = n1 => n2 => n3 => n4 => n1+n2+n3+n4 
console.log(a(1)(2)(3)(4))   //10
```

### 单一职责原则

```js
//假如现在要实现的是 (n1+1) + (n2 * 2) + (n3 ** 3)
function a (n1,n2,n3){
    return n1+1+n2*2+n3*n3*n3
}
var b = n1 =>{
    n1 = n1 + 1
    return n2 =>{
    	n2 = n2*2
        return n3 =>{
            n3 = n3*n3*n3
            return n1 + n2 + n3
        }
    }
}
console.log(b(1)(2)(3))
console.log(a(1,2,3))
```

### 逻辑的复用

样例1

```js
//假如在程序中，我们经常需要把5和另外一个数字进行相加
var sum = function(n1){
    return function(n2){
     	return n1+n2   
    }
}

var count5 = sum(5)
var res1 = count5(1)
var res2 = count5(2)
var res3 = count5(3)
console.log(res1,res2,res3)  //6,7,8
```

样例2

```js
//打印日志的函数
function log(date,type,message){
	console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}]:[${message}]`)
}

log(new Date(),"DEBUG","查找轮播图的bug1")  //[11:37] [DEBUG]:[查找轮播图的bug1]

function log2(date){
	return function(type){
		return function(message){
			console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}]:[${message}]`)
		}
	}
}
//可以用柯里化复用函数的功能来"定制"函数
var debug = log2(new Date())('DEBUG')
var warn = log2(new Date())('WARN')
debug('这个是debug')   //这样就不需要每次都传入date和type了

warn('这个是warn')
```

### 柯里化函数的实现☆☆☆☆

主要是理解递归的调用以及参数拼接

```js
//传入一个函数，返回这个函数的柯里化结果
function wjjCurrying(fn){
	return function curried(...args){
		//如果参数个数大于fn的参数，那么就直接执行，并且返回执行结果
		if(args.length >= fn.length){
             //用apply调用函数的话防止this的指向改变了 
			return fn.apply(this,args)
		//否则就返回一个可以继续接收参数的函数
		}else{
			//这个返回的函数内部要返回的内容也是要进行相同操作的，所以直接调用curried
			//这里传入的第二个参数是将前面接收的所有参数和当前接收的参数拼接起来
			//所以在外面判断长度的话就是判断的总共传入多少个参数和总参数比较
			return function(...args2){
				return curried.apply(this,[...args,...args2])
			}
		}
	}
}

function sum(a,b,c){
	return a+b+c
}
console.log(wjjCurrying(sum)(1)(2)(3))
```

## 组合函数

![image-20220115124026373](https://cdn.u1n1.com/img/picgo202204152343012.png)

例子

![image-20220115124327236](https://cdn.u1n1.com/img/picgo202204152343013.png)

组合后的函数（这个返回的函数执行的功能跟上面的一样，先乘2再平方，也就是先执行里面的m函数再执行后面的n函数）

![image-20220115124342964](https://cdn.u1n1.com/img/picgo202204152343014.png)

### 组合函数的实现

```js
function compo(...fnc) {
	//传入了几个函数对象
	var length = fnc.length
	//判断是否全部传入的是function对象
	for(var i = 0 ; i < length ; i++){
		if(typeof fnc[i] !== 'function'){
			throw new TypeError("要求传入的都是函数类型")
		}
	}
	return function (...args) {
		var index = 0
		//如果length不是0的话，就先保存fnc中第一个函数的执行结果res
		var res = length ? fnc[index].apply(this,args):args
		while(++index < length){
            //在这里将上一个函数的调用结果作为参数进行调用
			res = fnc[index].call(this,res)
		}
		return res
	}
}

function dou(count){
	return count*2
}
function sqr(count){
	return count**2
}

let count = 10
console.log(sqr(dou(count)))
//生成一个新的函数，依次从前往后执行dou和sqr
var a = compo(dou,sqr)
console.log(a(10))

//如果没有传入函数对象构成组合函数的话，就返回传入的arg
var b = compo()
console.log(b(1,2,3,4,5))   //[1,2,3,4,5]
```

# 08、with-eval-strict

## with语句（不推荐使用）

with语句也是会有自己的作用域的，使用with的时候，跟if一样需要在小括号里传入一些东西，with传入的是一个对象，里面封装了各种键值对。那么在with语句块里查找变量的话，**会先在对象中查找，然后再一层一层往上层作用域查找**

```js
var message = "GO message"
var obj = {
    message:"obj message"
}
function foo (){
    with(obj){
        console.log(message)
    }
}
```

可以这样理解，当我们传递o1给with时，with所声明的作用域是o1，而这个作用域中包含有一个同o1.a属性相符的标识符。但当我们将o2作为作用域时，其中并没有a标识符，**因此进行了正常的LHS查找**，一直查找到全局都没找到，所以在全局中创建了a属性并且赋值。

```js
function foo ( obj){
    with(obj){
        debugger
        a = 2
    }
}
var o1 = {
    a:3
}

var o2 = {
    b:3
}
foo(o1)
console.log(o1.a)

foo(o2)   //因为o2中没有a的定义,，所以在执行with中的代码 a = 2的时候，并不会创建这个属性，保持o2.a = undefined，而在全局对象中创建出了a属性并且赋值为2
console.log(o2.a)
console.log(a)
```

## eval函数

是一个特殊的函数，可以将传入的字符串当做js代码执行

```js
var jsString = 'var message = "hello";console.log(message)'
eval(jsString)
```

![image-20220115165601566](https://cdn.u1n1.com/img/picgo202204152343015.png)

## strict mode

![image-20220115165741888](https://cdn.u1n1.com/img/picgo202204152343016.png)

### js文件开启严格模式

![image-20220115170734685](https://cdn.u1n1.com/img/picgo202204152343017.png)

![image-20220115170744012](https://cdn.u1n1.com/img/picgo202204152343019.png)

但是真正在项目打包的时候是不需要我们手动给js文件中开启严格模式的，因为它**打包**会自动开启严格模式

![image-20220115170935738](https://cdn.u1n1.com/img/picgo202204152343020.png)

### 函数开启严格模式

![image-20220115171347982](https://cdn.u1n1.com/img/picgo202204152343021.png)

### 严格模式下常见的限制

![image-20220115171425552](https://cdn.u1n1.com/img/picgo202204152343022.png)

1.无法7意外的创建全局变量

```js
function foo(){
    age = 10  //意外创建了全局变量
}
console.log(age)
```

2.不允许函数参数有相同名称

```js
function foo(x,y,x){
    console.log(x,y)
}
foo(1,2,3)   //3，2
```

3.不能修改不可修改的属性(如果不开启严格模式的话，不会报错，但是也不能修改)

![image-20220115173217656](https://cdn.u1n1.com/img/picgo202204152343023.png)

4.不允许使用原来的八进制格式（0开头）

```js
//最新的进制格式(下面都是可以在严格模式中用的进制)
var num8 = 0o123
var num16 = 0x123
var num2 = 0b100
console.log(num2,num8,num16)
```

5.严格模式下的this（默认绑定）指向undefined

```js
function a(){
    console.log(this)
}
a()  //window
```

```js
setTimeout(function(){
    console.log(this)
})
//不管在严格模式还是非严格模式，输出的都是window
```

chrom内部setTimeout实现

![image-20220115174827948](https://cdn.u1n1.com/img/picgo202204152343024.png)

# 09、ES5面向对象

## 创建对象

![image-20220115190105798](https://cdn.u1n1.com/img/picgo202204152343025.png)

## 对象的属性

### 对对象属性的操作

```js
var obj = {
    name:'wjj',
    age:18
}
//获取属性
console.log(obj.name)

//给属性赋值
obj.name = 'jzsp'

//删除属性
delete obj.name
```

### 对属性操作的控制

![image-20220115190943788](https://cdn.u1n1.com/img/picgo202204152343026.png)

`Object.defineProperty(obj,property,desc)`方法会直接在一个对象上定义一个新的属性，或者修改现有的属性，并且返回该对象

![image-20220115191326541](https://cdn.u1n1.com/img/picgo202204152343027.png)

注意，通过这个方法添加的属性**默认**是不可被枚举的，并且这个方法不是一个纯函数，会改变原对象（所以不用接收返回值也行）

```js
var obj = {
    name:'wjj',
    age:18
}
Object.defineProperty(obj,'height',{
	value:180
})
console.log(obj)   //{ name: 'wjj', age: 18 }
console.log(obj.height)   //180
```

#### 关于第三个参数desc

![image-20220115192333620](https://cdn.u1n1.com/img/picgo202204152343028.png)

- 数据属性描述符

![image-20220115192441166](https://cdn.u1n1.com/img/picgo202204152343029.png)

```js
var obj = {
    name:'wjj',
	age:18,
}
Object.defineProperty(obj,'lover',{
    //设置值
	value:'zyl',
	//说明这个属性不可配置（删除，修改）
	configurable:false,
	//说明这个属性是不可被枚举出来的
	enumerable:false,
    //说明这个属性不可重新赋值（修改）
    writeable:false
})

delete obj.lover
console.log(obj.lover)   //还是输出zyl

//如果设置enumerable为false的话，输出obj中是没有lover属性的(但是浏览器输出obj的话会显示，但是颜色会变成浅色，为了帮助调试)
console.log(obj)
//通过keys获取所有的key也不显示
console.log(Object.keys(obj))
//forin来遍历也不会显示
for (const key in obj) {
	console.log(key)
}

```

注意，通过这种Object.defineProperty定义的属性的话，那四个配置的属性，三个是false，一个是undefined；通过字面量形式创建的话，那三个配置的属性都是true（value是创建时声明的值）

- 存取属性描述符

隐藏某个一私有属性不希望**直接**被外界使用或者赋值

希望获取某一个属性它**访问和设置值的过程**时，也会使用存取属性描述符中的get和set

```js
var obj = {
    name:'wjj',
	age:18,
	_lover : 'zyl'
}
Object.defineProperty(obj,'lover',{
	//说明这个属性不可配置（删除，修改）
	configurable:false,
	//说明这个属性是不可被枚举出来的
	enumerable:false,
	//get会在读取的时候调用
	get(){
		//可以在返回要取的值之前做一些操作
		return this._lover
	},
	//set会在赋值的时候调用
	set( value ){
		//可以在设置值之前做一些操作
		this._lover = value
	}
})
console.log(obj.lover)
console.log(obj._lover = 'jzsp')
```

## 继承

### 原型

1.在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。

即：对象具有属性`__proto__`，可称为**隐式原型**，一个对象的隐式原型指向**构造该对象的构造函数的原型**，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

2.方法(Function)

方法这个特殊的对象，除了和其他对象一样有上述`__proto__`属性之外，还有自己特有的属性——原型属性prototype，这个属性是一个指针，指向一个对象，这个对象的用途就是**包含所有实例共享的属性和方法**（我们把这个对象叫做**原型对象**)。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回**原构造函数**。

> 当某个对象，访问某个属性的时候，会先从自身找，有则直接用，没有则就找到**隐式原型**对象，有则使用，否则就继续，直到找到顶层原型

### 原型链

![image-20220116125335383](https://cdn.u1n1.com/img/picgo202204152343030.png)

顶层原型

![image-20220116125547128](https://cdn.u1n1.com/img/picgo202204152343031.png)

虽然原型显示的是`[Object:null prototype] {}`，因为它声明的属性都是不可枚举的，但是可以通过`Object.getOwnPropertyDescriptors()`方法来打印出

![image-20220116132609865](https://cdn.u1n1.com/img/picgo202204152343032.png)

![image-20220116130033774](https://cdn.u1n1.com/img/picgo202204152343033.png)

 只要将obj的`__proto__`的**指向修改**为另一个对象，就可以达到继承的效果 `obj.__proto__ = obj2`

![image-20220116131850043](https://cdn.u1n1.com/img/picgo202204152343034.png)

> 每个**函数**都有一个显示原型prototype对象，凡是对象都有一个隐式属性`__proto__`，该对象的隐式属性`__proto__`指向顶层原型，因为该对象本质上是**通过Object函数构造**出来的，所以指向Object的原型对象。**通过构造方法new出来的对象的`__proto__`会指向这个函数的prototype对象**

![image-20220116133204583](https://cdn.u1n1.com/img/picgo202204152343035.png)

> 所有类都继承自Object类

![image-20220116161747531](https://cdn.u1n1.com/img/picgo202204152343036.png)

### 原型链实现继承

#### 初步实现

![image-20220116141311285](https://cdn.u1n1.com/img/picgo202204152343037.png)

```js
function Person(){
	this.name = 'wjj'
	this.age = 20
}

Person.prototype.eating = function(){
	console.log(this.name + 'is eating')
}

function Student(sno){
	this.sno = sno
}
//修改Student的默认显示原型为new的Person对象
//那么通过new出来的Student对象的原型都会指向这个Person对象
//就继承了这个Person对象的所有内容
Student.prototype = new Person()
var stu = new Student(1905010502)
console.log(stu)
```

##### 弊端

1、打印stu对象，某些属性是看不到的（看下图，name和age打印时是无法显示的），因为它只打印stu对象中的**可枚举属性**，不包括`__proto__`中的属性

![image-20220116141442807](https://cdn.u1n1.com/img/picgo202204152343038.png)

2、每个new出来的Student对象的原型都**共享同一个Person对象**

```js
function Person(name){
	this.name = name
	this.friends = []
}

function Student(sno){
	this.sno = sno
}
Student.prototype = new Person('wjj')
var stu1 = new Student(1905010502)
var stu2 = new Student(1905010503)

//因为stu1对象中没有friends，所以会找到原型对象中friends数组的引用，因为stu1和stu2对象的原型都指向同一个person对象
//所以两个都输出["jzsp"]
stu1.friends.push("jzsp")
console.log(stu1.friends)    //["jzsp"]
console.log(stu2.friends)	 //["jzsp"]

stu1.name = 'jzsp'   //这个本质上是在stu1中添加name属性，而不是修改原型上的属性

```

![image-20220116142325385](https://cdn.u1n1.com/img/picgo202204152343039.png)

3、在类的实现过程中没有传值

#### 借用构造函数优化

```js
function Person(name,friends){
	this.name = name
	this.friends = friends
}
Person.prototype.eating = function(){
	console.log(this.name + "is eating")
}

function Student(sno,name,friends){
    //借用构造函数，在这里调用Person的构造函数，作为普通的函数来调用
    //相当于在这里调用了this.xxx = xxx，这样就可以解决上面的三个问题
    //第一个问题，在这里调用构造方法的话，会给当前的student对象添加上name和friends属性，打印时会显示
    //第二个问题，因为student对象中有friends属性了，那么每一个student对象中的friends都是不同的，互不影响
    //第三个问题，实现了传参
	Person.call(this,name,friends)
	this.sno = sno
}
Student.prototype = new Person()
var stu1 = new Student(1905010502,'wjj',['jzsp','jzsp2'])

console.log(stu1)
```

![image-20220116143856987](https://cdn.u1n1.com/img/picgo202204152343040.png)

![image-20220116144215756](https://cdn.u1n1.com/img/picgo202204152343041.png)

##### 弊端

![image-20220116144140146](https://cdn.u1n1.com/img/picgo202204152343042.png)

#### 错误的优化方法

```js
function Person(name,friends){
	this.name = name
	this.friends = friends
}
Person.prototype.eating = function(){
	console.log(this.name + " is eating")
}

function Student(sno,name,friends){
	Person.call(this,name,friends)
	this.sno = sno
}
//社区里有人说，直接将Person的原型赋值给Student的原型，不就没有两次new和两份父类属性了吗？确实如此，但是从面向对象的角度来看是不对的
Student.prototype = Person.prototype
//由于Student的原型指向了Person原型，那么这里相当于是修改了父类的属性，此时如果有其他的类继承了Person，那么其他类中也会有running方法，这样显然是不对的，因为running方法应该是Student类才特有的方法
Student.prototype.running = function(){
	console.log("student " + this.name + " is running")
}
var stu1 = new Student(1905010502,'wjj',['jzsp','jzsp2'])

console.log(stu1)
stu1.eating()
stu1.running()
```

#### 原型式继承函数 - 对象

**要优化的根本**

要实现的应该是，**Student的原型**指向的是一个新的对象，这个对象的**隐式原型**指向的是Person对象，这样的话，给Student对象的原型添加属性和方法本质上就是对那个新对象添加，而不会影响到Person对象

```js
Student.prototype = {}
//这样是不推荐的，因为__proto__是方便读取原型来使用的，不建议修改
Student.prototype.__proto__ = Person.prototype
```

- 将obj对象作为新建对象的原型（原型式继承函数的实现）

![image-20220116152858244](https://cdn.u1n1.com/img/picgo202204152343043.png)

#### 寄生式继承 - 对象

用上面的原型式继承有缺陷，就是新建出来的**stu对象**要拓展重复的name属性和studying方法的话，需要逐个添加。

![image-20220116153611704](https://cdn.u1n1.com/img/picgo202204152343044.png)

此时可以结合工厂函数来实现继承**（工厂函数中少写了个return stu）**

![image-20220116153817947](https://cdn.u1n1.com/img/picgo202204152343045.png)

#### 最终实现继承（寄生组合式继承）

```js
function Person(name,friends){
	this.name = name
	this.friends = friends
}
Person.prototype.eating = function(){
	console.log(this.name + " is eating")
}

function Student(sno,name,friends){
	Person.call(this,name,friends)
	this.sno = sno
}
//将Student的原型指向一个新的对象，这个对象的原型指向的是Person的原型
Student.prototype = Object.create(Person.prototype)
//输出的时候显示Person{xxx}，前面拼接的字符串是由constructor的name决定的
//原本Student的原型中是有constructor的，但是修改了原型之后，会在原型链中找，最后找到了Person中的constructor中的name
//所以这里需要给Student.prototype新增一个constructor属性，value为Student函数对象
Object.defineProperty(Student.prototype,"constructor",{
	value:Student
})

Student.prototype.running = function(){
	console.log("student " + this.name + " is running")
}
var stu1 = new Student(1905010502,'wjj',['jzsp','jzsp2'])

console.log(stu1)
stu1.eating()
stu1.running()
```

![image-20220116154936460](https://cdn.u1n1.com/img/picgo202204152343046.png)

但是如果有很多个类继承person的话，处理constructor的部分就会重复书写，所以我们封装一个函数

```js
function inherit(son,parent){
    //这个create也可以用上面介绍的另外两种方法实现
    son.prototype = Object.create(parent)
    Object.defineProperty(son.prototype,"constructor",{
        value:son
    })
}

//在调用的时候只需要
inherit(Student,Person)
```

## 原型继承的关系

![image-20220116172959749](https://cdn.u1n1.com/img/picgo202204152343047.png)

![image-20220116163401532](https://cdn.u1n1.com/img/picgo202204152343048.png)

函数对象的`__proto__`和prototype

![image-20220116163246226](https://cdn.u1n1.com/img/picgo202204152343049.png)





- `function Foo()`作为一个**函数**，有自己的显式原型prototype对象
- `function Foo`又是一个**函数对象**，对象就有隐式`__proto__`属性，**（没有继承的情况下）一个对象的隐式原型指向构造该对象的构造函数的原型**，这个Foo函数对象是通过`function Function()`函数构造的，所以Foo函数对象内部的`__proto__`指向Function的原型对象
- Foo的prototype是**对象**，所以有`__proto__`属性，这个属性指向的是**Object原型对象**，因为这个对象是通过Object函数构造出来的



- 如果Foo继承了A，那么Foo的`__proto__`指向的是A对象，
- Foo的prototype指向的是一个对象，这个对象的`__proto__`是A的prototype





- `function Function()`本身是一个**函数**，那么内部有一个显式prototype指向Function的原型对象
- `function Function`本身又是一个**函数对象**，是对象就会有`__proto__`属性，这个属性指向的是Function对象的原型，因为**Function本身肯定也是通过Function函数构造出来的**
- Function的原型对象**是对象**，所以有`__proto__`属性，这个属性指向的是**Object函数的原型对象**，因为Function的原型对象是由Object函数构造出来的



- `function Object`是一个**函数对象**，是对象就会有`__proto__`属性，该属性指向的是Function对象的原型，因为这个函数对象是通过Function函数构造出来的
- `function Object`本身又是一个**函数**，那么它就会有一个prototype属性指向它的原型对象（顶层原型），这个原型对象虽然是对象，但是这个对象的`__proto__`为null，因为已经是顶层原型了

### 总结（很重要）

重点是要看一个对象是不是函数对象，如果是函数对象的话，那么它的`__proto__`分情况讨论

- 继承的函数对象，`__proto__`指向父类函数对象

- 没有继承的函数对象，`__proto__`指向`Function.prototype`
- 继承的函数对象，`prototype.__proto__`指向的是父类函数对象的`prototype`
- 没继承的函数对象，`prototype.__proto__`指向的是`Object的prototype`

如果不是函数对象，是普通对象的话，它的`__proto__`指向的就是构造出它的函数的原型



- 有继承的情况下
  - 函数对象的`__proto__`指向的是父类的函数对象（继承静态方法）
  - 函数对象的`prototype`指向的是自身的显示原型对象，这个对象的`__proto__`指向的是父类的`prototype`
  - 实例对象的`__proto__`（new出来的）指向的是父类的prototype
  - 实例对象的constructor和`__proto__`的constructor都指向，构造函数对象
- 有继承的情况下
  - 函数对象的`__proto__`指向的是Function的prototype（因为函数对象是通过Function构造出来的）
  - 函数对象的`prototype`指向的是自身的显示原型对象，这个对象的`__proto__`指向的是Object.prototype

所以，`Function.__proto__ == Function.prototype  //true`

![image-20220304090041600](https://cdn.u1n1.com/img/picgo202204152343050.png)

> 注意：es6的继承的话，子类**函数对象**的`__proto__`（es5的函数对象的`__proto__`指向的应该是Function的prototype）是直接指向**父类函数对象**的，是为了实现静态方法的继承（在下面ES6面向对象会有说到）

```js
class foo {}
class foo2 extends foo {}
const p1 = new foo();
const p = new foo2();

console.log(foo.prototype.constructor === foo); //函数对象的prototype的构造函数就是函数对象本身
console.log(p.__proto__.constructor === foo2); //true
console.log(p.constructor === foo2); //true,new出来的实例对象的构造方法指向该实例的函数对象

console.log(foo.constructor === Function); //函数对象的constructor指向Function
console.log(foo.__proto__.constructor === Function); //foo函数对象 __proto__指向Function.prototype
console.log(foo2.__proto__.constructor === Function); //foo2.__proto__指向foo，foo函数对象的构造函数指向Function

console.log(p.__proto__.constructor === foo2);
console.log(p.__proto__ === foo2.prototype);
console.log(foo2.prototype.constructor === foo2);

console.log(p.__proto__.constructor.prototype.__proto__ === foo.prototype);
console.log(foo2.prototype.__proto__ === foo.prototype); //继承的情况下，子类函数对象的prototype指向一个对象，这个对象的__proto__指向的是父类的prototype
console.log(p1.__proto__.constructor.prototype.__proto__ === Object.prototype);
console.log(foo.prototype.__proto__ === Object.prototype); //没有继承的情况下，子类函数对象的prototype的__proto__指向的是Object.prototype

```



![image-20220116170713187](https://cdn.u1n1.com/img/picgo202204152343051.png)

```js
function foo (){

}
console.log(foo.__proto__)   //这个指向的是Function的原型对象
console.log(foo.prototype)   //这个指向的是foo函数自身的原型对象
console.log(foo.__proto__ === foo.prototype)       //false
console.log(foo.__proto__ === Function.prototype)  //true
var f = new foo()


console.log(f.__proto__)    //指向的是foo.prototype指向的对象
console.log(f.__proto__ === foo.prototype)    //true
console.log(f.prototype)   //undefined 只有函数对象有prototype属性。

```



## 对象方法的补充（可以参考Reflecrt的方法）

### Object.getOwnPropertyDescriptors

获取对象的属性描述（包括不可枚举的属性）

```js
function person(){

}
console.log(Object.getOwnPropertyDescriptors(person.prototype))
```

![image-20220117145146995](https://cdn.u1n1.com/img/picgo202204152343052.png)

### Object.setPrototypeOf

![image-20220117144702935](https://cdn.u1n1.com/img/picgo202204152343053.png)

### Object.getPrototypeOf

因为`__proto__`存在浏览器兼容性问题，所以通过这个方法可以达到`__proto__`属性一样的效果

```js
console.log(Object.getPrototypeOf(Object) === Function.prototype)
```

### Object.hasOwnProperty

对象是否有一个属于自己的属性（**不包括原型上的属性**）

![image-20220116160743096](https://cdn.u1n1.com/img/picgo202204152343054.png)

### in操作符

in操作符判断的是包括原型上的属性的

`"address" in obj  // true(在原型上的address属性)`  

### instanceof操作符

用于检测**构造函数**的**prototype**，是否出现在某个**实例对象**的**原型链**上

![image-20220116161520817](https://cdn.u1n1.com/img/picgo202204152343055.png)

### isPrototypeOf方法

```js
//判断Person的原型对象是否出现在obj的原型链上
Person.prototype.isPrototypeOf(obj)
```

注意它和instanceof的区别，instanceof的右操作数只能是**函数对象**，如果是下面这种情况的话就无法判断了

![image-20220116162422733](https://cdn.u1n1.com/img/picgo202204152343056.png)

### Object.create

创建一个**包括特定原型的对象**，并且这个对象可以选择性的包括一些特定的属性（第二个参数是一个对象，对象中的属性会**添加在新建的对象上**而非原型上）

![image-20220116160510811](https://cdn.u1n1.com/img/picgo202204152343057.png)

# 10、ES6面向对象

## class定义类的方式

用class关键字定义类，主要是原来构造函数、原型、原型链的语法糖，所以有一切之前的特点

```js
//类的声明
class Person{
    
}

//类的表达式
var Person = class{
    
}
//在new的时候，同样会把Person的原型对象的地址赋值给p.__proto__属性
var p = new Person()
console.log(p.__proto__ === Person.prototype)   //true

console.log(typeof p)  //function
```

## class的构造方法

```js
class Person{
    //类的构造方法
    //注意：一个类只能有一个构造方法
    //1.在内存中创建一个对象{}
    //2.将类的原型prototype赋值给这个对象的__proto__属性
    //3.将对象赋值给函数的this：new 绑定
    //4.执行函数体中的代码
    //5.自动返回创建出来的对象
    constructor(name,age){
        this.name = name
        this.age = age
    }
}
```

## class的方法定义

- 实例方法

```js
class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    eating(){
        console.log(this.name + " is eating")
    }
}
var p = new Person("wjj")
p.eating()
//这种添加方法的方式，跟es5一样，本质上都是添加到原型对象中
console.log(Object.getOwnPropertyDescriptors(Person.prototype))
```

![image-20220117123950430](https://cdn.u1n1.com/img/picgo202204152343058.png)

- 静态方法

```js
class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    eating(){
        console.log(this.name + " is eating")
    }
    static createPerson(){
        console.log(111)
    }
}
Person.createPerson()
```

- 属性的get和set

```js
class Person{
    constructor(name,age){
        this.name = name
        this.age = age
        this._address = '台州市'
    }
    eating(){
        console.log(this.name + " is eating")
    }
    get address(){
        //对取值进行拦截
        return this._address
    }
    set address(newVal){
        //对设置值进行拦截
        this._address = newVal
    }
}
var p = new Person("wjj")
console.log(p.address)   //台州市
p.address = 'jzsp'
console.log(p.address)   //jzsp
```

## 类的继承以及super

```js
class Person{
    constructor(name,age){
        
    }
    eating(){

    }
    running(){
        
    }
    
    static saying(){
        console.log("saying")
    }
}
//也可以继承系统内置的类Array,String这些
class Student extends Person{
    constructor(name,age,sno){
        //1、在子类构造方法中，使用this前，必须通过super调用父类的构造方法
        super(name,age)
        this.sno = sno
    }
    
    //可以在自己的原型上写一个同名的方法，那么就会优先找本原型上的的方法了（相当于覆盖了父原型上的方法）
    running(){
        //假如不希望全部重写，而是在原来的基础上添加一些内容，可以用super来调用父类的方法
        super.running()
        //...写一些特有的逻辑
    }
}
var stu = new Student('wjj',20,1905010502)
//继承过来的方法是保存在原型的原型上的
console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))

//也会继承父类的静态方法
Student.saying()
```

![image-20220117132311244](https://cdn.u1n1.com/img/picgo202204152343059.png)

### 两种继承方式的比较

```js
class Person{
    constructor(name,age){

    }
}
class Student extends Person{

}
console.log(Student.prototype)  //指向的是Person的空对象
console.log(Student.__proto__ == Person)   //true，es6和es5的继承最大的差别就是这一步，子类的__proto__指向的是父类的对象，为了继承静态方法，代码在下面有介绍
console.log(Student.__proto__ == Function.prototype)  //false
console.log(new Student().__proto__ == Student.prototype)  //true

function person(){

}

function student(){

}

student.prototype = Object.create(person.prototype)
student.prototype.constructor = student

console.log(student.prototype)  //指向的是一个新的对象，这个对象的__proto__属性指向person的原型对象
console.log(student.__proto__ == person)   //false
console.log(student.__proto__ == Function.prototype)  //true
console.log(new student().__proto__ == student.prototype)   //true
```

## Babel转es5▲▲▲▲▲▲▲▲▲▲▲▲▲▲

[babel官网](babeljs.io)

```js
/*
	class Person{
	
	}
*/

//判断传入的this是不是由Person构造出来的，也就是只能用new来调用Person方法
function _classCallCheck(instance, Constructor) { 
    if (!(instance instanceof Constructor)) 
    { 
        throw new TypeError("Cannot call a class as a function"); 
    } 
}

var Person = /*#__PURE__*/_createClass(function Person() {
  _classCallCheck(this, Person);
});
```

```js
/*
    class Person{
       constructor(name,age){
          this.name = name
          this.age = age
       }
       eating(){
        console.log(this.name + ' is eating')
       }
    }  
*/
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

//如果是createClass的第一个if，那么target就是原型对象
function _defineProperties(target, props) {
    //对props进行遍历
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    //如果enumerable属性存在就用这个，否则就是false
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    //如果有value属性就设置writable为true
    if ("value" in descriptor) descriptor.writable = true;
    //定义属性
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  //如果是原型的Props，就在传入的对象的原型对象上添加这个属性
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  //如果是静态方法，就直接定义到对象上而非原型对象，那么就可以通过Person.xxx直接调用静态方法了
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}


//这个注释PURE表示是一个纯函数，在用webpack打包的时候会进行tree-shaking，如果这个函数后面没有被用到的话，在进行压缩的时候会进行优化，在打包后的代码就不会包括这个代码，利于压缩
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);
    this.name = name;
    this.age = age;
  }

   //本来在class中声明方法，本质上是Person.prototype.eating = function(){}
   //但是在这里，封装了一个方法来添加，第一个参数是Person的函数对象，第二个参数是一个数组，里面有对方法的描述
  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name + " is eating");
      }
    }
  ]);

  return Person;
})();

 
```

**这里最重要的是比es5的继承多了一步设置原型为父类对象**

这里有一些关于proxy和reflect的东西，在12集的2:30开始，后面再看

```js
/*
    class Person{
        constructor(name,age){
            this.name = name
            this.age = age
        }
        running(){
            console.log(this.name + " running")
        }
    }

    class Student extends Person{
        constructor(name,age,sno){
            super(name,age)
            this.sno = sno
        }
        studying(){
            console.log(this.name + " is studying")
        }
    }
*/

"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _inherits(subClass, superClass) {
    //边界判断
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  //新建一个对象，它的__proto__指向superClass的prototype，并且通过create函数的第二个参数设置constructor
  //让subClass子对象的原型指向这个新建的对象
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
    
  //如果superClass有值的情况下还会调用，使得Student.__proto__ = Person，目的是静态方法的继承
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "running",
      value: function running() {
        console.log(this.name + " running");
      }
    }
  ]);

  return Person;
})();

var Student = /*#__PURE__*/ (function (_Person) {
  _inherits(Student, _Person);

  var _super = _createSuper(Student);

  function Student(name, age, sno) {
    var _this;

    _classCallCheck(this, Student);

    _this = _super.call(this, name, age);
    _this.sno = sno;
    return _this;
  }

  _createClass(Student, [
    {
      key: "studying",
      value: function studying() {
        console.log(this.name + " is studying");
      }
    }
  ]);

  return Student;
})(Person);

```

## mixin

mixin本质上是为了实现多继承，但是js本身并不能直接支持多继承，只不过是用函数的技巧来间接实现混入

```js

class Runner{
    running(){
        console.log("running")
    }
}
class Eater{
    eating(){
        console.log("eating")
    }
}
//如果要person同时继承两个的话，是不能这么写的
//class Person extends Runner,Eater

function mixinRunner(baseClass){
    //混入返回的是一个新的类，这个类继承了传入baseClass的所有功能，并且在自己的原型上添加了自己特有的功能
    return class extends baseClass{
        running(){
            console.log("running")
        }
    }
}

function mixinEater(baseClass){
    return class extends baseClass{
        eating(){
        	console.log("eating")
    	}
    }
}
class Person{
    
}
var mix = mixinEater(mixinRunner(Person))
console.log(new mix())
```

![image-20220117151003220](https://cdn.u1n1.com/img/picgo202204152343060.png)

## 类的多态（TS）

有三个前提

- 必须有继承
- 必须有重写（重写父类的方法）
- 必须有**父类的引用指向子类对象**（例如下面的Circle的父类是Shape，所以c对象既可以说是Circle类又可以说是Shape类）

![image-20220117151712923](https://cdn.u1n1.com/img/picgo202204152343061.png)

## 字面量的增强

![image-20220419095717543](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/19/20220419095717.png)

## 数组的解构

![image-20220419101042922](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/19/20220419101042.png)

 





# 11、ES小知识点

## let和const的作用域提升

```js
let foo = 1
console.log(foo)
```

在`let foo = 1` 之前无法打印`foo`并不是因为它没有在解析的时候创建foo属性，而是**它创建了，但是不能被访问**

![image-20220117160407144](https://cdn.u1n1.com/img/picgo202204152343062.png)

由上图可知，确实如此（var声明的foo在Global对象中）

![image-20220117155417351](https://cdn.u1n1.com/img/picgo202204152343063.png)

> 所以，let和const声明的变量会在执行上下文创建的时候被创建，但是没有进行作用域提升，在声明前不能访问，这叫暂时性死区

## let和const跟window的关系

![image-20220117164243892](https://cdn.u1n1.com/img/picgo202204152343064.png)

![image-20220117164229163](https://cdn.u1n1.com/img/picgo202204152343065.png)

![image-20220117164558660](https://cdn.u1n1.com/img/picgo202204152343066.png)

- `在ES5中，全局变量直接挂载到全局对象window的属性上`，所以能在window上看到var和function声明的全局变量
- `在ES6中，全局变量从全局对象window中脱离`，但是为了保持兼容性，`旧的不变`，所以var、**function声明的全局变量依然可以在window对象上看到，而let、const声明的全局变量在window对象上看不到，在script中形成了一个块级作用域，**这样在全局就可以访问到

通过设置断点，看看浏览器是怎么处理的

![image-20220118112020699](https://cdn.u1n1.com/img/picgo202204152343067.png)

 通过上图也可以看到，`在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中`。
 那要怎么获取呢？在定义变量的块级作用域中就能获取啊。

可以发现let和const声明的变量**不属于顶层对象Window**，所以window.aa为undefined。若要访问，直接访问即可。

## 展开语法进行的浅拷贝

- 浅拷贝是指，只是单纯的复制了那一层的数据（**引用类型复制内存地址**）
- 深拷贝的话，引用数据类型指向的对象会**新建**，不会指向同一个引用 

![image-20220117191422740](https://cdn.u1n1.com/img/picgo202204152343068.png)

```js
const info = {
    name:'wjj',
    friend:{
        name:"jzsp"
    }
}

const me = {...info}
me.friend.name = 'jzspjzsp'
//会发现，改变了me这个对象的name的话，影响到了info对象中friend的name
console.log(info.name)  //jzspjzsp
```

## 对象作为对象的key

![image-20220118103217936](https://cdn.u1n1.com/img/picgo202204152343069.png)

## WeakMap与Vue3响应式原理

![image-20220211161808049](https://cdn.u1n1.com/img/picgo202204152343070.png)

![image-20220118105555091](https://cdn.u1n1.com/img/picgo202204152343071.png)

## map创建与Object.entries结合

```js
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

![image-20220120122544448](https://cdn.u1n1.com/img/picgo202204152343072.png)

## 函数尾逗

```js
function foo(a,b,){

}

foo(1,2,)
```

## ES10的Object.fromEntryies 结合 URLSearchParams

URLSearchParams是一个可以操作类似于URL中queryString字符串的接口（interface）， 实现这个接口的对象可以直接用for...of结构来迭代这个对象的键值对 

![image-20220120132043358](https://cdn.u1n1.com/img/picgo202204152343073.png)

```js
const queryString = "name=jzsp&age=20"
const params = new URLSearchParams(queryString)
console.log(Object.fromEntries(params))   //{ name: 'jzsp', age: '20' }
```

## 可选链操作符?.

> 判断前面的属性是否是undefined

```js
const info = {
    name:'wjj',
    //addr:{
    //    area:'lq'
    //}
}
console.log(info.addr.area)    //相当于是info.undefined.area，会报错的
//要处理上面这种情况的话得逐个判断是否有值(用与运算符逐个判断，如果都是true就会返回最后一个的值，如果有一个是undefined就返回undefined)
console.log(info && info.addr && info.addr.area)
//同样的，也可以用?.来达到一样的效果，看上去更简洁
//它的作用是，判断前面的那个属性是否是undefined，如果是的话就直接返回undefined，否则就按链取到最后一个值
console.log(info?.addr?.area)
```

## ？？空值合并运算

因为`0`和`""`空字符串是**假值**，在进行逻辑或赋默认值的时候会出现问题，如下

```js
const a = 0
const res = a || "defaultValue"
console.log(res)  //defaultValue
```

??的出现就是为了处理这种情况，只用于判断一个变量是否为null或者undefined

```js
const a = 0
const res = a ?? "defaultValue"
console.log(res)  //0
```

## WeakRef弱引用

**deref方法**获取弱引用指向的对象，如果没有被销毁就能获取，否则就返回undefined

![image-20220120143549256](https://cdn.u1n1.com/img/picgo202204152343074.png)

```js
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

# 12、Proxy/Reflect 响应式原理

## 监听对象的操作

可以用`Object.defineProperty`来实现对**完整对象（不需要删除，增加属性）**的属性的监听 

![image-20220120145434949](https://cdn.u1n1.com/img/picgo202204152343075.png)

```js
const obj = {
  name:'wjj',
  age:20
}
Object.keys(obj).forEach(k =>{
  let v = obj[k]
  Object.defineProperty(obj,k,{
    get:function(){
     //形成闭包，对象的值从v获取，并不是从对象中获取
      console.log(`${k}属性被get了`)
      return v
    },
    set:function(newV){
     //set本质上是修改的数据来源，而不是给对象设置属性值
      v = newV
      console.log(`${k}属性被set了`)
    }
  })
})

obj.name = 'jzsp'
console.log(obj.age)
console.log(obj.name)
```

缺点

![image-20220120152643642](https://cdn.u1n1.com/img/picgo202204152343076.png)

## Proxy（代理）类

也就是说，如果我们希望监听一个obj对象的相关操作，那么我们可以创建一个代理对象（Proxy），对obj对象的所有操作，都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作（有十三种）

![image-20220120161725718](https://cdn.u1n1.com/img/picgo202204152343077.png)

![image-20220120165507212](https://cdn.u1n1.com/img/picgo202204152343078.png)

> apply和construct是针对函数对象的，通过Proxy对函数对象执行apply或者new的时候



### 简单使用（可以监听深层属性）

我们使用的是第二种new的方式来创建Proxy的

![image-20220120162401793](https://cdn.u1n1.com/img/picgo202204152343079.png)

```js
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

![image-20220120164701359](https://cdn.u1n1.com/img/picgo202204152343080.png)

### preventExtensions

> 有些handler对返回值有明确规定的，需要查看mdn来判断

```js
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

## Reflect（反射） 对象

![image-20220120171803199](https://cdn.u1n1.com/img/picgo202204152343081.png)

![image-20220120172730325](https://cdn.u1n1.com/img/picgo202204152343082.png)



[Object和Reflect的细微区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

Reflect对象内部的静态方法跟Proxy的方法是**一一对应**的，因为Proxy是代理，为了**避免直接对原对象进行操作**，所以就有了Reflect，通过Reflect对象对原对象进行操作

### Reflect结合Proxy

```js
let obj = {
  name:"jzsp"
}
let p = new Proxy(obj,{
  get(target, p, receiver) {
    console.log('get')
    //通过Reflect避免对原对象直接操作
    return Reflect.get(target,p)
  }
})

console.log(p.name)
```

### construct

```js
function Student(name,age){
    this.name = name
    this.age = age
}
function Person(){
    
}
//执行Student构造函数，但是创建出来的是Person类型
console.log(Reflect.construct(Student,['wjj',20],Person))
```

![image-20220120182358968](https://cdn.u1n1.com/img/picgo202204152343083.png)





## 关于Proxy中set和get的最后一个参数receiver（改变this用的）

先看下面一段代码

```js
let obj = {
  _name:'wjj',
  get name(){
    return this._name
  },
  set name(v){
    this._name = v
  }
}

let objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    console.log('get')
    return Reflect.get(target,p)
  },
  set(target, p, value, receiver) {
    console.log('set')
    Reflect.get(target,p,value)
  }
})
console.log(objProxy.name)
```

![image-20220120181019354](https://cdn.u1n1.com/img/picgo202204152343084.png)

这段代码访问的是Proxy中的name，它会访问到obj中的`get name()`，进而通过这个`return this._name`。但是这样的话，**获取`_name`属性的过程并没有经过Proxy中的get代理**，如果在Proxy中get前我们需要进行一些操作，再返回数值的话，就无法达到效果。所以我们要**修改obj对象中的this的指向**，**`receiver`指向的是Proxy本身**，在调用`Reflect.get`的时候传入`receiver`**可以改变obj对象中get方法里`this`的指向**，进而避免这种直接操作obj对象而不经过Proxy的另一种途径

```js
let obj = {
  _name:'wjj',
  get name(){
    return this._name
  },
  set name(v){
    this._name = v
  }
}

let objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    console.log('get',p)   
    return Reflect.get(target,p,receiver)
  },
  set(target, p, value, receiver) {
    console.log('set',p)
    Reflect.get(target,p,value,receiver)
  }
})
console.log(objProxy.name)
```

![image-20220120181054523](https://cdn.u1n1.com/img/picgo202204152343085.png)

# 13、响应式原理实现

## 响应式函数的封装

```js
//保存所有在变量改变需要执行的依赖函数的数组
let reactiveFns = []

//用于收集传入的依赖函数
function watchFn(fn){
  reactiveFns.push(fn)
}

// 先假设这个name是响应式数据
let name = "wjj",

//name发生改变要执行的依赖函数
watchFn(function(){
  console.log('这是依赖函数1'+name)
})
//name发生改变要执行的函数
watchFn(function(){
  console.log('这是依赖函数2'+name)
})

//修改响应式数据
name = 'jzsp'
//当name改变时，执行响应式函数
reactiveFns.forEach(fn=>{
  fn()
})
```

## 依赖响应类的封装

```js
class Depend {
  constructor() {
    this.reactiveFn = [];
  }
  addDepend(fn) {
    this.reactiveFn.push(fn);
  }
  notify() {
    this.reactiveFn.forEach((item) => item());
  }
}

let name = "wjj";
let nameDepend = new Depend();
function watchFn(fn) {
  nameDepend.addDepend(fn);
}

//name发生改变要执行的函数
watchFn(function () {
  console.log("这是依赖函数1" + name);
});
//name发生改变要执行的函数
watchFn(function () {
  console.log("这是依赖函数2" + name);
});

name = 'jzsp'
nameDepend.notify()
```

## Proxy自动监听对象属性的变化

```js
//用于收集某个属性的所有响应式函数
class Depend{
  constructor() {
    this.reactiveFns = []
  }
  addDepend(fn){
    this.reactiveFns.push(fn)
  }
  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

//用于收集name属性的响应式函数
const nameDepend = new Depend()
function watchFn(fn){
  nameDepend.addDepend(fn)
}

let obj = {
  name:"wjj",
  age:20
}

//监听对象属性的变化：Vue3（Proxy） / Vue2（Object.defineProperty)
const objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    return Reflect.get(target,p,receiver)
  },
  set(target, p, value, receiver) {
    Reflect.set(target,p,value,receiver)
    //当name改变时，执行响应式函数
    nameDepend.notify()
  }
})

watchFn(function(){
  console.log('这是哥响应式函数1')
})
watchFn(function(){
  console.log('这是哥响应式函数2')
})

objProxy.name = 'jzsp'
```

## WeakMap依赖收集对象的管理

每个对象对应一个map（防止key重名），这个map里保存的key-value是属性名以及属性名对应的Depend（依赖响应类的实例，里面收集了所有关于该属性的响应式函数），然后将对象和这个map以键值对的形式保存在WeakMap中

![image-20220120193746954](https://cdn.u1n1.com/img/picgo202204152343086.png)

当obj.name发生改变的时候，我们就可以先从WeakMap中取出obj的map对象，再在这个map对象中取出name的Depend实例，然后调用内部的notify方法执行所有的响应式函数

![image-20220120194136917](https://cdn.u1n1.com/img/picgo202204152343087.png)

数据结构

![image-20220120195900293](https://cdn.u1n1.com/img/picgo202204152343088.png)

```js
class Depend{
  constructor() {
    this.reactiveFns = []
  }
  addDepend(fn){
    this.reactiveFns.push(fn)
  }
  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

const targetMap = new WeakMap()
//封装一个获取depend实例的方法
function getDepend(target,key){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }

  //根据key获取depend
  let depend = map.get(key)
  //如果是第一次获取的话，是没有对应的depend的，所以需要创建
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}
const nameDepend = new Depend()
function watchFn(fn){
  nameDepend.addDepend(fn)
}

let obj = {
  name:"wjj",
  age:20
}

//监听对象属性的变化：Vue3（Proxy） / Vue2（Object.defineProperty)
const objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    return Reflect.get(target,p,receiver)
  },
  set(target, p, value, receiver) {
    Reflect.set(target,p,value,receiver)
    //当target的p属性发生改变时，执行对应的响应式函数
    getDepend(target,p).notify()
  }

})

watchFn(function(){
  console.log('这是哥响应式函数1')
})
watchFn(function(){
  console.log('这是哥响应式函数2')
})

objProxy.name = 'jzsp'
```

## get的时候收集响应式函数

```js
class Depend{
  constructor() {
    this.reactiveFns = []
  }
  addDepend(fn){
    this.reactiveFns.push(fn)
  }
  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}
const targetMap = new WeakMap()
//很重要哦
function getDepend(target,key){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }

  let depend = map.get(key)
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}

let activeReactiveFn = null
function watchFn(fn){
  activeReactiveFn = fn
  //怎么知道这个fn要存入到哪个map的哪个depend对象中呢？
  //我们先执行一次这个函数
  //如果函数内部用到了某个对象的某个属性的话，在执行到那一行代码的时候会经过Proxy代理进入get的handler
  //在get中，我们根据target和key已经获取到了对应的 depend，但是我们毕竟是要将函数对象添加到depend中的
  //怎么获取函数对象呢？我们这里在全局声明一个变量，在执行函数之前赋值，在执行时，经过get的时候就可以获取这个fn了
  //在执行结束的时候最好赋值为null重置一下
  fn()
  activeReactiveFn = null
}

let obj = {
  name:"wjj",
  age:20
}

const objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    //获取对应的depend
    const depend = getDepend(target,p)
    //给depend对象添加对应的响应函数
    depend.addDepend(activeReactiveFn)
    return Reflect.get(target,p,receiver)
  },
  set(target, p, value, receiver) {
    Reflect.set(target,p,value,receiver)
    getDepend(target,p).notify()
  }

})
//这里对上面重新进行解释，因为我们在watchFn传入function对象的时候会先执行一遍fn，因为所有的对象都是经过Proxy代理的，在执行fn的时候，如果用到了某个对象的某个属性，就会进入Proxy中的get方法，进入getDepend，如果发现某个对象的map或者是这个对象的某个属性的depend没有创建的话，则在getDepend中创建。
watchFn(function(){
  console.log(objProxy.name+'obj.name的响应式函数1')
})
watchFn(function(){
  console.log(objProxy.name+'obj.name的响应式函数2')
})
watchFn(function(){
  console.log(objProxy.age+'obj.age的响应式函数')
})
watchFn(function(){
  console.log(objProxy.age+objProxy.name+'obj.age和obj.name的响应式函数')
})

//开始修改
console.log('----------开始修改----------')
objProxy.name = 'jzsp'
```

## Depend类优化

```js
let activeReactiveFn = null
class Depend{
  constructor() {
    this.reactiveFns = []
    // this.reactiveFns = new Set()
  }

  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }

  selectFn(){
    //如果activeReactiveFn不为null，并且reactiveFns数组中没有activeReactiveFn这个函数时才添加
    //第二个判断是为了防止，如果一个函数中多次使用了某个属性，多次进入get，多次执行了selectFn，被重复添加到数组中（是不是可以用set嘞？）
    if(activeReactiveFn && !this.reactiveFns.includes(activeReactiveFn)){
      this.reactiveFns.push(activeReactiveFn)
    }
	
    // if(activeReactiveFn){
    //   this.reactiveFns.add(activeReactiveFn)
    // }

  }
}

const targetMap = new WeakMap()
function getDepend(target,key){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }

  let depend = map.get(key)
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}


function watchFn(fn){
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

let obj = {
  name:"wjj",
  age:20
}

const objProxy = new Proxy(obj,{
  get(target, p, receiver) {
    const depend = getDepend(target,p)
    //我们这里并不需要管activeReactiveFn这个变量，我们只需要知道，在这里的时候需要收集响应式函数即可
    //depend.addDepend(activeReactiveFn)
    depend.selectFn()
    return Reflect.get(target,p,receiver)
  },
  set(target, p, value, receiver) {
    Reflect.set(target,p,value,receiver)
    getDepend(target,p).notify()
  }

})

watchFn(function(){
  console.log(objProxy.name+'obj.name的响应式函数1')
})
watchFn(function(){
  console.log(objProxy.name+'obj.name的响应式函数2')
  console.log(objProxy.name+'obj.name的响应式函数2')
})
watchFn(function(){
  console.log(objProxy.age+'obj.age的响应式函数')
})
watchFn(function(){
  console.log(objProxy.age+objProxy.name+'obj.age和obj.name的响应式函数')
})

//开始修改
console.log('----------开始修改----------')
objProxy.name = 'jzsp'
```

## 将对象new Proxy的部分封装

```js
let activeReactiveFn = null
class Depend{
  constructor() {
    this.reactiveFns = []
    // this.reactiveFns = new Set()
  }

  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }

  selectFn(){
    //如果activeReactiveFn不为null，并且reactiveFns数组中没有activeReactiveFn这个函数时才添加
    //第二个判断是为了防止，如果一个函数中多次使用了某个属性，多次进入get，多次执行了selectFn，被重复添加到数组中
    if(activeReactiveFn && !this.reactiveFns.includes(activeReactiveFn)){
      this.reactiveFns.push(activeReactiveFn)
    }

    // if(activeReactiveFn){
    //   this.reactiveFns.add(activeReactiveFn)
    // }

  }
}

const targetMap = new WeakMap()
function getDepend(target,key){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }

  let depend = map.get(key)
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}

function proxy(obj){
  return new Proxy(obj,{
    get(target, p, receiver) {
      const depend = getDepend(target,p)
      //我们这里并不需要管activeReactiveFn这个变量，我们只需要知道，在这里的时候需要收集响应式函数即可
      //depend.addDepend(activeReactiveFn)
      depend.selectFn()
      return Reflect.get(target,p,receiver)
    },
    set(target, p, value, receiver) {
      Reflect.set(target,p,value,receiver)
      getDepend(target,p).notify()
    }
  })
}

function watchFn(fn){
  activeReactiveFn = fn
  console.log('初始化阶段执行的fn')
  fn()
  activeReactiveFn = null
}

const objProxy = proxy({
  name:"wjj",
  age:20
})

const objProxy2 = proxy({
  name:"wjj",
  age:20
})

watchFn(function(){
  console.log(objProxy.name+'obj.name的响应式函数1')
})
watchFn(function(){
  console.log(objProxy2.name+'obj2.name的响应式函数1')
})

console.log('--------开始修改---------')
objProxy.name = 'jzsp'
objProxy2.name = 'jzsp'

//简化使用
// const p = proxy({name:'jzsp'})
// watchFn(()=>{
//   console.log(p.name)
// })
// p.name = '123'
```

## 总结

- 封装一个Depend类，这个类用于**管理某个对象的某个属性**的所有响应式函数，并且封装添加（`selectFn`）和执行全部响应式函数（`notify`）的操作
- 创建一个**WeakMap**来保存所有**对象的`map`**（这个`map`里保存的是对应对象的所有属性的`depend`）
- 创建`getDepend`方法用于获取`WeakMap`对应的`map`中对应属性的`depend`对象（**注意要进行空值判断，为空的时候是第一次`get`某个对象的某个属性的`depend`，需要创建这个对象的`map`和这个属性的`depend`**）
- 创建方法，根据传入的obj生成对应的`Proxy`代理，设置`set`和`get`方法，`set`中执行所有响应式函数（通过`target`和`key`获取`depend`，调用`notify`），get中收集响应式函数（通过`target`和`key`获取`depend`，调用`selectFn`）
- 创建一个`watchFn(fn)`来收集响应式函数，为了知道fn中用到了哪些对象的哪些属性，我们在`watchFn`的时候执行一次`fn`函数，**用到某个对象的某个属性的时候会进入Proxy代理**，进入对应属性的get方法，此时`get`方法中有对应的`target`和`key`可以通过getDepend方法获取到对应属性的`depend`实例，此时需要将调用`selectFn`收集这个函数对象到这个类中。**为了知道这个函数对象是谁，我们还设置了一个全局变量`activeReactiveFn`**（在执行fn前赋值函数对象给`activeReactiveFn`）来指向这个函数对象

> 这个WeakMap和map结合的数据结构，实现自动化收集对象属性的响应式函数的核心是，在`watchFn(fn)`的时候进入了Proxy中的get，在get中根据对象和属性调用`getDepend`，这个时候是如果第一次`getDepend`这个对象属性，那么就创建对应的`map`和`depend`并保存到WeakMap中。

## vue2实现响应式

```js
let activeReactiveFn = null
class Depend{
  constructor() {
    this.reactiveFns = []
  }

  notify(){
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }

  depend(){
    if(activeReactiveFn && !this.reactiveFns.includes(activeReactiveFn)){
      this.reactiveFns.push(activeReactiveFn)
    }
  }
}

const targetMap = new WeakMap()
function getDepend(target,key){
  let map = targetMap.get(target)
  if(!map){
    map = new Map()
    targetMap.set(target,map)
  }

  let depend = map.get(key)
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}

//通过Object.defineProperty来实现响应式
function reactive(obj){
  Object.keys(obj).forEach(key => {
    let v = obj[key]
    Object.defineProperty(obj,key,{
      get(){
        const depend = getDepend(obj,key)
        depend.depend()
        return v
      },
      set(newV){
        v = newV
        const depend = getDepend(obj,key)
        depend.notify()
      }
    })
  })
  return obj
}

function watchEffect(fn){
  activeReactiveFn = fn
  console.log('初始化阶段执行的fn')
  fn()
  activeReactiveFn = null
}

const objProxy = reactive({
  name:"wjj",
  age:20
})

const objProxy2 = reactive({
  name:"wjj",
  age:20
})

watchEffect(function(){
  console.log(objProxy.name+'obj.name的响应式函数1')
})
watchEffect(function(){
  console.log(objProxy2.name+'obj2.name的响应式函数1')
})

console.log('--------开始修改---------')
objProxy.name = 'jzsp'
objProxy2.name = 'jzsp'

//简化使用
// const p = reactive({name:'jzsp'})
// watchEffect(()=>{
//   console.log(p.name)
// })
// p.name = '123'
```

# 14、Promise

## 异步处理方式-回调函数

```js
function request(url,suc,err){
  setTimeout(url=>{
    if(url === 'jzsp'){
      //成功，异步无法返回数据，只能通过回调函数的形式来返回
      let res = 'success'  //假设这个是成功的数据
      suc(res)
    }else{
      //失败
      let res = 'err'
      err(res)
    }
  },3000)
}

request('wjj',res=>{
  console.log(res)
},err=>{
  console.log(err)
})
```

这样的处理方式导致的最经典的弊端是会有回调地狱问题

```js
//现在要模拟的是，发送三次网络请求，每次都返回一个字符串
function request(url,suc,err){
  setTimeout(url=>{
    //这里就假设都是成功的吧
    suc('success1')
    setTimeout(url=>{
      suc('success2')
      setTimeout(url=>{
        suc('success3')
      },3000)
    },3000)
  },3000)
}

//传入成功和失败的回调
request('wjj',res=>{
  console.log(res)
},err=>{
  console.log(err)
})
```

## promise简介

![image-20220121132721750](https://cdn.u1n1.com/img/picgo202204152343089.png)

```js
//在new的时候传入executor，会被立即执行
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(true){
            resolve('suc')
        }else{
            reject('err')
        }
    },3000)
//then的作用是指定promise状态改变之后要执行的回调函数
//如果调用resolve改变promise的状态为fulfilled，就会执行then第一个参数传入的回调函数    
//如果调用reject改变promise的状态为rejected，就会执行then第二个参数传入的回调函数
}).then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})
```

## Promise状态

![image-20220121134153743](https://cdn.u1n1.com/img/picgo202204152343090.png)

## Promise状态的移交☆☆☆☆

- resolve（reject同理）传入的参数是一个Promise对象（或者thenable对象）时，原promise的状态由这个传入的promise对象决定

```js
const newPromise = new Promise((resolve,reject)=>{
  resolve('jzsp')
})

new Promise((resolve,reject)=>{
    //虽然这里用的是resolve，本应将pending -> fulfilled
    //但是因为这里传入的是promise对象，所以状态和传值由这个promise对象来决定，这个叫做promise的移交
    //如果这个传入的promise是失败的，则执行catch回调（then第二个参数）
    resolve(newPromise)
}).then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})
```

- 传入的参数是一个有then方法（这个方法会当作Promise后的then方法执行，也可以有两个参数resolve和reject）的对象时，后续Promise状态由这个对象中的then方法决定

```js
new Promise((resolve,reject)=>{
    //虽然这里用的是resolve，本应将pending -> fulfilled
    //但是这里传入的对象实现了then方法，那么会先执行这个then方法，并且由该then方法决定后续Promise的状态
  resolve({
    then(resolve,reject){
       resolve('传入对象的then方法中调用了resolve')
  }
})
}).then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})
```

![image-20220121152338169](https://cdn.u1n1.com/img/picgo202204152343091.png)

其实状态移交并不好，因为如果用状态移交的方式写promise的话，会造成回调地狱的。。。

```js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(1)
        resolve(new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log(2)
                resolve(new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        console.log(3)
                        resolve('最终结果')
                    },3000)
                }))
            },3000)
        }))
    },3000)
}).then(res=>{
    console.log(res)
})
```



## Promise的方法

### 实例方法

![image-20220121141812891](https://cdn.u1n1.com/img/picgo202204152343092.png)

#### `then(onfulfilled,onrejected)`

```js
const p = new Promise((resolve,reject)=>{
    resolve()
})
//1、一个promise可以按照下面这种形式可以执行多个then
p.then(res=>{
	console.log(1)    
})
p.then(res=>{
	console.log(2)    
})
p.then(res=>{
	console.log(3)    
})
```

```js
//2、then方法本身是有返回值的，它返回的是一个promise对象(所以有了promise的链式调用)
//    1> 如果then中的回调函数返回的是一个普通值（数值/字符串/普通对象/undefined等），那么这个普通值会作为Promise的resolve值
//    2> 如果then中的回调函数返回的是一个Promise对象，那么会将它作为then返回的Promise的resolve值，但是resolve的值为Promise的时候，就发生了状态移交，即then返回的Promise对象的状态由回调返回的Promise对象决定
//    3> 如果then中的回调函数返回的是一个实现了then方法的对象，同理
const p = new Promise((resolve,reject)=>{
    resolve()
})

//回调没有返回值，默认返回undefined
//那么then返回的Promise为{ value:undefined , state:'fulfilled' }
p.then(res=>{
	console.log(1)    
})

//回调返回了Promise，这个promise的executor调用了resolve使这个promise的状态变为成功，值为111
//那么then返回的Promise为{ value:111 , state:'fulfilled' }
p.then(res=>{
    return new Promise((a,b)=>{
        a(111)
    })
})

//回调返回了thenable对象，这个then方法调用了resolve函数
//那么then返回的Promise为{ value:undefined , state:'fulfilled' }
p.then(res=>{
    return {
        then(a,b){
            a()
        }
    }
})

```

#### `catch`

```js
//catch的本质是第一个参数为undefined的then
const promise = new Promise((resolve,reject)=>{
  //调用reject和抛出异常会进入then执行第二个回调函数
  //reject("rejected")
  throw new Error("rejected")
})

//如果失败的promise没有失败回调可执行的话，node会报错（这种情况叫做拒绝捕获）
//UnhandledPromiseRejectionWarning: Error: rejected
//浏览器会报uncaught
promise.then(null,err=>{
  console.log('err')
})
```

##### 异常穿透

```js
promise.then(res=>{
    
}).catch(err=>{
    //异常穿透指的是，如果promise调用的是reject，使得promise变成失败的
    //那么会执行then中第二个参数，也就是onRejected回调
    //如果then只有第一个参数，那么就会将这个失败的promise的值传递到后面的then
    //直到遇到有第二个参数的then或者是catch（catch本身是用then实现的）
    //也就是传递到能执行onRejected回调的then或catch为止
})
```

##### 拒绝捕获以及执行多次catch

```js
promise.then(res=>{})
//如果promise是rejected状态，上面的then会拒绝捕获
//浏览器中会报错：uncaught  
//node中报错：UnhandledPromiseRejectionWarning:xxx
//所以不要分开写，要么在then中写两个回调，要么在then后面接catch()
promise.catch(err=>{})
//如果这里定义了多个独立的catch的话，会全部执行（跟then一样）
promise.catch(err=>{})
promise.catch(err=>{})
```

![image-20220121151428937](https://cdn.u1n1.com/img/picgo202204152343093.png)

![image-20220121151449132](https://cdn.u1n1.com/img/picgo202204152343094.png)

#### `finally`

`finally`方法是，无论`promise`对象变成`fulfilled`还是`rejected`**最终都会执行传入的回调**（这个回调没有参数）

> 虽然`finally`的返回值也是`Promise`对象，但是。。。没那么伞兵在finally后面还接着`then`和`catch`吧

```js
const promise = new Promise((resolve,reject)=>{
  throw new Error("rejected")
})

promise.then(null,err=>{
  console.log('err')
}).finally(()=>{
    console.log('执行了finally中的回调')
})
```

### 静态方法

![image-20220121154223905](https://cdn.u1n1.com/img/picgo202204152343095.png)

#### resolve方法

```js
const obj = {name:'jzsp'}

const promise0 = new Promise((resolve,rejecet)=>{
    resolve(obj)
})
//resolve静态方法是上面这个操作的语法糖
const promise = Promise.resolve(obj)
const promise2 = Promise.resolve({
  then(a,b){
    a(111)
  }
})
console.log(promise2);
```

#### reject方法

> 注意，reject方法不会根据你传入的内容来决定返回Promise的状态（状态移交），不管传入的是什么，返回的都是失败的promise

#### all方法

传入的是一个数组，**如果数组元素不是promise的值的话**，会在内部调用`Promise.resolve`方法转成`Promise`，直到所有的Promise状态**都为`fulfilled`时**返回一个成功的promise对象，它的value值是数组，这个数组中**按序存储**了这些promise的value值。

如果all传入的promise数组中有一个promise的结果是rejected，那么返回一个失败的promise对象，这个promise对象的value是**最先变成rejected状态的promise的值**

```js
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1111)
  },1000)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
})
const p3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
}) 

Promise.all([p1, p2, p3, 'aaa']).then(res=>{
  console.log(res)
}).catch(err=>console.log(err))
```

#### allSettled方法（es11）

![image-20220121160552745](https://cdn.u1n1.com/img/picgo202204152343096.png)

```js
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1111)
  },1000)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
})
const p3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
}) 

Promise.allSettled([p1, p2, p3, 'aaa']).then(res=>{
  console.log(res)
})
```

![image-20220121160651590](https://cdn.u1n1.com/img/picgo202204152343097.png)

#### race方法

只要有一个promise脱离了`pending`状态，就将这个promise的值和状态封装成新的promise作为race的返回值返回并结束

```js
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1111)
  },1000)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
})
const p3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
}) 

Promise.race([p1, p2, p3, 'aaa']).then(res=>{
  console.log(res)
}).catch(err=>{
    console.log(err)
})
```

#### any方法

至少等到一个promise状态变为fulfilled，就将这个fulfilled的值和状态封装成新的promise作为any的返回值。

> 如果全部都是rejected失败的promise，那么会等到所有的promise都变成rejected的时候返回一个失败的promise

![image-20220121161638892](https://cdn.u1n1.com/img/picgo202204152343098.png)

```js
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1111)
  },1000)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
})
const p3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },1000)
}) 

Promise.any([p1, p2, p3]).then(res=>{
  console.log(res)
}).catch(err=>{
    console.log(err)
})
```

## 实现Promise（与下面promisea+结合看）

[查看promise规范](https://promisesaplus.com/)

```js
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_REJECTED = 'rejected'
/*
  12、封装代码
    try{
        const res = onRejected(this.res)
        resolve(res)
    }catch (e) {
        reject(e)
    }
* */
function execFunctionWithCatchError(callbackFn,value,resolve,reject){

    try{
      const res = callbackFn(value)
      //13、对回调的返回值进行判断，如果返回的是一个普通值，就直接用resolve(res)修改then返回的promise对象的状态和值
      //如果返回的是promise对象，那么then返回的promise的状态就由这个对象来决定
      //我认为then就是收集回调用的，如果promise对象变成fulfilled状态，就会回调then收集的第一个参数中的函数，变成rejected就会回调then收集的第二个参数中的函数
      if(res instanceof myPromise){
        //13、如果返回的res是promise，当这个promise变成变成fulfilled（resolve之后）时，会回调then的第一个函数，在这个回调函数中执行resolve改变原来then函数返回的promise的状态
        res.then(value =>{
          resolve(value)
        },err =>{
          reject(err)
        })
      }else{
        resolve(res)
      }
    }catch (e) {
      reject(e)
    }

}
class myPromise{
  constructor(exec) {
    this.status = PROMISE_STATUS_PENDING
    this.res = undefined
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    //2、resolve和reject函数是只有状态为pending的时候才能被调用并且修改状态的，如果不是pending的话都是无效调用
    const resolve = (value)=>{
      if(this.status === PROMISE_STATUS_PENDING){
        //5、在执行resolve修改状态之后，要执行then第一个参数收集的成功回调，用queueMicrotask将函数添加到微任务中
        queueMicrotask(()=>{
          //8、因为是加到微任务中，等到主线程的内容执行完毕的时候执行这里的函数，这时就会出现一个问题
          // 如果promise传入的executor同时执行了resolve和reject的话，这两个函数都会放到微任务中，
          // 原本是只能修改一次状态的（由pending修改），但是如果不在这个添加到微任务的函数中判断状态的话，状态会修改多次，回调也会重复执行（没有下面这一行判断的话）
          // 所以加入了下面的状态判断（其实加了这个状态判断的话，resolve函数和reject函数最外层的判断就没必要了）
          if(this.status !== PROMISE_STATUS_PENDING) return

          this.status = PROMISE_STATUS_FULFILLED
          this.res = value
          //5、执行回调的时候记得传入promise的值，因为then的回调函数中可以有一个参数来获取promise的值：then(res=>{})
          // this.onFulfilled(this.res)
          //6、执行数组中的函数
          this.onFulfilledCallback.forEach(fn=>{
            fn(this.res)
          })
        })
      }
    }
    //3、resolve和reject都需要接收一个参数，并且保存到Promise对象的res结果属性中
    const reject = (reason)=>{
      if(this.status === PROMISE_STATUS_PENDING){
        queueMicrotask(()=>{
          if(this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.res = reason
          //5、执行回调的时候传入promise的值
          this.onRejectedCallback.forEach(fn=>{
            fn(this.res)
          })
        })
      }

    }
    //11、用try catch包裹，解决在exec中直接抛出异常的而改变promise的状态的问题
    try {
      //1、传入的函数会被立即执行，并且传递两个参数，用于修改Promise的状态
      exec(resolve,reject)
    }catch (e) {
      reject(e)
    }
  }
  //4、创建then方法，用于收集回调
  then(onFulfilled,onRejected){
    //15、为了实现catch方法，本质是第一个参数为undefined的then，而then本身又可以只传第一个参数（第二个参数为undefined），所以需要对两个参数进行判断
    //then是可以不传参数的，不传参数的时候返回的promise状态跟调用then的promise的状态和值一样
    //下面的代码的目的是，如果前面的promise是成功的，那么在没传入第一个参数时会执行默认的onFulfilled回调
    //这个回调就是，传入什么就返回什么，执行回调的时候会将promise的结果传入，会在execFunctionWithCatchError中执行该回调并且获取v（也就是上个promise的值）
    //再根据这个v来决定then返回的promise的值和状态
    //如果不加这个的话，catch（或者说是then没有传入参数，或者第一个参数为空）就无法将前面正确的promise传递到后面进行处理
    if(!onFulfilled){
      onFulfilled = v=>v
    }
    //16、当onRejected没有传入的时候，给onRejected赋值一个默认的回调函数，这个回调函数用于抛出reject传入的值
    //promise状态为rejected的时候，如果后面的then没有传入第二个参数，就会执行这个默认回调
    //执行的时候抛出的异常会被catch到，并调用reject方法将then返回的promise的值和状态和前面失败的promise的状态和值保持一致，传递到后面，直到then有第二个参数时就不需要执行默认的抛出异常回调函数了
    if(!onRejected){
      onRejected = reason => {throw reason}
    }
    //9、为了达到链式调用的效果，我们需要将then返回一个自定义的promise，这个promise的状态和值与then的回调执行结果有关
    //因为传入的exec是箭头函数，不适用四种绑定规则，所以在这个exec中的this取决于then中的this
    //而then又是通过隐式绑定的规则来调用的，所以这里exec传入的this指向的是上一个promise对象，而不是返回的promise对象
    //传入的exec会被立即执行，返回的promise的状态由exec执行的回调有关
    //    -如果then执行的是onFulfilled成功的回调的话，返回的promise
    return new myPromise((resolve,reject)=>{
      //7、then方法下面收集到数组中的函数对象是会在pending状态后执行的，那如果设置了定时器延迟调用then还会执行吗？
      //原版的Promise是会执行的，所以这里还需要进行状态判断，如果不是pending状态就立即执行回调
      if(this.status === PROMISE_STATUS_FULFILLED && onFulfilled){
        //9、保存回调结果，修改promise状态(后面会进行封装的)
        // try{
        //   const res = onFulfilled(this.res)
        //   resolve(res)
        // }catch (e) {
        //   reject(e)
        // }
        //12、将9的代码封装一下
          queueMicrotask(()=>{
              execFunctionWithCatchError(onFulfilled,this.res,resolve,reject)
          })
      }

      if(this.status === PROMISE_STATUS_REJECTED && onRejected){
          queueMicrotask(()=>{
              execFunctionWithCatchError(onRejected,this.res,resolve,reject) 
          })
      }
        if(this.status === PROMISE_STATUS_PENDING){
            //6、原来的方式是不能实现执行多个then回调的，所以修改数据结构，将对应的函数对象存入数组
            // this.onFulfilled = onFulfilled
            // this.onRejected = onRejected

            //10、因为在pending的时候是收集要执行的回调，等到修改状态的时候才执行数组中保存的回调函数
            //那么执行的地方是在resolve或者reject函数中的微任务，获取回调函数的结果在这里也获取不到
            //所以我们不能单纯的传入一个函数对象，而是要将这个函数对象封装在一个执行函数中
            //在这个执行函数中执行这个回调函数，获取返回值，修改状态
            this.onFulfilledCallback.push(()=>{
                //12、封装一下
                execFunctionWithCatchError(onFulfilled,this.res,resolve,reject)
            })
            this.onRejectedCallback.push(()=>{
                //12、封装一下
                execFunctionWithCatchError(onRejected,this.res,resolve,reject)
            })
        }
    })
  }
  //14、catch本质上就是第一个参数为undefined的then咯，但是有一个问题，promise执行catch（本质上执行then）的时候收集了一个undefined函数，
  //这样显然是不行的，所以我们需要在then前面进行两个参数非空的判断
  catch(onRejected){
    return this.then(undefined,onRejected)
  }
  //、17实现finally（不管是成功还是失败都会执行的回调）
  finally(onFinally){
    return this.then(()=>{
      onFinally()
    },()=>{
      onFinally()
    })
  }
}

const p = new myPromise((resolve,reject)=>{
  resolve(111)
  // reject(222)
  //11、如果在exec中抛出异常，
  // throw new Error("111")
})
// 进入then中的pending判断
p.then(res=>console.log(res,'执行了pending时加入数组的回调'),err=>console.log(err,'执行了pending时加入数组的回调'))
p.then(res=>console.log(res,'执行了pending时加入数组的回调'),err=>console.log(err,'执行了pending时加入数组的回调'))
//测试抛出异常
// p.then(res=>{
//   console.log(res,'执行了修改状态后then中fulfilled的回调')
//   throw new Error('err')
// },err=>{
//   console.log(err,'执行了修改状态后then中的rejected回调')
// }).then(res=>{
//   console.log(res,'执行了修改状态后then中fulfilled的回调')
// },err=>{
//   console.log(err,'执行了修改状态后then中的rejected回调')
// })

//测试返回值是promise
p.then(res=>{
  return new myPromise((resolve,reject)=>{
    console.log('返回的是成功的promise，在内部调用了then方法决定外层then的返回的promise的状态')
    reject(111)
  })
},err=>{

}).then(res=>{
  console.log(res)
},err=>{

})

//延迟调用then，进入then中的rejected判断
setTimeout(()=>{
  p.then(res=>console.log(res,'执行了修改状态后then中fulfilled的回调'),err=>console.log(err,'执行了修改状态后then中的rejected回调'))
},3000)


```

- 纯净版

```js
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_REJECTED = 'rejected'
function execFunctionWithCatchError(callback,value,resolve,reject){
  queueMicrotask(()=>{
    try {
      const res = callback(value)
      if(res instanceof myPromise){
        res.then(resolve,reject)
      }else{
        resolve(res)
      }
    }catch (e) {
      reject(e)
    }
  })
}
class myPromise{
  constructor(exec) {
    this.status = PROMISE_STATUS_PENDING
    this.onFulfilleds = []
    this.onRejecteds = []
    this.res = undefined
    const resolve = (reason)=>{
      queueMicrotask(()=>{
        if(this.status !== PROMISE_STATUS_PENDING) return
        this.status = PROMISE_STATUS_FULFILLED
        this.res = reason
        this.onFulfilleds.forEach(fn=>{
          fn(this.res)
        })
      })
    }
    const reject = (value)=>{
      queueMicrotask(()=>{
        if(this.status !== PROMISE_STATUS_PENDING) return
        this.status = PROMISE_STATUS_REJECTED
        this.res = value
        this.onRejecteds.forEach(fn=>{
          fn(this.res)
        })
      })
    }
    try {
      exec(resolve,reject)
    }catch (e){
      reject(e)
    }
  }
  then(onFulfilled,onRejected){
    onRejected = onRejected || (reason => {throw  reason})
    onFulfilled = onFulfilled || (value => value)
    return new myPromise((resolve,reject)=>{
      if(this.status === PROMISE_STATUS_FULFILLED){
          this.onFulfilledCallback.push(()=>{
              //12、封装一下
              execFunctionWithCatchError(onFulfilled,this.res,resolve,reject)
          })
      }
      if(this.status === PROMISE_STATUS_REJECTED){
          this.onFulfilledCallback.push(()=>{
              execFunctionWithCatchError(onRejected,this.res,resolve,reject)
          })
      }
      if(this.status === PROMISE_STATUS_PENDING){
        this.onFulfilleds.push(()=>{
          execFunctionWithCatchError(onFulfilled,this.res,resolve,reject)
        })
        this.onRejecteds.push(()=>{
          execFunctionWithCatchError(onRejected,this.res,resolve,reject)
        })
      }
    })
  }
  catch(onRejected){
    return this.then(undefined,onRejected)
  }
  finally(onFinally){
    return this.then(()=>{
      onFinally()
    },()=>{
      onFinally()
    })
  }
}

const p = new myPromise((resolve,reject)=>{
  resolve(111)
})
```

### 实现promise的静态方法

> 实现静态方法的关键就是，什么时候调用resolve和reject来改变返回的promise的状态

------

这里不应该简单的`resolve`，因为value有可能传入的是`thenable`的值或者是一个`promise`对象，那么`Promise.resolve`返回的`promise`应该由传入的`value`决定。虽然`promisea+`没有这个`api`，但是为了实现这个`api`的效果，可以用`promisea+`规范中的`promiseResolve`函数

![image-20220122150341526](https://cdn.u1n1.com/img/picgo202204152343099.png)

![image-20220124175724828](https://cdn.u1n1.com/img/picgo202204152343100.png)

------

下面这里应该判断，promises数组中是否有**普通类型**的数据，有的话需要用`Promise.resolve`包裹

![image-20220122150000946](https://cdn.u1n1.com/img/picgo202204152343101.png)

![image-20220122150032026](https://cdn.u1n1.com/img/picgo202204152343102.png)

![image-20220122150159207](https://cdn.u1n1.com/img/picgo202204152343103.png)

![image-20220122150323512](https://cdn.u1n1.com/img/picgo202204152343104.png)

## 按照PromiseA+实现Promise

https://www.ituring.com.cn/article/66566

### 初体验

- 要点1：executor类型检测

![image-20220122191337622](https://cdn.u1n1.com/img/picgo202204152343105.png)

- 要点2：`resolve`和`reject`需要定义为箭头函数，因为在executor中调用这两个函数的时候是独立调用，this指向全局，但是我们希望的是指向构造函数里的this（因为要修改状态和保存值）

```js
class Promise{
  constructor(executor) {
    //不能相信用户的输入，参数校验
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    //初始化值
    this.value = null    //终值
    this.reason = null    //拒因
    this.state = 'pending'   //状态

    const resolve = value => {
      //状态只能从 pending => 其他
      if(this.state === 'pending'){
        this.state = 'fulfilled'
        this.value = value
      }
    }

    const reject = reason => {
      //失败后的一系列操作（状态的改变，失败回调的执行）
      if(this.state === 'pending'){
        this.state = 'rejected'
        this.reason = reason
      }
    }
    executor(resolve,reject)
  }
}
```

### then方法初步实现

- 判断`onFulfilled`和`onRejected`是否是函数类型，不是函数类型（或者没传，undefined）就赋一个默认回调来达到**穿透（传递）效果**
- 只有状态改变后才能调用（状态为pending的时候不能调用）

```js
class Promise{
  constructor(executor) {
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.value = null  
    this.reason = null    
    this.state = Promise.PENDING   

    const resolve = value => {
      if(this.state === Promise.PENDING){
        this.state = Promise.FULFILLED
        this.value = value
      }
    }

    const reject = reason => {
      if(this.state === Promise.PENDING){
        this.state = Promise.REJECTED
        this.reason = reason
      }
    }
    executor(resolve,reject)
  }
  then(onFulfilled,onRejected){
    //参数校验
    if(typeof onFulfilled !== 'function'){
      onFulfilled = value => value
    }
    if(typeof onRejected !== 'function'){
      onRejected = reason => {throw reason}
    }
    
    //不能在状态改变前调用
    if(this.state === Promise.FULFILLED){
      onFulfilled(this.value)
    }
    //不能在状态改变前调用
    if(this.state === Promise.REJECTED){
      onRejected(this.reason)
    }
  }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
```

### 异步解决实现

- 原版promise的then方法中的回调是异步执行的，验证如下，所以实现的Promise的回调也要**异步执行**

```js
console.log(1)
const p = new Promise((resolve,reject)=>{
    console.log(2)
    resolve()
})
p.then(value=>{
    console.log(4)
},err=>{
    console.log(err)
})
console.log(3)

//这段代码的输出结果是1,2,3,4（原版Promise）
//但是放到上面一个小节中，输出结果是1,2,4,3，也就是说，then中的回调是立即执行了
```

- 在构造函数中的`executor`执行外面加`try...catch`解决在`executor`中抛出异常的问题
- 在then中添加**pending状态的判断**，将回调存入数组等到状态改变的时候执行，解决在`executor`中执行异步**，延迟修改状态导致then中的回调函数没有执行**的情况

```js
class Promise{
  constructor(executor) {
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.value = null
    this.reason = null
    this.state = Promise.PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if(this.state === Promise.PENDING){
        this.state = Promise.FULFILLED
        this.value = value
        //状态修改后执行（针对pending状态时存入的回调）
        this.onFulfilledCallbacks.forEach(fn=>fn())
      }
    }

    const reject = reason => {
      if(this.state === Promise.PENDING){
        this.state = Promise.REJECTED
        this.reason = reason
        //状态修改后执行（针对pending状态时存入的回调）
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
	//捕获executor中的异常
    try {
      executor(resolve,reject)
    }catch (e) {
      reject(e)
    }

  }
  then(onFulfilled,onRejected){
    if(typeof onFulfilled !== 'function'){
      onFulfilled = value => value
    }
    if(typeof onRejected !== 'function'){
      onRejected = reason => {throw reason}
    }

    if(this.state === Promise.FULFILLED){
      //将回调异步执行
      setTimeout(()=>{
        onFulfilled(this.value)
      })
    }

    if(this.state === Promise.REJECTED){
        //将回调异步执行
      setTimeout(()=>{
        onRejected(this.reason)
      })
    }
	
    //executor中异步修改状态，此时执行then的时候是pending状态，需要保存要执行的回调函数，等到状态修改后执行
    if(this.state === Promise.PENDING){
      this.onFulfilledCallbacks.push(()=>{
          //将回调异步执行
        setTimeout(()=>{
          onFulfilled(this.value)
        })
      })
      this.onRejectedCallbacks.push(()=>{
          //将回调异步执行
        setTimeout(()=>{
          onRejected(this.reason)
        })
      })
    }
  }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'

module.exports = Promise
```

### 链式调用实现

- then返回值是一个新的promise 

![image-20220122202151395](https://cdn.u1n1.com/img/picgo202204152343106.png)

- promise解决过程
  - 如果`x === promise2`
  - 如果`x instanceof Promise`
  - 如果 `x是object || x是function` 

![image-20220122203022509](https://cdn.u1n1.com/img/picgo202204152343107.png)

- 如果then回调的返回值x是promise，并且这个promise的resolve中又返回一个promise，那么promise2的结果由这个resolve中的promise决定。（，状态移交，很细节！！！！）

![image-20220122204646367](https://cdn.u1n1.com/img/picgo202204152343108.png)

```js
class Promise{
  constructor(executor) {
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.value = null
    this.reason = null
    this.state = Promise.PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if(this.state === Promise.PENDING){
        this.state = Promise.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn=>fn())
      }
    }

    const reject = reason => {
      if(this.state === Promise.PENDING){
        this.state = Promise.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }

    try {
      executor(resolve,reject)
    }catch (e) {
      reject(e)
    }

  }
  then(onFulfilled,onRejected){
    //如果onFulfilled不是函数，且promise1成功执行，promise2必须返回相同的终值(状态为fulfilled)
    if(typeof onFulfilled !== 'function'){
      onFulfilled = value => value
    }
    //如果onRejected不是函数，且promise1拒绝执行，promise2必须返回相同的拒绝原因(状态为rejected)
    if(typeof onRejected !== 'function'){
      onRejected = reason => {throw reason}
    }
    let promise2 = new Promise((resolve,reject)=>{

      if(this.state === Promise.FULFILLED){
        setTimeout(()=>{
          //如果onFulfilled或onRejected执行时抛出一个异常e，则返回的promise必须拒绝执行，并返回拒因e
          try{
            //如果有返回值，则执行promise解决过程
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve, reject)
          }catch (e){
            reject(e)
          }
        })
      }

      if(this.state === Promise.REJECTED){
        setTimeout(()=>{
          try {
            const x = onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve, reject)
          }catch (e) {
            reject(e)
          }
        })
      }

      if(this.state === Promise.PENDING){
        this.onFulfilledCallbacks.push(()=>{
          setTimeout(()=>{
            try {
              const x = onFulfilled(this.value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            }catch (e){
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            try {
              const x = onRejected(this.reason)
              Promise.resolvePromise(promise2, x, resolve, reject)
            }catch (e){
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}
Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'rejected'
Promise.resolvePromise = function(promise2,x,resolve,reject){

  //如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise（形成了链式调用）
  if(promise2 === x){
    reject(new TypeError('Chaining cycle detected for promise'))
  }
    
  //标记如果x是对象或函数且有then方法时，回调只能调一次，避免出现{then(a,b){ a() ;a() }}多次调用，多次执行的情况
  let flag = false
  //如果返回值x是promise类型，那么then返回的promise的类型与这个promise的执行结果一致
  if(x instanceof Promise){
    //什么时候执行结束?执行了x.then中的回调的时候说明promise（x）中的executor执行结束了
    x.then(value=>{
      //这里不应该简单的执行resolve，因为如果x的resolve的参数是一个promise对象的话，promise2的结果由这个参数决定
      Promise.resolvePromise(promise2,value,resolve,reject)
    },reason=>{
      reject(reason)
    })
  }
  //如果x是对象或者是函数，注意：null也是object类型，所以要特判不能为null
  else if(x !== null && (typeof x === 'object' || typeof x === 'function')){
    //可能x对象的then方法中会抛出异常
    try{
      //规范要求我们先将x.then存储到then中，避免重复从对象中取值
      const then = x.then
      //判断是不是thenable对象（有then方法的对象）
      if(typeof then === 'function'){
        then.call(
            x,
            value => {
              if(flag) return
              flag = true
              Promise.resolvePromise(promise2,value,resolve,reject)
            },
            reason =>{
              if(flag) return
              flag = true
              reject(reason)
            })
      }else{
        if(flag) return
        flag = true
        //不是thenable对象的话，就是普通对象，直接resolve
        resolve(x)
      }
    }catch (e) {
      if(flag) return
      flag = true
      reject(e)
    }
  }
    //是普通值
  else{
    resolve(x)
  }
}

```

### 总结

到目前为止，符合promise/A+规范的promise就实现了（**但是并不包括resolve和rejectz中的状态移交**，可能这只是ECMA新增的东西吧，就好像promise的一些静态方法一样是ECMA拓展的）

- 实现promise各种`api`的核心是实现then方法，then方法本应有两个参数，如果某个参数没有或者不是函数类型，那么会赋**默认的回调函数**，这个默认的回调函数是then能够**传递**promise状态和值的核心
- 只要是执行回调函数的地方，都应该写成**异步执行**，并且try...catch捕获可能出现的异常（executor是同步执行的，不用异步）
- 另一个核心就是`promiseResolve`方法的实现，这个方法是**链式调用**的核心，决定了then方法返回的promise的状态。

# 15、iterator-generator

## iterator

迭代器是一个对象，实现了`[Symbol.iterator]()`方法的对象是**可迭代对象**，这个方法会返回迭代器。迭代器这个对象要求有`then`方法，且返回值是`{done:boolean,value:any}`的对象

![image-20220123151216837](https://cdn.u1n1.com/img/picgo202204152343109.png)

> 注意：next是一个无参函数或者有一个参数的函数

### 迭代器初体验

```js
 const names = [1,2,3]
//获取names数组对象内部的迭代器对象
const iterator = names[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

let index = 0
const it = {
  next(){
    // return { done:false , value: 1}
    // return { done:false , value: 2}
    // return { done:false , value: 3}
    // return { done:true , value: undefined}
    //当超出数组下标的时候，done是true，value是undefined
    return index < names.length?
        {value:names[index++],done:false}:{value:undefined,done:true}
  }
}
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

### 生成迭代器的函数

```js
function createArrayIterator(arr){
  let index = 0
  return {
    next:function(){
      return index < arr.length?
          {value:arr[index++],done:false}:{value:undefined,done:true}
    }
  }
}
const names = [1,2,3]
const it = createArrayIterator(names)
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

### 可迭代对象

![image-20220123160957310](https://cdn.u1n1.com/img/picgo202204152343110.png)

> 可迭代对象要求有一个函数名为`Symbol.iterator`的函数，这个函数**返回的是迭代器对象**，而迭代器的要求是要有next方法，**next方法的返回值包括done和value两个属性**

```js
const iterableObj = {
  names:[1,2,3],
  [Symbol.iterator]:function(){
    let index = 0
    let iterator = {
 //注意，这里不能写成function，因为返回的迭代器对象调用next方法时，是通过对象.next隐式绑定的，this指向的是迭代器对象
 // 而返回的迭代器对象中没有names，所以我们要写成箭头函数，将this绑定为可迭代对象的[Symbol.iterator]函数中的this
 //因为这个函数也是通过对象[Symbol.iterator]隐式绑定的，而箭头函数this的指向这个function的this，进而箭头函数的this指向的是iterableObj对象
      next:()=>{
        return index < this.names.length ?
            { done: false , value: this.names[index++]}: { done: true , value: undefined }
      }
    }
    return iterator
  }
}
const iterator = iterableObj[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

//for..of只能遍历可迭代对象，本质上调用的是可迭代对象的[Symbol.iterator]函数返回的迭代器的next()方法
//直到next方法返回的done为true的时候停止迭代
//是上面调用方式的语法糖
for (const item of iterableObj) {
  console.log(item)
}
```

### 原生的可迭代对象

![image-20220123164428460](https://cdn.u1n1.com/img/picgo202204152343111.png)

### 可迭代对象的应用场景

> 注意，是可迭代对象！而不是迭代器

#### for..of

```js
const arr = [1,2,3]
//普通对象是不能用for..of的
const obj = {name:'jzsp'}
for(const item of arr){
    console.log(item)
}
```

#### 展开语法

```js
const arr = [1,2,3]
const obj = {name:'jzsp'}

console.log(...arr)

//普通对象是不能直接展开的，会报错
// console.log(...obj)

//注意，这个是对象中用展开语法，是es9新增的，本质上用的不是迭代器
console.log({...obj})
```

#### 解构

```js
const arr = [1,2,3]
const obj = {name:'jzsp'}

const [v1,v2,v3] = arr
//注意，这个本质上用的不是迭代器，是es9新增语法
const { name } = obj

```

#### 创建可迭代对象时传入可迭代对象

```js
const set = new Set([1,2,3])
console.log(set)
```

#### 其他一些可以传入迭代器的api例举

`Promise.all`

![image-20220123165539638](https://cdn.u1n1.com/img/picgo202204152343112.png)

`Array.from`

![image-20220123165640752](https://cdn.u1n1.com/img/picgo202204152343113.png)

### 自定义类实现可迭代的案例

![image-20220123170102340](https://cdn.u1n1.com/img/picgo202204152343114.png)

```js
class classromm{
  constructor(address,name,students) {
    this.address = address
    this.name = name
    this.students = students
  }
  entry(newStudent){
    this.students.push(newStudent)
  }
  //在对象的原型链上添加[Symbol.iterator]方法
  [Symbol.iterator](){
    let index = 0
    return {
      next:()=>{
        return index < this.students.length ?
            {done:false,value:this.students[index++]}:{done:true,value:undefined}
      }
    }
  }
}
const room = new classromm('台州','九折水瓶',[1,2,3])
for (const roomElement of room) {
  console.log(roomElement)
}
```

### 迭代器的中断（return方法）

![image-20220123171401138](https://cdn.u1n1.com/img/picgo202204152343115.png)

```js
class classromm{
  constructor(address,name,students) {
    this.address = address
    this.name = name
    this.students = students
  }
  entry(newStudent){
    this.students.push(newStudent)
  }
  [Symbol.iterator](){
    let index = 0
    return {
      next:()=>{
        return index < this.students.length ?
            {done:false,value:this.students[index++]}:{done:true,value:undefined}
      },
      //如果迭代过程被break掉了，会进入迭代器的return函数，这个函数要求返回的也是一个具有done和value属性的对象
      return:()=>{
          console.log('迭代器提前结束啦')
          return {done:true,value:undefined}
      }
    }
  }
}
const room = new classromm('台州','九折水瓶',[1,2,3])
for (const roomElement of room) {
    //提前结束迭代器
    if(roomElement === 2) break;
 	 console.log(roomElement)
}
```

![image-20220123171056192](https://cdn.u1n1.com/img/picgo202204152343117.png)

## generator

### 生成器和生成器函数

- **生成器**是ES6新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行。生成器是**特殊的迭代器**，可以调用next方法
- **生成器函数**是一个函数，但是与普通的函数比有区别
  - 生成器函数需要在`function`后面加*
  - 生成器函数内部可以通过`yield`关键字来控制函数的执行流程
  - 生成器函数的返回值是`generator`**生成器对象**

### 生成器函数的执行流程

- 遇到yield暂停，next的返回值中done是false
- 遇到return停止（return是特殊的yield）next的返回值中done是true
- 第`i`次next返回的对象中的value值 是 第`i`次yield操作符后的值

```js
function* foo(){
  console.log(1)
  yield
  console.log(2)
  yield
  console.log(3)
  yield   'jzsp'
  console.log(4)

  return '我是返回值'
}

//调用生成器函数获取生成器对象
let generator = foo()

//调用next执行代码，直到碰到yield停止。
generator.next()

//如果函数碰到yield停止了，可以再次调用next，直到再次碰到yield停止
generator.next()

//因为生成器generator是特殊的迭代器，有next方法，返回值的格式跟迭代器一样
//value是yield关键字后面跟着的值（或者是return的值）
//done的话，如果当前next没有被yield关键字暂停执行，也就是说后面没有yield，那么done就为true
console.log(generator.next())   //{ value: 'jzsp' done: false }

//done为true的时候，也就是函数执行结束的时候，value的值是函数return的值（默认是undefined）
console.log(generator.next())   //{ value: '我是返回值', done: true }


```

### next传参

第`i`次调用next时传的参数，会作为第`i-1`次`yield`表达式的**返回值**。

第一段（第一个yield前）代码需要传值的话，可以在调用生成器函数的时候传入

![image-20220123194610331](https://cdn.u1n1.com/img/picgo202204152343118.png)

### return终止执行

```js
function* foo(){
  console.log(1)
  const n = yield
  
  // return n
  console.log(n)
  yield

  console.log(3)
  yield   'jzsp'

  console.log(4)
  return '我是返回值'
}

let generator = foo()

generator.next()
//return是可以传入参数的，功能跟next一样，是作为上一个yield的返回值
//调用return方法的话，相当于在第i-1个yield后面加上了return n
//返回值是{done : true , value : 15}
console.log(generator.return(15))
```

### throw抛出异常

```js
function* foo(){
  console.log(1)
  try {
    yield
  }catch (e) {
    console.log("捕获到异常",e)    //捕获到异常 err msg
  }

  console.log(2)
  yield

  console.log(3)
  yield   'jzsp'


  console.log(4)
  return '我是返回值'
}


let generator = foo()
generator.next()
//给第i-1个yield抛出异常，如果有捕获异常，那么代码可以正常执行（执行catch内部的方法，如果catch内部没有yield就继续向后执行）直到遇到下一个yield
//如果没有捕获异常，代码报错
console.log(generator.throw('err msg'))  //{ value: undefined, done: false }
```

### 用生成器代替迭代器（yield*)

> 生成迭代器函数就是，传入要迭代的数据，返回能够迭代该数据的迭代器。生成器代替迭代器的原理是，生成器用yield可以实现暂停效果，用next可以实现迭代效果，并且next返回对象中的**done属性会根据yield的迭代情况自动判断**，**value属性就是yield关键字后的值**

```js
function createArrayIterator(arr){
  let index = 0
  return {
    next:function(){
      return index < arr.length?
          {value:arr[index++],done:false}:{value:undefined,done:true}
    }
  }
}

//代替写法
function* createArrayIterator(arr){
	//第一种写法
    for(const item of arr){
        yield item
    }
    
    //第二种写法：yield*后面跟着的是可迭代对象，每次调用next的时候会迭代一次可迭代对象
    yield* arr
}
```

#### 案例1

> 创建一个函数，这个函数可以迭代一个范围内的数字

```js
function createArrayIterator(begin,end){
  let index = begin
  return {
    next:function(){
      return index <= end ?
          {value:index++,done:false}:{value:undefined,done:true}
    }
  }
}
const a = createArrayIterator(10,13)
//注意，迭代器不代表是可迭代对象，可迭代对象是实现了[Symbol.iterator]()函数的对象
//for..of遍历的是可迭代对象
//我真蠢。。
// for (const item of a) {
//   console.log(item)
// }
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
```

用生成器代替迭代器

```js
function* createArrayIterator(begin,end){
  let index = begin
  while(index <= end){
    yield index++
  }
}
const a = createArrayIterator(10,13)
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log(a.next())
```

#### 案例2

> 前面的classroom的案例，用生成器代替迭代器的实现

```js
class classromm{
  constructor(address,name,students) {
    this.address = address
    this.name = name
    this.students = students
  }
  entry(newStudent){
    this.students.push(newStudent)
  } 
    
  //生成器函数
  [Symbol.iterator] = function *(){
      yield* this.students
  }
  //也可以这样定义生成器函数
  *a(){
      
  }
}
const room = new classromm('台州','九折水瓶',[1,2,3])
for (const roomElement of room) {
  console.log(roomElement)
}
```



## 概念总结

- iterator迭代器对象是一个对象，这个对象必须有then方法，且这个方法的返回值是`{done:boolean,value:any}`形式的对象。
- 实现了`[Symbol.iterator]()`方法的对象是**可迭代对象**，这个方法返回一个迭代器对象
- for..of遍历的是**可迭代对象**，而不是迭代器对象



- 生成器函数是`function`后面有符号*的函数，生成器函数的执行结果是**生成器对象**
- 生成器对象是特殊的`iterator`对象，也有`then`方法，通过`then`方法与`yield`操作符控制生成器函数的执行与暂停
- **第`i`个yield后面跟着的值是第`i`个then方法返回的对象的value属性的值**
- **第`i`个then方法传入的参数是第`i-1`个yield操作符的返回值**

# 16、async/await

## async函数

在声明函数前加上async关键字就可以变成async函数。

> 注意，加上async关键字不代表函数就变成异步的了，在函数内部**正常写**的话，跟普通函数没有太大区别

```js
async function foo(){
    console.log(2)
}
console.log(1)
foo()
console.log(3)
//输出顺序是123，说明foo并没有变成异步函数
```

> async函数的返回值一定是一个promise，这个返回的promise由async函数return的内容决定。

- 如果return的是**thenable对象**，那么返回的promise的值由这个thenable对象的then函数执行结果决定
- 如果return的是**promise**，那么返回的promise的值由这个promise的值决定
- 如果return的是**普通值**，那么返普通值会作为返回的promise的**resolve**值
- 如果在async函数内**抛出异常**，那么异常值会作为返回的promise的**reject**值

```js
async function foo(){
  console.log(2)
  throw 1
}
foo().then(res=>{
  console.log('res',res)
},err=>{
  console.log('err',err)
})
```

## await关键字

await关键字后面经常跟上一个**promise（或者thenable的对象）**，当这个promise状态没有改变（一直是pending的时候），下面的代码都不会执行。等到promise状态改变的时候，会将promise的值取出作为await关键字的返回值，然后可以继续执行后面的代码。**（如果是普通值，就直接作为await的关键字的返回值）**

```js
function request(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      //我们默认是成功的
      resolve(111)
    },2000)
  })
}
async function foo(){
  const res =  await request()
  console.log('----------',res)
  const res2 = await {
    then:function (resolve,reject){
        setTimeout(()=>{
          resolve(222)
        },2000)
    }
  }
  console.log('----------',res2)
}
foo()
```

> 如果await后的promise结果是**reject失败**的，那么会将reject的值作为整个async函数foo返回的promise的reject的值，**并且不会向下执行**

```js
function request(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      reject(111)
    },2000)
  })
}
async function foo(){
  const res =  await request()
  //不会向下执行
  console.log(res)
}
foo().catch(err=>{
	console.log(err)
})
```

> await关键字是语法糖（**yield后面是Promise的话，会在promise执行结束的时候将promise封装在`next()`返回的对象的value属性中，想执行下一步需要调用next方法；await后面是Promise的话，会在promise执行结束时取出Promise的值作为await关键字的返回值，并且将下面的代码放到promise的then方法中执行**），await关键字后面的代码**本质上是在当前await返回的Promise的then方法中执行的**，也就是说，await后面的代码是放到**微任务**中执行的。需要注意的是，await后如果跟着的是常数，await关键字下面的代码本质上还是会被放到微任务中。

## 解决异步问题

> 现在想**模拟**的是，发送一个字符串给服务器，服务器将这个返回，我们再将这个返回的字符串拼接上aaa再发送，服务器再返回，我们再拼接上bbb再发送，服务器再返回。下面是模拟请求的函数。

```js
function request(url){
	return new Promise((resolve,reject)=>{
          setTimeout(()=>{
              //我们默认是成功的
			resolve(url)
          },3000)
    })
}
```

### 方法1：promise链式调用

```js
//then将返回的promise给return出去，
request('111').then(res=>{
    return request(res+'aaa')
}).then(res=>{
    return request(res+'bbb')
}).then(res=>{
    console.log(res)
})
```

### 方法2：promise+generator（async和await的原理）

```js
function* getData(){
  const res1 = yield request("111")
  const res2 = yield request(res1+'aaa')
  const res3 = yield request(res2+'bbb')
  return res3
}

//手动执行（回调地狱）
//第一次next获取到第一个yield返回的promise
//第二次next传入第一个promise值，这个值会作为第一个yield的返回值res1
const gen = getData()
gen.next().value.then(res=>{
  gen.next(res).value.then(res=>{
    gen.next(res).value.then(res=>{
      console.log(res)
    })
  })
})
//自动执行，传入生成器函数对象，在内部通过递归自动执行
function execGenerator(fn){
  const gen = fn()
  function exec(v){
    //先调用next获取返回值
    //第i个then方法传入的参数是第i-1个yield操作符的返回值
    //第i个then方法的返回对象的value属性是第i个yield操作符后的值
    const res = gen.next(v)
    //判断是否迭代完成
    if(res.done){
      return res
    }
    //没迭代完成的话，就取出返回值（对象）中的value（promise），在then中取出promise的值，递归调用
    res.value.then(res=>{
      exec(res)
    })
  }
  exec()
}execGenerator(getData)
```

### 方法3：`async/await+promise`

> 本质上是generator+promise的语法糖

```js
async function getData(){
  const res1 = await request("111")
  const res2 = await request(res1+'aaa')
  const res3 = await request(res2+'bbb')
  return res3
}
```

# 17、node事件循环，微任务和宏任务

## js线程

![image-20220124142812159](https://cdn.u1n1.com/img/picgo202204152343119.png)

因为js是单线程的，代码从上往下执行，但是可能会有一些特殊的东西（回调函数），**并不是从头到尾执行的**，因为回调函数可能包裹在setTImeout中，等到时间到了再执行回调，或者是在then方法中，等到promise状态改变了再执行回调。那么为了准备执行这些函数，**因为js是单线程的，一次只能执行一个函数**。我们现在要研究的就是，**到底哪个回调函数会先执行（在调用后）**。这里就涉及到**事件队列以及事件循环**了。

![image-20220124143623437](https://cdn.u1n1.com/img/picgo202204152343120.png)

## 浏览器事件循环

示例代码如下：

```js
console.log(1)
setTimeout(()=>{
    console.log(3)
},3000)
console.log(2)
```

事件循环是指，在js线程遇到耗时的异步操作时，将操作交给浏览器的其他线程来执行，等到耗时操作完成时，浏览器其他线程将回调函数加入事件队列（事件队列是浏览器维护的一个队列），js线程会从事件队列中取出回调函数压入调用栈进行执行。**这个过程形成了一个闭环，这个闭环成为浏览器的事件循环**

![image-20220124145552674](https://cdn.u1n1.com/img/picgo202204152343121.png)

## 事件队列

**事件队列本质上由两个队列组成**

- 宏任务队列包括：**Ajax**，定时器，DOM**事件监听**，UI Rendering等一些列`api`中的**回调函数**
- 微任务队列包括：**queueMicrotask**，`Promise.then`，await后的函数 

![image-20220124150656887](https://cdn.u1n1.com/img/picgo202204152343122.png)

**事件循环对两个队列的优先级是怎样的呢？**

先让js线程执行main script的代码（顶层代码），等到**执行完顶层代码后**，从事件队列中取回调函数执行。**在执行宏任务之前会先看看微任务队列中是否有任务需要执行**

- 也就是说，宏任务执行前，必须保证微任务队列是空的
- 如果微任务队列不为空，就优先执行微任务队列中的回调函数



## node事件循环

LIBUV库是实现事件循环的核心。下面图的意思是，在js代码中，有类似setTImeout的函数，交给v8引擎，v8引擎将操作交给LIBUV中的其他线程执行，执行结束之后将回调函数压入事件队列中，然后v8从中获取回调函数进行执行

![image-20220124182932317](https://cdn.u1n1.com/img/picgo202204152343123.png)

node之所以能写后端就是因为这个LIBUV这个库，它可以执行很多操作，例如IO，网络请求等，执行结束之后将传入的回调函数压入事件队列，然后引擎从事件队列中获取回调进行执行。**事件循环更像是一个桥梁，是连接着系统调用之间的渠道**

### node事件循环的阶段

> 注意：setTimeout和setInterval优先于setImmediate
>

![image-20220124183838336](https://cdn.u1n1.com/img/picgo202204152343124.png)

### node的宏任务和微任务

微任务和宏任务内部其实是有很多队列的。下面截图中是按照优先级从**高到低来往下排列的**

![image-20220124184744357](https://cdn.u1n1.com/img/picgo202204152343125.png)

## 面试题1

```js
setTimeout(function(){
  console.log('setTimeout1')
  new Promise(resolve => {
    resolve()
  }).then(()=>{
    new Promise(resolve=>{
      resolve()
    }).then(()=>{
      console.log('then4')
    })
    console.log('then2')
  })
})

new Promise(resolve => {
  console.log('promise1')
  resolve()
}).then(()=>{
  console.log("then1")
})

setTimeout(()=>{
  console.log('setTImeout2')
})

console.log(2)

queueMicrotask(()=>{
  console.log("queueMicrotask1")
})

new Promise(resolve=>{
  resolve()
})
```

------

解析：代码从上往下执行

- main script执行到第一个`setTImeout`的时候，会将`setTimeout`内部的整个`function`加入宏任务队列
- main script执行到第一个`new Promise`的时候，会立即执行`Promise`的`executor`，**输出promise1**，并且将`then`后面的回调函数加入微任务队列
- main script执行到第二个`setTImeout`的时候，会将`setTimeout`内部的整个`function`加入宏任务队列
- main script执行到`console.log(2)`的时候，会直接**输出2**
- main script执行到`queueMicrotask`时，会将`queueMicrotask`内部的整个`function`加入微任务队列
- main script执行到第二个`new Promise`的时候，会立即执行resolve

此时main script执行结束，任务队列情况如下

![image-20220124153946893](https://cdn.u1n1.com/img/picgo202204152343126.png)

------

紧接着，要从任务队列中调取回调函数进行执行。在掉宏任务队列中的任务前，需要将微任务队列中的任务全部执行

![image-20220124154138286](https://cdn.u1n1.com/img/picgo202204152343127.png)

------

然后执行第一个宏任务：

- 执行到`console.log('setTimeout1')`时，直接**输出`setTimeout1`**
- 执行到`new Promise`时，直接执行executor中的`resolve()`，然后将后面的then中的整个函数加入微任务队列，第一个宏任务执行完毕。

![image-20220124154654895](https://cdn.u1n1.com/img/picgo202204152343128.png)

------

此时微任务队列中有任务，需要先执行微任务：

- 执行到`new Promise`的时候，直接执行`resolve()`，并将后面的`then`中的回调函数放入微任务队列中，执行到`console.log('then2')`的时候，直接**输出then2**。此时微任务执行完毕

![image-20220124154950269](https://cdn.u1n1.com/img/picgo202204152343129.png)

------

微任务队列还有任务，继续执行微任务：

- 执行到`console.log('then4')`的时候，**输出then4**，此时微任务执行完毕

![image-20220124155123229](https://cdn.u1n1.com/img/picgo202204152343130.png)

------

执行宏任务队列中的任务：

- 执行到`console.log('setTimeout2'`)时，直接输出`setTimeout2`，此时宏任务结束

![image-20220124155304198](https://cdn.u1n1.com/img/picgo202204152343131.png)

------

验证

![image-20220124155655406](https://cdn.u1n1.com/img/picgo202204152343132.png)

## 面试题2

```js
async function async1 (){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2(){
  console.log('async2')
}

console.log('script start')

setTimeout(()=>{
  console.log('setTimeout')
},0)

async1()

new Promise(resolve=>{
  console.log('promise1')
  resolve()
}).then(()=>{
  console.log('promise2')
})

console.log('script end')
```

解析：代码从上往下执行

- main script，前面两个async函数声明
- main script，执行到`console.log('script start')`，**输出`script start`**
- main script，执行到第一个`setTImeout`时，将`function`加入宏任务
- main script，执行到`async1()`时
  - 执行到`console.log('async1 start')`时，**输出`async1 start`**
  - 执行到`await async2()`时
    - 执行到`console.log('async2')`时，**输出`async2`**，`async2`函数没有`return`，默认将`Promise.resolve(undefined)`这个promise对象返回
  - 执行完`await asyn2()`后，**将await下面的代码加入微任务中**
- main script，执行到`new Promise`时，立即执行executor中的函数。**输出`promise1`**，执行`resolve()`，将then中的函数加入微任务中
- main script，执行到`console.log('script end')`时，**输出`script end`**

![image-20220124164433305](https://cdn.u1n1.com/img/picgo202204152343133.png)

------

按照优先级，先执行微任务队列中的回调函数

- 执行`console.log('async1 end')`时，**输出`async1 end`**
- 执行`console.log('promise2')`时，**输出`promise2`**

![image-20220124164742260](https://cdn.u1n1.com/img/picgo202204152343134.png)

------

执行宏任务队列

- 执行`console.log('setTimeout')`时，**输出`setTimeout`**

![image-20220124164837867](https://cdn.u1n1.com/img/picgo202204152343135.png)

------

验证

![image-20220124164854085](https://cdn.u1n1.com/img/picgo202204152343136.png)

## 面试题3△

```js
Promise.resolve().then(()=>{
  console.log(0);
  return 4
  //如果return的是一个thenable的对象，那么会延迟一个微任务
  //如果return的是Promise.resolve(4)  (promise对象)，那么会延迟两个微任务
}).then(res=>{console.log(res)})

Promise.resolve().then(()=>{
  console.log(1)
}).then(()=>{
  console.log(2)
}).then(()=>{
  console.log(3)
}).then(()=>{
  console.log(5)
}).then(()=>{
  console.log(6)
})
```

解析：代码从上往下执行

- main script执行完第一个`Promise.resolve`时，将`后面第一个then`内的函数存入微任务队列
- main script执行完第二个`Promise.resolve`时，将`后面第一个then`内的函数存入微任务队列，此时main script结束

![image-20220124181747437](https://cdn.u1n1.com/img/picgo202204152343137.png)

------

执行微任务队列中的任务：

- 执行到`console.log(0)`时，`输出0`
- 执行完return 4，将后面then内的函数加入微任务，此时微任务结束

![image-20220124182037866](https://cdn.u1n1.com/img/picgo202204152343138.png)

------

继续执行任务队列中的任务

- 执行到`console.log(1)`时，`输出1`，**将后面then内的函数加入微任务**，此时微任务结束		

![image-20220124182225817](https://cdn.u1n1.com/img/picgo202204152343139.png)

------

继续执行微任务中的任务

- 执行到`console.log(res)`时，输出4，微任务结束

![image-20220124182327909](https://cdn.u1n1.com/img/picgo202204152343140.png)

。。。。

答案是0,1,4,2,3,5,6

## 面试题4

> node中事件队列的优先级看node中的宏任务和微任务部分

代码如下，左侧的两个截图是上面显示不下的部分。右侧的标注是main script执行结束时输出的情况，以及按照执行优先级从左往右越来越低的顺序排列的事件队列（**图中最右边应该还有一个宏任务队列给setImmediate**）。事件队列中上面是队首

![image-20220124185450791](https://cdn.u1n1.com/img/picgo202204152343141.png)

![image-20220124190239799](https://cdn.u1n1.com/img/picgo202204152343142.png)

## 面试题5

![image-20220127145204631](https://cdn.u1n1.com/img/picgo202204152343143.png)

输出是1、3、4、2

原因是，**then中的函数会立即执行，放入微任务队列的是`undefined`**（也就是`console.log()`的返回值)

# 18、模块化

![image-20220124203140183](https://cdn.u1n1.com/img/picgo202204152343144.png)

## 最早期的模块化

​		最早的模块化是利用**函数的作用域**来实现的。将业务代码放在立即执行函数中，将要暴露的函数或者变量保存到一个变量中返回。全局有了返回的这么一个对象，别的模块想使用这个模块中的变量或者函数时就可以从这个对象中引用。

将本模块中的name和age导出

![image-20220124202113741](https://cdn.u1n1.com/img/picgo202204152343145.png)

在其他模块中使用上面这个模块导出的变量

![image-20220124202207781](https://cdn.u1n1.com/img/picgo202204152343146.png)

全局引入这两个js文件

![image-20220124202130486](https://cdn.u1n1.com/img/picgo202204152343147.png)

**但是仍然有以下几个缺点**

- 全局是有变量指向每个模块导出的对象的，这时候就可能导致全局的变量**命名冲突问题**

![image-20220124203214064](https://cdn.u1n1.com/img/picgo202204152343148.png)

## CommonJS模块化

### 模块化导出

![image-20220124204002963](https://cdn.u1n1.com/img/picgo202204152343149.png)

#### 通过exports.xxx暴露（基本上不用）

- 在modules文件夹下定义模块，并且用exports.xxx暴露obj对象，被暴露的内容最终都会作为exports的属性被封装在exports对象中

![image-20211210155913020](https://cdn.u1n1.com/img/picgo202204152343150.png)

- 在commonjs01.js文件中require这个自定义的模块并且输出，注意要使用完整包名（可以省略js后缀）
  可以看到jzsp是一个对象，里面有我们暴露出来的req对象（这个属性名是暴露是的.xxx来决定的），req对象中有我们封装的get和post方法

![image-20211210160116203](https://cdn.u1n1.com/img/picgo202204152343151.png)

![image-20211210160120679](https://cdn.u1n1.com/img/picgo202204152343152.png)

- 想调用内部的方法的话

![image-20211210160242741](https://cdn.u1n1.com/img/picgo202204152343153.png)

![image-20211210160247923](https://cdn.u1n1.com/img/picgo202204152343154.png)

- exports.xxx可以在exports对象中封装很多内容

![image-20211210160541383](https://cdn.u1n1.com/img/picgo202204152343155.png)

![image-20211210160547499](https://cdn.u1n1.com/img/picgo202204152343156.png)



#### 通过module.exports暴露

修改暴露数据的代码

![image-20211210160620516](https://cdn.u1n1.com/img/picgo202204152343157.png)

在commonjs01中require获取的内容直接就是这个暴露的obj对象了，外面没有套一层exports

![image-20211210160731363](https://cdn.u1n1.com/img/picgo202204152343158.png)

#### exports和module.exports的关系

**这两种使用方式是等价的**

![image-20220124210745300](https://cdn.u1n1.com/img/picgo202204152343159.png)

exports源码的实现是这样的

![image-20220124212819543](https://cdn.u1n1.com/img/picgo202204152343160.png)

```js
module.exports = {}
exports = module.exports
//exports跟module.exports指向的是同一个对象
//所以通过exports.xxx给这个对象赋值的话，因为module.exports指向的也是这个对象，那么module.exports也会发生变化
//但是不能直接用exports = { obj }来导出，这样的话exports就不指向module.exports了，导出的仍然是空对象
```

> **最终导出的一定是module.exports指向的对象，除非改变exports的指向，不然exports和module.exports指向的一定是同一个对象**

![image-20220124212514059](https://cdn.u1n1.com/img/picgo202204152343161.png)

#### 引入node_modules文件夹中的内容

引入node_modules文件夹中的内容不需要写完整路径和index.js，只需要写包名，就会自动引入对应包下的index.js文件

<img src="https://cdn.u1n1.com/img/picgo202204152343162.png" alt="image-20211210162057906" style="zoom: 67%;" />

注意，一定是对应的index.js文件，如果对应（例如axios）包下没有index文件，就会报错

![image-20211210163042029](https://cdn.u1n1.com/img/picgo202204152343163.png)

解决办法是，在对应的包的目录下，终端输入`npm init`初始化项目配置文件，里面的main就是入口文件

**这是因为，如果对应包下有package.json文件的话，会优先根据main的值去查找对应的文件**

<img src="https://cdn.u1n1.com/img/picgo202204152343164.png" alt="image-20211210163255873"  />

<img src="https://cdn.u1n1.com/img/picgo202204152343165.png" alt="image-20211210163326562"  />

#### 思考

exports，module.exports 和require返回的对象，三者都指向同一个对象（也就是暴露源暴露出来的对象）

![image-20220124213039832](https://cdn.u1n1.com/img/picgo202204152343166.png)

### 模块化导入

![image-20220125180736164](https://cdn.u1n1.com/img/picgo202204152343167.png)

![image-20220125181107347](https://cdn.u1n1.com/img/picgo202204152343168.png)

![image-20220125181450794](https://cdn.u1n1.com/img/picgo202204152343169.png)

![image-20220125181525988](https://cdn.u1n1.com/img/picgo202204152343170.png)

### 模块的加载过程

- 结论一：模块在第一次被引入，模块中的js代码会运行一次

![image-20220125182224642](https://cdn.u1n1.com/img/picgo202204152343171.png)

![image-20220125182147864](https://cdn.u1n1.com/img/picgo202204152343172.png)

- 结论二：模块在被多次引入时，**会缓存**，最终只加载（运行）一次
  - 为什么只会加载运行一次呢？
  - 这是因为每个模块对象module都有一个属性：loaded
  - 为false表示还没有加载，为true表示已经加载

![image-20220125182543659](https://cdn.u1n1.com/img/picgo202204152343173.png)

### 总结

![image-20220125183234134](https://cdn.u1n1.com/img/picgo202204152343174.png)

## ES module

### 注意事项

- 在没有webpack的情况下，导入文件要输入后缀，否则会报错（webpack在没后缀的时候会自动加后缀）

![image-20220125185952748](https://cdn.u1n1.com/img/picgo202204152343175.png)

- import和export必须在模块中才能使用，所以在script引入的时候需要加type

![image-20220125190045204](https://cdn.u1n1.com/img/picgo202204152343176.png)

否则会报错

![image-20220125190106177](https://cdn.u1n1.com/img/picgo202204152343177.png)

- 不能直接点击html文件打开，要开启live-server打开（vscode）

下面这个是直接打开html文件

![image-20220125190257641](https://cdn.u1n1.com/img/picgo202204152343178.png)

下面这个是开启live-server打开html

![image-20220125190337957](https://cdn.u1n1.com/img/picgo202204152343179.png)

### 导出方式

- export 声明语句

```js
//第一种导出方式
export const name = 'wjj'
export function aaa(){
    
}
export class Person{
    
}
```

- export  {  }

```js
const name = 'wjj'
function aaa(){
    
}
class Person{
    
}
//这里不是说导出的是对象，对象中有name，aaa，Person
//这个是export的语法，指明要导出的变量
//一定注意这里不是对象！！！
/*
    不要写成export {
        name:"wjj"
    }
*/
export {
	name,
    aaa,
    //这种导出方式还可以起别名
    //起别名之后，在导入的时候就只能用别名来使用导出的变量了
    Person as Fperson
}
```

- default默认导出

默认导出通常导出这个文件中最重要的内容，并且**默认导出只能有一个**

```js
const name = 'wjj'
function aaa(){
    
}
class Person{
    
}

export {
	name,
    aaa,	
    //默认导出的第一种方式
    //Person as default
}
//默认导出的第二种方式（常见）
export default Person
```



### 导入方式

- 普通导入

```js
//这里的大括号也不是对象的意思，是import的语法，指明要从模块中引入的变量
import {name,age} from './index.js'
```

- 普通导入+起别名

```js
//起别名防止与本模块中的变量发生命名冲突
import {name as otherName,age} from './index.js'
```

- 将导出的所有东西放到一个标识符中

```js
//*表示所有，as起别名，那么导出的所有内容都会被封装到foo对象中
import * as foo from './index.js'
```

- 导入默认导出的内容

![image-20220126134943551](https://cdn.u1n1.com/img/picgo202204152343180.png)

```js
//import后面跟的是默认导出的别名，也就是说可以通过xxx使用默认导出的内容
import xxx from './index'
```

- 导入js文件中的代码

```js
import './index'
```

![image-20220203223432244](https://cdn.u1n1.com/img/picgo202204152343181.png)

![image-20220203223439108](https://cdn.u1n1.com/img/picgo202204152343182.png)

![image-20220203223450412](https://cdn.u1n1.com/img/picgo202204152343183.png)

![image-20220203223521550](https://cdn.u1n1.com/img/picgo202204152343184.png)

### 导入导出结合

在一个文件夹下（例如自定义的utils）可能有很多的功能模块，如果都要使用的话需要一个一个`import`，此时我们可以新建一个`index.js`，在index.js中引入其他模块中导出的内容，再统一在index.js中导出。这样的话其他模块想使用utils中的所有功能模块的话就只需要导入一个index.js即可

> index.js相当于是所有模块的统一出口

![image-20220126133304488](https://cdn.u1n1.com/img/picgo202204152343185.png)

![image-20220126133530218](https://cdn.u1n1.com/img/picgo202204152343186.png)

也可以用下面这两种形式结合导入导出

![image-20220126133624630](https://cdn.u1n1.com/img/picgo202204152343187.png)

**这种用的较多**

![image-20220126133737693](https://cdn.u1n1.com/img/picgo202204152343188.png)

### import函数异步导入

前面介绍的多种import方式都是会阻塞js线程的，属于**同步**导入，而现在介绍的`import()`函数属于异步导入，这个函数的**返回值是一个`promise`。**

`import()`函数返回的promise的value中包括模块**所有export导出的内容**

![image-20220126140049889](https://cdn.u1n1.com/img/picgo202204152343189.png)

### 补充import对象的meta属性

这个import对象的meta属性中有有一个`url`属性，保存的是**当前模块所在的路径**

![image-20220126140739273](https://cdn.u1n1.com/img/picgo202204152343191.png)

### es module解析过程

![image-20220126141905362](https://cdn.u1n1.com/img/picgo202204152343192.png)

阶段一就是帮助我们下载js文件，然后转成对应的module record

![image-20220126142214665](https://cdn.u1n1.com/img/picgo202204152343193.png)

阶段二实例化分配内存空间的时候，仅仅解析代码中的import和export代码，也就是说，只是知道了export导出了name和age两个变量，所以在分配的内存空间（对象）中声明了两个变量，但是值为undefined

阶段三是运行代码，给模块的内存空间中的变量进行赋值。

> 导入的地方不能修改原来导出的内容的值（commonJS是可以修改的）

![image-20220126142400519](https://cdn.u1n1.com/img/picgo202204152343194.png)

## commonJS和ES module相互引用

![image-20220126142852000](https://cdn.u1n1.com/img/picgo202204152343195.png)

首先创建`test`文件夹，并且创建`src`文件夹，在`cd`到`test`文件夹根目录下，执行`npm init --yes`生成`package.json`文件。

![image-20220126143938016](https://cdn.u1n1.com/img/picgo202204152343196.png)

执行 `npm install webpack webpack-cli`安装`webpack`和`webpack-cli`（从`webpack4.x`之后使用`webpack`需要安装`webpack-cli`)

![image-20220126143948027](https://cdn.u1n1.com/img/picgo202204152343197.png)

在`src`文件夹下创建三个js文件，在`foo.js`中是`commonjs`导出。在`bar.js`中是`es module`导出

![image-20220126144414457](https://cdn.u1n1.com/img/picgo202204152343198.png)

![image-20220126144626198](https://cdn.u1n1.com/img/picgo202204152343199.png)

在index.js中分别用不同的方式导入

![image-20220126144647197](https://cdn.u1n1.com/img/picgo202204152343200.png)

用`npx webpack`指令打包，打包的结果文件会放在dist文件夹下

![image-20220126144729048](https://cdn.u1n1.com/img/picgo202204152343201.png)

在根目录下创建一个`index.html`，将打包后的`main.js`引入

![image-20220126144909552](https://cdn.u1n1.com/img/picgo202204152343202.png)

## commonjs和esModule的区别

- esModule导入只能放在顶部，因为esmodule会对模块进行**静态分析**
- commonjs可以动态导入，require的地址可以是动态的，也可以在if判断中导入

# 19、包管理工具

## npm

![image-20220126145609339](https://cdn.u1n1.com/img/picgo202204152343203.png)

### npm install

![image-20220126155056676](https://cdn.u1n1.com/img/picgo202204152343204.png)

![image-20220126155210190](https://cdn.u1n1.com/img/picgo202204152343205.png)

#### 原理

> 解释：registry仓库是所有npm包开发者最终上传的仓库

![image-20220126180042694](https://cdn.u1n1.com/img/picgo202204152343206.png)

如果明确安装`axios@0.26.0`，但是`package-lock.json`中是`0.24.0`，那么会重新构建依赖关系（修改`package-lock.json`的`axios`版本号为`0.26.0`)，去下载`0.26.0`的包

npm是有缓存机制的，如果之前安装过某个包，会在本电脑中缓存对应的压缩包。可以通过`npm get cache获取缓存目录`

![image-20220127125222551](https://cdn.u1n1.com/img/picgo202204152343207.png)

![image-20220127125240872](https://cdn.u1n1.com/img/picgo202204152343208.png)

在_cache中的index文件下查找索引，然后去content中查找到对应的压缩包

![image-20220127125340332](https://cdn.u1n1.com/img/picgo202204152343209.png)

索引是由`package-lock.json`中的`intergrity`解密之后得到的

![image-20220127125417140](https://cdn.u1n1.com/img/picgo202204152343210.png)

**npm的缓存原理**



### package.json

![image-20220126150023574](https://cdn.u1n1.com/img/picgo202204152343211.png)

![image-20220126150308444](https://cdn.u1n1.com/img/picgo202204152343212.png)

#### 属性

![image-20220126150444374](https://cdn.u1n1.com/img/picgo202204152343213.png)

![image-20220126150648214](https://cdn.u1n1.com/img/picgo202204152343214.png)

![image-20220126150933061](https://cdn.u1n1.com/img/picgo202204152343215.png)

![image-20220126150955479](https://cdn.u1n1.com/img/picgo202204152343216.png)

在安装`axios`的时候，因为`axios`的`package.json`中的`dependencies`中有其他的依赖（也就是说，这个`axios`也是依赖其他库才能运作过的），那么在`npm install`安装`axios`的时候也会根据`axios`中的`package.json`中的`dependencies`去安装其他的包

![image-20220126151355186](https://cdn.u1n1.com/img/picgo202204152343217.png)

`element-plus`的`package.json`中的`peerDependencies`属性有`vue`，那么在安装`element-plus`的时候如果发现没有安装`vue`的话，会报警告

![image-20220126152210777](https://cdn.u1n1.com/img/picgo202204152343218.png)

![image-20220126152122939](https://cdn.u1n1.com/img/picgo202204152343219.png)

### package-lock.json

![image-20220126152358771](https://cdn.u1n1.com/img/picgo202204152343220.png)

在`npm install`的时候，会判断`package-lock.json`的版本是否符合`package.json`中的版本

`package.json`文件只能锁定**大版本，也就是版本号的第一位**，并不能锁定后面的小版本，你每次`npm install`都是拉取的该大版本下的最新的版本，为了稳定性考虑我们几乎是不敢随意升级依赖包的，这将导致多出来很多工作量，测试/适配等，所以`package-lock.json`文件出来了，当你每次安装一个依赖的时候就**锁定在你安装的这个版本**

#### 属性

![image-20220127125627840](https://cdn.u1n1.com/img/picgo202204152343221.png)

## yarn

> `yarn init`生成`package.json`，使用之前要`npm install yarn -g`

![image-20220127130037912](https://cdn.u1n1.com/img/picgo202204152343222.png)

## cnpm

![image-20220127131544175](https://cdn.u1n1.com/img/picgo202204152343223.png)

![image-20220127131638125](https://cdn.u1n1.com/img/picgo202204152343224.png)

## npx

npx是在安装node的时候自动安装的，在npm5.2之后自带的

> npx常用的是用来调用项目中的某个模块的指令

例子：我们在项目中安装了webpack@3.6.0，在全局中安装了webpack@5.x。那么我们在项目的命令行中输入webpack --version的时候，查找的究竟是**项目中webpack的版本号还是全局的webpack的版本号呢**？答案是全局的

当我们在命令行输入命令的时候，会在环境变量中找，如果包是全**局安装的话会被配置到环境变量中的**。

那我们要怎么在当**前项目的命令行中**调用我们安装的**项目中的模块的命令**呢？

- 进入`node_modules`下的`bin`目录

![image-20220127133019650](https://cdn.u1n1.com/img/picgo202204152343225.png)

- 在`package.json`的`scripts`中编写命令，会优先在`node_modules`中去查找

![image-20220127133119314](https://cdn.u1n1.com/img/picgo202204152343226.png)

- 使用npx，npx会优先在`node_modules`中查找模块并且调用命令

![image-20220127133206307](https://cdn.u1n1.com/img/picgo202204152343227.png)

## npm发布自己的包

![image-20220127133654485](https://cdn.u1n1.com/img/picgo202204152343228.png)

![image-20220127133835740](https://cdn.u1n1.com/img/picgo202204152343229.png)

![image-20220127133715584](https://cdn.u1n1.com/img/picgo202204152343230.png)

![image-20220127133723529](https://cdn.u1n1.com/img/picgo202204152343231.png)

增加新功能的话，需要修改package.json的version版本号重新发布

# 20、JSON

![image-20220127134653635](https://cdn.u1n1.com/img/picgo202204152343232.png)

## JSON基本语法

![image-20220127134847732](https://cdn.u1n1.com/img/picgo202204152343233.png)

## JSON序列化

浏览器的`localStorage.setItem`第二个参数要求传入的是一个字符串，如果我们直接传入对象的话会有很大的问题

![image-20220127135226670](https://cdn.u1n1.com/img/picgo202204152343234.png)

![image-20220127135221083](https://cdn.u1n1.com/img/picgo202204152343235.png)

这时候我们就需要调用`JSON.stringify()`将对象转成JSON字符串存储。

![image-20220127135333683](https://cdn.u1n1.com/img/picgo202204152343236.png)

我们也可以通过`JSON.parse()`将JSON字符串转成对象

![image-20220127135648893](https://cdn.u1n1.com/img/picgo202204152343237.png)

## stringify的细节

![image-20220127140755424](https://cdn.u1n1.com/img/picgo202204152343238.png)

**第二个参数replacer**

- 传入数组，表示哪些对象的属性需要转换后保存

![image-20220127140814662](https://cdn.u1n1.com/img/picgo202204152343239.png)

![image-20220127140828200](https://cdn.u1n1.com/img/picgo202204152343240.png)

- 传入回调函数

![image-20220127140932073](https://cdn.u1n1.com/img/picgo202204152343241.png)

![image-20220127140921844](https://cdn.u1n1.com/img/picgo202204152343242.png)

**第三个参数space**

- 填入**数字**2，表示每个键值对前面加上2个空格space

![image-20220127141030055](https://cdn.u1n1.com/img/picgo202204152343243.png)

![image-20220127141035839](https://cdn.u1n1.com/img/picgo202204152343244.png)

- 填入其他字符串

![image-20220127141136196](https://cdn.u1n1.com/img/picgo202204152343245.png)

![image-20220127141128389](https://cdn.u1n1.com/img/picgo202204152343246.png)

**如果对象实现了`toJSON()`方法**

![image-20220127141405219](https://cdn.u1n1.com/img/picgo202204152343247.png)

那么在调用`JSON.stringify()`时会调用这个toJSON方法，将**返回值作为结果**

## parse的细节

**第二个参数是一个回调函数**

![image-20220127141616091](https://cdn.u1n1.com/img/picgo202204152343248.png)

## 利用JSON序列化实现深拷贝

- **info**直接赋值

![image-20220127142023953](https://cdn.u1n1.com/img/picgo202204152343249.png)

- **info2**用展开运算符实现浅拷贝

浅拷贝的话，所有的值只是做了个**复制粘贴**，包括**引用类型的值**，只是复制了地址。所以**引用类型指向的是同一个对象**

![image-20220127142130958](https://cdn.u1n1.com/img/picgo202204152343250.png)

- stringify和parse实现深拷贝

深拷贝的话，引用类型的对象会**重新创建**，内存中会重新分配存储空间给这个对象，而不是浅拷贝那种，直接复制地址。也就是说，深拷贝的结果的对象跟原来的对象是**完全两个独立的对象**

![image-20220127143118718](https://cdn.u1n1.com/img/picgo202204152343251.png)

> 但是`JSON.stringify`是**不支持转化function**的，因为JSON中**不支持函数类型的值**。所以对象中有函数的话，用这种方法实现深拷贝是无能为力的

# 21、浏览器存储方案

## storage

如果存储了`sessionStorage`，然后通过a标签进行**本页跳转**，那么跳转之后这个`sessionStorage`还是会在的。如果是创建**新的标签页跳转**的话就获取不到`sessionStorage`了

![image-20220127145355126](https://cdn.u1n1.com/img/picgo202204152343252.png)

![image-20220127151046936](https://cdn.u1n1.com/img/picgo202204152343253.png)

### 常见的属性和方法

- `setItem(key,val)`设置storage

```js
localStorage.setItem('name','wjj')
```

- `key(number)`根据index获取storage中的key

```js
localStorage.key(0)
```

- `getItem(key)`根据key获取storage中的value值

```js
localStorage.getItem("name")
```

- length属性获取有多少个storage

```
localStorage.length
```

- clear清空

```js
localStorage.clear()
```

## IndexedDB

![image-20220127152310437](https://cdn.u1n1.com/img/picgo202204152343254.png)

# 22、实现防抖，节流

## 防抖debounce函数

![image-20220129130758047](https://cdn.u1n1.com/img/picgo202204152343255.png)

![image-20220129130819975](https://cdn.u1n1.com/img/picgo202204152343256.png)





## 节流throttle函数

![image-20220129130954618](https://cdn.u1n1.com/img/picgo202204152343257.png)

## 防抖和节流的区别

![image-20220129131242669](https://cdn.u1n1.com/img/picgo202204152343258.png)

## 第三方库实现

- lodash
- underscore

防抖

![image-20220129132137472](https://cdn.u1n1.com/img/picgo202204152343259.png)

节流

![image-20220129132309835](https://cdn.u1n1.com/img/picgo202204152343260.png)

## 实现防抖函数

- 基本实现和this参数指向

```js
function debounce(fn,time){
    //定义一个定时器，保存上一次的定时器
    let timeout 
    //真正执行的函数，用args来接收参数
    return function(...args){
        //取消上一次的定时器
        clearTimeout(timeout)
        //延迟执行
        timeout = setTimeout(()=>{
            //返回的函数本质上在调用的时候会隐式绑定
            //这里我们设置一下执行fn时的this指向
            fn.apply(this,args)
        },time)
    }
}
```

- 第三个参数：立即执行

立即执行就是，假设一开始就连续触发，按原来的思路，这一连续触发的事件都不会

```js
function debounce(fn,time,immediate = false){
    let timeout 
    //是否调用过
    let isInvoke = false
    return function(...args){
        clearTimeout(timeout)
        //如果是需要立即执行，并且还没有立即执行时
        if(immediate && !isInvoke){
            fn.apply(this,args)
            //标记已经立即执行过了，下面都进行防抖操作，也就是else
            isInvoke = true
        }else{
            //延迟执行
            timeout = setTimeout(()=>{
                fn.apply(this,args)
                //如果成功执行完，说明这一次防抖已经结束了
                //在下一次连续触发事件的时候，第一个触发的事件要立即执行
                isInvoke = false
            },time)
        }

    }
}
```

- 取消功能

```js
function debounce(fn,time,immediate = false){
    let timeout 
    let isInvoke = false
    return function foo(...args){
        clearTimeout(timeout)
        if(immediate && !isInvoke){
            fn.apply(this,args)
            isInvoke = true
        }else{
            timeout = setTimeout(()=>{
                fn.apply(this,args)
                isInvoke = false
            },time)
        }

    }
    //取消功能，在fn延迟执行的过程中如果调用了返回的函数对象的这个函数，会取消执行fn
    foo.cancel = function(){
        if(timeout) clearTimeout(timeout)
        timer = null
        isInvoke = null
    }
}
```

## 实现节流函数

- 基本实现

```js
function throttle(fn, time) {
    //记录上一次的时间
    let lastTime = 0
    return function () {
        //记录触发的时候的时间
        const nowTime = new Date().getTime()
        //判断时间间隔是否大于time。
        //这里默认是会立即执行第一次触发的函数的，因为nowTime是一个很大的值（时间戳）而lastTime是0
        if (time <= (nowTime - lastTime) ) {
            //执行函数
            fn.apply(this)
            //保留这次触发的时间
            lastTime = nowTime
        }
    }
}
```

- 控制第一次是否直接执行

```js
//leading为false表示不想开头立即触发
function throttle(fn, time, options = { leading: true, trailing: true }) {
    const {leading , trailing} = options
    let lastTime = 0
    let timer
    return function () {
        const nowTime = new Date().getTime()
        //如果不希望第一个触发的是立即执行的话，就将lastTime初值（所以加了0这个判断条件）设置为nowTime
        //这样的话时间间隔就会从0开始计算，直到时间间隔大于给定的time
        //lastTime === 0 其实可以用于表示是不是一段连续触发事件的第一个事件
        if(lastTime === 0 && leading === false) lastTime = nowTime 
        const remainTime = time - (nowTime - lastTime)
        if (remainTime <= 0) {
            fn.apply(this)
            lastTime = nowTime
        } 
    }
}
```

- 最后一次默认触发

这是关于，如果最后一次触发的时间点位于**两个触发频率结点的中间**时，要不要触发的问题

![image-20220129175040494](https://cdn.u1n1.com/img/picgo202204152343261.png)

```js
function throttle(fn, time, options = { leading: false, trailing: true }) {
    const { leading, trailing } = options
    let lastTime = 0
    let timer
    return function (...args) {
        const nowTime = new Date().getTime()
        if (lastTime === 0 && leading === false) lastTime = nowTime
        const remainTime = time - (nowTime - lastTime)
        if (remainTime <= 0) {
            //这里是周期末尾，如果在周期末尾重新调用触发而不是定时器触发
            //那么我们只希望执行调用触发，而不是定时器触发
            //所以如果有定时器的话，我们取消定时器（其实可以不加外面的判断，这里是必然有定时器的）
            if(timer){
                clearTimeout(timer)
                //设置null的话下一次进入新的周期才会在下面的if上继续添加定时器
                timer = null
            }
            
            //执行调用触发
            fn(...args)
            lastTime = nowTime
        }

        //剩余时间大于0，也就是周期开始时我们设置定时器，指定在周期末尾执行
        //我们只希望设置一个定时器就可以了，因为都是重复希望执行fn函数。
       	else if (trailing && !timer) {
            timer = setTimeout(() => {
                fn(...args)
                timer = null
                //执行完之后要重置参数，如果不希望第一次要执行的话，我们将lastTIme设置为0，也就是初值
                //重新进入函数的时候，会在上面的判断中设置为nowTime，那么时间间隔就会从0开始计算
                
                //如果我们希望第一次要执行的话，lastTIme就是现在的时间戳，这个时间戳就是周期末尾的时间戳。
                //下一次进入函数的时候，会跟这个时间戳进行计算获取时间间隔。
                //如果时间间隔小于time的话，是不会立即执行的
                
                //第二个值的大小很关键，如果设置的很小，例如是1，那么会反复执行两次
                lastTime = !leading ? 0 : new Date().getTime()+time
            }, remainTime)
        }
    }
}
```

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="jzsp"></button>
  </body>
  <script>
    const delay = 1000;
    function throttle(fn, options = { leading: true, trailing: true }) {
      let oldTime = 0;
      let timer = null;
      return function (...args) {
        const nowTime = new Date().getTime();
        if (oldTime === 0 && !options.leading) oldTime = new Date().getTime();
        if (nowTime - oldTime > delay) {
          oldTime = nowTime;
          fn(...args);
        } else if (options.trailing && !timer) {
          timer = setTimeout(() => {
            console.log("设置了定时器");
            fn(...args);
            timer = null;
            oldTime = !options.leading ? 0 : new Date().getTime() + delay;
          }, delay);
        }
      };
    }

    function foo() {
      console.log(1);
    }

    document.getElementById("jzsp").addEventListener("click", throttle(foo));
  </script>
</html>

```



# 23、浅拷贝与深拷贝

## 实现浅拷贝

- `Object.assign()`

![image-20220129175418716](https://cdn.u1n1.com/img/picgo202204152343262.png)

- ...

![image-20220129175513359](https://cdn.u1n1.com/img/picgo202204152343263.png)

## 实现深拷贝

- `JSON.stringify() && JSON.parse()`

![image-20220129175636769](https://cdn.u1n1.com/img/picgo202204152343264.png)

缺点

![image-20220129175812905](https://cdn.u1n1.com/img/picgo202204152343265.png)

- 递归实现深拷贝

![image-20220129184903395](https://cdn.u1n1.com/img/picgo202204152343266.png)

### **深拷贝初步实现**

```js
//判断是不是Object
function isObject(val){
    const valType = typeof val
    //null也是Object类型
    return (val !== null) && (valType === 'object' || valType === 'function')
}
function deepClone(val){
    //首先判断，只有是对象才需要深拷贝，不是对象类型直接返回即可
    if(!isObject(val)){
        return val
    }

    //是对象的话，创建一个新的对象用于拷贝
    const newObj = {}
    //遍历对象val的所有key，拷贝给newObj
    for (const key in val) {
        newObj[key] = deepClone(val[key])
    }
    return newObj
}
```

![image-20220129220739254](https://cdn.u1n1.com/img/picgo202204152343267.png)

### **对数组类型进行处理**

如果对象中有数组类型的话，用上面的`deepClone`函数会出问题

![image-20220129221304443](https://cdn.u1n1.com/img/picgo202204152343268.png)

```js
function isObject(val){
    const valType = typeof val
    return (val !== null) && (valType === 'object' || valType === 'function')
}
function deepClone(val){
    
    if(!isObject(val)){
        return val
    }
    
    //数组也是对象，所以这里要判断
    const newObj = Array.isArray(val) ? [] : {}
    for (const key in val) {
        newObj[key] = deepClone(val[key])
    }
    return newObj
}

const obj = {
    friend:{
        name:"wjj"
    },
    asd:[1,2,34,5],
    foo:function(){
        console.log(1123)
    }
}
const obj2 = deepClone(obj)
console.log(obj2)
```

### **对函数对象进行处理**

可以看到，函数是对象类型，所以被创建新对象了，但是创建的是一个**普通对象**

![image-20220129223508287](https://cdn.u1n1.com/img/picgo202204152343270.png)

```js
function isObject(val){
    const valType = typeof val
    return (val !== null) && (valType === 'object' || valType === 'function')
}
function deepClone(val){
    //如果是函数就直接返回，函数是不需要重新创建的，函数就是为了实现复用功能的。
    //也就是说，返回的函数跟拷贝源中的函数指向的是同一个函数
    if(typeof val === 'function'){
        return val
    }

    if(!isObject(val)){
        return val
    }

    const newObj = Array.isArray(val) ?[] : {}
    for (const key in val) {
        newObj[key] = deepClone(val[key])
    }
    return newObj
}

const obj = {
    friend:{
        name:"wjj"
    },
    asd:[1,2,34,5],
    foo:function(){
        console.log(1123)
    }
}
const obj2 = deepClone(obj)
console.log(obj2)
```

### **Symbol类型作为对象的key和作为value的处理**

问题1：如果`Symbol`作为对象某个属性的`value`的话，那么返回的对象和原对象的这个属性的`Symbol`**是同一个**，因为它的`isObject()`是`false`

问题2：Symbol作为对象的key的时候不会被拷贝，因为key为Symbol类型的话是不会被for遍历到的

![image-20220129224506787](https://cdn.u1n1.com/img/picgo202204152343271.png)

```js
const s2 = Symbol('bbb')
function isObject(val){
    const valType = typeof val
    return (val !== null) && (valType === 'object' || valType === 'function')
}
function deepClone(val){
    //判断，如果是symbol类型的值
    //那么要将val的description作为参数新建一个Symbol并且返回
    if(typeof val === 'symbol') return Symbol(val.description)
    if(typeof val === 'function'){
        return val
    }

    if(!isObject(val)){
        return val
    }

    const newObj = Array.isArray(val) ?[] : {}
    for (const key in val) {
        newObj[key] = deepClone(val[key])
    }

    //对Symbol类型的key进行处理
    //用Object.getOwnPropertySymbols()获取所有的key为Symbol的属性，返回值是数组
    const symbolKeys = Object.getOwnPropertySymbols(val)
    //数组是可迭代对象，可以用for of遍历所有的值
    for (const sKey of symbolKeys) {
        newObj[sKey] = deepClone(val[sKey])
    }
    return newObj
}

const obj = {
    friend:{
        name:"wjj"
    },
    asd:[1,2,34,5],
    foo:function(){
        console.log(1123)
    },
    s2,
    [s2]:'jzsp'
}
const obj2 = deepClone(obj) 
console.log(obj)
console.log(obj2)
console.log(obj2.s2 === obj.s2)    //false
```

### **Set和Map**

set和map虽然被拷贝了，但是是当做了普通对象类型去拷贝的

![image-20220129225127515](https://cdn.u1n1.com/img/picgo202204152343272.png)

```js
const s2 = Symbol('bbb')
function isObject(val){
    const valType = typeof val
    return (val !== null) && (valType === 'object' || valType === 'function')
}
function deepClone(val){
    //用instanceof来判断类型
    //因为set和map是可迭代对象，而Set和Map在创建的时候可以传入一个可迭代对象
    //这里还有缺陷就是，set和map中保存的值是浅拷贝，进一步优化的话可以遍历set和map中的值来一一进行深拷贝判断
    if(val instanceof Set){
        return new Set(val)
    }
    if(val instanceof Map){
        return new Map(val)
    }
    if(typeof val === 'symbol') return Symbol(val.description)
    if(typeof val === 'function'){
        return val
    }

    if(!isObject(val)){
        return val
    }

    const newObj = Array.isArray(val) ?[] : {}
    for (const key in val) {
        newObj[key] = deepClone(val[key])
    }

    const symbolKeys = Object.getOwnPropertySymbols(val)
    for (const sKey of symbolKeys) {
        newObj[sKey] = deepClone(val[sKey])
    }
    return newObj
}

const obj = {
    friend:{
        name:"wjj"
    },
    asd:[1,2,34,5],
    foo:function(){
        console.log(1123)
    },
    s2,
    [s2]:'jzsp',
    s3:new Set([1,2,3,4]),
    s4:new Map([[1,'a'],[2,'b'],[3,'c']])
}
const obj2 = deepClone(obj) 
console.log(obj)
console.log(obj2)
console.log(obj2.s2 === obj.s2)    //false
```

### **循环引用**

没处理循环引用之前会报错，递归循环调用了，导致栈溢出。

> 这里学到一个**变量私有化**的技巧，下面的map就是进行了私有化处理，只属于函数内部

![image-20220130114541181](https://cdn.u1n1.com/img/picgo202204152343273.png)

```js
const s2 = Symbol('bbb')
function isObject(val){
    const valType = typeof val
    return (val !== null) && (valType === 'object' || valType === 'function')
}
//map放在全局的话，如果多个deepClone会出问题，所以我们放到局部中
//第一次是默认的map，后面每次传入的都是第一次默认的map
//const map = new Map()
function deepClone(val,map = new Map()){

    if(val instanceof Set){
        return new Set(val)
    }
    if(val instanceof Map){
        return new Map(val)
    }
    if(typeof val === 'symbol') return Symbol(val.description)
    if(typeof val === 'function'){
        return val
    }

    if(!isObject(val)){
        return val
    }
    //到这一步，说明是普通对象类型。所以我们判断，如果这个对象我们曾经拷贝过，那么就直接取出赋值
    //这样就可以达到循环引用  obj.info = obj
    //info的val是原来拷贝过的外层的obj，产生循环引用
	if(map.has(val)){
        return map.get(val)
    }
    const newObj = Array.isArray(val) ?[] : {}
    //将每次要拷贝的对象和拷贝之后的对象作为键值对保存起来
	map.set(val,newObj)
    for (const key in val) {
        //在deepClone方法中传入map
        newObj[key] = deepClone(val[key],map)
    }

    const symbolKeys = Object.getOwnPropertySymbols(val)
    for (const sKey of symbolKeys) {
        newObj[sKey] = deepClone(val[sKey],map)
    }
    return newObj
}

const obj = {
    friend:{
        name:"wjj"
    },
    asd:[1,2,34,5],
    foo:function(){
        console.log(1123)
    },
    s2,
    [s2]:'jzsp',
    s3:new Set([1,2,3,4]),
    s4:new Map([[1,'a'],[2,'b'],[3,'c']])
}
obj.c = obj   //循环引用
const obj2 = deepClone(obj) 
console.log(obj)
console.log(obj2)
console.log(obj2.s2 === obj.s2)    //false
```

# 24、URLSearchParams

![image-20220403194739913](https://cdn.u1n1.com/img/picgo202204152343274.png)