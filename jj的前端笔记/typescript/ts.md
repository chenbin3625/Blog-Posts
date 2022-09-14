# 类型检测的重要性

![image-20220214120839554](ts.assets/image-20220214120839554.png)

![image-20220214122222803](ts.assets/image-20220214122222803.png)

![image-20220214122323977](ts.assets/image-20220214122323977.png)

![image-20220214123313348](ts.assets/image-20220214123313348.png)

![image-20220214123607775](ts.assets/image-20220214123607775.png)

# TS的介绍与安装

> typescriptlang.org

![image-20220214124037735](ts.assets/image-20220214124037735.png)

![image-20220214124224358](ts.assets/image-20220214124224358.png)

![image-20220214125131871](ts.assets/image-20220214125131871.png)

尝试编写代码可以发现，IDE直接报错，这就是类型检测的好处，使得代码更加健壮

![image-20220214125309227](ts.assets/image-20220214125309227.png)

使用tsc转成js代码

![image-20220214125414991](ts.assets/image-20220214125414991.png)

下面的代码报错的原因是，ts文件是在同一个作用域下进行编译的，如果另外一个文件下有一个name变量，就会冲突。**如果想把每一个文件看成单独的作用域的话**，需要在末尾加一个`export {}`

![image-20220214125600451](ts.assets/image-20220214125600451.png)

![image-20220214125706276](ts.assets/image-20220214125706276.png)

如果每次都要输入命令将`tsc`代码编译成`js`代码，将会很浪费时间。

- 我们可以用webpack搭建一个环境，使得ts自动转js，并且自动在浏览器上跑（HMR热替换）
- 我们也可以用ts-node这个库，和另外两个库tslib和@types/node

![image-20220216141522022](ts.assets/image-20220216141522022.png)

![image-20220214125928143](ts.assets/image-20220214125928143.png)

# webpack的ts环境配置

安装webpack

![image-20220214130455250](ts.assets/image-20220214130455250.png)

安装ts-loader和typescript

![image-20220214130610748](ts.assets/image-20220214130610748.png)

配置webpack.config.js

![image-20220214130651426](ts.assets/image-20220214130651426.png)

生成tsconfig.json配置文件

![image-20220214130722662](ts.assets/image-20220214130722662.png)

配置extensions

![image-20220215000733983](ts.assets/image-20220215000733983.png)

安装webpack-dev-server

![image-20220215000358163](ts.assets/image-20220215000358163.png)

安装插件指定html模板

![image-20220215000457541](ts.assets/image-20220215000457541.png)

![image-20220215000522032](ts.assets/image-20220215000522032.png)

## 总体截图

![image-20220215000803157](ts.assets/image-20220215000803157.png)

# TS初体验

## 类型声明与类型推断

类型声明就是在标识符后跟上**`:数据类型`**

![image-20220215000851254](ts.assets/image-20220215000851254.png)

注意，Number和number（String和string）是有区别的，Number代表的js中的Number包装类，number仅仅代表是数字类型

![image-20220215001014141](ts.assets/image-20220215001014141.png)

类型推断的话就是，如果没有指定类型，就会将  值的类型作为该变量的类型

![image-20220215001329684](ts.assets/image-20220215001329684.png)

## js类型

### number类型

```js
let num: number = 10
//num = '123'

//表达进制
let num1 : number = 10        //10
let num2 : number = 0b10      //2
let num3 : number = 0o10      //8
let num4 : number = 0x10      //16
```

### boolean类型

```js
let flag:boolean = true
flag = 20 > 30
```

### string类型

```js
//在能推导出对应标识符的类型时，一般情况下可以不加类型注解
let message:string = 'hello world'    //单引号
let message1:string = "hello world"   //双引号
let message2:string = `hello world`   //模板字符串
```

### Array类型

```ts
//这样虽然定义的是一个数组类型，但是无法确定数组中存放的值的类型
const names = []
names.push(1)
names.push('123')

//正确的定义字符串数组
const names2 :Array<string> = []   //不推荐(尖括号在jsx有冲突)
const names3 :sring[] = []  //推荐
```

### object类型

```js
const info = {
    name:'wjj',    //类型会自动推导
    age:19         //类型会自动推导
}
```

### null和undefined

```js
const n1:null = null    //null类型只能赋值为null
const n2:undefined = undefined  //undefined类型只能赋值为undefined
```

### symbol类型

![image-20220215142001510](ts.assets/image-20220215142001510.png)

## ts类型

### any类型（可以是任何类型）

