# reactivity

## 存储响应式依赖

我们该如何保存 total 这个**计算过程**，使得我们可以在price和quantity更新时重新运行它？

![image-20220408125118303](vue3-source-code.assets/image-20220408125118303.png)

实际上，在vue3中，我们**使用set而非dep类**来保存属性的相关**副作用函数**。

我们使用track收集依赖

使用trigger触发依赖

![image-20220408125256011](vue3-source-code.assets/image-20220408125256011.png)

通常一个对象中含有多个属性，那么我们需要用一个Map来保存。

Map的key保存的是对应的属性名，value是属性对应的保存副作用函数的set集合

![image-20220408125450171](vue3-source-code.assets/image-20220408125450171.png)

在track函数中，我们获取到对应的set（如果没有就创建），往set中添加effect副作用函数。

![image-20220408125612263](vue3-source-code.assets/image-20220408125612263.png)

![image-20220408125735977](vue3-source-code.assets/image-20220408125735977.png)

通常我们也会用到多个响应式对象，那么我们需要用WeakMap（叫做targetMap）来保存所有响应式对象的map。

![image-20220408130026615](vue3-source-code.assets/image-20220408130026615.png)

改进与使用

![image-20220408130301587](vue3-source-code.assets/image-20220408130301587.png)

![image-20220408130328154](vue3-source-code.assets/image-20220408130328154.png)

## Proxy和Reflect

在vue2中，我们使用Object.defineProperty来拦截响应式对象的set和get

在vue3中，我们使用Reflect和Proxy来做到这件事

![image-20220408130736053](vue3-source-code.assets/image-20220408130736053.png)

receiver可以保证this指向是正确的。

![image-20220408132018510](vue3-source-code.assets/image-20220408132018510.png)

reactive函数，返回响应式对象的proxy代理

![image-20220408132201627](vue3-source-code.assets/image-20220408132201627.png)

现在我们就可以在get的时候**track**收集（跟踪）依赖，set的时候调用**trigger**触发依赖

这样就可以自动的去收集和触发依赖了

![image-20220408202839415](vue3-source-code.assets/image-20220408202839415.png)

![image-20220408133119533](vue3-source-code.assets/image-20220408133119533.png)



## activeEffect变量

上面的设计有一个缺陷是，不管是什么地方，只要是用到了响应式数据的地方，都会进入Proxy的get方法中，调用track追踪依赖。但是我们只希望追踪effect函数。

![image-20220408133407152](vue3-source-code.assets/image-20220408133407152.png)

这时候我们可以修改一下effect函数

1、effect函数传入一个函数，传入用到响应式数据的，要收集依赖的函数，并且在内部执行这个函数。在执行函数的时候，如果使用到了响应式数据，会进入对应的proxy的get中调用track来追踪依赖。

2、在全局会有一个activeEffect变量指向当前正在运行的副作用函数

![image-20220408133622904](vue3-source-code.assets/image-20220408133622904.png)

修改track（追踪依赖）函数，在track内部，先获取target对象的key属性的set集合，收集activeEffect函数到对应的set集合中

trigger函数不需要改，因为我们在这里只是更准确的修改了依赖的来源，trigger函数的作用仅仅是触发收集到的依赖。

![image-20220408133813743](vue3-source-code.assets/image-20220408133813743.png)

下图中，effect收集了两个函数的依赖。

当price修改时，两个函数都会执行

修改quantity则只会**响应式地执行**第一个函数

![image-20220408134026983](vue3-source-code.assets/image-20220408134026983.png)

## ref

我们可以使用对象的get和set方法来定义ref

![image-20220408134344428](vue3-source-code.assets/image-20220408134344428.png)

将响应式数据（通常是基本数据类型）封装在对象的value属性中，并且返回这个对象。

这里的set方法中需要判断raw和newVal 是否一样，否则会死循环的

![image-20220408134515576](vue3-source-code.assets/image-20220408134515576.png)

![image-20220408134713253](vue3-source-code.assets/image-20220408134713253.png)

## computed



![image-20220408135715570](vue3-source-code.assets/image-20220408135715570.png)

