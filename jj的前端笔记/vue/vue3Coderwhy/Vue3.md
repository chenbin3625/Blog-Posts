# vscode插件

![image-20220217164701299](Vue3.assets/image-20220217164701299.png)

![image-20220217171656060](Vue3.assets/image-20220217171656060.png)

![image-20220217171711339](Vue3.assets/image-20220217171711339.png)

# Vue3的变化

**使用Proxy进行数据劫持**

- 在`Vue2.x`的时候，`Vue2`是使用`Object.defineProperty`来劫持数据的`getter`和`setter`方法
- 这种方式存在一个缺陷就是当给对象**添加或者删除属性**时，是无法劫持和监听的
- 所以在`Vue2.x`的时候不得不提供一些特殊的`API`，比如`$set`或`$delete`
- 而`Vue3.x`开始，`Vue`使用`Proxy`来实现数据的劫持

尤大提到的一点是，Proxy仅仅要求传入一个对象和handler，如果有嵌套的对象，仅仅在使用到该对象的时候（get的时候）将该对象嵌套一层Proxy并返回，性能更高。

虽然Proxy是配合Reflect来返回`target[key]`的，但是如果在Proxy的handler内部的get直接return target[key]，不会跟Object.getProperty一样递归调用（重复调用get）。

composition API里都有对应的shallow方法，这样的话嵌套的对象就不会加入响应式（**浅层响应式**）

**编译方面优化**

生成`Block Tree` 、 `Slot`编译优化、 `diff`算法等

**新的API**

- 在`Vue2.x`的时候我们会通过`Options API`来描述组件对象
- `Composition API` 可以将相关联的代码放到同一处进行处理，而不需要在多个`Options`中寻找

**Hooks函数增加代码的复用性**

- 在`Vue2.x`的时候，我们通常通过`mixins`在多个组件之间共享逻辑
- 但是很大的缺陷就是`mixins`也是由一大堆的`Options`组成的，并且多个`mixins`会存在命名冲突问题
- 在`Vue3.x`中，我们可以通过`Hook`函数，将一部分独立的逻辑抽取，并且做到响应式

# Vue初体验

## 引入Vue

- CDN引入

![image-20220130135219712](Vue3.assets/image-20220130135219712.png)

![image-20220130140437735](Vue3.assets/image-20220130140437735.png)

- 下载js文件手动引入
- npm包管理工具安装使用Vue
- 通过Vue CLI创建项目使用Vue

## MVVM和MVC

**MVC**：Model-View-Controller

![image-20220130141046057](Vue3.assets/image-20220130141046057.png)

**MVVM**：Model-View-ViewModel

![image-20220130141454194](Vue3.assets/image-20220130141454194.png)

## 编写template

- 写法1：用`script`标签，表名`type`为`x-template`，**缺点是没有高亮**

![image-20220130142103582](Vue3.assets/image-20220130142103582.png)

- 写法2：用任意标签（`template`，不会被浏览器渲染），注明id

![image-20220130142220178](Vue3.assets/image-20220130142220178.png)

如果`template`的开头是#，那么内部会先执行`querySelector`的

> vue3的template中允许有多个根元素了，vue2的template只允许有一个根元素

## methods面试题

![image-20220130142518768](Vue3.assets/image-20220130142518768.png)

在源码中可以看到，如果`methods`有值的话，就根据`key`取出所有的函数，然后**用`bind`将`this`绑定为`publicThis`**，然后将`bind`返回的函数对象保存到`ctx`中。

![image-20220131000200402](Vue3.assets/image-20220131000200402.png)

`publicThis`是data函数返回的对象的代理对象，也就是`methods`中`this`的指向

![image-20220131000720031](Vue3.assets/image-20220131000720031.png)

## 源码

> `--sourcemap`是做了代码映射。这样的话在调试的时候，如果没有加这个的话，就会在`vue.global.js`这个一万多行的文件中 	进行调试。如果加了这个的话，会进入正在调试的代码的对应文件（模块）中

Vue3现在需要搜`vuejs/core`

![image-20220210201516714](Vue3.assets/image-20220210201516714.png)

我下载的最新版本需要用pnpm这个工具来进行安装依赖

![image-20220210203816752](Vue3.assets/image-20220210203816752.png)

![image-20220130143333364](Vue3.assets/image-20220130143333364.png)

在example文件夹下创建demo，导入dist文件夹下的vue.global.js进行调试

![image-20220211191211254](Vue3.assets/image-20220211191211254.png)

![image-20220130143725059](Vue3.assets/image-20220130143725059.png)

![image-20220130143828275](Vue3.assets/image-20220130143828275.png)

## VScode创建代码片段

![image-20220131002015124](Vue3.assets/image-20220131002015124.png)

选html

![image-20220131002027513](Vue3.assets/image-20220131002027513.png)

在[这个网站](snippet-generator.app)中将`html`代码转成`json`格式

![image-20220131002247702](Vue3.assets/image-20220131002247702.png)

复制到`html.json`中

![image-20220131002435662](Vue3.assets/image-20220131002435662.png)

输入`vueapp+回车`即可生成代码

![image-20220131002820583](Vue3.assets/image-20220131002820583.png)

# Vue-Cli

![image-20220205195511061](Vue3.assets/image-20220205195511061.png)

![image-20220205195945580](Vue3.assets/image-20220205195945580.png)

![image-20220205202436807](Vue3.assets/image-20220205202436807.png)

## 创建项目

执行`vue create 03_vuecli_demo`之后有下面的这些选项，我们选择最后一个（手动选择配置）

![image-20220205200309043](Vue3.assets/image-20220205200309043.png)

出现下面的配置，解析如图

![image-20220205200501471](Vue3.assets/image-20220205200501471.png)

因为我们选择了choose vue version和babel，所以会出现下面的两个配置

![image-20220205200631465](Vue3.assets/image-20220205200631465.png)

![image-20220205200809781](Vue3.assets/image-20220205200809781.png)

结束之后会有下面这个提示，输入y敲回车并且设置名字之后，下次在`vue create`新项目的时候就可以选择自己的预设了

![image-20220205200939343](Vue3.assets/image-20220205200939343.png)

## 目录结构

![image-20220205201914718](Vue3.assets/image-20220205201914718.png)

![image-20220205202213325](Vue3.assets/image-20220205202213325.png)

![image-20220205202809989](Vue3.assets/image-20220205202809989.png)

## 源码解读一

在执行npm run serve的时候，会去执行node_modules/bin下的vue-cli-service中的代码

![image-20220206130000961](Vue3.assets/image-20220206130000961.png)

在执行的时候，会去找到真实的代码位置（bin下的vue-cli-service相当于是一个**短连接**），真实代码的位置在`node_modules/@vue/cli-service`。在执行vue-cli-service的时候本质上会去执行对应bin目录下的`vue-cli-service.js`中的代码

![image-20220206130427538](Vue3.assets/image-20220206130427538.png)

在执行的时候导入了Service这个类，new了这个类的实例，调用了run方法。command就是我们输入指令的后半部分

![image-20220206130824209](Vue3.assets/image-20220206130824209.png)

![image-20220206130722887](Vue3.assets/image-20220206130722887.png)

run方法源码如下

![image-20220206131700640](Vue3.assets/image-20220206131700640.png)

那么`this.commands`中到底有什么呢？通过源码可知，在实例化的时候commands是一个空对象，那么它里面的值是哪来的呢？

![image-20220206131828411](Vue3.assets/image-20220206131828411.png)

真正给`this.commands`赋值的是构造器中的`this.plugins`，它执行了`resolvePlugins`函数，在这个函数中，通过map将路径字符串封装成对象，这个对象的apply属性对应的是require函数，用于使用对应模块导出的内容

![image-20220206131958961](Vue3.assets/image-20220206131958961.png)

![image-20220206132205985](Vue3.assets/image-20220206132205985.png)

![image-20220206132336007](Vue3.assets/image-20220206132336007.png)

在获取`this.commands[name]`前执行了`this.init`方法这个方法中对`this.plugins`做了遍历，调用了每个对象的apply方法

![image-20220206132849720](Vue3.assets/image-20220206132849720.png)

用serve举例，apply调用的本质上是serve导出的方法

![image-20220206133108947](Vue3.assets/image-20220206133108947.png)

调用方法的时候传入了new的`PluginAPI`实例，在方法内部调用了实例的`registerCommand`方法，在这个方法内部给`this.commands`赋值

![image-20220206133228252](Vue3.assets/image-20220206133228252.png)

![image-20220206133420250](Vue3.assets/image-20220206133420250.png)

总的流程

![image-20220206134409825](Vue3.assets/image-20220206134409825.png)

## 阅读源码二

10 |  1:10:00

# Vite



## 官网解读

![image-20220403170251612](Vue3.assets/image-20220403170251612.png)

![image-20220403170440782](Vue3.assets/image-20220403170440782.png)



![image-20220403170451792](Vue3.assets/image-20220403170451792.png)

> vite是基于esModule的

![image-20220206140006527](Vue3.assets/image-20220206140006527.png)

![image-20220206140104344](Vue3.assets/image-20220206140104344.png)

## Vite解决的问题

![image-20220206141205826](Vue3.assets/image-20220206141205826.png)

![image-20220206141248345](Vue3.assets/image-20220206141248345.png)

![image-20220206141407408](Vue3.assets/image-20220206141407408.png)

## 安装和基本使用

![image-20220206143714168](Vue3.assets/image-20220206143714168.png)

![image-20220206141436807](Vue3.assets/image-20220206141436807.png)

- 构建速度非常快

![image-20220206143411655](Vue3.assets/image-20220206143411655.png)

- 不会再跟之前一样发送大量请求

![image-20220206143331866](Vue3.assets/image-20220206143331866.png)

- 不需要写后缀名了，`vite`会帮你解析

![image-20220206143442678](Vue3.assets/image-20220206143442678.png)

## Vite对文件类型的支持

### Vite默认支持css

![image-20220206143908484](Vue3.assets/image-20220206143908484.png)

![image-20220206143914478](Vue3.assets/image-20220206143914478.png)

![image-20220206143933683](Vue3.assets/image-20220206143933683.png)

### Vite不支持less

![image-20220206144335550](Vue3.assets/image-20220206144335550.png)

![image-20220206144157582](Vue3.assets/image-20220206144157582.png)

我们需要安装一下less

![image-20220206144239898](Vue3.assets/image-20220206144239898.png)

安装好后重新执行命令即可，不需要配置

![image-20220206144356829](Vue3.assets/image-20220206144356829.png)

### css浏览器前缀

可以看到，`user-select:none`并没有加上浏览器前缀，需要下载`postcss`和对应插件

![image-20220206144524936](Vue3.assets/image-20220206144524936.png)

![image-20220206144836705](Vue3.assets/image-20220206144836705.png)

进行`postcss`的插件配置

![image-20220206144856296](Vue3.assets/image-20220206144856296.png)

重新执行命令即可

![image-20220206144915878](Vue3.assets/image-20220206144915878.png)

### vite默认支持ts

![image-20220206145350137](Vue3.assets/image-20220206145350137.png)

![image-20220206145402814](Vue3.assets/image-20220206145402814.png)

![image-20220206145407747](Vue3.assets/image-20220206145407747.png)

### vite对vue的支持

![image-20220206150731219](Vue3.assets/image-20220206150731219.png)

安装并编写好vue3代码之后引入

![image-20220206150656103](Vue3.assets/image-20220206150656103.png)

打包报错，无法解析

![image-20220206150634249](Vue3.assets/image-20220206150634249.png)

安装`@vitejs/plugin-vue`并做如下配置即可正常解析

![image-20220206151003444](Vue3.assets/image-20220206151003444.png)

如果还有如下报错的话，说明需要再安装`@vue/compiler-sfc`(webpack中有提到)

![image-20220206151056742](Vue3.assets/image-20220206151056742.png)

## vite的服务器原理

vite会创建一个本地服务器，vite本地服务器依赖的是connect库，现在不是用koa了。我们请求的还是原来的ts或者less文件，但是浏览器是不认识的，vite开启的本地服务的工作就是将这些文件进行转化（转成es6的js代码）

![image-20220206145949333](Vue3.assets/image-20220206145949333.png)

![image-20220206150021357](Vue3.assets/image-20220206150021357.png)

## vite预打包

在第一次执行npx vite的时候，会用esbuild对所有的dependencies进行预打包，放入node_modules的.bin文件夹下

![image-20220206151325226](Vue3.assets/image-20220206151325226.png)

![image-20220206151400098](Vue3.assets/image-20220206151400098.png)

这样做的好处是，下一次重新打包的时候，就不用打包这些dependencies了（除非做了修改），这样可以提升打包效率

![image-20220206151442827](Vue3.assets/image-20220206151442827.png)

## vite打包生成dist文件

![image-20220206151856037](Vue3.assets/image-20220206151856037.png)

![image-20220206152315772](Vue3.assets/image-20220206152315772.png)

可以在package.json中设置指令，方便我们使用

![image-20220206152018555](Vue3.assets/image-20220206152018555.png)