在某些情况下，我们确实**无法确定一个变量的类型**，并且可能它会发生一些变化，这个时候我们可以使用any类型

![image-20220215142510437](ts.assets/image-20220215142510437.png)

### unknown类型（不明确类型）

unknown类型跟any类型用法其实几乎一样，都是指定某个值的类型是“任意”类型，但是他们最大的差别就是

- unknown类型只能赋值给any和unknown类型（防止这个类型的值随便使用）
- any类型可以赋值给任何类型

![image-20220215194732275](ts.assets/image-20220215194732275.png)

### void类型

![image-20220215195955226](ts.assets/image-20220215195955226.png)

只能返回null和undefined类型

![image-20220215200021337](ts.assets/image-20220215200021337.png)

### never类型

![image-20220215200417077](ts.assets/image-20220215200417077.png)

![image-20220215201026145](ts.assets/image-20220215201026145.png)

![image-20220215201921268](ts.assets/image-20220215201921268.png)

### Tuple元组类型（多种元素的组合）

用于规定数组中的对应位置的元素的类型

```js
let tuple : [string,number,number] = ['wjj',18,180]
```

![image-20220215202939971](ts.assets/image-20220215202939971.png)

## 与函数有关的类型

### 指定函数的参数和返回值的类型

TypeScript允许我们指定函数的**参数**和**返回值的类型**

![image-20220215215201233](ts.assets/image-20220215215201233.png)

返回值类型会自动推导的，可以不需要指定返回值类型

![image-20220215215229390](ts.assets/image-20220215215229390.png)

上下文类型可以不需要指定传入参数的类型

![image-20220215215524815](ts.assets/image-20220215215524815.png)

### 指定函数的参数为对象类型

![image-20220215215825983](ts.assets/image-20220215215825983.png)

### 参数可选类型（可传可不传）

![image-20220215215852430](ts.assets/image-20220215215852430.png)

注意：可选类型的参数不能放在第一位	

![image-20220216190357351](ts.assets/image-20220216190357351.png)

虽然可选类型是特殊的联合类型，但是如果写成联合类型的话，想要不传入内容，必须显式的传入undefined，但是写成可选类型是可以直接不传入内容的

![image-20220216190456922](ts.assets/image-20220216190456922.png)

### 联合类型（可以为多种类型）

![image-20220215220025156](ts.assets/image-20220215220025156.png)

![image-20220215220218879](ts.assets/image-20220215220218879.png)

### 可选类型和联合类型的关系

![image-20220215220246476](ts.assets/image-20220215220246476.png)

### type定义类型别名

![image-20220215220425361](ts.assets/image-20220215220425361.png)

### 类型断言 as

用于将大范围的类型缩小到小范围的类型

**案例1**

![image-20220216113516941](ts.assets/image-20220216113516941.png)

![image-20220216113530090](ts.assets/image-20220216113530090.png)

**案例2**

![image-20220216113631323](ts.assets/image-20220216113631323.png)

![image-20220216113659848](ts.assets/image-20220216113659848.png)

### 非空类型断言 !

类型断言指的是**前面的标识符**一定是非空的

![image-20220216114409062](ts.assets/image-20220216114409062.png)

### 取值可选链 ?.

![image-20220216135632414](ts.assets/image-20220216135632414.png)

```ts
type Person = {
    name:string,
    friend?:{
        name:string,
        age?:number
    }
}

const info : Person = {
    name:'wjj',
    friend:{
        name:'jzsp',
        age:18
    }
}
//1：friend没有值的情况下，短路，返回undefined
//2：friend有值的情况下，相当于从friend这个对象中取属性，如果不存在就是会返回undefined的
console.log(info.friend?.age)
```

### ?? （空值合并操作符）和 !! （转boolean）

![image-20220216143034488](ts.assets/image-20220216143034488.png)

```js
const message = 'hello'
const flag = !!message   //相当于是将message两次取非，第一次!会进行隐式转换的
```

```js
const message:string|null = null
const content = message ?? 'message为null或者是undefined，那么使用这里的默认值'
console.log(content)
```

### 字面量类型（跟枚举类型很像）

要结合联合类型才有意义

![image-20220216181717560](ts.assets/image-20220216181717560.png)

### 字面量推理

可以看到，我们规定了`request`第二个参数传入的是`Method`类型（联合的字面量类型），但是`options.method`推断的是string类型，所以传入的时候报错了

![image-20220216183147018](ts.assets/image-20220216183147018.png)