## Vue2 Limit 

![image-20220408140511108](vue3-source-code.assets/image-20220408140511108.png)

## vue3的改变

### dep类的改变

原本dep类中的`depend()`和`notify()`方法被抽离到`track()`和`trigger()`函数中

![image-20220408141021645](vue3-source-code.assets/image-20220408141021645.png)

正因如此，vue3中每个属性的响应式依赖不再存储在dep类中，而是保存在一个set中。

![image-20220408141218502](vue3-source-code.assets/image-20220408141218502.png)

![image-20220408141332757](vue3-source-code.assets/image-20220408141332757.png)



### proxy的改变

使用proxy的优点：**后添加进去的属性也是响应式的**

还一个优点是**性能问题**，如果一个对象有很多属性，并且有嵌套层级，那么在转化成响应式对象的时候，需要递归的遍历每个属性，用Object.defineProperty来将属性变成响应式。

而Proxy代理的是整个对象，不需要遍历所有属性，并且如果有嵌套对象的话，只需要在return该对象的时候，给这个对象再**嵌套一层Proxy代理**即可。

![image-20220408141824424](vue3-source-code.assets/image-20220408141824424.png)

![image-20220408142101611](vue3-source-code.assets/image-20220408142101611.png)

## 源码结构

![image-20220408140805606](vue3-source-code.assets/image-20220408140805606.png)

![image-20220408180104437](vue3-source-code.assets/image-20220408180104437.png)



# Renderer

renderer模块的作用是，将vnode转成真实dom，它有三个步骤

- 调用render函数获取vnode

![image-20220409151312862](vue3-source-code.assets/image-20220409151312862.png)

![image-20220409151302760](vue3-source-code.assets/image-20220409151302760.png)

- 调用mount函数将vnode转成真实dom并且挂载到页面上
- 如果更新了响应式数据，那么会重新调用render函数获取新vnode，对新旧vnode进行patch更新操作

![image-20220408181804397](vue3-source-code.assets/image-20220408181804397.png)

















# 从模板到页面的过程

核心模块：compiler、render、reactivity

1、创建组件实例并初始化

组件实例保存在this.$中

![image-20220409150004609](vue3-source-code.assets/image-20220409150004609.png)

![image-20220409145933735](vue3-source-code.assets/image-20220409145933735.png)

![image-20220410215409709](vue3-source-code.assets/image-20220410215409709.png)

在初始化组件实例的时候，会执行setup函数

![image-20220410215641253](vue3-source-code.assets/image-20220410215641253.png)

并且将setupResult挂载到组件实例中

![image-20220410215503954](vue3-source-code.assets/image-20220410215503954.png)

![image-20220410215702202](vue3-source-code.assets/image-20220410215702202.png)





2、**compiler模块**将html转换成render函数

![image-20220410220703784](vue3-source-code.assets/image-20220410220703784.png)

![image-20220408185920086](vue3-source-code.assets/image-20220408185920086.png)



2、Reactivity模块初始化响应式对象

![image-20220408190009441](vue3-source-code.assets/image-20220408190009441.png)

3、渲染阶段，

- 首先，Render模块调用（使用了响应式对象的）render函数来监听变化，返回Vnode
- 其次，在挂载阶段，调用mount函数创建真实dom并挂载

![image-20220408190252145](vue3-source-code.assets/image-20220408190252145.png)

- 如果**响应式数据发生了变化**，那么会重新调用render函数，获取新的vnode，进行patch操作，更新dom

![image-20220408190323180](vue3-source-code.assets/image-20220408190323180.png)







# 解读Vue源码

## 1、渲染机制

vnode，可以编写不同的渲染器，渲染出不同平台的组件（ios，android）

![image-20220409152509064](vue3-source-code.assets/image-20220409152509064.png)

------

render function的变化

vue2的render函数会默认传入h函数，而vue3则是需要从Vue中单独导入

并且在vue3中，第二个参数总是一个扁平的对象，而不是像vue2一样需要嵌套

![image-20220409152556958](vue3-source-code.assets/image-20220409152556958.png)

![image-20220409152724026](vue3-source-code.assets/image-20220409152724026.png)

