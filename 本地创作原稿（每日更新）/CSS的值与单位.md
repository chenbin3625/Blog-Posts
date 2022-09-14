# CSS的值与单位

## [什么是CSS的值?](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#什么是css的值)

在CSS规范和MDN的属性页上，您将能够发现值的存在，因为它们将被尖括号包围，如`<color>`或`<length>`。当您看到值`<color>`对特定属性有效时，这意味着您可以使用任何有效的颜色作为该属性的值，如 `<color>`参考页面所列。

**注意**：您还将看到被称为数据类型的CSS值。这些术语基本上是可以互换的——当你在CSS中看到一些被称为数据类型的东西时，它实际上只是一种表示值的奇特方式。

**注意**： 是的，CSS值倾向于使用尖括号表示，以区别于CSS属性(例如[`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)属性和 [](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 数据类型)。您可能还会混淆CSS数据类型和HTML元素，因为它们都使用尖括号，但这不太可能——它们在完全不一样的上下文中使用。

## [数字，长度和百分比](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#数字，长度和百分比)

您可能会发现自己在CSS中使用了各种数值数据类型。 以下全部归类为数值：

| 数值类型       | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| `<integer>`    | `<integer>`是一个整数，比如1024或-55。                       |
| `<number>`     | `<number>`表示一个小数——它可能有小数点后面的部分，也可能没有，例如0.255、128或-1.2。 |
| `<dimension>`  | `<dimension>`是一个`<number>`，它有一个附加的单位，例如45deg、5s或10px。`<dimension>`是一个伞形类别，包括`<length>`、`<angle>`、`<time>`和`<resolution>`类型。 |
| `<percentage>` | `<percentage>`表示一些其他值的一部分，例如50%。百分比值总是相对于另一个量，例如，一个元素的长度相对于其父元素的长度。 |

### [长度](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#长度)

最常见的数字类型是`<length>`，例如10px(像素)或30em。CSS中有两种类型的长度——相对长度和绝对长度。重要的是要知道它们之间的区别，以便理解他们控制的元素将变得有多大。

#### 绝对长度单位

以下都是**绝对**长度单位——它们与其他任何东西都没有关系，通常被认为总是相同的大小。

| 单位 | 名称         | 等价换算            |
| :--- | :----------- | :------------------ |
| `cm` | 厘米         | 1cm = 96px/2.54     |
| `mm` | 毫米         | 1mm = 1/10th of 1cm |
| `Q`  | 四分之一毫米 | 1Q = 1/40th of 1cm  |
| `in` | 英寸         | 1in = 2.54cm = 96px |
| `pc` | 十二点活字   | 1pc = 1/16th of 1in |
| `pt` | 点           | 1pt = 1/72th of 1in |
| `px` | 像素         | 1px = 1/96th of 1in |

这些值中的大多数在用于打印时比用于屏幕输出时更有用。例如，我们通常不会在屏幕上使用cm。惟一一个您经常使用的值，估计就是px(像素)。

#### 相对长度单位

相对长度单位相对于其他一些东西，比如父元素的字体大小，或者视图端口的大小。使用相对单位的好处是，经过一些仔细的规划，您可以使文本或其他元素的大小与页面上的其他内容相对应。下表列出了web开发中一些最有用的单位。

| 单位   | 相对于                                                       |
| :----- | :----------------------------------------------------------- |
| `em`   | 在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width |
| `ex`   | 字符“x”的高度                                                |
| `ch`   | 数字“0”的宽度                                                |
| `rem`  | 根元素的字体大小                                             |
| `lh`   | 元素的line-height                                            |
| `vw`   | 视窗宽度的1%                                                 |
| `vh`   | 视窗高度的1%                                                 |
| `vmin` | 视窗较小尺寸的1%                                             |
| `vmax` | 视图大尺寸的1%                                               |

#### ems and rems

`em`和`rem`是您在从框到文本调整大小时最常遇到的两个相对长度。了解这些方法是如何工作的以及它们之间的区别是很有意义的，尤其是当您开始学习更复杂的主题时，比如样式化文本或CSS布局。下面的示例提供了一个演示。

HTML是一组嵌套的列表—我们总共有三个列表，并且两个示例都有相同的HTML。唯一的区别是第一个类具有ems，第二个类具有rems。

首先，我们将16px设置为`<html>`元素的字体大小。

**概括地说，在排版属性中 em 单位的意思是“父元素的字体大小”**。带有ems类的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul)内的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li)元素从它们的父元素中获取大小。因此，每一个连续的嵌套级别都会逐渐变大，因为每个嵌套的字体大小都被设置为1.3em—是其父嵌套字体大小的1.3倍。

**概括地说****，rem单位的意思是“根元素的字体大小”**。(“根em”的rem标准。)[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul)内的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li)元素和一个rems类从根元素(`<html>)`中获取它们的大小。这意味着每一个连续的嵌套层都不会不断变大。

但是，如果您在CSS中更改<html>字体大小，您将看到所有其他相关内容都发生了更改，包括rem和em大小的文本。

### [百分比](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#百分比)

在许多情况下，百分比与长度的处理方法是一样的。百分比的问题在于，它们总是相对于其他值设置的。例如，如果将元素的字体大小设置为百分比，那么它将是元素父元素字体大小的百分比。如果使用百分比作为宽度值，那么它将是父值宽度的百分比。

在下面的示例中，两个百分比大小的框和两个像素大小的框具有相同的类名。这两款相机分别为200px和40%宽。

不同之处在于，第二组两个框位于一个400像素宽的包装器中。第二个200px宽的盒子和第一个一样宽，但是第二个40%的盒子现在是400px的40%——比第一个窄多了!

## [颜色](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#颜色)

在CSS中指定颜色的方法有很多，其中一些是最近才实现的。在CSS中，相同的颜色值可以在任何地方使用，无论您指定的是文本颜色、背景颜色还是其他颜色。

现代计算机的标准颜色系统是24位的，它允许通过不同的红、绿、蓝通道的组合显示大约1670万种不同的颜色，每个通道有256个不同的值(256 x 256 x 256 = 16,777,216)。让我们来看看在CSS中指定颜色的一些方法。

**注意：** 在本教程中，我们将研究具有良好浏览器支持的常用指定颜色的方法；虽然还有其他的，但是他们没有很好的支持，也不太常见。

### [颜色关键词](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#颜色关键词)

在这学习示例或MDN上的其他示例中，您经常会看到使用的颜色关键字，因为它们是一种指定颜色的简单易懂的方式。有一些关键词，其中一些有相当有趣的名字！您可以在页面上看到 `<color>`值的完整列表。

**在下面的示例中尝试使用不同的颜色值，以了解它们是如何工作的。**

### [十六进制RGB值](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#十六进制rgb值)

您可能遇到的下一种颜色值类型是十六进制代码。每个十六进制值由一个散列/磅符号(#)和六个十六进制数字组成，每个十六进制数字都可以取0到f(代表15)之间的16个值中的一个——所以是0123456789abcdef。每对值表示一个通道—红色、绿色和蓝色—并允许我们为每个通道指定256个可用值中的任意一个(16 x 16 = 256)。

这些值有点复杂，不太容易理解，但是它们比关键字更通用——您可以使用十六进制值来表示您想在配色方案中使用的任何颜色。

### [HSL 和 HSLA 的值](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#hsl_和_hsla_的值)

与RGB相比，HSL颜色模型的支持稍差一些(在旧版本的IE中不支持)，它是在设计师们感兴趣之后实现的。`hsl()` 函数接受色调、饱和度和亮度值作为参数，而不是红色、绿色和蓝色值，这些值的不同方式组合，可以区分1670万种颜色：

- **色调**： 颜色的底色。这个值在0和360之间，表示色轮周围的角度。
- **饱和度**： 颜色有多饱和？ 它的值为0 - 100%，其中0为无颜色(它将显示为灰色阴影)，100%为全色饱和度
- **亮度**：颜色有多亮？ 它从0 - 100%中获取一个值，其中0表示没有光(它将完全显示为黑色)，100%表示完全亮(它将完全显示为白色)

## [图片](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#图片)

`<image>` 数据类型用于图像为有效值的任何地方。它可以是一个通过 `url()`函数指向的实际图像文件，也可以是一个渐变。

## [位置](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#位置)

`<position>` 数据类型表示一组2D坐标，用于定位一个元素，如背景图像(通过 `background-position`)。它可以使用关键字(如 `top`, `left`, `bottom`, `right`, 以及`center` )将元素与2D框的特定边界对齐，以及表示框的顶部和左侧边缘偏移量的长度。

一个典型的位置值由两个值组成——第一个值水平地设置位置，第二个值垂直地设置位置。如果只指定一个轴的值，另一个轴将默认为 `center`。

## [字符串和标识符](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#字符串和标识符)

在上面的示例中，我们看到关键字被用作值的地方(例如`<color>`关键字，如 `red`, `black`, `rebeccapurple`, and `goldenrod`)。这些关键字被更准确地描述为标识符，一个CSS可以理解的特殊值。因此它们没有使用引号括起来——它们不被当作字符串。

在某些地方可以使用CSS中的字符串，例如 [在指定生成的内容时](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#Generating_content_with_before_and_after)。在本例中，引用该值以证明它是一个字符串。在下面的示例中，我们使用非引号括起来的颜色关键字和引号括起来的内容字符串。

## [函数](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#函数)

我们将查看的最后一种类型的值是一组称为函数的值。在编程中，函数是一段可重用的代码，可以多次运行，以完成重复的任务，对开发人员和计算机都是如此。函数通常与JavaScript、Python或c++等语言相关联，但它们也以属性值的形式存在于CSS中。我们已经在颜色部分看到了函数的作用——`rgb()`、`hsl()`等。用于从文件返回图像的值——`url()`——也是一个函数。

行为更类似于传统编程语言的值是`calc()`函数。这个函数使您能够在CSS中进行简单的计算。如果您希望计算出在为项目编写CSS时无法定义的值，并且需要浏览器在运行时为您计算出这些值，那么它特别有用。

例如，下面我们使用`calc()`使框宽为20% + 100px。20%是根据父容器.wrapper的宽度来计算的，因此如果宽度改变，它也会改变。我们不能事先做这个计算，因为我们不知道父类的20%是多少，所以我们使用`calc()`来告诉浏览器为我们做这个计算。