我们可以**指定obj对象的类型**来解决这个问题

![image-20220216182019201](ts.assets/image-20220216182019201.png)

也可以用类型断言，将一个宽泛的类型转成具体的类型

![image-20220216182113768](ts.assets/image-20220216182113768.png)

甚至可以断言成，联合的字面量类型中的某一个字面量，也是可以通过的（注意，这只是个类型，此时并不需要method一定是GET或者是POST

![image-20220216183303981](ts.assets/image-20220216183303981.png)

可以用as const来进行**字面量推理**，推理出了method是POST字面量类型，url是https://www.coderwhy.org/abc字面量类型

![image-20220216182857487](ts.assets/image-20220216182857487.png)

### 类型缩小

![image-20220216184106496](ts.assets/image-20220216184106496.png)

**typeof**

![image-20220216184425029](ts.assets/image-20220216184425029.png)

**平等缩小（===，!==，switch）**

![image-20220216184649957](ts.assets/image-20220216184649957.png)

**instanceof**

![image-20220216184809404](ts.assets/image-20220216184809404.png)

**in**

![image-20220216184949194](ts.assets/image-20220216184949194.png)

因为animal是Fish或者Dog类型的，而swimming是Fish类型特有的，所以不能直接animal.swiming，只有通过类型缩小确定animal是Fish类型之后，才能调用animal.swiming方法

![image-20220216185014736](ts.assets/image-20220216185014736.png)

## 函数类型

### 指定函数的参数为函数类型

![image-20220216185718246](ts.assets/image-20220216185718246.png)

我们写一个函数的时候，它也会自动推导出这个函数的类型。下面这个add函数的类型就是，传入两个number类型的参数：num1和num2，并且返回值是number类型的函数

![image-20220216185754877](ts.assets/image-20220216185754877.png)

注意，类型中声明参数的标识符是不能省略的，不然默认就是any类型

![image-20220216185939638](ts.assets/image-20220216185939638.png)

### 参数默认值

![image-20220216190633306](ts.assets/image-20220216190633306.png)

### 函数的剩余参数

将所有的剩余参数保存在data这个any数组中

![image-20220216190925058](ts.assets/image-20220216190925058.png)

### 对this的处理（未完成）

![image-20220302140953629](ts.assets/image-20220302140953629.png)







### 函数的重载

要求实现add函数，可以做到number类型的相加和字符串拼接

- 函数重载

在我们调用sum的时候，它会根据我们**传入的参数类型**来决定执行函数体时，到底执行哪一个**函数的重载签名**；

![image-20220216191747260](ts.assets/image-20220216191747260.png)

- 联合类型+类型缩小

![image-20220216191832165](ts.assets/image-20220216191832165.png)

**注意**

![image-20220216192523018](ts.assets/image-20220216192523018.png)

案例

![image-20220216192224755](ts.assets/image-20220216192224755.png)

## class类

![image-20220216192817923](ts.assets/image-20220216192817923.png)

### 类的封装

![image-20220216193955881](ts.assets/image-20220216193955881.png)

![image-20220216193049516](ts.assets/image-20220216193049516.png)

### 类的继承

![image-20220216193842720](ts.assets/image-20220216193842720.png)

定义Person类

![image-20220216193415593](ts.assets/image-20220216193415593.png)

定义student类和teacher类继承自Person类

![image-20220216193407446](ts.assets/image-20220216193407446.png)

**super调用constructor初始化**

![image-20220216193516134](ts.assets/image-20220216193516134.png)

![image-20220216193539890](ts.assets/image-20220216193539890.png)

**重写父类的方法**

![image-20220216193718243](ts.assets/image-20220216193718243.png)

### 类的多态

父类引用指向子类对象

![image-20220216194508923](ts.assets/image-20220216194508923.png)

### 类的成员修饰符

![image-20220216194813359](ts.assets/image-20220216194813359.png)

![image-20220216195024895](ts.assets/image-20220216195024895.png)

![image-20220216195227736](ts.assets/image-20220216195227736.png)

### readonly只读属性

只读属性可以在构造器中赋值，或者给默认值，赋值之后就不能修改了

![image-20220216195518094](ts.assets/image-20220216195518094.png)

只读属性跟const很像，如果const指向的是一个对象，那么不能修改这个对象的指向，但是可以修改对象的内容。只读属性也一样。如果只读属性是一个对象类型，那么我们不能修改这个对象，但是可以修改这个对象内允许修改的属性

![image-20220216195819698](ts.assets/image-20220216195819698.png)

### getter/setter

