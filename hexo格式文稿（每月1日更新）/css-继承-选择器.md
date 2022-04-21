title: css-继承-选择器
author: chenbin
tags:
  - css
categories:
  - css
date: 2022-04-11 15:51:00
---


# css构建基础

## 层叠与继承

## [冲突规则](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#冲突规则)

CSS代表**层叠样式表(Cascading Style Sheets)**，理解第一个词*cascading*很重要— cascade 的表现方式是理解CSS的关键。

在某些时候，在做一个项目过程中你会发现一些应该产生效果的样式没有生效。通常的原因是你创建了两个应用于同一个元素的规则。**cascade**, 和它密切相关的概念是 **specificity**，决定在发生冲突的时候应该使用哪条规则。设计元素样式的规则可能不是期望的规则，因此需要了解这些机制是如何工作的。

这里也有**继承**的概念，也就是在默认情况下，一些css属性继承当前元素的父元素上设置的值，有些则不继承。这也可能导致一些和期望不同的结果。



### [层叠](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#层叠)

Stylesheets **cascade（样式表层叠）** — 简单的说，css规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

下面的例子中，我们有两个关于 `h1` 的规则。`h1` 最后显示蓝色 — 这些规则有相同的优先级，所以顺序在最后的生效。

![image-20220411113421734](https://ypyun-cdn.u1n1.com//img/picgo202204111134759.png)



### [优先级](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#优先级)

浏览器是根据优先级来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。它基本上是一个衡量选择器具体选择哪些区域的尺度：

- 一个元素选择器不是很具体 — 会选择页面上该类型的所有元素 — 所以它的优先级就会低一些。

- 一个类选择器稍微具体点 — 它会选择该页面中有特定 `class` 属性值的元素 — 所以它的优先级就要高一点。

- ![image-20220411113528427](https://ypyun-cdn.u1n1.com//img/picgo202204111135454.png)

  ### [继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#继承)

  继承也需要在上下文中去理解 —— 一些设置在父元素上的css属性是可以被子元素继承的，有些则不能。

  举一个例子，如果你设置一个元素的 `color` 和 `font-family` ，每个在里面的元素也都会有相同的属性，除非你直接在元素上设置属性。

  ![image-20220411113644037](https://ypyun-cdn.u1n1.com//img/picgo202204111136064.png)

  一些属性是不能继承的 — 举个例子如果你在一个元素上设置 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 50% ，所有的后代不会是父元素的宽度的50% 。如果这个也可以继承的话，CSS就会很难使用了!



## [理解继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#理解继承)

我们从继承开始。下面的例子中我们有一个`ul`，里面有两个无序列表。我们已经给 `<ul>` 设置了 **border**， **padding** 和 **font color**.

**color** 应用在直接子元素，也影响其他后代 — 直接子元素`<li>`，和第一个嵌套列表中的子项。然后添加了一个 `special` 类到第二个嵌套列表，其中使用了不同的颜色。然后通过它的子元素继承。

![image-20220411113957559](https://ypyun-cdn.u1n1.com//img/picgo202204111139587.png)

像 widths (上面提到的), margins, padding, 和 borders 不会被继承。如果borders可以被继承，每个列表和列表项都会获得一个边框 — 可能就不是我们想要的结果!

哪些属性属于默认继承很大程度上是由常识决定的。

### [控制继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#控制继承)

CSS 为控制继承提供了四个特殊的通用属性值。每个css属性都接收这些值。

- [`inherit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)

  设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".

- [`initial`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)

  设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 `inherit` 。

- [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)

  将属性重置为自然值，也就是如果属性是自然继承那么就是 `inherit`，否则和 `initial`一样

![image-20220411114531365](https://ypyun-cdn.u1n1.com//img/picgo202204111145393.png)



### [重设所有属性值](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#重设所有属性值)

CSS 的 shorthand 属性 `all` 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个(`inherit`, `initial`, `unset`, or `revert`)。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点。





## [理解层叠](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#理解层叠)

我们现在明白了为什么嵌套在html结构中的段落和应用于正文中的css颜色相同，从入门课程中，我们了解了如何将文档中的任何修改应用于某个对象的css，无论是把css指定某个元素还是创建一个类。现在，我们将要了解层叠如何定义在不止一个元素的时候怎么应用css规则。

有三个因素需要考虑，根据重要性排序如下，前面的更重要：

1. 重要程度
2. 优先级
3. 资源顺序

### [资源顺序](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#资源顺序)

我们已经看到了顺序对于层叠的重要性。如果你有超过一条规则，而且都是相同的权重，那么最后面的规则会应用。可以理解为后面的规则覆盖前面的规则，直到最后一个开始设置样式。

### [优先级](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#优先级_2)

在你了解了顺序的重要性后，会发现在一些情况下，有些规则在最后出现，但是却应用了前面的规则。这是因为前面的有更高的**优先级** — 它范围更小，因此浏览器就把它选择为元素的样式。

就像前面看到的，类选择器的权重大于元素选择器，因此类上定义的属性将覆盖应用于元素上的属性。

这里需要注意虽然我们考虑的是选择器，以及应用在选中对象上的规则，但不会覆盖所有规则，只有相同的属性。

这样可以避免重复的 CSS。一种常见的做法是给基本元素定义通用样式，然后给不同的元素创建对应的类。举个例子，在下面的样式中我给2级标题定义了通用样式，然后创建了一些类只修改部分属性的值。最初定义的值应用于所有标题，然后更具体的值通过对应类来实现。



现在让我们来看看浏览器如何计算优先级。我们已经知道一个元素选择器比类选择器的优先级更低会被其覆盖。本质上，不同类型的选择器有不同的分数值，把这些分数相加就得到特定选择器的权重，然后就可以进行匹配。

![image-20220411115318350](https://ypyun-cdn.u1n1.com//img/picgo202204111153379.png)



# CSS选择器

## [选择器列表](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#选择器列表)

如果你有多个使用相同样式的CSS选择器，那么这些单独的选择器可以被混编为一个“选择器列表”，这样，规则就可以应用到所有的单个选择器上了。例如，如果我的`h1`和`.special`类有相同的CSS，那么我可以把它们写成两个分开的规则。

![image-20220411121909759](https://ypyun-cdn.u1n1.com//img/picgo202204111219785.png)

当你使用选择器列表时，如果任何一个选择器无效 (存在语法错误)，那么整条规则都会被忽略。

## [选择器的种类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#选择器的种类)

### [类型、类和ID选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#类型、类和id选择器)

这个选择器组，第一个是指向了所有HTML元素`<h1>。`

```
h1 { }
```

它也包含了一个class的选择器：

```
.box { }
```

亦或，一个id选择器：

```
#unique { }
```



### [标签属性选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#标签属性选择器)

这组选择器根据一个元素上的某个标签的属性的存在以选择元素的不同方式：

```
a[title] { }
```

或者根据一个有特定值的标签属性是否存在来选择：

```
a[href="https://example.com"] { }
```

### [伪类与伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#伪类与伪元素)

这组选择器包含了伪类，用来样式化一个元素的特定状态。例如`:hover`伪类会在鼠标指针悬浮到一个元素上的时候选择这个元素：

```
a:hover { }
```

它还可以包含了伪元素，选择一个元素的某个部分而不是元素自己。例如，`::first-line`是会选择一个元素（下面的情况中是`<p>`）中的第一行，类似`<span>`包在了第一个被格式化的行外面，然后选择这个`<span>`。

```
p::first-line { }
```

### [运算符](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#运算符)

最后一组选择器可以将其他选择器组合起来，更复杂的选择元素。下面的示例用运算符（`>`）选择了`<article>`元素的初代子元素。

```
article > p { }
```



## [选择器参考表](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors#选择器参考表)

下面的表格让你可以浏览你可以用的选择器，还有本指南中教你如何使用每种选择器的页面的链接。我还加上了一个能查看浏览器对每个选择器的支持信息的MDN页面链接。你可以把这个作为回头的参考，在你以后需要查询文献中提到的选择器的时候，或者是在你广义上实验CSS的时候。

| 选择器                                                       | 示例                | 学习CSS的教程                                                |
| :----------------------------------------------------------- | :------------------ | :----------------------------------------------------------- |
| [类型选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors) | `h1 { }`            | [类型选择器](https://developer.mozilla.org/zh-CN/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#Type_selectors) |
| [通配选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors) | `* { }`             | [通配选择器](https://developer.mozilla.org/zh-CN/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#The_universal_selector) |
| [类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors) | `.box { }`          | [类选择器](https://developer.mozilla.org/zh-CN/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#Class_selectors) |
| [ID选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors) | `#unique { }`       | [ID选择器](https://developer.mozilla.org/zh-CN/docs/user:chrisdavidmills/CSS_Learn/CSS_Selectors/Type_Class_and_ID_Selectors#ID_Selectors) |
| [标签属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) | `a[title] { }`      | [标签属性选择器](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Attribute_selectors) |
| [伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) | `p:first-child { }` | [伪类](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Pseuso-classes_and_Pseudo-elements#What_is_a_pseudo-class) |
| [伪元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) | `p::first-line { }` | [伪元素](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Pseuso-classes_and_Pseudo-elements#What_is_a_pseudo-element) |
| [后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator) | `article p`         | [后代运算符](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Descendant_Selector) |
| [子代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator) | `article > p`       | [子代选择器](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Child_combinator) |
| [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator) | `h1 + p`            | [相邻兄弟](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#Adjacent_sibling) |
| [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator) | `h1 ~ p`            | [通用兄弟](https://developer.mozilla.org/zh-CN/docs/User:chrisdavidmills/CSS_Learn/CSS_Selectors/Combinators#General_sibling) |



## [类型选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#类型选择器)

**类型选择器**有时也叫做“标签名选择器*”*或者是”元素选择器“，因为它在文档中选择了一个HTML标签/元素的缘故。在下面的示例中，我们已经用了span、em和strong选择器，`<span>`、`<em>`和`<strong>`元素的所有实例这样就都被样式化了。

## [全局选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#全局选择器)

全局选择器，是由一个星号（`*`）代指的，它选中了文档中的所有内容（或者是父元素中的所有内容，比如，它紧随在其他元素以及邻代运算符之后的时候）。

### [使用全局选择器，让选择器更易读](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#使用全局选择器，让选择器更易读)

全局选择器的一种用法是让选择器更易读，更明显地表明它们的作用。例如，如果我想选中任何`<article>`元素的第一子元素，不论它是什么元素，都给它加粗，我可以将[`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)选择器（我们将会在[伪类和伪元素](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)课中进一步了解）用作`<article>`元素选择器的一个后代选择器：

```
article :first-child {

}
```

Copy to Clipboard

但是这会和`article:first-child`混淆，而后者选择了作为其他元素的第一子元素的`<article>`元素。

为了避免这种混淆，我们可以向`:first-child`选择器加入全局选择器，这样选择器所做的事情很容易就能看懂。选择器正选中`<article>`元素的*任何*第一子元素：

```
article *:first-child {

} 
```

## [类选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#类选择器)

类选择器以一个句点（`.`）开头，会选择文档中应用了这个类的所有物件。



### [指向特定元素的类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#指向特定元素的类)

你能建立一个指向应用一个类的特定元素。在下一个示例里面，我们将会用不同方式高亮一个带有`highlight`类的`<span>`和带有 `highlight`类的`<h1>`标题。我们通过使用附加了类的欲选元素的选择器做到这点，其间没有空格。



### [多个类被应用的时候指向一个元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#多个类被应用的时候指向一个元素)

你能对一个元素应用多个类，然后分别指向它们，或者仅仅在选择器中存在所有这些类的时候选择这一元素。在你的站点上，构建可以以不同方式组合起来的组件的时候，这会有用。



## [ID选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#id选择器)

ID选择器开头为`#`而非句点，不过基本上和类选择器是同种用法。可是在一篇文档中，一个ID只会用到一次。它能选中设定了`id`的元素，你能把ID放在类型选择器之前，只指向元素和ID都匹配的类。



# 属性选择器

## [存否和值选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors#存否和值选择器)

这些选择器允许基于一个元素自身是否存在（例如`href`）或者基于各式不同的按属性值的匹配，来选取元素。

| 选择器              | 示例                            | 描述                                                         |
| :------------------ | :------------------------------ | :----------------------------------------------------------- |
| `[*attr*]`          | `a[title]`                      | 匹配带有一个名为*attr*的属性的元素——方括号里的值。           |
| `[*attr*=*value*]`  | `a[href="https://example.com"]` | 匹配带有一个名为*attr*的属性的元素，其值正为*value*——引号中的字符串。 |
| `[*attr*~=*value*]` | `p[class~="special"]`           | 匹配带有一个名为*attr*的属性的元素 ，其值正为*value*，或者匹配带有一个*attr*属性的元素，其值有一个或者更多，至少有一个和*value*匹配。注意，在一列中的好几个值，是用空格隔开的。 |
| `[*attr*|=*value*]` | `div[lang|="zh"]`               | 匹配带有一个名为*attr*的属性的元素，其值可正为*value*，或者开始为*value*，后面紧随着一个连字符。 |

下面的示例中，你可以看到这些选择器是怎样使用的。

- 使用`li[class]`，我们就能匹配任何有class属性的选择器。这匹配了除了第一项以外的所有项。
- `li[class="a"]`匹配带有一个`a`类的选择器，不过不会选中一部分值为`a`而另一部分是另一个用空格隔开的值的类，它选中了第二项。
- `li[class~="a"]`会匹配一个`a`类，不过也可以匹配一列用空格分开、包含`a`类的值，它选中了第二和第三项。

## [子字符串匹配选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors#子字符串匹配选择器)

这些选择器让更高级的属性的值的子字符串的匹配变得可行。例如，如果你有`box-warning`和`box-error`类，想把开头为“box-”字符串的每个物件都匹配上的话，你可以用`[class^="box-"]`来把它们两个都选中。

| 选择器              | 示例                | 描述                                                         |
| :------------------ | :------------------ | :----------------------------------------------------------- |
| `[*attr*^=*value*]` | `li[class^="box-"]` | 匹配带有一个名为*attr*的属性的元素，其值开头为*value*子字符串。 |
| `[*attr*$=*value*]` | `li[class$="-box"]` | 匹配带有一个名为*attr*的属性的元素，其值结尾为*value*子字符串 |
| `[*attr**=*value*]` | `li[class*="box"]`  | 匹配带有一个名为*attr*的属性的元素，其值的字符串中的任何地方，至少出现了一次*value*子字符串。 |

## [大小写敏感](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors#大小写敏感)

如果你想在大小写不敏感的情况下，匹配属性值的话，你可以在闭合括号之前，使用`i`值。这个标记告诉浏览器，要以大小写不敏感的方式匹配ASCII字符。没有了这个标记的话，值会按照文档语言对大小写的处理方式，进行匹配——HTML中是大小写敏感的。

下面的示例中，第一个选择器将会匹配一个开头为`a`的值，这样它只匹配了第一项，因为另外两项开头是大写的A。第二个选择器使用了大小写不敏感的标记，于是匹配了所有项。



## [什么是伪类？](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#什么是伪类？)

伪类是选择器的一种，它用于选择处于特定状态的元素，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。

伪类就是开头为冒号的关键字：

```
:pseudo-class-name
```

### [用户行为伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#用户行为伪类)

一些伪类只会在用户以某种方式和文档交互的时候应用。这些**用户行为伪类**，有时叫做**动态伪类**，表现得就像是一个类在用户和元素交互的时候加到了元素上一样。案例包括：

- `:hover`——上面提到过，只会在用户将指针挪到元素上的时候才会激活，一般就是链接元素。
- `:focus`——只会在用户使用键盘控制，选定元素的时候激活。



## [伪元素是啥？](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪元素是啥？)

伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的HTML元素一样，而不是向现有的元素上应用类。伪元素开头为双冒号`::`。

```
::pseudo-element-name
```

**备注：**一些早期的伪元素曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后向兼容，支持早期的带有单双冒号语法的伪元素。

## [生成带有::before和::after的内容](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#生成带有before和after的内容)

有一组特别的伪元素，它们和`content`属性一同使用，使用CSS将内容插入到你的文档中中。

这些伪元素经常用于插入空字符串，其后可以像页面上的其他元素被样式化。

### [伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪类)

| 选择器                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) | 在用户激活（例如点击）元素的时候匹配。                       |
| [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link) | 匹配一个链接的`:link`和`:visited`状态。                      |
| [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank) | 匹配空输入值的[``元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。 |
| [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked) | 匹配处于选中状态的单选或者复选框。                           |
| [`:current` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:current) | 匹配正在展示的元素，或者其上级元素。                         |
| [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default) | 匹配一组相似的元素中默认的一个或者更多的UI元素。             |
| [`:dir`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir) | 基于其方向性（HTML`dir`属性或者CSS`direction`属性的值）匹配一个元素。 |
| [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled) | 匹配处于关闭状态的用户界面元素                               |
| [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty) | 匹配除了可能存在的空格外，没有子元素的元素。                 |
| [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled) | 匹配处于开启状态的用户界面元素。                             |
| [`:first`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first) | 匹配[分页媒体](https://developer.mozilla.org/en-US/docs/Web/CSS/Paged_Media)的第一页。 |
| [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) | 匹配兄弟元素中的第一个元素。                                 |
| [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type) | 匹配兄弟元素中第一个某种类型的元素。                         |
| [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus) | 当一个元素有焦点的时候匹配。                                 |
| [`:focus-visible`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible) | 当元素有焦点，且焦点对用户可见的时候匹配。                   |
| [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within) | 匹配有焦点的元素，以及子代元素有焦点的元素。                 |
| [`:future` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:future) | 匹配当前元素之后的元素。                                     |
| [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) | 当用户悬浮到一个元素之上的时候匹配。                         |
| [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate) | 匹配未定态值的UI元素，通常为[复选框](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)。 |
| [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range) | 用一个区间匹配元素，当值处于区间之内时匹配。                 |
| [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) | 匹配诸如`<input>`的位于不可用状态的元素。                    |
| [`:lang`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang) | 基于语言（HTML[lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)属性的值）匹配元素。 |
| [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child) | 匹配兄弟元素中最末的那个元素。                               |
| [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type) | 匹配兄弟元素中最后一个某种类型的元素。                       |
| [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left) | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Pages)中，匹配左手边的页。 |
| [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link) | 匹配未曾访问的链接。                                         |
| [`:local-link` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link) | 匹配指向和当前文档同一网站页面的链接。                       |
| [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) | 匹配传入的选择器列表中的任何选择器。                         |
| [`:not`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not) | 匹配作为值传入自身的选择器未匹配的物件。                     |
| [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child) | 匹配一列兄弟元素中的元素——兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配元素1、3、5、7等。即所有的奇数个）。 |
| [`:nth-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type) | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配元素1、3、5、7等。即所有的奇数个）。 |
| [`:nth-last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child) | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| [`:nth-last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type) | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照an+b形式的式子进行匹配（比如2n+1匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child) | 匹配没有兄弟元素的元素。                                     |
| [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type) | 匹配兄弟元素中某类型仅有的元素。                             |
| [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional) | 匹配不是必填的form元素。                                     |
| [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range) | 按区间匹配元素，当值不在区间内的的时候匹配。                 |
| [`:past` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:past) | 匹配当前元素之前的元素。                                     |
| [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) | 匹配显示占位文字的input元素。                                |
| [`:playing` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:playing) | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。 |
| [`:paused` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:paused) | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。 |
| [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only) | 匹配用户不可更改的元素。                                     |
| [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write) | 匹配用户可更改的元素。                                       |
| [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required) | 匹配必填的form元素。                                         |
| [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right) | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Pages)中，匹配右手边的页。 |
| [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root) | 匹配文档的根元素。                                           |
| [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope) | 匹配任何为参考点元素的的元素。                               |
| [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) | 匹配诸如`<input>`元素的处于可用状态的元素。                  |
| [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target) | 匹配当前URL目标的元素（例如如果它有一个匹配当前[URL分段](https://en.wikipedia.org/wiki/Fragment_identifier)的元素）。 |
| [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited) | 匹配已访问链接。                                             |

### [伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#伪元素)

| 选择器                                                       | 描述                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) | 匹配出现在原有元素的实际内容之后的一个可样式化元素。 |
| [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) | 匹配出现在原有元素的实际内容之前的一个可样式化元素。 |
| [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) | 匹配元素的第一个字母。                               |
| [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) | 匹配包含此伪元素的元素的第一行。                     |
| [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error) | 匹配文档中包含了浏览器标记的语法错误的那部分。       |
| [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection) | 匹配文档中被选择的那部分。                           |
| [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) | 匹配文档中包含了浏览器标记的拼写错误的那部分。       |

# 关系选择器

## [后代选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators#后代选择器)

后代选择器——典型用单个空格（` `）字符——组合两个选择器，比如，第二个选择器匹配的元素被选择，如果他们有一个祖先（父亲，父亲的父亲，父亲的父亲的父亲，等等）元素匹配第一个选择器。选择器利用后代组合符被称作后代选择器。



## [子代关系选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators#子代关系选择器)

子代关系选择器是个大于号（`>`），只会在选择器选中直接子元素的时候匹配。继承关系上更远的后代则不会匹配。例如，只选中作为`<article>`的直接子元素的`<p>`元素：

## [邻接兄弟](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators#邻接兄弟)

邻接兄弟选择器（`+`）用来选中恰好处于另一个在继承关系上同级的元素旁边的物件。例如，选中所有紧随`<p>`元素之后的`<img>`元素：

## [通用兄弟](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators#通用兄弟)

如果你想选中一个元素的兄弟元素，即使它们不直接相邻，你还是可以使用通用兄弟关系选择器（`~`）。要选中所有的`<p>`元素后*任何地方*的`<img>`元素