## 2、如何，何时使用render函数

> 当你发现，用js更能简单的表达组件内部的逻辑的时候，推荐使用render函数的形式来编写组件

基本使用

![image-20220409153506997](vue3-source-code.assets/image-20220409153506997.png)

------

v-if，我们可以直接用判断来实现v-if的效果（上面的代码只是为了说明，可以将下面的三目运算符抽离成简单的js逻辑代码）。

![image-20220409153730965](vue3-source-code.assets/image-20220409153730965.png)

------

v-for，用map来实现（map会返回一个数组）

![image-20220409153904565](vue3-source-code.assets/image-20220409153904565.png)

------

插槽，插槽的内容都会保存在this.$slots中，默认插槽就是default。

值得注意的是，如果存在插槽，那么**$slots中对应的一定是函数，并且返回值一定是数组（插槽。**

如果往函数中添加参数，例如`default({name:'wjj'})`，那么就相当于是作用域插槽，将本组件内部的值传入插槽，让使用插槽的地方可以使用这些值。

![image-20220409160111748](vue3-source-code.assets/image-20220409160111748.png)



如果要用render函数+插槽实现这种自我嵌套的递归结构

![image-20220409160018930](vue3-source-code.assets/image-20220409160018930.png)

可以看到，每个Stack组件都会渲染内部的slots.defaults并包裹到一个div.stack中，如果child是Stack的话，会重新调用内部的render函数。其实就相当于是递归了。

![image-20220409155723333](vue3-source-code.assets/image-20220409155723333.png)

如果添加嵌套层级的话，会有下面的效果

![image-20220409160410076](vue3-source-code.assets/image-20220409160410076.png)

![image-20220409160428144](vue3-source-code.assets/image-20220409160428144.png)

## 3、Vue3的性能优化

这个网站可以将template模板转成对应的render函数 ： https://vue-next-template-explorer.netlify.app/

------

**静态节点的作用域提升**，在改变响应式数据重新执行render函数时，就不需要重新createVnode创建静态节点了（因为他们是不会改变的）。

![image-20220409215350222](vue3-source-code.assets/image-20220409215350222.png)

------

**对属性也进行了分析**，将一些动态的props（从组件实例中取值的属性）保存在最后一个数组中，结合patchFlag（倒数第二个参数的数字）可以避免在diff算法对属性进行判断时枚举vnode的所有属性，**只去枚举那些动态的属性**。

而**patchFlag的每个数字代表不同的属性**，例如下图，8是PROPS，1是class，那么就可以**精准的**去对比这些由patchFlag指定的属性

![image-20220409215458492](vue3-source-code.assets/image-20220409215458492.png)

------

在第一次渲染的时候**缓存内敛函数**（绑定的是一些函数调用的返回结果，例如下图中的`foo(123)`）到render函数的第二个参数传入的**cache数组中**。在后续调用render函数时，就从cache中去取这个函数并且执行，而函数内部会从_ctx中取对应的函数（例如下图的foo）来保证函数总是最新的。

> 经过这种优化之后，**内联函数的事件绑定不认为是动态属性了**。从下图可以看出，已经没有patchFlag数字了，也没有`['foo']`指定foo为动态属性了。那么可以在比较新旧vnode的时候，**避免对事件绑定的属性进行判断。**特别是在监听子组件的事件时，可以避免整颗dom树的re-render

![image-20220409224620922](vue3-source-code.assets/image-20220409224620922.png)

------

将每个**模板的根用createBlock的形式创建vnode**，但是这个vnode对象上多了一个**dynamicChildren属性**，所以称之为Block。因为嵌套创建vnode，函数完成是由内而外的，所以在创建Block的时候，内部在createVnode时已经将所有的动态结点（有patchFlag属性的结点）添加到openBLock打开的数组中，在创建Block的时候只需要将这个数组赋值给dynamicChildren属性即可。

![image-20220410123944322](vue3-source-code.assets/image-20220410123944322.png)

另外，v-if和v-for也会独立的作为BLock

![image-20220410124840659](vue3-source-code.assets/image-20220410124840659.png)