![image-20220216200102440](ts.assets/image-20220216200102440.png)

![image-20220216200133842](ts.assets/image-20220216200133842.png)

### static静态成员

![image-20220216200309353](ts.assets/image-20220216200309353.png)

### abstract抽象类

![image-20220216201008992](ts.assets/image-20220216201008992.png)

定义抽象类和抽象方法（抽象方法只能在抽象类中），抽象类不能被实例化

![image-20220216200836731](ts.assets/image-20220216200836731.png)

抽象类的抽象方法必须被子类实现

![image-20220216200906413](ts.assets/image-20220216200906413.png)

### 类的类型

![image-20220216201852398](ts.assets/image-20220216201852398.png)

如果要求传入的是类的类型，但是传入对象的话，如果不符合该类的定义就会报错

![image-20220216202152447](ts.assets/image-20220216202152447.png)

## 接口interface

### 声明接口

![image-20220216202611824](ts.assets/image-20220216202611824.png)

![image-20220216202525335](ts.assets/image-20220216202525335.png)

### 索引类型

这样定义可以要求key只能是number类型，value只能是字符串类型

![image-20220216202721774](ts.assets/image-20220216202721774.png)

这样定义可以要求key只能是string类型，value只能是number类型

![image-20220216202745998](ts.assets/image-20220216202745998.png)

### 函数类型

![image-20220216202940014](ts.assets/image-20220216202940014.png)

### 接口的多继承与交叉类型& 

![image-20220216203002218](ts.assets/image-20220216203002218.png)

交叉类型达到多继承的效果

![image-20220216203651769](ts.assets/image-20220216203651769.png)

### implement让类实现接口

实现接口，就需要实现接口中所有的定义，不能多也不能少

![image-20220216203543235](ts.assets/image-20220216203543235.png)

![image-20220216205905346](ts.assets/image-20220216205905346.png)

所谓的通用性就是，当用接口作为类型时，要求传入的是**实现了这个接口的内容**，也就是说，传入的内容都是满足接口的要求的，可以对传入的内容进行一些统一，比如必须要实现接口中的swimming属性

![image-20220216204438777](ts.assets/image-20220216204438777.png)

![image-20220216203043247](ts.assets/image-20220216203043247.png)

### interface和type的区别***

![image-20220216205200070](ts.assets/image-20220216205200070.png)

重名问题

![image-20220216204715175](ts.assets/image-20220216204715175.png)

![image-20220216205016917](ts.assets/image-20220216205016917.png)

### 字面量赋值***

假如我们定义了下面的接口

![image-20220216205419445](ts.assets/image-20220216205419445.png)

我们将对象的类型定义为这个接口类型，并且直接进行对象的定义，会报错

![image-20220216205319512](ts.assets/image-20220216205319512.png)

但是将这个对象保存在一个遍历中，然后将这个遍历赋值给p就不会报错

![image-20220216205409396](ts.assets/image-20220216205409396.png)

------

这是因为直接将对象字面量赋值的时候，会进行类型推导，推导出是一个对象类型，并且里面的name是string，age是number...，这个对象类型不符合`IPerson`接口类型，因为多了一个address

而赋值保存到变量，将变量赋值给接口类型的变量时，会有一个**freshness（擦除操作）**，如果擦除掉多余的属性之后依然满足接口类型的话，就不会报错

![image-20220216205956069](ts.assets/image-20220216205956069.png)

意义就是，如果这个函数**只想处理接口中定义的属性**，而对象中具有除了这些属性以外的其他属性的话，要想传入，需要通过这种方式

## 枚举类型

![image-20220216210554391](ts.assets/image-20220216210554391.png)

![image-20220216210625541](ts.assets/image-20220216210625541.png)

定义的枚举类型，不声明值的话，默认是会从0往下开始递增的，除非显示声明一个值

![image-20220216210730406](ts.assets/image-20220216210730406.png)

## 泛型

![image-20220216220811485](ts.assets/image-20220216220811485.png)

### 基本使用

![image-20220216212449650](ts.assets/image-20220216212449650.png)

类型推导成字面量类型

![image-20220216212533972](ts.assets/image-20220216212533972.png)

泛型是**类型参数化**，在调用的时候指定传入的参数类型，下面是在声明函数的地方用`<type>`来获取外面传入的类型，并且可以将获取的类型定义在参数和返回值中

![image-20220216211519697](ts.assets/image-20220216211519697.png)

### 泛型指定多个类型