## EsBuild构建工具

![](Vue3.assets/image-20220206152300715.png)

![image-20220206152613929](Vue3.assets/image-20220206152613929.png)

## vite脚手架创建项目

vue-cli是基于webpack的，我们可以通过vite脚手架工具来创建vue项目

![image-20220206152721526](Vue3.assets/image-20220206152721526.png)

执行`create-app 项目名`，选择vue

![image-20220206153015742](Vue3.assets/image-20220206153015742.png)

选择vue-ts，

![image-20220206153038114](Vue3.assets/image-20220206153038114.png)

创建的项目中没有安装依赖，需要npm install

![image-20220206153237207](Vue3.assets/image-20220206153237207.png)

![image-20220206153130893](Vue3.assets/image-20220206153130893.png)

安装完依赖后，查看package.json中的script，执行npm run dev可以运行项目

![image-20220206153502118](Vue3.assets/image-20220206153502118.png)

![image-20220206153518908](Vue3.assets/image-20220206153518908.png)

# 组件化开发

## css作用域

![image-20220206165238020](Vue3.assets/image-20220206165238020.png)

`scoped`防止组件之间的样式污染

![image-20220206164549108](Vue3.assets/image-20220206164549108.png)

它是用属性选择器来实现作用域的，它会给标签加上属性，设置样式的时候用**属性选择器**`[]`来设置样式

![image-20220206164655808](Vue3.assets/image-20220206164655808.png)

**但是子组件会出现css穿透，属性同样会加到子组件的根元素上**，所以在**template中需要一个根元素div**，在开发的时候也需要尽量避免直接写`h2`修改所有`h2`标签的样式，最好加个class来添加样式

![image-20220206165023896](Vue3.assets/image-20220206165023896.png)

## 组件通信

![image-20220206170016304](Vue3.assets/image-20220206170016304.png)

### $emit和props（父子）

![image-20220206170040589](Vue3.assets/image-20220206170040589.png)

emits的数组语法

![image-20220206235507330](Vue3.assets/image-20220206235507330.png)

![image-20220206235531183](Vue3.assets/image-20220206235531183.png)

emits的对象语法

![image-20220206235925744](Vue3.assets/image-20220206235925744.png)

### $refs（父子）

![image-20220207161559519](Vue3.assets/image-20220207161559519.png)

![image-20220207161653132](Vue3.assets/image-20220207161653132.png)

### provide / inject（子孙）

![image-20220207000602098](Vue3.assets/image-20220207000602098.png)

**基本使用**

![image-20220207003119496](Vue3.assets/image-20220207003119496.png)

**provide**：参数是**对象**或者**返回对象的函数**，当你需要**提供data中的数据时**，必须写成返回对象的函数的形式来**绑定this**

![image-20220207125946397](Vue3.assets/image-20220207125946397.png)

![image-20220207130100204](Vue3.assets/image-20220207130100204.png)

在孙子组件中使用**inject**接收

![image-20220207130614526](Vue3.assets/image-20220207130614526.png)

需要注意的是，**provide返回的对象的数据不是响应式的**，可以用下面这种方法（computed API）将数据加入响应式

![image-20220207131014382](Vue3.assets/image-20220207131014382.png)



### Mitt事件总线

![image-20220207131435872](Vue3.assets/image-20220207131435872.png)

![image-20220207131755458](Vue3.assets/image-20220207131755458.png)

在about组件中通过emitter的`emit方法`来发送事件，第一个参数是**事件名**，第二个参数是**传递的参数**

![image-20220207132210978](Vue3.assets/image-20220207132210978.png)

在homeContent中的`created`生命周期开始监听事件，也可以使用`*`来监听所有事件

![image-20220207132302626](Vue3.assets/image-20220207132302626.png)

![image-20220207132534631](Vue3.assets/image-20220207132534631.png)

取消监听，保存函数的引用来，或者用`clear()`方法

![image-20220207132649070](Vue3.assets/image-20220207132649070.png)

### $parent和$root

![image-20220207162325065](Vue3.assets/image-20220207162325065.png)

$parent用于获取父组件的Proxy，可以通过操作Proxy来获取父组件中的数据

$root则是根组件

### 组件v-model

### vuex

## 插槽slot

![image-20220207133855088](Vue3.assets/image-20220207133855088.png)

![image-20220207133901673](Vue3.assets/image-20220207133901673.png)

### 基本使用

![image-20220207134126639](Vue3.assets/image-20220207134126639.png)

![image-20220207134027429](Vue3.assets/image-20220207134027429.png)

### 插槽默认内容

在slot标签中定义默认内容，如果在使用的时候没有插入内容，就会显示插槽的默认内容

![image-20220207134254330](Vue3.assets/image-20220207134254330.png)

### 具名插槽

![image-20220207134723788](Vue3.assets/image-20220207134723788.png)

像这样的话，如果在使用组件的时候插入了一个div标签，那么会给这三个插槽都插入div，这是因为，没有给插槽设置name的话，会有一个**默认的name为`'default'`**，下面来实现一个**简单的navBar**

#### navBar案例

slot标签设置name属性，这就是这个具名插槽的名称

![image-20220207135426417](Vue3.assets/image-20220207135426417.png)

![image-20220207135310103](Vue3.assets/image-20220207135310103.png)

在使用标签的部分，使用**template和v-slot**来指定模板内容要插入哪个插槽

![image-20220207135453531](Vue3.assets/image-20220207135453531.png)

#### 动态插槽名

![image-20220207140346363](Vue3.assets/image-20220207140346363.png)

![image-20220207140420538](Vue3.assets/image-20220207140420538.png)

#### v-slot的缩写

可以使用#代替原来的`v-slot:`指令

![image-20220207142221833](Vue3.assets/image-20220207142221833.png)

### 作用域插槽

尽管插槽插入的内容是在子组件中渲染的，但是如果父组件插入插槽内容的部分使用mustache语法，使用的还是父组件data中的数据，这是因为Vue中有**渲染作用域**的概念。

![image-20220207142815546](Vue3.assets/image-20220207142815546.png)

![image-20220207143016734](Vue3.assets/image-20220207143016734.png)

#### 作用域插槽的使用

子组件

![image-20220207144146285](Vue3.assets/image-20220207144146285.png)

父组件

![image-20220207144515713](Vue3.assets/image-20220207144515713.png)

> 注意，`v-slot="slotProps"`本质上是`v-slot:default="slotProps"`，如果想指定插槽名称的话就`v-slot:xxx="xxx"`

#### 默认独占插槽

**默认插槽**的作用域插槽可以这么用，但是最好是都写个template比较好，写法比较好

> 具名插槽不能这么用

![image-20220207145428379](Vue3.assets/image-20220207145428379.png)

![image-20220207145657632](Vue3.assets/image-20220207145657632.png)

#### 解构赋值

![image-20220207150416575](Vue3.assets/image-20220207150416575.png)

### 插槽原理

实现原理：当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在`vm.$slot`中，默认插槽为`vm.$slot.default`，具名插槽为`vm.$slot.xxx`，xxx 为插槽名，当组件执行渲染函数时候，遇到slot标签，使用`$slot`中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

## component动态组件

这里也可以用路由vue-router来实现

![image-20220207150548004](Vue3.assets/image-20220207150548004.png)

v-if的做法

![image-20220207151033336](Vue3.assets/image-20220207151033336.png)

动态组件的做法，注意，虽然注册组件的时候是Home，但是is指定组件名用的是home，这是因为用了**驼峰**

![image-20220207151340862](Vue3.assets/image-20220207151340862.png)

### 传参

动态组件的传参跟普通组件一样，最终会传递给is对应的组件

![image-20220207152040318](Vue3.assets/image-20220207152040318.png)

## keep-alive

接着动态组件的案例。为了验证组件会被销毁，我们在about组件中加了一个按钮计数器，切换到about组件，给计数器计数后切换到别的组件再切回about，会发现变成了默认值0

![image-20220207152512906](Vue3.assets/image-20220207152512906.png)

![image-20220207152641977](Vue3.assets/image-20220207152641977.png)

这是因为组件在切换的时候，about组件**被销毁**了，内部并没有帮我们进行缓存。但是在开发过程中，我们经常希望**继续保持组件的状态**而不是销毁，这个时候我们就可以**使用keep-alive**将动态组件包裹。

![image-20220207153505206](Vue3.assets/image-20220207153505206.png)

### 属性

include和exclude中匹配的名称是组件的name属性

![image-20220207153636289](Vue3.assets/image-20220207153636289.png)

![image-20220207153745143](Vue3.assets/image-20220207153745143.png)

### 缓存组件的生命周期

![image-20220207153946433](Vue3.assets/image-20220207153946433.png)

## 异步组件

![image-20220207155126346](Vue3.assets/image-20220207155126346.png) 

**异步导入的话webpack会进行分包操作**，不会全部冗余在`app.js`文件中

![image-20220207154952684](Vue3.assets/image-20220207154952684.png)

### 用法

![image-20220207155700177](Vue3.assets/image-20220207155700177.png)

工厂函数方式

![image-20220207155439477](Vue3.assets/image-20220207155439477.png)

对象方式（用的较少）

![image-20220207155725309](Vue3.assets/image-20220207155725309.png)

### suspense

![image-20220207160604141](Vue3.assets/image-20220207160604141.png)

![image-20220207160543212](Vue3.assets/image-20220207160543212.png)

## $refs获取dom元素

**组件实例**中会有一个$refs属性

![image-20220207161108187](Vue3.assets/image-20220207161108187.png)

### ref绑定在元素上

![image-20220207161129964](Vue3.assets/image-20220207161129964.png)

### ref绑定在组件上

![image-20220207161342858](Vue3.assets/image-20220207161342858.png)

对Proxy进行操作的话，本质上都是对组件实例进行操作

![image-20220207161426825](Vue3.assets/image-20220207161426825.png)

可以直接获取到子组件中的数据

![image-20220207161559519](Vue3.assets/image-20220207161559519.png)

![image-20220207161706974](Vue3.assets/image-20220207161706974.png)

## 生命周期

![image-20220225154750198](Vue3.assets/image-20220225154750198.png)

![image-20220207163303835](Vue3.assets/image-20220207163303835.png)

> 注意，destroyed变成了unmounted了

![image-20220207163552024](Vue3.assets/image-20220207163552024.png)

## 在组件上使用v-model（封装高级组件）

### 基本使用 

使用v-model的时候就已经默认帮我们监听`update:xxx`事件了，也默认帮我们`v-bind`传值了

![image-20220207192324308](Vue3.assets/image-20220207192324308.png)

子组件中发射事件

![image-20220207192510632](Vue3.assets/image-20220207192510632.png)

也可以监听input的输入事件来触发发射事件

![image-20220207192557776](Vue3.assets/image-20220207192557776.png)

### 在子组件的input上直接使用v-model

![image-20220207193049912](Vue3.assets/image-20220207193049912.png)

**通过计算属性来实现**，在setter中发射事件把值传递，在getter中返回props中的属性

![image-20220207193111243](Vue3.assets/image-20220207193111243.png)

#### 例外

如果传入的modelValue**是一个对象**，要对**对象的属性**进行双向绑定就不能像下面这么写了，因为set只有在**设置get的返回的值时才会触发**，但是我们get返回的是一个对象，我们修改的是这个对象的属性（原理类似于const可以修改对象的属性但是不可以修改对象的指向），所以set不会触发

![image-20220222215120577](Vue3.assets/image-20220222215120577.png)

我们通过watch监听属性的变化，对props.modelValue中的值进行**浅拷贝**，防止直接修改props的值

![image-20220222215402116](Vue3.assets/image-20220222215402116.png)

此时如果我们在父组件中**重置**formData，我们的重置是直接**赋值为一个新的对象**，由于浅拷贝的原因，modelValue指向了新的对象，而子组件中拷贝出的formData指向的是原对象，原对象没有发生改变，重置失效。所以将这段代码**放入computed**中，computed会因为get函数中的**响应式数据modelValue发生改变而重新调用get函数，以至于重新给formData赋值**

![image-20220222220244243](Vue3.assets/image-20220222220244243.png)

![image-20220222215616081](Vue3.assets/image-20220222215616081.png)

我们也可以不赋值为新的对象，而是修改原来对象的值，因为是**浅拷贝**，父组件中的formData.value这个对象和内部modelValue的对象是**指向的同一个对象**，那么我们可以直接重置formData.value这个对象中的属性来达到重置效果

![image-20220222220728603](Vue3.assets/image-20220222220728603.png)

### 绑定多个v-model

在`v-model`后跟上`:xxx`可以**指定子组件中接收`props`的属性名**，不加的话默认是会跟上`:modelValue`

![image-20220207193628787](Vue3.assets/image-20220207193628787.png)

![image-20220207193743504](Vue3.assets/image-20220207193743504.png)

## Mixin

![image-20220208153501725](Vue3.assets/image-20220208153501725.png)

### 基本使用

编写`mixin`对象，`mixin`对象可以写所有关于options API的内容

![image-20220208154722573](Vue3.assets/image-20220208154722573.png)

