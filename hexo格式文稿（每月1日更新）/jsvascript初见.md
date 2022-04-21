title: jsvascript初见
author: chenbin
tags:
  - js
categories:
  - js
date: 2022-04-12 19:30:00
---
# javascript初见

## [var 与 let 的区别](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#var_与_let_的区别)

此时，您可能会想：“为什么我们需要两个关键字来定义变量?”，“为什么有 `var` 和 `let` 呢？"。

原因是有些历史性的。 回到最初创建 JavaScript 时，是只有 `var` 的。 在大多数情况下，这种方法可以接受， 但有时在工作方式上会有一些问题——它的设计会令人困惑或令人讨厌 。 因此，`let` 是在现代版本中的 JavaScript 创建的一个新的关键字，用于创建与 `var` 工作方式有些不同的变量，解决了过程中的问题。

这是由于变量的**提升**，更多细节请阅读[变量提升](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var#变量提升)。

但提升操作不再适用于 `let` 。如果将上面例子中的 `var` 替换成 `let` 将不起作用并引起一个错误。 这是一件好事——因为初始化后再声明一个变量会使代码变得混乱和难以理解。

其次，当你使用 `var` 时，可以根据需要多次声明相同名称的变量，但是 `let` 不能。 以下将有效：

```js
var myName = 'Chris';
var myName = 'Bob';
```



但是以下内容会在第二行引发错误：

```
let myName = 'Chris';
let myName = 'Bob';
```



你必须这样做：

```js
let myName = 'Chris';
myName = 'Bob';
```



同样，这是一个明智的语言决定。没有理由重新声明变量——这只会让事情变得更加混乱。

出于这些以及其他原因，我们建议您在代码中尽可能多地使用 `let`，而不是 `var`。因为没有理由使用 `var`，除非您需要用代码支持旧版本的 Internet Explorer (它直到第 11 版才支持 `let` ，现代的 Windows Edge 浏览器支持的很好)。

## [变量类型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#变量类型)

可以为变量设置不同的数据类型。本节我们将对其进行简短的介绍，在以后的文章中，你会更详细地了解它们。

到目前为止我们已经认识了前2个，但是还有其他的。

### [Number](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#number)

你可以在变量中存储数字，不论这些数字是像30（也叫整数）这样，或者像2.456这样的小数（也叫做浮点数）。与其他编程语言不同，在 JavaScript 中你不需要声明一个变量的类型。当你给一个变量数字赋值时，不需要用引号括起来。 

```
let myAge = 17;
```



### [String](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#string)

字符串是文本的一部分。当你给一个变量赋值为字符串时，你需要用单引号或者双引号把值给包起来，否则JavaScript将会把这个字符串值理解成别的变量名。

```
let dolphinGoodbye = 'So long and thanks for all the fish';
```



### [Boolean](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#boolean)

Boolean 的值有2种：true或false。它们通常被用于在适当的代码之后，测试条件是否成立。举个例子，一个简单的示例如下： 

```
let iAmAlive = true;
```



然而实际上通常是以下用法：

```
let test = 6 < 3;
```



这是使用“小于”操作符（<）来测试6小于3。正如你所料的，将会返回`false`，因为6并不小于3！在这个课程中，以后你将会学到许多有关操作符的知识。

### [Array](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#array)

数组是一个单个对象，其中包含很多值，方括号括起来，并用逗号分隔。尝试在您的控制台输入以下行:

```
let myNameArray = ['Chris', 'Bob', 'Jim'];
let myNumberArray = [10,15,40];
```



当数组被定义后，您可以使用如下所示的语法来访问各自的值，例如下行:

```
myNameArray[0]; // should return 'Chris'
myNumberArray[2]; // should return 40
```



此处的方括号包含一个索引值，该值指定要返回的值的位置。 您可能已经注意到，计算机从0开始计数，而不是像我们人类那样的1。

在以后的文章，你将更多地了解数组。

### [Object](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#object)

在编程中，对象是现实生活中的模型的一种代码结构。您可以有一个简单的对象，代表一个停车场，并包含有关其宽度和长度的信息，或者您可以有一个代表一个人的对象，并包含有关他们的名字，身高，体重，他们说什么语言，如何说 你好，他们，等等。

尝试在您的控制台输入以下行:

```
let dog = { name : 'Spot', breed : 'Dalmatian' };
```



要检索存储在对象中的信息，可以使用以下语法:

```
dog.name
```



我们现在不会看对象了 - 您可以在将来的模块中了解更多关于这些对象的信息.

## [动态类型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#动态类型)

JavaScript是一种“动态类型语言”，这意味着不同于其他一些语言(译者注：如C、JAVA)，您不需要指定变量将包含什么数据类型（例如number或string）

例如，如果你声明一个变量并给它一个带引号的值，浏览器就会知道它是一个字符串：

```
let myString = 'Hello';
```



即使它包含数字，但它仍然是一个字符串，所以要小心：

```
let myNumber = '500'; // oops, this is still a string
typeof myNumber;
myNumber = 500; // much better — now this is a number
typeof myNumber
```



尝试依次将上述代码输入您的控制台，看看结果是什么（无须输入//之后的注释）。 我们使用了一个名为`typeof`的特殊的操作符 ——它会返回所传递给它的变量的数据类型。 第一次在上面的代码中调用它，它应该返回string，因为此时myNumber变量包含一个字符串'500'。 看看它第二次将返回什么。

## [算术运算符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math#算术运算符)

算术运算符是我们用来做和的基本运算符：

| 运算符 | 名称                 | 作用                                                         | 示例                                                |
| :----- | :------------------- | :----------------------------------------------------------- | :-------------------------------------------------- |
| `+`    | 加法                 | 两个数相加。                                                 | `6 + 9`                                             |
| `-`    | 减法                 | 从左边减去右边的数。                                         | `20 - 15`                                           |
| `*`    | 乘法                 | 两个数相乘。                                                 | `3 * 7`                                             |
| `/`    | 除法                 | 用右边的数除左边的数                                         | `10 / 5`                                            |
| `%`    | 求余(有时候也叫取模) | 在你将左边的数分成同右边数字相同的若干整数部分后，返回剩下的余数 | `8 % 3` (返回 2，8除以3的倍数，余下2 。)            |
| `**`   | 幂                   | 取底数的指数次方，即指数所指定的底数相乘。它在EcmaScript 2016 中首次引入。 | `5 ** 5` (返回 3125，相当于 `5 * 5 * 5 * 5 * 5` 。) |

### [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math#运算符优先级)

这是因为**运算符优先级** —— 一些运算符将在计算算式（在编程中称为表达式）的结果时先于其他运算符被执行。 JavaScript中的运算符优先级与学校的数学课程相同 - 乘法和除法总是先完成，然后是加法和减法（总是从左到右进行计算）。

如果想要改变计算优先级，可以把想要优先计算的部分用括号围住。 

## [自增和自减运算符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math#自增和自减运算符)

有时候，您需要反复把一个变量加1或减1。 这可以方便地使用增量（`++`）和递减（ `--` ）运算符来完成。 我们在[JavaScript 初体验](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/A_first_splash)文章的“猜数字”游戏中使用了++，当我们添加1到我们的guessCount变量来跟踪用户在每次转动之后剩下的猜测时。

```
guessCount++;
```



**Note**: 它们最常用于 [循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration) 中，您将在以后的课程中了解。 例如，假设您想循环查看价格表，并为每个价格增加销售税。 您可以使用循环依次查看每个值，并在每种情况下进行必要的计算，以添加销售税。 当需要时，增量器用于移动到下一个值。 我们实际上提供了一个简单的例子，显示了如何完成 ——  [在线查看效果](https://mdn.github.io/learning-area/javascript/introduction-to-js-1/maths/loop.html)，并 [查看源代码](https://github.com/mdn/learning-area/blob/master/javascript/introduction-to-js-1/maths/loop.html)，看看是否可以发现增量器！ 我们稍后将会详细介绍循环。

## [赋值运算符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math#赋值运算符)

赋值运算符是向变量分配值的运算符。 我们已经使用了最基本的一个很多次了：`=`， 它只是将右边的值赋给左边的变量 ，即：

```
let x = 3; // x 的值是 3
let y = 4; // y 的值是 4
x = y; // x 和 y 有相同的值, 4
```



但是还有一些更复杂的类型，它们提供了有用的快捷方式，可以使您的代码更加清洁和高效。 最常见的如下：

| 运算符 | 名称     | 作用                                           | 示例             | 等价于              |
| :----- | :------- | :--------------------------------------------- | :--------------- | :------------------ |
| `+=`   | 加法赋值 | 右边的数值加上左边的变量，然后再返回新的变量。 | `x = 3;x += 4;`  | `x = 3;x = x + 4;`  |
| `-=`   | 减法赋值 | 左边的变量减去右边的数值，然后再返回新的变量。 | `x = 6;x -= 3;`  | `x = 6;x = x - 3;`  |
| `*=`   | 乘法赋值 | 左边的变量乘以右边的数值，然后再返回新的变量。 | `x = 2;x *= 3;`  | `x = 2;x = x * 3;`  |
| `/=`   | 除法赋值 | 左边的变量除以右边的数值，然后再返回新的变量。 | `x = 10;x /= 5;` | `x = 10;x = x / 5;` |

## [比较运算符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math#比较运算符)

有时，我们将要运行真/假测试，然后根据该测试的结果进行相应的操作 - 为此，我们使用比较运算符。

| 运算符 | 名称       | 作用                           | 示例          |
| :----- | :--------- | :----------------------------- | :------------ |
| `===`  | 严格等于   | 测试左右值是否相同             | `5 === 2 + 4` |
| `!==`  | 严格不等于 | 测试左右值是否**不**相同       | `5 !== 2 + 3` |
| `<`    | 小于       | 测试左值是否小于右值。         | `10 < 6`      |
| `>`    | 大于       | 测试左值是否大于右值           | `10 > 20`     |
| <=     | 小于或等于 | 测试左值是否小于或等于右值。   | `3 <= 2`      |
| >=     | 大于或等于 | 测试左值是否大于或等于正确值。 | `5 >= 4`      |

**Note**: 您可能会看到有些人在他们的代码中使用`==`和`!=`来判断相等和不相等，这些都是JavaScript中的有效运算符，但它们与`===`/`!==`不同，前者测试值是否相同， 但是数据类型可能不同，而后者的严格版本测试值和数据类型是否相同。 严格的版本往往导致更少的错误，所以我们建议您使用这些严格的版本。

如果您尝试在控制台中输入这些值，您将看到它们都返回 `true`/`false` 值 - 我们在上一篇文章中提到的那些布尔值。 这些是非常有用的，因为它们允许我们在我们的代码中做出决定 - 每次我们想要选择某种类型时，都会使用这些代码，例如：

- 根据功能是打开还是关闭，在按钮上显示正确的文本标签。
- 如果游戏结束，则显示游戏消息，或者如果游戏已经获胜，则显示胜利消息。
- 显示正确的季节性问候，取决于假期季节。
- 根据选择的缩放级别缩小或放大地图。

### [单引号和双引号](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings#单引号和双引号)

1. 在JavaScript中，您可以选择单引号或双引号来包裹字符串。

   下面两种方式都可以:

   ```
   let sgl = 'Single quotes.';
   let dbl = "Double quotes";
   sgl;
   dbl;
   ```

   

2. 两者之间几乎没有什么区别，根据个人偏好来使用。但是，您应该选择一个并坚持使用它，不一致的引号混用代码可能会让人很迷惑，特别是如果您在同一个字符串中使用不同的引号！

   下面将返回一个错误:

   ```
   let badQuotes = 'What on earth?";
   ```

   

3. 浏览器会认为字符串没有被关闭，因为在字符串中您没有使用其他类型的引号。

   例如，这两种情况都是可以的:

   ```
   let sglDbl = 'Would you eat a "fish supper"?';
   let dblSgl = "I'm feeling blue.";
   sglDbl;
   dblSgl;
   ```

   

4. 但是，您不能在字符串中包含相同的引号，因为它是用来包含它们的。下面将会出现错误，因为它会混淆浏览器和字符串的结束位置:

   ```
   let bigmouth = 'I've got no right to take my place...';
   ```

### [转义字符串中的字符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings#转义字符串中的字符)

要修复我们之前的问题代码行，我们需要避免引号的问题。转义字符意味着我们对它们做一些事情，以确保它们被识别成文本，而不是代码的一部分。在JavaScript中，我们通过在字符之前放一个反斜杠来实现这一点。试试这个:

```
let bigmouth = 'I\'ve got no right to take my place...';
bigmouth;
```



这回正常了。你可以用别的方式来达到一样的目的， 例如. `\",` 除此之外有一些特殊的代码 。更多细节请参见[转义符号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#parameters)。

## [连接字符串](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings#连接字符串)

1. 连接是一个很花哨的编程词，意思是“连接在一起”。在JavaScript中连接字符串使用加号(+)操作符，我们也用它来将数字加在一起，但是在这种情况下，它做了一些不同的事情。让我们在控制台中尝试一个例子。

   ```
   let one = 'Hello, ';
   let two = 'how are you?';
   let joined = one + two;
   joined;
   ```

   

   变量

    

   ```
   joined
   ```

    

   的值的结果，它包含的值为 "Hello, how are you?"。

2. 最后一个例子中， 我们只是把两个字符串连接在一起，但是你可以喜欢连接多少就多少个， 只需要在它们之间加上 + 操作符。试试这个：

   ```
   let multiple = one + one + one + one + two;
   multiple;
   ```

   

3. 你还能用真实的字符串和变量来混合。试试这个：

   ```
   let response = one + 'I am fine — ' + two;
   response;
   ```

   

**注意**: 当您在您的代码中输入一个实际的字符串时，用单引号或双引号括起来，它被称为字符串文字。

### [上下文中的串联](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings#上下文中的串联)

让我们看一下在操作中使用的连接——这是本课程早些时候的一个例子:

```
<button>Press me</button>
```



```
const button = document.querySelector('button');

button.onclick = function() {
  let name = prompt('What is your name?');
  alert('Hello ' + name + ', nice to see you!');
}
```





这里我们使用的是第4行中的 [`window.prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt) 函数， 它要求用户通过一个弹出对话框回答一个问题然后将他们输入的文本存储在一个给定的变量中 — 在这个例子中是就是 `name` 变量。然后，我们在第5行中使用  [`window.alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert) 函数来显示另一个弹出窗口，其中包含一个字符串，我们用两个字符串常量和name变量通过连接进行组合。

### [数字与字符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings#数字与字符)

1. 当我们尝试添加(或连接)一个字符串和一个数字时，会发生什么?

   让我们在我们的控制台中尝试一下:

   ```
   'Front ' + 242;
   ```

   

   您可能会认为这会抛出一个错误，但它运行得很好。

   试图将字符串表示为一个数字并不是很讲的通，但是用数字表示一个字符串则不然，因此浏览器很聪明地将数字转换为字符串，并将这两个字符串连接在一起。

2. 你甚至可以用两个数字来这么操作——你可以通过用引号将数字包装成一个字符串。尝试以下方法(我们使用typeof操作符来检查变量是一个数字还是一个字符串):

   ```
   let myDate = '19' + '67';
   typeof myDate;
   ```

   

3. 如果您有一个数值变量，您想要将其转换为字符串，并且不改变其他地方，或者您想将一个字符串转换为一个数字而不改变其其他地方，那么您可以使用以下两个构造:

   - 如果可以的话， 

     `Number`

      对象将把传递给它的任何东西转换成一个数字。

     试一试:

     ```
     let myString = '123';
     let myNum = Number(myString);
     typeof myNum;
     ```

     

   - 另一方面，每个数字都有一个名为

      

     toString()

      的方法，它将把它转换成等价的字符串。

     试试这个:

     ```
     let myNum = 123;
     let myString = myNum.toString();
     typeof myString;
     ```

     

   这些结构在某些情况下是非常有用的，例如，如果一个用户将一个数字输入到一个表单文本字段中，这将是一个字符串，但是如果你想要将这个数字添加到某些东西中时，你需要它是一个数字，所以你可以通过

    

   ```
   Number()
   ```

    来处理这个问题。我们在

   数字猜谜游戏中第54行

   就是这么做的。

# 有用的字符串方法

## [把字符串当作对象](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#把字符串当作对象)

我们曾经说过，现在我们重申一遍—在javascript中，一切东西都可以被当作对象。例如我们创建一个字符串。

```
let string = 'This is my string';
```



一旦你的变量成为字符串对象实例, 你就可以有大量的原型和方法编辑它. 如果你进入[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)对象页并观察页面旁边的列表你就会明白这一点。

### [获得字符串的长度](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#获得字符串的长度)

这很简单 — 你可以很轻松的使用 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length) 属性. 尝试输入以下的两行代码：

```
let browserType = 'mozilla';
browserType.length;
```



这个结果应该返回一个数字：7,因为"mozilla"的长度为7个字符. 说字符串的长度有用是有很多原因的, 例如，你可能想算出一连串名字的长度，并用名字长度来作为名字排序的依据，亦或让一个用户知道他输入的用户名太长，已经超出了输入的字符串长度限制。

### [检索特定字符串字符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#检索特定字符串字符)

在相关的注释中，您可以使用方括号表示法返回字符串中的任何字符 - 这意味着您可以在变量名的末尾包含方括号（[ ]）。 在方括号内，您可以包含要返回的字符的编号，例如，您要检索第一个字母，可以这样做：

```
browserType[0];
```



电脑从0开始，不是1！ 要检索任何字符串的最后一个字符，我们可以使用下面这行，将这种技术与我们上面看到的length属性相结合起来：

```
browserType[browserType.length-1];
```



“mozilla”的长度为7，但由于计数从0开始，所以字符位置为6，因此需要长度为**length-1**。 例如，您可以使用它来查找一系列字符串的第一个字母，并按字母顺序排列。

### [在字符串中查找子字符串并提取它](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#在字符串中查找子字符串并提取它)

1. 有时候你会想要找出一个较小的字符串是否存在于一个较大的字符串中（我们通常会说一个字符串中存在一个子字符串）。 这可以使用

   `indexOf()`

   方法来完成，该方法需要一个

   parameter (en-US)

    

   — 你想要搜索的子字符串。 尝试以下：

   ```
   browserType.indexOf('zilla');
   ```

   

   结果是2，因为子字符串“zilla”从“mozilla”内的位置2（0，1，2 —— 所以从第3个字符）开始。 这样的代码可以用来过滤字符串。 例如，假设我们有一个Web地址列表，但我们只想打印出包含“mozilla”的那些地址。

2. 这可以用另一种可能更有效的方式来实现。 尝试以下：

   ```
   browserType.indexOf('vanilla');
   ```

   

   这应该会得到

    

   ```
   -1
   ```

    

   的结果 —— 当在主字符串中找不到子字符串（在本例中为“vanilla”）时将返回

    

   ```
   -1
   ```

   。

   您可以使用它来查找不包含子串“mozilla”的所有字符串实例，或者如果使用否定运算符，请执行以下操作。 你可以这样做：

   ```
   if(browserType.indexOf('mozilla') !== -1) {
     // do stuff with the string
   }
   ```

   

3. 当你知道字符串中的子字符串开始的位置，以及想要结束的字符时，

   `slice()`

   可以用来提取 它。 尝试以下：

   ```
   browserType.slice(0,3);
   ```

   

   这时返回"moz"——第一个参数是开始提取的字符位置，第二个参数是提取的最后一个字符的后一个位置。所以提取从第一个位置开始，直到但不包括最后一个位置。（此例中）你也可以说第二个参数等于被返回的字符串的长度。

4. 此外，如果您知道要在某个字符之后提取字符串中的所有剩余字符，则不必包含第二个参数，而只需要包含要从中提取的字符位置 字符串中的其余字符。 尝试以下：

   ```
   browserType.slice(2);
   ```

   

   这返回“zilla” —— 这是因为2的字符位置是字母z，并且因为没有包含第二个参数，所以返回的子字符串是字符串中的所有剩余字符。

**Note:** `slice()`的第二个参数是可选的 ：如果没有传入这个参数，分片结束位置会在原始字符串的末尾。这个方法也有其他的选项；学习[`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)这页，来看看你还能发现什么其他作用。

### [转换大小写](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#转换大小写)

字符串方法[`toLowerCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)和[`toUpperCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)字符串并将所有字符分别转换为小写或大写。 例如，如果要在将数据存储在数据库中之前对所有用户输入的数据进行规范化，这可能非常有用。

### [替换字符串的某部分](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#替换字符串的某部分)

您可以使用[`replace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)方法将字符串中的一个子字符串替换为另一个子字符串。在基础的层面上， 这个工作非常简单。你当然可以用它做一些更高级的事情，但目前我们不会涉及到。

它需要两个参数 - 要被替换下的字符串和要被替换上的字符串。 尝试这个例子：

```
browserType.replace('moz','van');
```



注意，在实际程序中，想要真正更新 `browserType` 变量的值，您需要设置变量的值等于刚才的操作结果；它不会自动更新子串的值。所以事实上你需要这样写：`browserType = browserType.replace('moz','van');`。

# 数组

## [数组是什么?](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#数组是什么)

数组通常被描述为“像列表一样的对象”; 简单来说，数组是一个包含了多个值的对象。数组对象可以存储在变量中，并且能用和其他任何类型的值完全相同的方式处理，区别在于我们可以单独访问列表中的每个值，并使用列表执行一些有用和高效的操作，如循环 - 它对数组中的每个元素都执行相同的操作。 也许我们有一系列产品和价格存储在一个数组中，我们想循环遍历所有这些产品，并将它们打印在发票上，同时将所有产品的价格统计在一起，然后将总价格打印在底部。

### [创建数组](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#创建数组)

数组由方括号构成，其中包含用逗号分隔的元素列表。

1. 假设我们想在一个数组中存储一个购物清单 - 我们会做一些像下面这样的事情。 在您的控制台中输入以下行：

   ```
   let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
   shopping;
   ```

   

2. 在这种情况下，数组中的每个项目都是一个字符串，但请记住，您可以将任何类型的元素存储在数组中 - 字符串，数字，对象，另一个变量，甚至另一个数组。 您也可以混合和匹配项目类型 - 它们并不都是数字，字符串等。尝试下面这些：

   ```
   let sequence = [1, 1, 2, 3, 5, 8, 13];
   let random = ['tree', 795, [0, 1, 2]];
   ```

   

### [访问和修改数组元素](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#访问和修改数组元素)

然后，您可以使用括号表示法访问数组中的元素，与 [检索特定字符串字符](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods#检索特定字符串字符) 的方法相同。

1. 在您的控制台中输入以下内容：

   ```
   shopping[0];
   // returns "bread"
   ```

   

2. 您还可以简单地为单个数组元素提供新值来修改数组中的元素。 例如：

   ```
   shopping[0] = 'tahini';
   shopping;
   // shopping will now return [ "tahini", "milk", "cheese", "hummus", "noodles" ]
   ```

   

   **Note**: 我们以前说过，但还是提醒一下 —— 电脑从 0 开始计数！

### [获取数组长度](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#获取数组长度)

你可以通过使用 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性获取数组的长度（数组中有多少项元素），这与查找字符串的长度（以字符为单位）完全相同 。 尝试以下代码：

```
sequence.length;
// should return 7
```

虽然 length 属性也有其他用途，但最常用于循环（循环遍历数组中的所有项）。 例如：

```
let sequence = [1, 1, 2, 3, 5, 8, 13];
for (let i = 0; i < sequence.length; i++) {
  console.log(sequence[i]);
}
```



## [一些有用的数组方法](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#一些有用的数组方法)

在本节中，我们将介绍一些相当有用的数组方法，这些方法允许我们将字符串拆分为字符串数组，反之亦然，以及添加或删除元素。

### [字符串和数组之间的转换](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#字符串和数组之间的转换)

通常，您会看到一个包含在一个长长的字符串中的原始数据，您可能希望将有用的项目分成更有用的表单，然后对它们进行处理，例如将它们显示在数据表中。 为此，我们可以使用 [`split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法。 在其最简单的形式中，这需要一个参数，您要将字符串分隔的字符，并返回分隔符之间的子串，作为数组中的项。

**Note**: 好吧，从技术上讲，这是一个字符串方法，而不是一个数组方法，但是我们把它放在数组中，因为它在这里很合适。

1. 我们来玩一下这个方法，看看它是如何工作的。 首先，在控制台中创建一个字符串：

   ```
   let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
   ```

   

2. 现在我们用每个逗号分隔它：

   ```
   let myArray = myData.split(',');
   myArray;
   ```

   

3. 最后，尝试找到新数组的长度，并从中检索一些项目：

   ```
   myArray.length;
   myArray[0]; // the first item in the array
   myArray[1]; // the second item in the array
   myArray[myArray.length-1]; // the last item in the array
   ```

   

4. 您也可以使用

    

   `join()`

    

   方法进行相反的操作。 尝试以下：

   ```
   let myNewString = myArray.join(',');
   myNewString;
   ```

   

5. 将数组转换为字符串的另一种方法是使用

    

   `toString()`

    

   方法。

    

   ```
   toString()
   ```

    

   可以比

    

   ```
   join()
   ```

    

   更简单，因为它不需要一个参数，但更有限制。 使用

    

   ```
   join()
   ```

    

   可以指定不同的分隔符（尝试使用与逗号不同的字符运行步骤4）。

   ```
   let dogNames = ["Rocket","Flash","Bella","Slugger"];
   dogNames.toString(); //Rocket,Flash,Bella,Slugger
   ```

   

### [添加和删除数组项](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays#添加和删除数组项)

我们还没有涵盖添加和删除数组元素，现在让我们来看看。 我们将使用在上一节中最后提到的 `myArray` 数组。 如果您尚未遵循该部分，请先在控制台中创建数组：

```
let myArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
```



首先，要在数组末尾添加或删除一个项目，我们可以使用 [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 和 [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)。

1. 让我们先使用

    

   ```
   push()
   ```

    

   —— 注意，你需要添加一个或多个要添加到数组末尾的元素。 尝试下面的代码：

   ```
   myArray.push('Cardiff');
   myArray;
   myArray.push('Bradford', 'Brighton');
   myArray;
   ```

   

2. 当方法调用完成时，将返回数组的新长度。 如果要将新数组长度存储在变量中。例如：

   ```
   var newLength = myArray.push('Bristol');
   myArray;
   newLength;
   ```

   

3. 从数组中删除最后一个元素的话直接使用 

   ```
   pop()
   ```

    

   就可以。 例如：

   ```
   myArray.pop();
   ```

   

4. 当方法调用完成时，将返回已删除的项目。 你也可以这样做：

   ```
   let removedItem = myArray.pop();
   myArray;
   removedItem;
   ```

   

[`unshift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) 和 [`shift()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) 从功能上与 [`push()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 和 [`pop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) 完全相同，只是它们分别作用于数组的开始，而不是结尾。

1. 首先 

   ```
   unshift()
   ```

    

   ——尝试一下这个命令：

   ```
   myArray.unshift('Edinburgh');
   myArray;
   ```

   

2. 现在

    

   ```
   shift()
   ```

    

   —— 尝试一下！

   ```
   let removedItem = myArray.shift();
   myArray;
   removedItem;
   ```

   