因为第二个类型string赋值给了E，然后E用于指定第二个参数的类型，此时我们第二个参数传入number类型，所以报错

![image-20220216220550967](ts.assets/image-20220216220550967.png)

### 泛型接口

![image-20220217125818645](ts.assets/image-20220217125818645.png)

泛型接口是不能类型推导的

![image-20220217125956416](ts.assets/image-20220217125956416.png)

但是可以给泛型默认值

![image-20220217130009090](ts.assets/image-20220217130009090.png)

### 类的泛型

![image-20220217130250542](ts.assets/image-20220217130250542.png)

可以用泛型来动态的声明类型

![image-20220217131131140](ts.assets/image-20220217131131140.png)

![image-20220217131329917](ts.assets/image-20220217131329917.png)

![image-20220217131302670](ts.assets/image-20220217131302670.png)

### extends对泛型的类型进行限制

![image-20220217131825697](ts.assets/image-20220217131825697.png)

## 模块化和命名空间

代码编写环境不是用的ts-node了，而是之前搭建的webpack环境

### 模块化

![image-20220217132344484](ts.assets/image-20220217132344484.png)

### 命名空间

主要目的是将一个**模块内部**再进行作用域的划分，防止一些命名冲突的问题。命名空间的内容默认只属于命名空间内部，想在外界通过命名空间来获取的话需要在命名空间内部导出

案例：在同一个模块内是不允许同名的

![image-20220217132620878](ts.assets/image-20220217132620878.png)

我们可以修改名字，也可以将这两个函数放在不同的命名空间内，通过命名空间来获取

![image-20220217132650631](ts.assets/image-20220217132650631.png)

想在外部使用命名空间的话，命名空间也需要导出

![image-20220217133024949](ts.assets/image-20220217133024949.png)

![image-20220217133036962](ts.assets/image-20220217133036962.png)

## 类型查找和声明（很重要）

### 介绍

我们会发现一个很奇怪的现象，就是axios这个库我们是安装之后可以直接使用的，但是lodash这个库我们安装之后导入竟然报错？？

![image-20220217135748545](ts.assets/image-20220217135748545.png)

这就涉及到ts的类型查找了

![image-20220217140000823](ts.assets/image-20220217140000823.png)

- 内置类声明

![image-20220217140228548](ts.assets/image-20220217140228548.png)

![image-20220217140422553](ts.assets/image-20220217140422553.png)

- 外部定义类型声明

![image-20220217140330741](ts.assets/image-20220217140330741.png)

![image-20220217140513887](ts.assets/image-20220217140513887.png)

如果安装的库没有类型声明文件，可以在[https://www.typescriptlang.org/dt/search?search=]官网查找，然后npm安装对应的声明文件（可以发现我们在安装ts-node的时候额外安装的@types/node也是外部定义类型声明）

![image-20220217140711168](ts.assets/image-20220217140711168.png)

- 自定义类型声明

通过declare module '模块名'进行自定义类型声明

![image-20220217140932733](ts.assets/image-20220217140932733.png)

声明之后就可以使用了

![image-20220217141002026](ts.assets/image-20220217141002026.png)

### 自定义类型声明

如果在`index.html`里声明了变量，要怎么才能在`main.ts`中使用呢？我们知道ts代码是最终会被编译成`js`代码，然后插入到`index.html`的 `script`标签中的，按道理来说，我们是可以在`main.ts`中直接使用定义的变量的，但是发现报错。这个时候我们就可以在自定义类型声明文件中，声明一下类型

![image-20220217142550180](ts.assets/image-20220217142550180.png)

![image-20220217142559559](ts.assets/image-20220217142559559.png)

![image-20220217142609512](ts.assets/image-20220217142609512.png)

### 声明文件

我们导入jpg文件，ts也会报错

![image-20220217142744559](ts.assets/image-20220217142744559.png)

这样写的话，就说明.jpg结尾的文件被当成是一个模块来使用

![image-20220217142809461](ts.assets/image-20220217142809461.png)

### 声明命名空间

![image-20220217143024645](ts.assets/image-20220217143024645.png)

命名空间是全局的，可以直接使用不需要导入

![image-20220217143039079](ts.assets/image-20220217143039079.png)

# tsconfig.json

tsc --init生成tsconfig.json

![image-20220218201710035](ts.assets/image-20220218201710035.png)

![image-20220218201659369](ts.assets/image-20220218201659369.png)

要解析ts代码的文件，exclude就是排除要解析的文件

![image-20220218202654238](ts.assets/image-20220218202654238.png)