# 异步JavaScript

###  异步的概念

异步（Asynchronous, async）是与同步（Synchronous, sync）相对的概念。

在我们学习的传统单线程编程中，程序的运行是同步的（同步不意味着所有步骤同时运行，而是指步骤在一个控制流序列中按顺序执行）。而异步的概念则是不保证同步的概念，也就是说，一个异步过程的执行将不再与原有的序列有顺序关系。

简单来理解就是：同步按你的代码顺序执行，异步不按照代码顺序执行，异步的执行效率更高。

以上是关于异步的概念的解释，接下来我们通俗地解释一下异步：异步就是从主线程发射一个子线程来完成任务。

![img](https://ypyun-cdn.u1n1.com/img/picgoasync-sync.png)

### 什么时候用异步编程

在前端编程中（甚至后端有时也是这样），我们在处理一些简短、快速的操作时，例如计算 1 + 1 的结果，往往在主线程中就可以完成。主线程作为一个线程，不能够同时接受多方面的请求。所以，当一个事件没有结束时，界面将无法处理其他请求。

现在有一个按钮，如果我们设置它的 onclick 事件为一个死循环，那么当这个按钮按下，整个网页将失去响应。

为了避免这种情况的发生，我们常常用子线程来完成一些可能消耗时间足够长以至于被用户察觉的事情，比如读取一个大文件或者发出一个网络请求。因为子线程独立于主线程，所以即使出现阻塞也不会影响主线程的运行。但是子线程有一个局限：一旦发射了以后就会与主线程失去同步，我们无法确定它的结束，如果结束之后需要处理一些事情，比如处理来自服务器的信息，我们是无法将它合并到主线程中去的。

为了解决这个问题，JavaScript 中的异步操作函数往往通过回调函数来实现异步任务的结果处理。

### 回调函数

回调函数就是一个函数，它是在我们启动一个异步任务的时候就告诉它：等你完成了这个任务之后要干什么。这样一来主线程几乎不用关心异步任务的状态了，他自己会善始善终。

# 优雅的异步处理

## [什么是promises?](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#什么是promises)

我们在教程的第一篇文章中简要地了解了 [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)，接下来我们将在更深层次理解Promise。

本质上，Promise 是一个对象，代表操作的中间状态 —— 正如它的单词含义 '承诺' ，它保证在未来可能返回某种结果。虽然 Promise 并不保证操作在何时完成并返回结果，但是它保证当结果可用时，你的代码能正确处理结果，当结果不可用时，你的代码同样会被执行，来优雅的处理错误。

通常你不会对一个异步操作从开始执行到返回结果所用的时间感兴趣（除非它耗时过长），你会更想在任何时候都能响应操作结果，当然它不会阻塞其余代码的执行就更好了。

## [ 回调函数的麻烦](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#回调函数的麻烦)

要完全理解为什么 promise 是一件好事，应该回想之前的回调函数，理解它们造成的困难。

我们来谈谈订购披萨作为类比。为了使你的订单成功，你必须按顺序执行，不按顺序执行或上一步没完成就执行下一步是不会成功的：

1. 选择配料。如果你是优柔寡断，这可能需要一段时间，如果你无法下定决心或者决定换咖喱，可能会失败。
2. 下订单。返回比萨饼可能需要一段时间，如果餐厅没有烹饪所需的配料，可能会失败。
3. 然后你收集你的披萨吃。如果你忘记了自己的钱包，那么这可能会失败，所以无法支付比萨饼的费用！

对于旧式[callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#callbacks)，上述功能的伪代码表示可能如下所示：

```
chooseToppings(function(toppings) {
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```



这很麻烦且难以阅读（通常称为“回调地狱”），需要多次调用`failureCallback()`（每个嵌套函数一次），还有其他问题。

### [使用promise改良](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#使用promise改良)

Promises使得上面的情况更容易编写，解析和运行。如果我们使用异步promises代表上面的伪代码，我们最终会得到这样的结果：

```
chooseToppings()
.then(function(toppings) {
  return placeOrder(toppings);
})
.then(function(order) {
  return collectOrder(order);
})
.then(function(pizza) {
  eatPizza(pizza);
})
.catch(failureCallback);
```



这要好得多 - 更容易看到发生了什么，我们只需要一个`.catch()`块来处理所有错误，它不会阻塞主线程（所以我们可以在等待时继续玩视频游戏为了准备好收集披萨），并保证每个操作在运行之前等待先前的操作完成。我们能够以这种方式一个接一个地链接多个异步操作，因为每个`.then()`块返回一个新的promise，当`.then()`块运行完毕时它会解析。聪明，对吗？

使用箭头函数，你可以进一步简化代码：

```
chooseToppings()
.then(toppings =>
  placeOrder(toppings)
)
.then(order =>
  collectOrder(order)
)
.then(pizza =>
  eatPizza(pizza)
)
.catch(failureCallback);
```



甚至这样：

```
chooseToppings()
.then(toppings => placeOrder(toppings))
.then(order => collectOrder(order))
.then(pizza => eatPizza(pizza))
.catch(failureCallback);
```

最基本的，promise与事件监听器类似，但有一些差异：

- 一个promise只能成功或失败一次。它不能成功或失败两次，并且一旦操作完成，它就无法从成功切换到失败，反之亦然。
- 如果promise成功或失败并且你稍后添加成功/失败回调，则将调用正确的回调，即使事件发生在较早的时间。

## [Promise术语回顾](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#promise术语回顾)

在上面的部分中有很多要介绍的内容，所以让我们快速回过头来给你[一个简短的指南](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#Promise_terminology_recap)，你可以将它添加到书签中，以便将来更新你的记忆。你还应该再次阅读上述部分，以确保这些概念坚持下去。

1. 创建promise时，它既不是成功也不是失败状态。这个状态叫作**pending**（待定）。

2. 当promise返回时，称为 

   resolved

   （已解决）.

   1. 一个成功**resolved**的promise称为**fullfilled**（**实现**）。它返回一个值，可以通过将`.then()`块链接到promise链的末尾来访问该值。` .then()`块中的执行程序函数将包含promise的返回值。
   2. 一个不成功**resolved**的promise被称为**rejected**（**拒绝**）了。它返回一个原因（**reason**），一条错误消息，说明为什么拒绝promise。可以通过将`.catch()`块链接到promise链的末尾来访问此原因。

## [ 在promise fullfill/reject后运行一些最终代码](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#在promise_fullfillreject后运行一些最终代码)

在promise完成后，你可能希望运行最后一段代码，无论它是否已实现（fullfilled）或被拒绝（rejected）。此前，你必须在`.then()`和`.catch()`回调中包含相同的代码，例如：

```
myPromise
.then(response => {
  doSomething(response);
  runFinalCode();
})
.catch(e => {
  returnError(e);
  runFinalCode();
});
```



在现代浏览器中，`.finally()` 方法可用，它可以链接到常规promise链的末尾，允许你减少代码重复并更优雅地执行操作。上面的代码现在可以写成如下：

```
myPromise
.then(response => {
  doSomething(response);
})
.catch(e => {
  returnError(e);
})
.finally(() => {
  runFinalCode();
});
```



## [ 构建自定义promise](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#构建自定义promise)

好消息是，在某种程度上，你已经建立了自己的promise。当你使用`.then()`块链接多个promise时，或者将它们组合起来创建自定义函数时，你已经在创建自己的基于异步声明的自定义函数。例如，从前面的示例中获取我们的`fetchAndDecode()`函数。

将不同的基于promise的API组合在一起以创建自定义函数是迄今为止你使用promises进行自定义事务的最常见方式，并展示了基于相同原则的大多数现代API的灵活性和强大功能。然而，还有另一种方式。

### [使用Promise()构造函数](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#使用promise构造函数)

可以使用`Promise()` 构造函数构建自己的promise。当你需要使用现有的旧项目代码、库或框架以及基于现代promise的代码时，这会派上用场。比如，当你遇到没有使用promise的旧式异步API的代码时，你可以用promise来重构这段异步代码。

让我们看一个简单的示例来帮助你入门 —— 这里我们用 promise 包装一了个`setTimeout()，`它会在两秒后运行一个函数，该函数将用字符串“Success!”，解析当前promise（调用链接的`resolve()`）。

```
let timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(function(){
    resolve('Success!');
  }, 2000);
});
```



`resolve()`和`reject()`是用来**实现**和**拒绝**新创建的promise的函数。此处，promise 成功运行通过显示字符串“Success!”。

因此，当你调用此promise时，可以将`.then()`块链接到它的末尾，它将传递给`.then()`块一串“Success!”。在下面的代码中，我们显示出该消息：

```
timeoutPromise
.then((message) => {
   alert(message);
})
```



更简化的版本：

```
timeoutPromise.then(alert);
```