# javascript进阶

## [函数与方法](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Functions#函数与方法)

程序员把函数称为对象**方法（method）**的一部分。你还不必了解JavaScript中已建构的对象在更深层次上是如何运作的——你可以等到下一小节，我们会教给你有关对象运作方式的一切。在我们继续前进之前，我们需要澄清一些有关方法和函数概念之间可能存在的误会——当你在网络上浏览相关信息的时候，你很可能会碰上这两个术语。

到目前为止我们所使用的内置代码同属于这两种形式：函数和方法。你可以在[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)查看内置函数，内置对象以及其相关方法的完整列表。

严格说来，内置浏览器函数并不是函数——它们是**方法**。这听起来有点可怕和令人困惑，但不要担心 ——函数和方法在很大程度上是可互换的，至少在我们的学习阶段是这样的。

二者区别在于方法是在对象内定义的函数。浏览器内置函数（方法）和变量（称为属性）存储在结构化对象内，以使代码更加高效，易于处理。

## [调用函数](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Functions#调用函数)

现在你可能很清楚这一点,但仅仅为了防止……，要在函数定义之后，实际使用它，你必须运行或调用它。这是通过将函数名包含在代码的某个地方，后跟圆括号来完成的。

```
function myFunction() {
  alert('hello');
}

myFunction()
// calls the function once
```

Copy to Clipboard

## [匿名函数](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Functions#匿名函数)

您可能会以稍微不同的方式看到定义和调用的函数。到目前为止，我们刚刚创建了如下函数：

```
function myFunction() {
  alert('hello');
}
```

Copy to Clipboard

但是您也可以创建一个没有名称的函数：

```
function() {
  alert('hello');
}
```

Copy to Clipboard

这个函数叫做**匿名函数** — 它没有函数名! 它也不会自己做任何事情。 你通常将匿名函数与事件处理程序一起使用, 例如，如果单击相关按钮，以下操作将在函数内运行代码：

```
var myButton = document.querySelector('button');

myButton.onclick = function() {
  alert('hello');
}
```

Copy to Clipboard

您将主要使用匿名函数来运行负载的代码以响应事件触发（如点击按钮） - 使用事件处理程序。再次，这看起来像这样：

```
myButton.onclick = function() {
  alert('hello');
  // I can put as much code
  // inside here as I want
}
```

Copy to Clipboard

匿名函数也称为函数表达式。函数表达式与函数声明有一些区别。函数声明会进行声明提升（declaration hoisting），而函数表达式不会。

## [函数参数](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/Building_blocks/Functions#函数参数)

一些函数需要在调用它们时指定参数 ——这些参数值需要放在函数括号内，才能正确地完成其工作。

**Note**: 参数有时称为参数（arguments），属性（properties）或甚至属性（attributes）

例如，浏览器的内置[Math.random（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)函数不需要任何参数。当被调用时，它总是返回0到1之间的随机数：

```
var myNumber = Math.random();
```

Copy to Clipboard

浏览器的内置字符串[replace（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)函数需要两个参数：在主字符串中查找的子字符串，以及用以下替换该字符串的子字符串：

```
var myText = 'I am a string';
var newString = myText.replace('string', 'sausage');
```

Copy to Clipboard

**Note**:当您需要指定多个参数时，它们以逗号分隔。

还应该注意，有时参数不是必须的 —— 您不必指定它们。如果没有，该功能一般会采用某种默认行为。作为示例，数组 [join（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)函数的参数是可选的：

```
var myArray = ['I', 'love', 'chocolate', 'frogs'];
var madeAString = myArray.join(' ');
// returns 'I love chocolate frogs'
var madeAString = myArray.join();
// returns 'I,love,chocolate,frogs'
```

Copy to Clipboard

如果没有包含参数来指定加入/分隔符，默认情况下会使用逗号

### [事件冒泡及捕获](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events#事件冒泡及捕获)

#### 对事件冒泡和捕捉的解释

当一个事件发生在具有父元素的元素上(例如，在我们的例子中是`<video>`元素)时，现代浏览器运行两个不同的阶段 - 捕获阶段和冒泡阶段。 在捕获阶段：

- 浏览器检查元素的最外层祖先`<html>`，是否在捕获阶段中注册了一个`onclick`事件处理程序，如果是，则运行它。
- 然后，它移动到`<html>`中单击元素的下一个祖先元素，并执行相同的操作，然后是单击元素再下一个祖先元素，依此类推，直到到达实际点击的元素。

在冒泡阶段，恰恰相反:

- 浏览器检查实际点击的元素是否在冒泡阶段中注册了一个`onclick`事件处理程序，如果是，则运行它
- 然后它移动到下一个直接的祖先元素，并做同样的事情，然后是下一个，等等，直到它到达`<html>`元素。

[![img](https://ypyun-cdn.u1n1.com/img/picgobubbling-capturing.png)](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)


在现代浏览器中，默认情况下，所有事件处理程序都在冒泡阶段进行注册。因此，在我们当前的示例中，当您单击视频时，这个单击事件从 `<video>`元素向外冒泡直到`<html>`元素。沿着这个事件冒泡线路：

- 它发现了`video.onclick...`事件处理器并且运行它，因此这个视频`<video>`第一次开始播放。
- 接着它发现了（往外冒泡找到的） `videoBox.onclick...`事件处理器并且运行它，因此这个视频`<video>`也隐藏起来了。

####  用 stopPropagation() 修复问题

这是令人讨厌的行为，但有一种方法来解决它！标准事件对象具有可用的名为 `stopPropagation()`的函数, 当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在**冒泡**链上进一步扩大，因此将不会有更多事件处理器被运行(不会向上冒泡)。所以，我们可以通过改变前面代码块中的第二个处理函数来解决当前的问题:

```
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

**注解**: 为什么我们要弄清楚捕捉和冒泡呢？那是因为，在过去糟糕的日子里，浏览器的兼容性比现在要小得多，Netscape（网景）只使用事件捕获，而Internet Explorer只使用事件冒泡。当W3C决定尝试规范这些行为并达成共识时，他们最终得到了包括这两种情况（捕捉和冒泡）的系统，最终被应用在现在浏览器里。

**注解**: 如上所述，默认情况下，所有事件处理程序都是在冒泡阶段注册的，这在大多数情况下更有意义。如果您真的想在捕获阶段注册一个事件，那么您可以通过使用`addEventListener()`注册您的处理程序，并将可选的第三个属性设置为true。

#### 事件委托

冒泡还允许我们利用事件委托——这个概念依赖于这样一个事实,如果你想要在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。

一个很好的例子是一系列列表项，如果你想让每个列表项被点击时弹出一条信息，您可以将`click`单击事件监听器设置在父元素`<ul>`上，这样事件就会从列表项冒泡到其父元素`<ul>`上。

这个的概念在David Walsh的博客上有更多的解释，并有多个例子——看看[How JavaScript Event](https://davidwalsh.name/event-delegate)