通过`mixins`属性混入`mixin`对象

![image-20220208154703243](Vue3.assets/image-20220208154703243.png)

### mixin冲突规则

如果key一样，混入发生冲突，有下面的规则

![image-20220208202251414](Vue3.assets/image-20220208202251414.png)

> 总结就是：生命周期钩子都会调用，其余的重名了会用**组件自身的**

### 全局mixin

利用`createApp`返回的`app`对象的`mixin`方法，可以实现全局混入，也就是说创建的所有组件都会有混入的内容

![image-20220208203010369](Vue3.assets/image-20220208203010369.png)

### extends（用的较少）

使用extends也可以达到混入的效果，但是**只能继承对象中的options配置**，不会继承template以及style

![image-20220208203430072](Vue3.assets/image-20220208203430072.png)

# Vue3实现动画

![image-20220207200528073](Vue3.assets/image-20220207200528073.png)

## transition基本使用

![image-20220207201638933](Vue3.assets/image-20220207201638933.png)

添加下面这些样式，即可实现淡入淡出，持续`2s`的渐变效果

![image-20220207201705767](Vue3.assets/image-20220207201705767.png)

## transition组件的原理

![image-20220207202451675](Vue3.assets/image-20220207202451675.png)

如果transition组件上没有定义name，name默认就是v

![image-20220207202752720](Vue3.assets/image-20220207202752720.png)

![image-20220207203855065](Vue3.assets/image-20220207203855065.png)

官方的图

![image-20220207203823589](Vue3.assets/image-20220207203823589.png)

## animation动画

这是利用了在插入和删除的时候会**加入active这个class**来实现的动画效果

![image-20220207205158817](Vue3.assets/image-20220207205158817.png)

![image-20220207205043803](Vue3.assets/image-20220207205043803.png)

## 同时设置动画（特殊情况）

![image-20220208111136231](Vue3.assets/image-20220208111136231.png)

同时设置animation和transition动画，实现bounce+淡出淡入效果

![image-20220208110918690](Vue3.assets/image-20220208110918690.png)

## 两个元素切换，过渡的模式mode

![image-20220208111659212](Vue3.assets/image-20220208111659212.png)

![image-20220208112250275](Vue3.assets/image-20220208112250275.png)

使用动态组件进行切换

![image-20220208112505825](Vue3.assets/image-20220208112505825.png)

## appear初次显示动画

当前情况下直接刷新，元素是会直接显示的，如果希望第一次出现的时候有动画效果，可以添加appear属性

![image-20220208112641366](Vue3.assets/image-20220208112641366.png)

可以看到，在加了这个属性之后，第一次进入也会加上**enter-active**这个类名

![image-20220208112821552](Vue3.assets/image-20220208112821552.png)

## 认识animate.css第三方库

> 官网：animate.style

![image-20220208122706398](Vue3.assets/image-20220208122706398.png)

右边这栏是keyframes动画名，导入动画库之后可以直接按照名字来使用这些关键帧

![image-20220208124311133](Vue3.assets/image-20220208124311133.png)

### 基本使用

导入

![image-20220208122952038](Vue3.assets/image-20220208122952038.png)

使用动画库中的bounce（**有方向**的淡入动画，建议在leave-active的时候使用动画的**reverse反转**）

![image-20220208124514360](Vue3.assets/image-20220208124514360.png)



### 自定义过渡class名

我们知道，vue会在dom元素插入和删除的适当时机为我们添加一些类名，例如`v-enter-active`，虽然我们可以通过name这个attribute修改默认的前缀v，但是整体我们是不能通过name修改的。想要自定义class名的话可以用下面的这些attribute实现。

![image-20220208124854517](Vue3.assets/image-20220208124854517.png)

通过自定义过渡class名来使用第三方库（要加上animate__animated，才有动画执行时间）

![image-20220208125204629](Vue3.assets/image-20220208125204629.png)

## 认识gsap第三方库

![image-20220208125649193](Vue3.assets/image-20220208125649193.png)

![image-20220208130955110](Vue3.assets/image-20220208130955110.png)

### 钩子函数以及禁用css

![image-20220208132048638](Vue3.assets/image-20220208132048638.png)

transition组件内置了六个钩子函数，会在对应时机回调，

![image-20220208130210771](Vue3.assets/image-20220208130210771.png)

![image-20220208130147265](Vue3.assets/image-20220208130147265.png)



### gasp基本使用

![image-20220208131518104](Vue3.assets/image-20220208131518104.png)

![image-20220208132154976](Vue3.assets/image-20220208132154976.png)

### 使用gsap实现数字变化

![image-20220208140640855](Vue3.assets/image-20220208140640855.png)

```js
<template>
  <div>
    <input type="number" step="100" v-model="counter">
    <h2>{{showCounter}}</h2>
  </div>
</template>

<script>
import gasp from 'gsap'
export default {
  name: "App",
  data(){
    return{
      isShow:true,
      counter:0,
      showCounter:0
    }
  },
  //监听counter的变化
  watch:{
    counter(newValue){
      //this不仅可以传dom对象，也可以传入普通对象，这里传入this是为了使用showCounter
      gasp.to(this,{
        duration:1,   //表示时间1s，从oldValue变化到newValue的时间是1s
        showCounter:newValue  //表示给showCounter赋值，赋值为newValue
      })
    }
  }
}
</script>
```

## transition-group基本使用

![image-20220208141147056](Vue3.assets/image-20220208141147056.png)

设计两个按钮，在数组的随机位置中添加元素和删除元素

> 注意，v-for渲染一定要加key！！！

![image-20220208142729824](Vue3.assets/image-20220208142729824.png)

![image-20220208142618955](Vue3.assets/image-20220208142618955.png)

添加动画样式

![image-20220208142706223](Vue3.assets/image-20220208142706223.png)

效果

![image-20220208142806713](Vue3.assets/image-20220208142806713.png)

缺点，删除数字的时候，后面的元素是等到数字删除完成后瞬移到前面的位置上的，没有动画效果

![image-20220208142853000](Vue3.assets/image-20220208142853000.png)

> 虽然没有了mode，但是我们可以通过设置延时来达到mode的效果

![image-20220226184120045](Vue3.assets/image-20220226184120045.png)

## 解决添加和移除时瞬移的问题

![image-20220208143458296](Vue3.assets/image-20220208143458296.png)

设置下面的第二个css的话，会在**添加元素**导致元素移动的时候，有动画效果。但是删除元素导致元素移动的时候是没有动画效果的，因为在删除元素的时候，在还没有删除前，这个元素还是**占据了文档中的位置**的。所以我们需要在**元素离开的时候让他脱离文档流**，这样这个元素就不会占据位置了，后面的元素也能往前移动。

![image-20220208143149343](Vue3.assets/image-20220208143149343.png)

## gasp实现列表的交错过渡案例

编写下面的案例，实现在输入框输入关键字，下面列表显示包含关键字的项

![image-20220208145308457](Vue3.assets/image-20220208145308457.png)

但是当不符合的项被删除时，是**一起执行的动画**，非常生硬，我们现在希望的是，**从上往下依次执行动画**，达到交错的效果

![image-20220208145448244](Vue3.assets/image-20220208145448244.png)

### dataset

![image-20220208152439365](Vue3.assets/image-20220208152439365.png)

# composition API

![image-20220208204834176](Vue3.assets/image-20220208204834176.png)

![image-20220208205118321](Vue3.assets/image-20220208205118321.png)

## setup函数

![image-20220208221049137](Vue3.assets/image-20220208221049137.png)

`setup`中是**没有`this`绑定**的，所以无法通过`this.$props`获取`props`

`setup`第一个参数将`props`传入了。

`setup`第二个参数是一个`context`，里面包含三个属性

- `attrs`表示非`props`传入的`attr`
- `slots`表示传入的插槽
- `emit`用于代替`this.$emit`发射事件

![image-20220208211326339](Vue3.assets/image-20220208211326339.png)

![image-20220208213246988](Vue3.assets/image-20220208213246988.png)

### setup返回值代替data和methods

![image-20220208215843623](Vue3.assets/image-20220208215843623.png)

但是默认情况下，在setup中定义的并且返回的变量**不是响应式的**

![image-20220208220419581](Vue3.assets/image-20220208220419581.png)

### setup源码

![image-20220209125209419](Vue3.assets/image-20220209125209419.png)

可以看到，执行setup的时候没有进行绑定，是默认绑定

![image-20220209125245151](Vue3.assets/image-20220209125245151.png)

### setup中实现$refs用法

因为`setup`函数是**不绑定`this`**的，所以不能通过`this.$refs`来获取有`ref`的`attr`的元素

标签的`ref`属性指定`setup`返回的`title`，在挂载完`dom`的时候，这个`dom`元素会被封装到`title`这个`ref`对象的`value`中

> 注意：这里不是v-bind绑定的ref

![image-20220209163533812](Vue3.assets/image-20220209163533812.png)

## 响应式API

### reactive API将对象变成响应式

![image-20220209125901089](Vue3.assets/image-20220209125901089.png)

![image-20220209130203678](Vue3.assets/image-20220209130203678.png)

### ref API将基本数据类型变成响应式

![image-20220209131118955](Vue3.assets/image-20220209131118955.png)

ref传入的参数会被封装到**ref对象**中，值是ref对象的**value属性**，ref函数返回一个**响应式的引用**

![image-20220209130816660](Vue3.assets/image-20220209130816660.png)

- 在**模板里**面使用ref返回的引用时，vue会自动获取对应的value值

![image-20220209130905008](Vue3.assets/image-20220209130905008.png)

- 在逻辑代码中是不会进行自动解包的，需要手动获取value属性

![image-20220209131027803](Vue3.assets/image-20220209131027803.png)

> 注意：ref的解包只能是浅层的解包

![image-20220209131801747](Vue3.assets/image-20220209131801747.png)

![image-20220209131931859](Vue3.assets/image-20220209131931859.png)

![image-20220209131954885](Vue3.assets/image-20220209131954885.png)

### readonly API 将响应式数据变成只读

返回一个代理Proxy，这个Proxy对set方法劫持了（不能修改）

![image-20220209132256302](Vue3.assets/image-20220209132256302.png)

![image-20220209132510095](Vue3.assets/image-20220209132510095.png)

![image-20220209132838284](Vue3.assets/image-20220209132838284.png)

### 其他API 用于判断

![image-20220209133732530](Vue3.assets/image-20220209133732530.png)

![image-20220209133801650](Vue3.assets/image-20220209133801650.png)



### toRefs解构响应式对象

> 注意，解构后，修改reactive返回的state对象，数据还是响应式的

![image-20220209134514446](Vue3.assets/image-20220209134514446.png)

![image-20220209134355246](Vue3.assets/image-20220209134355246.png)

返回的对象里都是ref的值，对这个对象进行解构，保持响应式

![image-20220209140114153](Vue3.assets/image-20220209140114153.png)

![image-20220209140302207](Vue3.assets/image-20220209140302207.png)

### toRef获取响应式对象的某个响应式属性

![image-20220209140608187](Vue3.assets/image-20220209140608187.png)

### ref其他API

![image-20220209141105440](Vue3.assets/image-20220209141105440.png)

#### shallowRef和triggerRef

默认ref是会有深层响应式的

![image-20220209141248788](Vue3.assets/image-20220209141248788.png)

`shallowRef`和`triggerRef`结合使用

![image-20220209141418398](Vue3.assets/image-20220209141418398.png)

#### customRef自定义Ref

![image-20220209142939910](Vue3.assets/image-20220209142939910.png)

使用自定义ref

![image-20220209143026596](Vue3.assets/image-20220209143026596.png)

### computed和watch

#### computed

传入的getter函数中**要用到具有响应式的数据**（ref或reactive）

**返回的是一个ref对象**，在js代码中需要使用内部的value的话需要手动解包

![image-20220209144057708](Vue3.assets/image-20220209144057708.png)

##### set函数的调用时机

只有对computed函数**返回的ref对象的值**进行修改才会触发set，如果ref对象的值是一个对象，**修改这个对象的属性**是不会触发computed的set函数的

![image-20220221203442824](Vue3.assets/image-20220221203442824.png)

##### computed实现filters功能

在vue2中有filters过滤器的功能，相当于是可以传入参数的过滤器，用法如下

![image-20220212212838481](Vue3.assets/image-20220212212838481.png)

![image-20220212212854243](Vue3.assets/image-20220212212854243.png)

但是在vue3中已经删除了filters的api。但是我们还是可以通过computed来实现过滤器的效果。

我们知道，computed本质上是一个getter函数，函数返回我们想要的内容。**在使用的时候不需要使用小括号**。那么我们可以让**getter函数返回一个函数，在使用的时候加上小括号**，本质上就是对这个返回的函数的调用了，并且**可以传入参数**。那么最终渲染的就是这个getter函数返回的函数内部返回的值。

> 注意，下面的例子只是为了展示，在使用computed的时候getter函数内部必须要用到响应式数据

![image-20220212213335266](Vue3.assets/image-20220212213335266.png)

#### watchEffect

##### 基本使用

![image-20220209144949567](Vue3.assets/image-20220209144949567.png)

`watchEffec`传入一个函数，在开始运行时会执行一次传入的函数，**自动收集函数中用到的响应式数据的依赖**，当函数中用到的响应式数据发生改变时，会自动执行该函数

![image-20220209145517010](Vue3.assets/image-20220209145517010.png)

##### 停止侦听

watchEffect**返回值**是一个函数，用于停止侦听

![image-20220209151839914](Vue3.assets/image-20220209151839914.png)

##### 清除副作用（类似防抖）

watchEffect传入的函数，这个函数有一个`onInvalidate`**函数类型的参数**，这个函数用于**注册函数**

这个函数会在下面两种情况执行。函数中通常用于**清除工作**

- 停止侦听器（卸载组件）
- 侦听器侦听函数再次被执行前

![image-20220209154421848](Vue3.assets/image-20220209154421848.png)

##### 第二个参数:watchEffect侦听函数的执行时机

第二个参数是一个对象，里面可以传入一些配置属性，flush属性用于决定**第一次执行watchEffect侦听函数的执行时机**

- 默认是`pre`，立即执行，此时`dom`还没有渲染上去
- 如果是`post`的话，就是等到**`dom`渲染完毕**之后再执行

![image-20220209161256159](Vue3.assets/image-20220209161256159.png)

#### watch

![image-20220209164619670](Vue3.assets/image-20220209164619670.png)

![image-20220209174152896](Vue3.assets/image-20220209174152896.png)

##### 侦听单个数据源

侦听器数据源可以是有返回值的 **getter 函数**，也可以直接是 **`ref`**

```js
// 侦听一个 getter，这个getter函数必须应用的是具有响应式的内容
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听ref，newV和oldV会自动解包，不需要调用.value取值
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

用getter函数的形式可以侦听对象的某个属性的变化

![image-20220210152402197](Vue3.assets/image-20220210152402197.png)

##### 侦听多个数据源

侦听器还可以使用**数组**同时侦听多个源

```js
const firstName = ref('')
const lastName = ref('')
//用数组的形式侦听多个响应式数据
//newValues和oldValues也是数组类型，下标是与前面的数组对应的
watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues)
})

firstName.value = 'John' // logs: ["John", ""] ["", ""]
lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]
```

尽管如此，如果你在**同一个函数里同时改变这些被侦听的来源**，侦听器仍只会执行一次：

```js
setup() {
  const firstName = ref('')
  const lastName = ref('')

  watch([firstName, lastName], (newValues, prevValues) => {
    console.log(newValues, prevValues)
  })

  const changeValues = () => {
    firstName.value = 'John'
    lastName.value = 'Smith'
    // 打印一次 ["John", "Smith"] ["", ""]
  }

  return { changeValues }
}
```

> 注意：函数中多个**同步更改**只会触发一次侦听器。

通过更改设置 `flush: 'sync'`，我们可以为每个更改都强制触发侦听器，尽管这通常是不推荐的。或者，可以用 [nextTick](https://v3.cn.vuejs.org/api/global-api.html#nexttick) 等待侦听器在下一步改变之前运行。例如：

```js
const changeValues = async () => {
  firstName.value = 'John' // 打印 ["John", ""] ["", ""]
  await nextTick()
  lastName.value = 'Smith' // 打印 ["John", "Smith"] ["John", ""]
}
```

##### 侦听响应式对象reactive与深度监听

如果直接传入reactive对象，那么返回的也是old和new指向的是同一个引用

![image-20220209172901448](Vue3.assets/image-20220209172901448.png)

需要用getter函数的形式来根据前后的reactive对象返回一个**对应状态的新的对象**

```js
const numbers = reactive([1, 2, 3, 4])

watch(
  //newValue和oldValue都是对numbers改变前后通过[...]进行拷贝后返回的数组，并且指向的不是同一个数组
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers)
  }
)

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
```

尝试**检查深度嵌套**对象或数组中的 property 变化时，仍然需要 `deep` 选项设置为 true。

```js
const state = reactive({ 
  id: 1,
  attributes: { 
    name: '',
  }
})

watch(
  ()=>state,
  (state, prevState) => {
    console.log('not deep', state.attributes.name, prevState.attributes.name)
  }
)

watch(
  ()=>state,
  (state, prevState) => {
    console.log('deep', state.attributes.name, prevState.attributes.name)
  },
  { deep: true }
)

state.attributes.name = 'Alex' // logs: "deep" "Alex" "Alex"
```

为了完全侦听深度嵌套的对象和数组，可能需要对值进行深拷贝。这可以通过诸如 [lodash.cloneDeep ](https://lodash.com/docs/4.17.15#cloneDeep)[ ](https://lodash.com/docs/4.17.15#cloneDeep) 这样的实用工具来实现。

```js
import _ from 'lodash'

const state = reactive({
  id: 1,
  attributes: {
    name: '',
  }
})

watch(
  //这样的话，newValue和oldValue返回的对象，都会根据state的前后状态进行深拷贝，分别返回不同的对象
  () => _.cloneDeep(state),
  (state, prevState) => {
    console.log(state.attributes.name, prevState.attributes.name)
  }
)

state.attributes.name = 'Alex' // 日志: "Alex" ""
```

##### 源码

如果source是Ref对象，会返回ref对象中的value，如果是Reactive对象，会直接返回。下图可见，如果传入的是reactive对象的话，会默认开启深度侦听

![image-20220209173332914](Vue3.assets/image-20220209173332914.png)

如果是一个函数，那么会执行source，将返回值作为getter（newValue和oldValue）

![image-20220209174259978](Vue3.assets/image-20220209174259978.png)

如果是一个数组，那么会遍历数组中的内容

![image-20220209182316647](Vue3.assets/image-20220209182316647.png)

#### computed和watch的区别

先说computed

- computed可以写set函数，只有当get函数返回的那个值发生改变时才会**调用set函数**。
- computed的getter什么时候会重新调用呢？就是**当computed内部依赖的响应式数据发生改变时，会重新调用getter函数，**也就是说如果computed的getter函数没有依赖响应式数据，那么computed是没有用的

![image-20220222212403391](Vue3.assets/image-20220222212403391.png)

![image-20220222212232258](Vue3.assets/image-20220222212232258.png)

现在说watch，watch可以监听一个响应式数据，当响应式数据发生改变时，会执行传入的回调函数



## 生命周期钩子

setup是早于beforeCreate和created的，

![image-20220209220932258](Vue3.assets/image-20220209220932258.png)

## Provide/Inject

### 基本使用

![image-20220209222516105](Vue3.assets/image-20220209222516105.png)

![image-20220209222604775](Vue3.assets/image-20220209222604775.png)

## hook案例

### 计数器简单案例

![image-20220209224141748](Vue3.assets/image-20220209224141748.png)

对代码进行抽取，一般命名为use开头

![image-20220209224553005](Vue3.assets/image-20220209224553005.png)

在原代码处使用，将需要用到的内容进行对象结构

![image-20220209224626854](Vue3.assets/image-20220209224626854.png)

甚至可以直接用拓展运算符解构（但是这种写法阅读性不高，因为不知道属性有哪些）

![image-20220209224735242](Vue3.assets/image-20220209224735242.png)

> 将逻辑代码抽取到hook中之后，可以实现**代码的复用**，其他地方希望用到这些逻辑的时候，就可以直接导入文件进行使用

### 修改title案例

![image-20220209230026946](Vue3.assets/image-20220209230026946.png)

![image-20220209230043450](Vue3.assets/image-20220209230043450.png)

### 获取页面滚动位置案例

![image-20220209231353248](Vue3.assets/image-20220209231353248.png)

![image-20220209231418043](Vue3.assets/image-20220209231418043.png)

封装设置缓存local-storage

```js
import {ref,watch} from 'vue'
export default function(key,value){
  const valueRef = ref(value)
  //如果没有传入value，就是取值操作
  //传入value就是设置值操作
  if(value){
    window.localStorage.setItem(key,JSON.stringify(value))
  }else{
    valueRef.value = window.localStorage.getItem(key)
  }

  //我们会返回value的ref对象，如果对这个对象的值进行修改，我们希望同时修改localStorage中的值
  watch(valueRef,newValue => {
    window.localStorage.setItem(key,JSON.stringify(newValue))
  })

  return valueRef
}
```

![image-20220209233234012](Vue3.assets/image-20220209233234012.png)

### 对导入代码进行封装

在hooks文件夹下创建index.js，这个是所有hook的出口文件

![image-20220209233416754](Vue3.assets/image-20220209233416754.png)

![image-20220209233455266](Vue3.assets/image-20220209233455266.png)

## setup script（待完成）

`<script setup>` :  是在单文件组件 (SFC) 中使用[组合式 API](https://v3.cn.vuejs.org/api/composition-api.html) 的编译时**语法糖**。相比于普通的 `<script>` 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Typescript 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。

### 基本使用

![image-20220209235737005](Vue3.assets/image-20220209235737005.png)

#### 顶层的值相当于return

![image-20220209235855246](Vue3.assets/image-20220209235855246.png)

### 响应式ref

![image-20220209235931394](Vue3.assets/image-20220209235931394.png)

### 使用组件

![image-20220210000100485](Vue3.assets/image-20220210000100485.png)

#### 动态组件的is需要v-bind绑定

![image-20220210000329808](Vue3.assets/image-20220210000329808.png)

# 组件化高级

## h函数和render函数

![image-20220210153308062](Vue3.assets/image-20220210153308062.png)

![image-20220210153426813](Vue3.assets/image-20220210153426813.png)

### 参数

![image-20220210153538188](Vue3.assets/image-20220210153538188.png)

![image-20220210155208549](Vue3.assets/image-20220210155208549.png)

![image-20220210153621508](Vue3.assets/image-20220210153621508.png)

### 基本使用

> 在vue3中h函数不会作为render函数的参数，需要额外导入

![image-20220210154148303](Vue3.assets/image-20220210154148303.png)

**计数器案例**

![image-20220210154450659](Vue3.assets/image-20220210154450659.png)

或者用setup替代data

![image-20220210154604610](Vue3.assets/image-20220210154604610.png)

或者用setup替代render（直接返回函数）

![image-20220210154702629](Vue3.assets/image-20220210154702629.png)

![image-20220210154500424](Vue3.assets/image-20220210154500424.png)

### 实现插槽用法

![image-20220210155918394](Vue3.assets/image-20220210155918394.png)

![image-20220210155959121](Vue3.assets/image-20220210155959121.png)

## JSX

早期的脚手架工具是不支持的，需要单独配置，新版脚手架默认支持JSX

![image-20220210160620329](Vue3.assets/image-20220210160620329.png)

### 基本使用

![image-20220210160737625](Vue3.assets/image-20220210160737625.png)

注意是onClick，并且指定函数的时候也是需要通过大括号来赋值的

![image-20220210160802547](Vue3.assets/image-20220210160802547.png)

使用插槽

![image-20220210161108828](Vue3.assets/image-20220210161108828.png)

![image-20220210161149374](Vue3.assets/image-20220210161149374.png)

# Vue3高级语法补充

## 自定义指令

在对dom要进行**底层操作**的时候需要用到自定义指令，不建议在生命周期中使用各种原生dom操作的api

![image-20220210162630830](Vue3.assets/image-20220210162630830.png)

### 挂载完成自动获取焦点案例

#### 默认的实现方式

![image-20220210163113000](Vue3.assets/image-20220210163113000.png)

![image-20220210163916876](Vue3.assets/image-20220210163916876.png)

#### directives局部指令

![image-20220210165539913](Vue3.assets/image-20220210165539913.png)

#### app.directive全局指令

![image-20220210165508364](Vue3.assets/image-20220210165508364.png)

### 钩子函数

![image-20220210164631775](Vue3.assets/image-20220210164631775.png)

每个生命周期的钩子函数都有下面四个参数

- el：用于获取指令绑定的dom对象，可以直接进行操作
- binding：**用于存放修饰符，以及传入的参数**
  - 修饰符保存在modifiers属性中，用到的修饰符value属性是true
  - 值保存在value属性中

![image-20220210171628348](Vue3.assets/image-20220210171628348.png)

![image-20220210171612465](Vue3.assets/image-20220210171612465.png)

- vnode：是当前el的虚拟node
- preVnode：是update前的el的虚拟node 

### 时间戳案例

> 需要实现的是，将一个时间戳转换成对应日期格式

以前`vue2`中可以用`filter`实现，也可以用`computed`实现，`methods`也行，但是我们也可以用自定义指令来实现，这个效果就类似于`v-html`

![image-20220210172115247](Vue3.assets/image-20220210172115247.png)

实现如下

![image-20220210173050012](Vue3.assets/image-20220210173050012.png)

当然可以通过app的directive方法封装成全局指令

![image-20220210173408515](Vue3.assets/image-20220210173408515.png)

![image-20220210173430060](Vue3.assets/image-20220210173430060.png)

老师是用到了`dayjs`这个库进行格式化，并且值是从dom对象的`textContext`获取的。对长度进行了判断，指定是用以毫秒为单位的时间戳进行日期转换

![image-20220210173649437](Vue3.assets/image-20220210173649437.png)

![image-20220210173618231](Vue3.assets/image-20220210173618231.png)

还做了优化，可以指定转化的格式

![image-20220210173759511](Vue3.assets/image-20220210173759511.png)

![image-20220210173823884](Vue3.assets/image-20220210173823884.png)

## Teleport

![image-20220210174803840](Vue3.assets/image-20220210174803840.png)

基本使用

![image-20220210175847616](Vue3.assets/image-20220210175847616.png)

![image-20220210175904959](Vue3.assets/image-20220210175904959.png)

![image-20220210175924575](Vue3.assets/image-20220210175924575.png)

## 插件

![image-20220210180224163](Vue3.assets/image-20220210180224163.png)

如果它是一个对象，就会调用 `install` 方法。

如果它是一个 `function`，则函数本身将被调用。

在这两种情况下——它都会收到**两个参数**：由 Vue 的 `createApp` 生成的 `app` 对象和用户传入的选项。

- 对象类型，包含一个install的函数，这个install默认会出窜入`app.use`的`app`，类似于隐式绑定

![image-20220210180338934](Vue3.assets/image-20220210180338934.png)

![image-20220210180347225](Vue3.assets/image-20220210180347225.png)

- 函数类型

![image-20220210185351894](Vue3.assets/image-20220210185351894.png)

### 全局注册属性

在插件中通过`app.config.globalProperties`注册全局属性

`app.config.globalProperties`是一个对象，可以往这个对象中添加全局属性（命名时一般前面加上$符号，以免冲突）

![image-20220210180634886](Vue3.assets/image-20220210180634886.png)

在组件中可以通过this直接获取到全局注册的属性

![image-20220210180620938](Vue3.assets/image-20220210180620938.png)

在composition API的setup中获取就比较麻烦了，因为setup中获取不到this

![image-20220210180955372](Vue3.assets/image-20220210180955372.png)

## nextTick API

composition API中使用nextTick需要从vue包导入

options API中使用nextTick可以通过this.$nextTick进行使用

![image-20220213145512203](Vue3.assets/image-20220213145512203.png)

下面这种方式获取高度，会发现每次输出的是**修改dom前**的高度（可以看到第一次输出的是0，也就是默认没有内容时的高度）

![image-20220213145735475](Vue3.assets/image-20220213145735475.png)![image-20220213145807506](Vue3.assets/image-20220213145807506.png)



我们可以用另一种方法在dom修改后获取高度，就是在updated生命周期中获取。但是这样是不对的，因为我们只希望在**修改message内容时才获取高度**，写在updated生命周期钩子中的话，只要dom发生更改就会获取一次，这显然不是我们想要的

![image-20220213150133926](Vue3.assets/image-20220213150133926.png)

使用nextTick包裹的话，就可以将包裹的回调函数在**dom更新完之后进行回调**

![image-20220213150347995](Vue3.assets/image-20220213150347995.png)

### 实现原理

在触发事件的时候修改message这个响应式ref的value属性，修改这个值的同时，vue内部的相关任务（watch，dom组件更新等）被加入**微任务队列**。

如果在修改完message的value属性之后，直接输出dom属性，那么输出的肯定是未修改之前的，因为此时触发的事件还没执行结束，微任务还没执行。

如果将输出dom属性的逻辑包裹在nextTick的话，它内部是会被`Promise.resolve().then`包裹，并且加入微任务队列的末尾，那么等到所有前面的微任务执行结束后，执行到这个微任务的话，就可以获取到修改完dom之后的属性了。

![image-20220213151312465](Vue3.assets/image-20220213151312465.png)

![image-20220213151839370](Vue3.assets/image-20220213151839370.png)

# Vue3源码学习

## 虚拟dom的渲染过程

![image-20220210193428171](Vue3.assets/image-20220210193428171.png)

![image-20220210194007830](Vue3.assets/image-20220210194007830.png)

![image-20220210194031296](Vue3.assets/image-20220210194031296.png)

## 实现Mini-Vue

![image-20220211132637716](Vue3.assets/image-20220211132637716.png)

![image-20220211134648960](Vue3.assets/image-20220211134648960.png)

### 渲染系统模块

![image-20220211132805024](Vue3.assets/image-20220211132805024.png)

#### h函数实现

h函数的实现很简单，直接返回一个javascript对象即可

```js
//参数分别是，标签名，attrs配置，以及子节点
const h = (tags, props, children) => {
  //返回一个vnode，这个vnode就是一个javascript对象
  return {
    tags, props, children
  }
}
```

#### mount函数实现

mount函数用于将vnode对象转成真实dom并挂载到对应的dom元素上

```js
const mount = (vnode, container) => {
  //1、创建vnode.tags对应的元素，并且在vnode对象中也保存一份
  const el = vnode.el = document.createElement(vnode.tags)

  //2、遍历props，将vnode的属性（例如class,onClick）添加到dom元素上
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      //如果是方法的话，就用事件监听器注册事件，注意onClick注册的是click事件，所以要进行转化
      if(key.startsWith('on')){
        el.addEventListener(key.slice(2).toLowerCase(),value)
      }else{
        el.setAttribute(key,value)
      }
    }
  }

  //3、处理children，将children中的一个个vnode挂载到el上
  if(vnode.children){
    //如果是字符串类型，就直接添加到innerHTML中
    if(typeof vnode.children === 'string'){
      el.innerHTML = vnode.children
    }else{
      //如果是数组类型（这里不作对象类型的判断）
      //就遍历vnode数组，对每个vnode对象进行挂载操作。将每个vnode挂载到当前el上
      vnode.children.forEach(item=>{
        mount(item,el)
      })
    }
  }

  //4、将el挂载到container上
  container.appendChild(el)
}
```

#### patch函数实现

patch函数用于根据传入的新旧vnode来更新dom节点（这里是不作有key时的操作的）

```js
//传入两个vnode进行dom更新
const patch = (n1,n2)=>{
  //1、如果两个结点的tag都不一样的话，则直接用n2替换n1
  if(n1.tags !== n2.tags){
    //获取n1的父节点，通过父节点移除掉n1的真实dom，并通过mount方法将n2这个vnode挂载到n1的父节点上
    const n1Parent = n1.el.parentNode
    n1Parent.removeChild(n1.el)
    mount(n2,n1Parent)
  }else{

    //2、如果结点类型一样的话，那么对props进行更新处理
    const n1Props = n1.props || {}   //防止传入null
    const n2Props = n2.props || {}
    //因为节点类型一样，所以n2直接对n1的el进行复用，其余进行修改
    const el = n2.el = n1.el

    //2.1、先将新的（n2）vnode的props都添加到el中
    for(const key in n2Props){
      const n2value = n2Props[key]
      const n1value = n1Props[key]
      //遍历n2中的key，如果n2中key的value和n1中key的value不一样，就将n2中的key-value加入到el中
      if(n2value !== n1value){
        if(key.startsWith('on')){
          el.addEventListener(key.slice(2).toLowerCase(),n2value)
        }else{
          el.setAttribute(key,n2value)
        }
      }
    }

    //2.2、再将旧的（n1）的props从el中移除
    for(const key in n1Props){

      //如果是函数类型的话都进行移除，不管在props2中有没有。在后面会说道为什么无论如何都要进行移除
      if(key.startsWith('on')){
        const oldValue = n1Props[key]
        el.removeEventListener(key.slice(2).toLowerCase(),oldValue)
      }
      
      //如果这个key在n2中没有的话就移除
      if(!(key in n2Props)){
        el.removeAttribute(key)
      }
    }


    //3、处理childrean
    const newChildren = n2.children
    const oldChildren = n1.children 
    //情况一：如果newChildren是字符串类型
    if(typeof newChildren === 'string'){
      //如果旧的children也是字符串类型的话，就比较，不一样的时候再替换
      if(typeof oldChildren === 'string'){
        if(newChildren !== oldChildren){
          el.textContent = newChildren
        }
      //如果旧的children是数组类型（这里不判断是对象的情况），就直接替换
      }else{
        el.innerHTML = newChildren
      }
        
    //情况二：如果newChildren是数组类型的话，进行判断
    //有key时的diff算法是尽量让相同的vnode进行判断的，但是这里不这样实现，只是简单的判断
    //newChildren : [v1 , v2 , v4]
    //oldChildren : [v2 , v1 , v4, v5]
    }else{
      //先获取公共长度
      const commonlength = Math.min(newChildren.length,oldChildren.length)
      //遍历公共的部分，对公共的部分进行patch
      for(let i = 0 ; i < commonlength ; i++){
        patch(oldChildren[i],newChildren[i])
      }

      //如果是old的长度更多，那么就是删除结点
      if(oldChildren.length > newChildren.length){
        for(let i = commonlength ; i < oldChildren.length ; i++){
          //因为旧节点是挂载过的，vnode对象中保存了el属性用于指向真实dom
          el.removeChild(oldChildren[i].el)
        }
      }

      //如果是new的长度更多，那么就是添加结点
      if(oldChildren.length < newChildren.length){
        for(let i = commonlength ; i < newChildren.length ; i++){
          //将childrean挂载到el上
          mount(el,newChildren[i])
        }
      }
    }
  }
}
```

### 响应式系统实现

```js
//用于指向要收集依赖的函数
let activeReactiveFn = null

//保存的是对象的某个属性的响应式函数
class Depend{
  constructor() {
    this.reactiveFns = []
  }
  //在修改属性的时候，调用notify方法，触发所有响应式函数
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

//rargetMap用WeakMap，对key是弱引用，key是对象，对应的是这个对象的map
//而对象的map中，key是该对象的属性，值是这个属性对应的Depend实例
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

//通过Proxy来实现响应式
function reactive(obj){
  return new Proxy(obj,{
      //在修改值的时候获取对应的depend实例，调用notify触发所有响应式函数
      set(target,key,value){
        target[key] = value
        getDepend(target,key).notify()
      },
      //在获取值的时候，用depend()函数收集对应的响应式函数
      get(target,key){
        const depend = getDepend(obj,key)
        depend.depend()
        return target[key]
      }
  })
}

//传入函数，会默认执行一次这个函数
//这个函数中用到了经过reactive函数返回的Proxy代理中的响应式数据
//在执行函数的时候，如果用到了响应式对象的某个属性的话，会被劫持进入对应Proxy的get
//在get中收集依赖
function watchEffect(fn){
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}
watchEffect(()=>{
	const obj = reactive({name:'wjj'})
    console.log(obj.name)
})
```

### 使用

![image-20220211175010272](Vue3.assets/image-20220211175010272.png)

### 应用程序入口模块

这个模块中应该有一个`createApp`方法，**传入**一个`app`的`options`对象

这个方法返回一个对象，对象中有一个`mount`方法，接收一个选择器字符串，`mount`方法中使用到了渲染系统的`mount`方法来挂载

```js
const createApp = (appOptions) => {
  // 返回一个对象，这个对象可以调用mount方法
  return {
    // 该方法传入一个query选择器字符串
    mount(query) {
      // 获取选择器对应的dom元素
      const el = document.querySelector(query)
      //标记是否是第一次挂载，如果是第一次的话是执行mount挂载操作，如果不是第一次的话就执行patch更新操作
      let isMounted = false
      
      //保存旧的Vnode对象
      let oldVnode = null
	
      //这里用到了响应式系统中的watchEffect函数，监听reder函数返回的vnode对象中响应式数据的变化
      //发生变化时会重新执行这个响应式函数，更新dom节点
      watchEffect(function () {
        if (!isMounted) {
    	 //如果是第一次挂载的话，就将vnode对象赋值给oldVnode，并执行挂载操作
          oldVnode = appOptions.render()
          mount(oldVnode, el)
          isMounted = true
        } else {
          //否则就获取新的vNode，进行patch更新操作，并将当前的newVnode赋值给oldVnode，以便于下次patch
          const newVnode = appOptions.render()
          patch(oldVnode, newVnode)
          oldVnode = newVnode
        }
      })
    }
  }
}
```

### 注意点

![image-20220211183637427](Vue3.assets/image-20220211183637427.png)

## 阅读源码

### 准备工作

- 下载`vue/core`，yarn install安装依赖
- 查看scripte脚本，添加sourcemap（这样浏览器中运行的时候就有映射了）

![image-20220330200513350](Vue3.assets/image-20220330200513350.png)

- 删除两行代码，不然跑起来会报错

![image-20220330200318789](Vue3.assets/image-20220330200318789.png)

- yarn run dev运行

![image-20220330200332789](Vue3.assets/image-20220330200332789.png)

- 代码会被打包到这个目录下

![image-20220330200639957](Vue3.assets/image-20220330200639957.png)

- 创建demo文件夹以及index.html文件夹，引入打包后的vue

![image-20220330201623802](Vue3.assets/image-20220330201623802.png)



### createApp创建app的过程

1、创建app首先会进入`runtime-dom/src/index.ts`目录下导出的createApp方法，但是这个方法只是个入口，真正创建app的代码在第58行。

![image-20220330203824273](Vue3.assets/image-20220330203824273.png)

2、ensureRenderer函数用于获取一个渲染器，它内部本质上调用的是createRenderer方法

![image-20220330204140930](Vue3.assets/image-20220330204140930.png)

3、点击查看createRenderer，本质上调用的是baseCreateRenderer方法

![image-20220330204217658](Vue3.assets/image-20220330204217658.png)

4、baseCreateRenderer其实是重载的函数

![image-20220330204317737](Vue3.assets/image-20220330204317737.png)

5、baseCreateRenderer返回的渲染器对象，里面调用了createAppAPI，返回创建app的createApp函数

![image-20220330204333791](Vue3.assets/image-20220330204333791.png)

6、点击好看createAppAPI函数，返回一个创建app的函数

![image-20220330204411135](Vue3.assets/image-20220330204411135.png)

7、这个返回的创建app的函数，返回一个**app对象**

![image-20220330204444574](Vue3.assets/image-20220330204444574.png)

这个app对象里面封装了很多方法，例如use注册插件，mixin混入，mount挂载等。。。

![image-20220330204537469](Vue3.assets/image-20220330204537469.png)

总体过程

![image-20220330204608995](Vue3.assets/image-20220330204608995.png)

### mount挂载（不完整）

![image-20220330211036890](Vue3.assets/image-20220330211036890.png)

![image-20220330211010744](Vue3.assets/image-20220330211010744.png)

组件实例

![image-20220330213403622](Vue3.assets/image-20220330213403622.png)

获取根，但是因为vue3是可以有**多个根**的，所以他会**被包裹在Fragment中（在后面会介绍）**

![image-20220330232807885](Vue3.assets/image-20220330232807885.png)

### vue3优化

在组件初始化setupComponent最后，调用compile，将模板编译成render函数

![image-20220331153859207](Vue3.assets/image-20220331153859207.png)

查看生成的render函数，发现有两个不同的点（涉及到vue3的优化）

![ ](Vue3.assets/image-20220409163823190.png)

#### 静态节点的作用域提升

**静态节点**被hoisted（作用域提升）了，当响应式数据改变时，会获取新的vnode，也就意味着会重新执行render函数。而将这些静态节点提升之后，Vue就**不会重复地为这些静态节点创建Vnode**，提升了编译性能。

这个render函数第一次执行其实是在渲染有关的副作用函数中，mount时获取subTree的时候，调用renderComponentRoot时函数内部进行调用的，返回Vnode。

![image-20220409182814943](Vue3.assets/image-20220409182814943.png)

![image-20220409181741358](Vue3.assets/image-20220409181741358.png)

如果此时按下了按钮更新了message，会**重新执行渲染有关的副作用函数**，但是这次执行的是else（update）逻辑。

可以看到内部重新调用renderComponentRoot方法，重新调用render函数获取**新的Vnode**，然后对新旧Vnode进行patch更新操作（diff）。注意此时并不会对静态节点也重新创建vnode，而是直接使用提升后的静态节点的vnode对象的引用。

![image-20220409183125506](Vue3.assets/image-20220409183125506.png)

#### diff算法的优化：block tree

对于这个组件而言，最上面是一个静态的结点，是**不可能改变的**，所以不需要对它进行diff算法。

我们应该只去diff那些有可能会被修改的vnode，这就是block tree的作用。

![image-20220409190542524](Vue3.assets/image-20220409190542524.png)

可以看到，在return的时候执行了createBlock和openBlock两个方法，下面我们一一介绍。

![image-20220409190852483](Vue3.assets/image-20220409190852483.png)

先来介绍openBlock，它会创建一个数组（用于存储VNode）并且压入全局的blockStack（存储的是VNode数组）中

![image-20220409191307926](Vue3.assets/image-20220409191307926.png)

假如我们有下面这种嵌套关系来创建vnode的时候，Vnode的创建完成顺序是由内而外的，这使得一个模板可以收集到所有**子代的动态结点**。

并且每一个template模板的根结点都会被创建为Block结点，而其余的则是Vnode结点（在render函数中我们也可以看出这点）。

```js
createBlock('div',{},[
    createVnode('div',{},[
        createVnode('div',{},[
            createVnode('div',{},[

            ])
        ])
    ])
])
```

所以我们在openBlock之后，在全局会有一个**currentBlock**来指向当前动态结点的集合。

因为子代的createVnode先完成，如果是动态结点的并且全局的currentBlock存在的话，会将这个动态结点vnode存入currentBlock，如下。

![image-20220409194530408](Vue3.assets/image-20220409194530408.png)

createBlock是最后执行完成的，在createBlock中将子代的所有动态结点保存到dynamicChildren中

如果子代中有动态结点，那么说明当前根结点也是动态的，也需要patch，所以也会将自己加入currentBlock中。

![image-20220409194716441](Vue3.assets/image-20220409194716441.png)

至此，一个模板的根的vnode就有一个dynamicChildren属性保存了内部的所有动态结点。在patch的时候，会根据type进入对应的process函数内部的patch函数。下面我们以新vnode的类型为普通dom类型来作例子：

进入processElement函数

![image-20220409195225157](Vue3.assets/image-20220409195225157.png)

进入patchElement函数

![image-20220409195256686](Vue3.assets/image-20220409195256686.png)

patchElement函数内部在进行更新时，会先判断当前vnode上是否有dynamicChildren属性。如果有的话，就只对这些dynamicChildren进行diff算法。

![image-20220409195102790](Vue3.assets/image-20220409195102790.png)

# vueRouter（route是响应式的）

## 基本介绍

### 前后端开发阶段介绍

![image-20220211193617841](Vue3.assets/image-20220211193617841.png)

SPA开发阶段

![image-20220211194035938](Vue3.assets/image-20220211194035938.png)

但是输入下面这样的url时，浏览器默认会向服务器请求资源。此时我们有两种方式可以拒绝这种行为

![image-20220211193923745](Vue3.assets/image-20220211193923745.png)

- 在路径后面跟上#哈希值

![image-20220211194003047](Vue3.assets/image-20220211194003047.png)

- html5的history模式

### url的hash

![image-20220211194124334](Vue3.assets/image-20220211194124334.png)

> 可以监听`window`对象的`hashchange`方法来监听`url`的`hash`值改变的事件
>
> 想获取`hash`值的话可以通过`location.hash`获取

### history模式

![image-20220211194613771](Vue3.assets/image-20220211194613771.png)

如果适用history模式的话，修改url会默认请求url对应的资源，所以需要阻止a元素的默认行为

![image-20220211194730012](Vue3.assets/image-20220211194730012.png)

<img src="Vue3.assets/image-20220211195137654.png" alt="image-20220211195137654" style="zoom:80%;" />

window对象也可以监听`popstate`事件，也就是回退操作

![image-20220211195346164](Vue3.assets/image-20220211195346164.png)

> `replaceState`和`pushState`的差别就是，一个是替换（不可回退），一个是入栈（可以回退）

### vue-router介绍和安装

![image-20220211201410036](Vue3.assets/image-20220211201410036.png)

## 基本使用



### 基本使用流程

- 在`src`目录下创建一个`router`文件夹，创建`index.js`文件，在里面编写路由映射
- 创建`routes对象数组`，对象中的`path`属性指定了路由的路径，`component`属性指定了对应路径要显示的组件
- 导入`createRouter`函数，用于创建路由对象
- 导入`createWebHashHistory`函数，用于指定`url`的模式为`hash`模式
- 导出创建的路由对象，在`main.js`中使用`app`对象进行"安装"

![image-20220211203614053](Vue3.assets/image-20220211203614053.png)

![image-20220211203954232](Vue3.assets/image-20220211203954232.png)

在安装时，导入的router对象中有install函数，之所以能使用router-link和router-view，是因为在这个install函数中进行了全局注册组件

![image-20220212153421403](Vue3.assets/image-20220212153421403.png)

- 使用`router-view`内置组件作为要显示的内容的占位符

![image-20220211204047911](Vue3.assets/image-20220211204047911.png)

- 修改路径，占位符会渲染对应的组件

![image-20220211204133668](Vue3.assets/image-20220211204133668.png)

- 但是上面修改`url`是我们手动修改的，我们可以通过`router-link`来实现**点击跳转**`url`

`router-link`内置组件**默认渲染成a标签**。**通过`to`这个`attr`来决定点击之后要修改的`url`**

![image-20220211204534407](Vue3.assets/image-20220211204534407.png)

### 设置 / 的路由映射或者重定向

![image-20220211205313995](Vue3.assets/image-20220211205313995.png)

![image-20220211205206330](Vue3.assets/image-20220211205206330.png)

这样的话我们刚打开项目的匹配到路径`/`时候，`router-view`就会默认渲染`default`组件啦

![image-20220211205457341](Vue3.assets/image-20220211205457341.png)

我们也可以设置**重定向**，也就是当你匹配`/`这个路由时，将路由重定向到另一个路由，如下图，设置了`/`路由的重定向，那么当访问默认路径`/`时会重定向到`/home`路径下。注意重定向要写完整路径

![image-20220211205526436](Vue3.assets/image-20220211205526436.png)

### 设置history和hash模式

在`vue-router`最新版本，设置`history`模式的话需要导入`createWebHistory`或`createWebHashHistory`函数来设置

![image-20220211212025948](Vue3.assets/image-20220211212025948.png)

## router-link内置组件的属性

- to属性

可以是一个字符串，也可以是一个对象，用于指定跳转路径

- replace属性

设置`replace`属性之后，当点击时，会调用`replaceState`，而不是`pushState`（区别就是可不可回退）。使用时直接在标签内写上replace即可，用法跟disabled属性一样。

- active-class

设置**激活**a元素后应用在a元素上的**class名**，也就是说**触发时**会将active-class指定的类名绑定在对应元素上

默认是`router-link-active`



![image-20220211213741977](Vue3.assets/image-20220211213741977.png)

> 注意，要修改这个属性的话，所有的router-link标签都要修改这个属性

![image-20220211214017282](Vue3.assets/image-20220211214017282.png)

- exact-active-class(嵌套路由)

链接精准激活时，应用于渲染的`a`标签的`class`，默认是`router-link-exact-active`。下图中可以看到，我们访问的是嵌套路由`/home/about`，`home`对应的`a`标签是没有`exact-active-class`类的，而`/home/other`有这个类。这就是精准匹配。

![image-20220212151159726](Vue3.assets/image-20220212151159726.png)

## 路由懒加载（性能优化）

![image-20220211221106981](Vue3.assets/image-20220211221106981.png)

当我们这样导入组件的话，在经过webpack打包时，会根据依赖图，找到这些组件，全部打包到最终的`app.js`文件中。如果每个组件中又依赖其他组件，或者组件内容很大时，打包结果文件`app.js`会非常的巨大，在浏览器会**一次性将这个文件请求**下来。

![image-20220211215352445](Vue3.assets/image-20220211215352445.png)

![image-20220211215755234](Vue3.assets/image-20220211215755234.png)

显然这是没必要的，我们可以通过**异步组件的方式来导入**，这样webpack会进行分包，将异步导入的组件分别分包为单个js文件，在使用到某个组件的时候再让浏览器发送请求去**获取对应的文件**。

component属性**可以是一个函数**，但是要求这个函数的**返回值必须是一个promise**。我们使用`import()`函数进行导入后进行打包，可以看到webpack进行了分包，将这两个组件分别打包到了单独的js文件中

![image-20220211220049186](Vue3.assets/image-20220211220049186.png)

如果对分包之后的文件名不满意，可以使用注释来指定文件名（这是webpack的特性），**注意格式是固定的**

![image-20220211220358454](Vue3.assets/image-20220211220358454.png)

## 路由的其他属性

除了path和component属性外，routes数组中的对象还可以有下面这两个属性（用的较多），可以通过`this.$route`获取

![image-20220211223746745](Vue3.assets/image-20220211223746745.png)

## 动态路由匹配与$route

动态路由匹配其实就是在匹配路径时，某个值用**占位变量**来代替，可以传入动态的值进行匹配，而不是写成固定的路径

### 基本使用

现在希望达到的是，访问`/user`这个路径时，后面会跟上一个值（`username`），这个值也可以在页面中显示。不同的用户进入这个路径，后面的值也会不同

![image-20220211224407930](Vue3.assets/image-20220211224407930.png)

要实现这种**动态匹配路径**的功能，我们可以这么设置 ：在路径后添加新路径，以`/:`开头，后面是自定义的变量名，用于占位 	

![image-20220211224742490](Vue3.assets/image-20220211224742490.png)

只有路径满足`/user/:username`格式才会渲染路由对应的组件

![image-20220211225308638](Vue3.assets/image-20220211225308638.png)

匹配成功的话才会显示组件，如果后面的`username`是定义在**setup或者是data**中的，可以利用v-bind绑定to来获取并拼接

![image-20220211225345375](Vue3.assets/image-20220211225345375.png)

![image-20220211225335003](Vue3.assets/image-20220211225335003.png)

在页面中获取`url`中动态匹配的内容的话，可以通过`this.$route`来获取，key-value保存在这个对象的`params`属性中（这个`key`是path中的占位变量名）

![image-20220211225652712](Vue3.assets/image-20220211225652712.png)

![image-20220211225635484](Vue3.assets/image-20220211225635484.png)

在setup中是没有this的绑定的，所以在4版本以后的vue-router提供了一个hook（**useRoute**），**返回值就是当前要显示的route对象**。调用的话还是通过`params.username`进行调用

![image-20220211230910353](Vue3.assets/image-20220211230910353.png)

![image-20220211231339156](Vue3.assets/image-20220211231339156.png)

### 设置多个占位符

![image-20220211231644928](Vue3.assets/image-20220211231644928.png)

在匹配的时候也需要符合对应的规则，`id`和`username`都会保存在`$route.params`中

![image-20220211231708939](Vue3.assets/image-20220211231708939.png)

## 路径不存在路由匹配（匹配失败）

我们用动态路由可以实现一层路径不存在

![image-20220211233000372](Vue3.assets/image-20220211233000372.png)

![image-20220211233030918](Vue3.assets/image-20220211233030918.png)

虽然动态路由匹配允许我们任意匹配一个占位符，但是如果我们多个路径输错的话是不会匹配到的

![image-20220211233151571](Vue3.assets/image-20220211233151571.png)

我们可以使用下面这种方式来匹配多重路径不存在的情况

![image-20220211233354357](Vue3.assets/image-20220211233354357.png)

![image-20220211233339949](Vue3.assets/image-20220211233339949.png)

后面的一大串路径会被保存在动态路由的占位变量中，可以通过`$route.params`获取。

![image-20220211234004225](Vue3.assets/image-20220211234004225.png)

如果是下面这种写法，`$route.params`中保存的一大串的路径会被解析成数组

![image-20220211233857261](Vue3.assets/image-20220211233857261.png)

![image-20220211233912484](Vue3.assets/image-20220211233912484.png)

## 路由嵌套（子路由）

假设我们现在最外层有三个路由：home、about、user，我们希望在显示home的时候，home组件内部也有两个路由：goods、others进行切换。这个时候我们就需要用到嵌套路由。

在**子组件home**中编写`router-link`进行路由跳转，写一个`router-view`进行渲染占位

![image-20220212150856326](Vue3.assets/image-20220212150856326.png)

在配置路由的js文件中，找到home组件对应的**路由配置对象，设置children**（数组，包含多个匹配原则对象）属性。children数组中的匹配对象跟外层的写法是一样的。

> 注意：子路由中的path不需要写完整路径（例如`/home/goods`），因为他默认会从父路由中开始寻找。并且子路由不要写`/`开头

![image-20220212150937962](Vue3.assets/image-20220212150937962.png)

![image-20220212151106638](Vue3.assets/image-20220212151106638.png)

### 案例

![image-20220221145749137](Vue3.assets/image-20220221145749137.png)

子路由的path加上/

![image-20220221145715485](Vue3.assets/image-20220221145715485.png)

不加/

![image-20220221145741554](Vue3.assets/image-20220221145741554.png)

> 注意：子路由中的路由重定向的话必须要写完整路径

![image-20220212151601762](Vue3.assets/image-20220212151601762.png)

## $router实现编程式导航

### push方法

其实很简单，就是在`methods`中通过`this.$router`获取`router`对象，调用方法来修改跳转路径

![image-20220212152220167](Vue3.assets/image-20220212152220167.png)

那么如何在`setup`中获取`router`对象呢？跟获取`route`同理，导入`vue-router`中的**`useRouter`这个`hook`**并且调用即可	

![image-20220212152340043](Vue3.assets/image-20220212152340043.png)

push方法除了可以传入一个字符串，还可以传入一个对象，里面封装了路由跳转的配置信息

![image-20220212152527060](Vue3.assets/image-20220212152527060.png)

`query`指定了路由后面跟上的`query`字符串，会在`url`中进行拼接

![image-20220212152559872](Vue3.assets/image-20220212152559872.png)

也可以通过获取`route`对象的`query`属性来获取传递的内容

![image-20220212152627278](Vue3.assets/image-20220212152627278.png)

### replace方法

replace方法传参是一样的，就是通过该方法进行路由跳转是无法回退的

### go方法，forward和back

![image-20220212152809885](Vue3.assets/image-20220212152809885.png)

## router-link的插槽

### 插入插槽以及拒绝渲染外层a标签

`router-link`是一个全局组件，内置了插槽，我们可以传入一些内容来**决定它最后的渲染结果**。例如下图，我就给默认插槽传入了一个`button`元素（当然也可以传入一个**自定义的组件**）

![image-20220212154033455](Vue3.assets/image-20220212154033455.png)

页面最终确实是渲染出了button，但是是包裹在a标签内的

![image-20220212154129232](Vue3.assets/image-20220212154129232.png)

我们可以通过设置`custom`属性来**拒绝渲染外层的a标签**

![image-20220212155220872](Vue3.assets/image-20220212155220872.png)

![image-20220212155210060](Vue3.assets/image-20220212155210060.png)

**拒绝渲染a标签之后，button是不会实现跳转的**。需要通过作用域插槽传入的**`navigate`**函数来触发原来的路径跳转

![image-20220212155458398](Vue3.assets/image-20220212155458398.png)

### 作用域插槽传入的内容

组件内部通过作用域插槽返回给我们很多有价值的数据，具体如下

```js
{
  //将route对象传递过来了
  "route": {
    "fullPath": "/home",
    "path": "/home",
    "query": {},
    "hash": "",
    "params": {},
    "matched": [
      {
        "path": "/home",
        "meta": {},
        "props": {
          "default": false
        },
        "children": [
          {
            "path": "goods"
          },
          {
            "path": "others"
          }
        ],
        "instances": {
          "default": {
            "message": "Hello World"
          }
        },
        "leaveGuards": {
          "Set(0)": []
        },
        "updateGuards": {
          "Set(0)": []
        },
        "enterCallbacks": {},
        "components": {
          "default": {
            "name": "home",
            "__file": "src/pages/home.vue",
            "__hmrId": "56b687e3"
          }
        }
      }
    ],
    "meta": {},
    "href": "#/home"
  },
  "href": "#/home",
  //是否是活跃状态，也就是说url是否能匹配到当前路由
  "isActive": true,
  //是否是精准活跃状态，也就是说url是否能精准匹配到当前路由
  "isExactActive": true,
      
}
```

也传入了一个navigate函数，用于触发路由跳转

```js
function navigate(e = {}) {
        if (guardEvent(e)) {
            return router[Object(vue__WEBPACK_IMPORTED_MODULE_0__["unref"])(props.replace) ? 'replace' : 'push'](Object(vue__WEBPACK_IMPORTED_MODULE_0__["unref"])(props.to)
            // avoid uncaught errors are they are logged anyway
            ).catch(noop);
        }
        return Promise.resolve();
    }
```

## router-view的插槽

`router-view`的插槽有助于实现组件切换的动画，以及keep-alive缓存组件

### 实现组件切换的动画

经过前面的学习，我们知道`transition`内置组件实现动画的话，要在`transition`标签内实现组件切换效果。就意味着我们要在`router-view`标签内使用到要跳转的组件。这里我们可以通过`router-view`的作**用域插槽传入的`Component`属性来获取要跳转的组件的`name`**。利用动态组件实现组件切换效果。

![image-20220212161005438](Vue3.assets/image-20220212161005438.png)

要实现动画的话，就在`component`外面包裹一层`transition`，然后编写动画相关的样式即可

![image-20220212161852729](Vue3.assets/image-20220212161852729.png)

![image-20220212161843563](Vue3.assets/image-20220212161843563.png)

### 实现组件切换的缓存

在动态组件切换时，外面嵌套一层keep-alive，可以保存上个组件的状态，避免每次都新建组件

![image-20220212162001166](Vue3.assets/image-20220212162001166.png)

### 作用域插槽传入的内容

![image-20220212162257987](Vue3.assets/image-20220212162257987.png)

## 动态添加路由

使用场景：后台管理系统的权限，一般的后台管理系统左侧是菜单栏，右侧是显示的内容。登陆的权限不同，左侧菜单显示的内容也不同。但是如果仅仅是左侧菜单不去渲染那些按钮的话，假如知道了对应隐藏权限的路由路径，并且注册过这个路由，那么还是可以**通过url来访问对应的内容**。这显然是不合理的。所以我们应该**动态的根据权限来决定路由的配置**。

![image-20220212163245251](Vue3.assets/image-20220212163245251.png)

### 使用addRoute动态添加路由

router对象中有一个addRoute方法可以动态添加路由规则

![image-20220221145227628](Vue3.assets/image-20220221145227628.png)

添加子路由需要加上父路由的路径（注意route的path第一个需要加上/），parentName指定的是父路由的name属性

![image-20220221150028268](Vue3.assets/image-20220221150028268.png)

### 动态删除路由

![image-20220212163732437](Vue3.assets/image-20220212163732437.png)

## 路由导航守卫

导航守卫用于拦截某次路由跳转，在跳转前执行回调函数，在里面可以进行一些判断，并且决定是否完成跳转或者拒绝跳转并重定向到其他页面

### router.beforeEach基本使用

router.beforeEach函数中传入注册的函数，会在路由跳转前进行回调。注册的函数有三个参数：to，from，next。前两个参数都是route对象，第三个参数用于跳转，但是在新版本中不推荐使用

![image-20220212165302704](Vue3.assets/image-20220212165302704.png)

### 返回值问题

在vue-router中仍然保留了回调函数的第三个参数：next，但是已经不推荐使用了。可以指定return的返回值来决定要跳转的路径

![image-20220212164727780](Vue3.assets/image-20220212164727780.png)

### 简单案例

在localStorage中保存登录成功后的token信息。在访问除了`/login`以外的其他路由时对路由进行拦截，检测是否有token信息，如果没有token的话，就取消路由跳转，并且回退到登录页

![image-20220212165209068](Vue3.assets/image-20220212165209068.png)

![image-20220212165124220](Vue3.assets/image-20220212165124220.png)

# vuex状态管理

## 介绍

![image-20220212171501879](Vue3.assets/image-20220212171501879.png)

![image-20220212171849335](Vue3.assets/image-20220212171849335.png)

![image-20220212172318324](Vue3.assets/image-20220212172318324.png)

action中定义的是异步操作，mutations中是不允许异步修改数据的（异步的修改是不会被Devtools跟踪的）

![image-20220212172633963](Vue3.assets/image-20220212172633963.png)

## devtool安装和vuex

![image-20220212173945228](Vue3.assets/image-20220212173945228.png)

![image-20220212173836055](Vue3.assets/image-20220212173836055.png)

下载支持vue3的6版本

![image-20220212173846700](Vue3.assets/image-20220212173846700.png)

vuex安装最新版本

```js
npm install vuex@next
```

## vuex核心

跟`vue-router`一样，`vuex`也需要在安装完成之后，导入一个**`createStore`函数**来创建`Store`对象（用于管理），并且导出，在`index.js`中用`app.use`进行安装

![image-20220212180019746](Vue3.assets/image-20220212180019746.png)

![image-20220212180008386](Vue3.assets/image-20220212180008386.png)

### state状态仓库

> 作用：作为一个仓库来存储要统一管理的数据，并且数据都是响应式的

新版本的vuex中，state是一个函数，返回一个对象（类似于options API中的data定义）

![image-20220212191740263](Vue3.assets/image-20220212191740263.png)

在返回的对象中定义的数据，可以在所有组件中，通过`this.$store.state`进行使用

![image-20220212191422581](Vue3.assets/image-20220212191422581.png)

#### mapState辅助函数进行映射

虽然我们可以通过`$store.state`获取到`vuex`中保存的数据，但是在模板里通过这种方式获取的话，随着代码的增多，代码看上去会特别的冗杂

![image-20220212200216994](Vue3.assets/image-20220212200216994.png)

虽然我们可以通过computed计算属性的方式让模板代码变得简洁，但是在js代码中的看上去也会特别的冗杂

![image-20220212200356407](Vue3.assets/image-20220212200356407.png)

这个时候我们就可以用`mapState`来将`store`中的数据作一个映射，**mapState函数返回一个对象**，传入的参数可以是数组类型也可以是对象类型。下面我们一一介绍：

- 参数是**数组类型**，这个数组中保存了想要映射到计算属性中的**state的属性名**，因为返回值是对象，所以用展开运算符将返回的对象拷贝到computed中

![image-20220212200817614](Vue3.assets/image-20220212200817614.png)

在模板中就可以直接使用对应名字的计算属性了

![image-20220212201001818](Vue3.assets/image-20220212201001818.png)

- 参数是**对象类型**，key是最终添加到计算属性中的key，值是一个**类似于computed的getter函数**的函数，函数会默认传入state，用于在函数中获取并返回对应state中的值。

![image-20220212201137320](Vue3.assets/image-20220212201137320.png)

![image-20220212201340036](Vue3.assets/image-20220212201340036.png)

> 如果与当前data中的数据有变量冲突的话，可以用对象的方式达到重命名的效果

#### 在setup中使用mapState

在options API中，通过拓展运算符的方式将对象拷贝到computed对象上是一个比较方便快捷且看上去工整的写法，但是在**composition API中**定义计算属性是要用computed API的。（当然，我们需要**调用`vuex`提供的`useStore`这个hook来获取store对象**）

![image-20220212201904971](Vue3.assets/image-20220212201904971.png)

显然这种写法在计算属性逐渐变多的时候，代码会显得非常的乱，所以我们想到使用mapState辅助函数来映射

![image-20220212202314217](Vue3.assets/image-20220212202314217.png)

但是渲染的时候出了问题

![image-20220212202345663](Vue3.assets/image-20220212202345663.png)

这涉及到了**mapState返回对象中属性的类型**。之所以mapState对象里面的属性可以拷贝到computed对象，是因为computed对象中都是一个个getter函数。而**mapState返回对象中的属性就是一个个getter函数**

![image-20220212202654948](Vue3.assets/image-20220212202654948.png)

所以我们在return时通过展开运算符返回的内容，本质上是一个个getter函数，从图中也可以看出。

------

**解决办法**（封装useState）

我们可以遍历返回的对象中的key，将所有的value（getter函数）都遍历一次，放入computed API中，将computed的返回值ref通过键值对的形式保存到新的对象中，并且在return里展开这个新的对象即可。

![image-20220220204357247](Vue3.assets/image-20220220204357247.png)

但是运行时却报错，说$store不存在。

![image-20220212203146676](Vue3.assets/image-20220212203146676.png)

**这是因为mapState内部本质上也是通过this.$store.state来获取数据的**，而在setup中是没有this绑定的，所以我们可以通过bind**显示绑定**一个新的对象，这个**对象中有$store属性，值为useStore的返回值store对象。**

![image-20220212203631479](Vue3.assets/image-20220212203631479.png)

------

我们进一步可以将这段逻辑封装成一个叫useState的hook，在使用的时候我们只需要**传入**我们希望映射的数据的**字符串数组**即可

![image-20220212203859704](Vue3.assets/image-20220212203859704.png)

这种写法肯定是支持传入对象和数组的，因为对象和数组都会交给mapState进行处理，而mapState就是支持这两种数据类型的

![image-20220212204458655](Vue3.assets/image-20220212204458655.png)

### getters（类似computed）

getters是一个对象，里面有很多函数。函数**第一个参数**默认会传入state，可以将state中的数据**进行一些处理后返回**

![image-20220212211002357](Vue3.assets/image-20220212211002357.png)

![image-20220212210630213](Vue3.assets/image-20220212210630213.png)

函数的**第二个参数**传入了getters对象，假如在当前函数中用到了getters中其他函数的功能，可以通过它进行代码复用

![image-20220212211204057](Vue3.assets/image-20220212211204057.png)

在使用的时候是通过`$store.getters`来使用的，注意，虽然getters内部封装的是一个个方法，但是在**使用的时候是不需要加小括号的**，跟computed的用法类似。

![image-20220212211359794](Vue3.assets/image-20220212211359794.png)

> getter本身是不允许传入参数的，因为在使用的时候也没有用调用函数的方式来进行使用。如果想传入参数的话可以参考computed实现filters功能。

#### mapGetters辅助函数进行映射

跟mapState辅助函数使用没有太大差别，具体介绍也请看mapState

- 传入数组

![image-20220212214346369](Vue3.assets/image-20220212214346369.png)

- 传入对象有一些区别，对象的属性对应的value不再是函数，而是**对应getter函数的函数名字符串**

![image-20220212214329109](Vue3.assets/image-20220212214329109.png)

#### 在setup中使用mapState

![image-20220212215845781](Vue3.assets/image-20220212215845781.png)

具体使用

![image-20220212215859807](Vue3.assets/image-20220212215859807.png)

### mutations修改state

> 作用：修改state内容的唯一途径

mutations是一个对象，里面定义了很多函数。这些函数默认都**传入了一个参数state**，用于获取state中的数据。

![image-20220212192710061](Vue3.assets/image-20220212192710061.png)

那么怎么在组件中调用这些函数呢？需要调用`$store.commit`方法

#### commit提交

`commit`的**第一个参数**是一个**函数名字符串**，用于指定要触发的mutations中的函数。

> 注意，这里只是为了演示方便，开发中尽量不要将逻辑写到模板中

![image-20220212193724981](Vue3.assets/image-20220212193724981.png)

`commit`的**第二个参数**是要传入mutations中函数的参数（mutations中的函数的第二个参数用于接收commit传入的第二个参数）

![image-20220212220632037](Vue3.assets/image-20220212220632037.png)

![image-20220212220530906](Vue3.assets/image-20220212220530906.png)

#### 另外一种commit提交风格

![image-20220212220847891](Vue3.assets/image-20220212220847891.png)

#### mapMutations辅助函数进行映射

原因还是老样子，如果每次都要`commit`提交的话，就要分别在`methods`里写不同的函数来完成不同的`commit`操作。那么会导致代码冗杂，我们可以通过辅助函数的方式将`mutations`映射到`mthods`中，**通过这种方式在执行对应的mutations函数的时候内部会执行commit提交操作的**。

![image-20220212221731240](Vue3.assets/image-20220212221731240.png)

![image-20220212222106267](Vue3.assets/image-20220212222106267.png)

#### 在setup中使用mapMutaions

不像state和getters需要将对应辅助函数返回的对象中的函数进行computed封装，**mapMutations返回的对象里面也都是函数**，而我们正好需要的就是这些函数。直接在return中进行展开即可

![image-20220212222135993](Vue3.assets/image-20220212222135993.png)

### actions处理异步

因为Mutations中是不支持异步操作的，如果有网络请求，我们可以在组件的生命周期中发送网络请求，并且在请求结束时通过promise的方法获取返回值，再通过commit提交给mutations中的函数进行状态修改。但是这样的话，对网络请求操作的管理还是在组件内部的。

actions的作用就是，可以在里面定义一些异步操作，组件中只需要**Dispatch分发**某个任务，让异步任务在actions中完成，完成之后再在actions中通过commit修改

![image-20220213111537938](Vue3.assets/image-20220213111537938.png)

#### 基本使用

actions中的函数有一个非常重要的参数context：有着与store实例相同的方法和属性，可以通过它来commit或者获取store中的状态

![image-20220213112113538](Vue3.assets/image-20220213112113538.png)

打印context中的内容

![image-20220213125735169](Vue3.assets/image-20220213125735169.png)





vuex的使用逻辑是，在组件中分发actions的任务，在actions中commit提交给mutations修改，然后通过getters或者state传递状态给组件渲染

![image-20220213112406552](Vue3.assets/image-20220213112406552.png)

那么怎么调用actions中对应的方法呢？从状态图也可以看出，我们可以通过$store.dispatch来调用（分发）actions中的方法

![image-20220213112605689](Vue3.assets/image-20220213112605689.png)

> dispatch传递参数跟commit方法是一样的，可以传入一个payload，并且也有对象类型的调用风格

------

在使用过程中，我们通常希望将**请求获取的数据**放入vuex进行管理。所以我们分别编写了对应的mutations和state

![image-20220213124953872](Vue3.assets/image-20220213124953872.png)

在组件中发送请求获取数据，获取到数据后通过commit给mutations修改state

![image-20220213124924178](Vue3.assets/image-20220213124924178.png)

但是这些数据本来就是被保存在vuex中的，那么整个请求过程没必要放在组件中，应该放入vuex进行处理。我们可以编写一个action进行异步请求，在组建中通过$store.dispatch进行派发任务

![image-20220213125157392](Vue3.assets/image-20220213125157392.png)

![image-20220213125235226](Vue3.assets/image-20220213125235226.png)



#### mapActions辅助函数进行映射

用法与mutations的辅助函数一样

![image-20220213130038488](Vue3.assets/image-20220213130038488.png)

![image-20220213130118881](Vue3.assets/image-20220213130118881.png)

#### action返回promise

在actions中，我们是可以通过then方法来知道请求何时结束的，那么我们怎么在组件中知道请求是何时结束的呢？

我们可以将异步代码封装到Promise中，在**成功的回调中调用resolve，在失败的回调中调用reject，并且将成功或者失败的信息传入**，在组件中通过then就可以知道actions中的异步逻辑在何时结束，并且可以获取返回值

> 尽管下面的actions中代码很冗杂，但是后面我们会封装一个请求函数

![image-20220213130349592](Vue3.assets/image-20220213130349592.png)

![image-20220213130555865](Vue3.assets/image-20220213130555865.png)

### module模块

![image-20220213133223250](Vue3.assets/image-20220213133223250.png)

#### 基本使用

编写module对象，导出

![image-20220213133937688](Vue3.assets/image-20220213133937688.png)

将module对象挂载到store中

![image-20220213134100008](Vue3.assets/image-20220213134100008.png)





#### 没有命名空间时获取module中的各种值

##### 获取state

将module（user）导入store对象后，user模块里面的state内容会被封装在$store.state.user对象中，在获取的时候要注意

![image-20220213133645809](Vue3.assets/image-20220213133645809.png)

##### 获取getters

假如module中定义了一个doubleHomeCounter的一个getters，像下面这种方式是获取不到的

![image-20220213135122807](Vue3.assets/image-20220213135122807.png)

其实在vuex内部对模块中的getters进行了合并，直接获取即可。

![image-20220213135219932](Vue3.assets/image-20220213135219932.png)



##### 提交mutations与分发actions

如果在store对象和module对象中都有相同的mutations，那么像原来这种提交方式的话，这两个对象中的mutations都会触发

![image-20220213134714610](Vue3.assets/image-20220213134714610.png)

![image-20220213134734003](Vue3.assets/image-20220213134734003.png)![image-20220213134848353](Vue3.assets/image-20220213134848353.png)

#### 有命名空间时获取module中的各种值

![image-20220213141426343](Vue3.assets/image-20220213141426343.png)

> 老方法虽然可以获取到模块中的getters，也可以直接提交mutations或分发actions触发模块中的函数，但是直观的看上去，**无法知道这个是从哪个模块中获取的**

要处理这种问题的话，我们需要在module对象设置namespaced属性为true

![image-20220213140355068](Vue3.assets/image-20220213140355068.png)

那么我们就可以用另一种方式来获取module中的各种值了

##### 获取getters

通过`[]`获取getters对象中的对应函数，在函数名前指定module名。

![image-20220213140126455](Vue3.assets/image-20220213140126455.png)

模块中的getters中的函数还有其他的参数，可以获取到根store对象

![image-20220213140913482](Vue3.assets/image-20220213140913482.png)

##### 提交mutations与分发actions

在函数名前指定module名

![image-20220213140634567](Vue3.assets/image-20220213140634567.png)

#### module中派发或修改根组件

![image-20220213141621280](Vue3.assets/image-20220213141621280.png)

#### 辅助函数

第一种方式：想要获取module中的内容的话，可以在原来使用辅助函数的基础上，**第一个参数用来指定module**

![image-20220213142306716](Vue3.assets/image-20220213142306716.png)

第二种方式：使用vuex提供的`createNamespacedHelpers`来配合使用。这个函数传入模块名，返回对应模块的四个辅助函数

![image-20220213142359035](Vue3.assets/image-20220213142359035.png)

在使用时就像原来使用辅助函数一样即可，因为通过`createNamespacedHelpers`函数已经指定了命名空间

![image-20220213142504612](Vue3.assets/image-20220213142504612.png)

## 单一状态树

![image-20220212195403314](Vue3.assets/image-20220212195403314.png)

## useState和useGetters的最终封装方案

> 初步封装方案看state目录下的内容

因为`useState`和`useGetters`中的代码逻辑一致，只是调用的辅助函数不同（前者是`mapState`，后者是`mapGetters`）。我们可以封装一个`useMapper`函数来进行统一管理

![image-20220212215732625](Vue3.assets/image-20220212215732625.png)

![image-20220213193730480](Vue3.assets/image-20220213193730480.png)

![image-20220213193823067](Vue3.assets/image-20220213193823067.png)

使用

![image-20220213143418322](Vue3.assets/image-20220213143418322.png)

# historyApiFallback(不太懂，26)

![image-20220213203947440](Vue3.assets/image-20220213203947440.png)

当你在浏览器中输入`本地ip+路由路径`进行访问，其实是会对这个url进行发送请求，第一次通过ip进行访问的时候，会请求到对应的index.html文件，然后获取js代码，设置路由来实现页面跳转，如果不配置historyApiFallback的话，刷新会返回404（因为我们根本没有处理这个路径请求的接口）

![image-20220213221201229](Vue3.assets/image-20220213221201229.png)

如果配置了这个属性，那么就会**返回根目录的index.html页面**（webpack默认是帮我们配置了的，下面是源码）

![image-20220213221106975](Vue3.assets/image-20220213221106975.png)

可以在vue.config.js中覆盖webpack的配置

![image-20220213221949482](Vue3.assets/image-20220213221949482.png)