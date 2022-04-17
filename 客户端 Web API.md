# 客户端 Web API

## [什么是API?](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#什么是api)

应用程序接口（API，Application Programming Interface）是基于编程语言构建的结构，使开发人员更容易地创建复杂的功能。它们抽象了复杂的代码，并提供一些简单的接口规则直接使用。

来看一个现实中的例子：想想您的房子、公寓或其他住宅的供电方式，如果您想在您的房子里用电，只要把电器的插头插入插座就可以，而不是直接把它连接到电线上——这样做非常低效，而且对于不是电工的人会是困难和危险的。

![img](https://cdn.u1n1.com/img/picgoplug-socket.png)

*图片来自：[Overloaded plug socket](https://www.flickr.com/photos/easy-pics/9518184890/in/photostream/lightbox/) 提供者： [The Clear Communication People](https://www.flickr.com/photos/easy-pics/)于Flickr。*

同样，比如说，编程来显示一些3D图形，使用以更高级语言编写的API（例如JavaScript或Python）将会比直接编写直接控制计算机的GPU或其他图形功能的低级代码（比如C或C++）来执行操作要容易得多。

### [客户端JavaScript中的API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#客户端javascript中的api)

客户端JavaScript中有很多可用的API — 他们本身并不是JavaScript语言的一部分，却建立在JavaScript语言核心的顶部，为使用JavaScript代码提供额外的超强能力。他们通常分为两类：

- **浏览器API**内置于Web浏览器中，能从浏览器和电脑周边环境中提取数据，并用来做有用的复杂的事情 。例如[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)提供了一些简单的JavaScript结构以获得位置数据，因此您可以在Google地图上标示您的位置。在后台，浏览器确实使用一些复杂的低级代码（例如C++）与设备的GPS硬件（或可以决定位置数据的任何设施）通信来获取位置数据并把这些数据返回给您的代码中使用浏览器环境；但是，这种复杂性通过API抽象出来，因而与您无关。
- **第三方API**缺省情况下不会内置于浏览器中，通常必须在Web中的某个地方获取代码和信息。例如[Twitter API](https://dev.twitter.com/overview/documentation) 使您能做一些显示最新推文这样的事情，它提供一系列特殊的结构，可以用来请求Twitter服务并返回特殊的信息。

![img](https://cdn.u1n1.com/img/picgobrowser.png)

### [JavaScript，API和其他JavaScript工具之间的关系](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#javascript，api和其他javascript工具之间的关系)

如上所述，我们讨论了什么是客户端JavaScript API，以及它们与JavaScript语言的关系。让我们回顾一下，使其更清晰，并提及其他JavaScript工具的适用位置：

- JavaScript — 一种内置于浏览器的高级脚本语言，您可以用来实现Web页面/应用中的功能。注意JavaScript也可用于其他象[Node](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)这样的的编程环境。但现在您不必考虑这些。
- 客户端API — 内置于浏览器的结构程序，位于JavaScript语言顶部，使您可以更容易的实现功能。
- 第三方API — 置于第三方普通的结构程序（例如Twitter，Facebook），使您可以在自己的Web页面中使用那些平台的某些功能（例如在您的Web页面显示最新的Tweets）。
- JavaScript库 — 通常是包含具有[特定功能](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions#custom_functions)的一个或多个JavaScript文件，把这些文件关联到您的Web页以快速或授权编写常见的功能。例如包含jQuery和Mootools
- JavaScript框架 — 从库开始的下一步，JavaScript框架视图把HTML、CSS、JavaScript和其他安装的技术打包在一起，然后用来从头编写一个完整的Web应用。

## [API可以做什么？](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#api可以做什么？)

在主流浏览器中有大量的可用API，您可以在代码中做许多的事情，对此可以查看[MDN API index page](https://developer.mozilla.org/en-US/docs/Web/API)。

### [常见浏览器API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#常见浏览器api)

特别地，您将使用的最常见的浏览器API类别（以及我们将更详细地介绍的）是：

- **操作文档的API**内置于浏览器中。最明显的例子是[DOM（文档对象模型）](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)API，它允许您操作HTML和CSS — 创建、移除以及修改HTML，动态地将新样式应用到您的页面，等等。每当您看到一个弹出窗口出现在一个页面上，或者显示一些新的内容时，这都是DOM的行为。 您可以在在[Manipulating documents](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)中找到关于这些类型的API的更多信息。
- **从服务器获取数据的API** 用于更新网页的一小部分是相当好用的。这个看似很小的细节能对网站的性能和行为产生巨大的影响 — 如果您只是更新一个股票列表或者一些可用的新故事而不需要从服务器重新加载整个页面将使网站或应用程序感觉更加敏感和“活泼”。使这成为可能的API包括[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)和[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)。您也可能会遇到描述这种技术的术语**Ajax**。您可以在[Fetching data from the server](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data)找到关于类似的API的更多信息。
- **用于绘制和操作图形的API**目前已被浏览器广泛支持 — 最流行的是允许您以编程方式更新包含在HTML [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素中的像素数据以创建2D和3D场景的[Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)和[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)。例如，您可以绘制矩形或圆形等形状，将图像导入到画布上，然后使用Canvas API对其应用滤镜（如棕褐色滤镜或灰度滤镜），或使用WebGL创建具有光照和纹理的复杂3D场景。这些API经常与用于创建动画循环的API（例如[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)）和其他API一起不断更新诸如动画和游戏之类的场景。
- **音频和视频API**例如[`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)，[Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)和[WebRTC](https://developer.mozilla.org/zh-CN/docs/MDN/Doc_status/API/WebRTC)允许您使用多媒体来做一些非常有趣的事情，比如创建用于播放音频和视频的自定义UI控件，显示字幕字幕和您的视频，从网络摄像机抓取视频，通过画布操纵（见上），或在网络会议中显示在别人的电脑上，或者添加效果到音轨（如增益，失真，平移等） 。
- **设备API**基本上是以对网络应用程序有用的方式操作和检索现代设备硬件中的数据的API。我们已经讨论过访问设备位置数据的地理定位API，因此您可以在地图上标注您的位置。其他示例还包括通过系统通知（参见[Notifications API](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API)）或振动硬件（参见[Vibration API](https://developer.mozilla.org/zh-CN/docs/Web/API/Vibration_API)）告诉用户Web应用程序有用的更新可用。
- **客户端存储API**在Web浏览器中的使用变得越来越普遍 - 如果您想创建一个应用程序来保存页面加载之间的状态，甚至让设备在处于脱机状态时可用，那么在客户端存储数据将会是非常有用的。例如使用[Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)的简单的键 - 值存储以及使用[IndexedDB API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)的更复杂的表格数据存储。

### [常见第三方API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#常见第三方api)

第三方API种类繁多; 下列是一些比较流行的你可能迟早会用到的第三方API:

- The [Twitter API](https://dev.twitter.com/overview/documentation), 允许您在您的网站上展示您最近的推文等。
- The [Google Maps API](https://developers.google.com/maps/) 允许你在网页上对地图进行很多操作（这很有趣，它也是Google地图的驱动器）。现在它是一整套完整的，能够胜任广泛任务的API。其能力已经被[Google Maps API Picker](https://developers.google.com/maps/documentation/api-picker)见证。
- The [Facebook suite of API](https://developers.facebook.com/docs/) 允许你将很多Facebook生态系统中的功能应用到你的app，使之受益，比如说它提供了通过Facebook账户登录、接受应用内支付、推送有针对性的广告活动等功能。
- The [YouTube API](https://developers.google.com/youtube/), 允许你将Youtube上的视频嵌入到网站中去，同时提供搜索Youtube，创建播放列表等众多功能。
- The [Twilio API](https://www.twilio.com/), 其为您的app提供了针对语音通话和视频聊天的框架，以及从您的app发送短信息或多媒体信息等诸多功能。

## [API如何工作？](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#api如何工作？)

不同的JavaScript API以稍微不同的方式工作，但通常它们具有共同的特征和相似的主题。

### [它们是基于对象的](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#它们是基于对象的)

 API使用一个或多个 [JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects) 在您的代码中进行交互，这些对象用作API使用的数据（包含在对象属性中）的容器以及API提供的功能（包含在对象方法中）。

### [它们有可识别的入口点](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#它们有可识别的入口点)

使用API时，应确保知道API入口点的位置。 在Geolocation API中，这非常简单 - 它是 [`Navigator.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation) 属性, 它返回浏览器的 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 对象，所有有用的地理定位方法都可用。

文档对象模型 (DOM) API有一个更简单的入口点 —它的功能往往被发现挂在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象, 或任何你想影响的HTML元素的实例，例如：

```
var em = document.createElement('em'); // create a new em element
var para = document.querySelector('p'); // reference an existing p element
em.textContent = 'Hello there!'; // give em some text content
para.appendChild(em); // embed em inside para
```

Copy to Clipboard

其他API具有稍微复杂的入口点，通常涉及为要编写的API代码创建特定的上下文。例如，Canvas API的上下文对象是通过获取要绘制的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素的引用来创建的，然后调用它的[`HTMLCanvasElement.getContext()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)方法：

```
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
```

Copy to Clipboard

然后，我们想通过调用内容对象 (它是[`CanvasRenderingContext2D`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)的一个实例)的属性和方法来实现我们想要对画布进行的任何操作, 例如：

```
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
```

### [它们使用事件来处理状态的变化](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#它们使用事件来处理状态的变化)

我们之前已经在课程中讨论了事件，在我们的 [事件介绍](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)文章中 - 详细介绍了客户端Web事件是什么以及它们在代码中的用法。如果您还不熟悉客户端Web API事件的工作方式，则应继续阅读。

一些Web API不包含事件，但有些包含一些事件。当事件触发时，允许我们运行函数的处理程序属性通常在单独的 “Event handlers”(事件处理程序) 部分的参考资料中列出。作为一个简单的例子，`XMLHttpRequest` 对象的实例 （每一个实例都代表一个到服务器的HTTP请求,来取得某种新的资源）都有很多事件可用，例如 `onload` 事件在成功返回时就触发包含请求的资源，并且现在就可用。

### [它们在适当的地方有额外的安全机制](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Introduction#它们在适当的地方有额外的安全机制)

WebAPI功能受到与JavaScript和其他Web技术（例如[同源政策](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)）相同的安全考虑 但是他们有时会有额外的安全机制。例如，一些更现代的WebAPI将只能在通过HTTPS提供的页面上工作，因为它们正在传输潜在的敏感数据（例如 [服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 和 [推送](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)）。

另外，一旦调用WebAPI请求，用户就可以在您的代码中启用一些WebAPI请求权限。作为一个例子，在加载我们之前的[Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) 示例时，您可能注意到了类似下面的对话框 ：

![img](https://cdn.u1n1.com/img/picgolocation-permission.png)

该 [通知API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) 请求以类似的方式许可：

![img](https://cdn.u1n1.com/img/picgonotification-permission.png)

这些许可提示会被提供给用户以确保安全 - 如果这些提示不在适当位置，那么网站可能会在您不知情的情况下开始秘密跟踪您的位置，或者通过大量恼人的通知向您发送垃圾邮件。

# 操作DOM

## [文档对象模型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#文档对象模型)

在浏览器标签中当前载入的文档用文档对象模型来表示。这是一个由浏览器生成的“树结构”，使编程语言可以很容易的访问HTML结构 — 例如浏览器自己在呈现页面时，使用它将样式和其他信息应用于正确的元素，而页面呈现完成以后，开发人员可以用JavaScript操作DOM。

另一方面，DOM树如下所示：

![img](https://cdn.u1n1.com/img/picgodom-screenshot.png)

这里你可以看到，文档中每个元素和文本在树中都有它们自己的入口 — 称之为**节点**。你将用不同的术语来描述节点的类型和它们相对于其他节点的位置：

- **元素节点**: 一个元素，存在于DOM中。
- **根节点**: 树中顶层节点，在HTML的情况下，总是一个`HTML`节点（其他标记词汇，如SVG和定制XML将有不同的根元素）。
- **子节点**: *直接*位于另一个节点内的节点。例如上面例子中，`IMG`是`SECTION`的子节点。
- **后代节点**: 位于另一个节点内*任意位置*的节点。例如 上面例子中，`IMG`是`SECTION`的子节点，也是一个后代节点。`IMG`不是`BODY`的子节点，因为它在树中低了`BODY`两级，但它是`BODY`的后代之一。
- **父节点**: 里面有另一个节点的节点。例如上面的例子中`BODY`是`SECTION`的父节点。
- **兄弟节点**: DOM树中位于同一等级的节点。例如上面例子中，`IMG`和`P`是兄弟。
- **文本节点**: 包含文字串的节点

在用DOM工作之前，熟悉这些术语是很有用的，因为你将会遇到大量代码术语的使用。你在研究CSS时也会遇到这些术语（例如后代选择器、子选择器）

### [Ajax开始](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data#ajax开始)

这导致了创建允许网页请求小块数据（例如 [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML), [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON), 或纯文本) 和 仅在需要时显示它们的技术，从而帮助解决上述问题。

这是通过使用诸如 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 之类的API或者 — 最近以来的 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 来实现. 这些技术允许网页直接处理对服务器上可用的特定资源的 [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 请求，并在显示之前根据需要对结果数据进行格式化。

![A simple modern architecture for web sites](https://cdn.u1n1.com/img/picgo202204131547894.png)

Ajax模型包括使用Web API作为代理来更智能地请求数据，而不仅仅是让浏览器重新加载整个页面。让我们来思考这个意义：

1. 去你最喜欢的信息丰富的网站之一，如亚马逊，油管，CNN等，并加载它。
2. 现在搜索一些东西，比如一个新产品。 主要内容将会改变，但大部分周围的信息，如页眉，页脚，导航菜单等都将保持不变。

这是一件非常好的事情，因为：

- 页面更新速度更快，您不必等待页面刷新，这意味着该网站体验感觉更快，响应更快。
- 每次更新都会下载更少的数据，这意味着更少地浪费带宽。在宽带连接的桌面上这可能不是一个大问题，但是在移动设备和发展中国家没有无处不在的快速互联网服务是一个大问题。

为了进一步提高速度，有些网站还会在首次请求时将资产和数据存储在用户的计算机上，这意味着在后续访问中，他们将使用本地版本，而不是在首次加载页面时下载新副本。 内容仅在更新后从服务器重新加载。

![A basic web app data flow architecture](https://cdn.u1n1.com/img/picgo202204131548115.png)

本文不会涉及这种存储技术。我们稍后会在模块中讨论它。

## [客户端存储?](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#客户端存储)

在其他的MDN学习中我们已经讨论过 静态网站（[static sites](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview#static_sites)） 和动态网站（ [dynamic sites](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview#dynamic_sites)）的区别。 大多数现代的web站点是动态的— 它们在服务端使用各种类型的数据库来存储数据(服务端存储), 之后通过运行服务端（ [server-side](https://developer.mozilla.org/en-US/docs/Learn/Server-side)） 代码来重新获取需要的数据，把其数据插入到静态页面的模板中，并且生成出HTML渲染到用户浏览上。

客户端存储以相同的原理工作，但是在使用上有一些不同。它是由 JavaScript APIs 组成的因此允许你在客户端存储数据 (比如在用户的机器上)，而且可以在需要的时候重新取得需要的数据。这有很多明显的用处，比如：

- 个性化网站偏好（比如显示一个用户选择的窗口小部件，颜色主题，或者字体）。
- 保存之前的站点行为 (比如从先前的session中获取购物车中的内容， 记住用户是否之前已经登陆过)。
- 本地化保存数据和静态资源可以使一个站点更快（至少让资源变少）的下载， 甚至可以在网络失去链接的时候变得暂时可用。
- 保存web已经生产的文档可以在离线状态下访问。

通常客户端和服务端存储是结合在一起使用的。例如，你可以从数据库中下载一个由网络游戏或音乐播放器应用程序使用的音乐文件，将它们存储在客户端数据库中，并按需要播放它们。用户只需下载音乐文件一次——在随后的访问中，它们将从数据库中检索。

### [传统方法：cookies](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#传统方法：cookies)

客户端存储的概念已经存在很长一段时间了。从早期的网络时代开始，网站就使用 [cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies) 来存储信息，以在网站上提供个性化的用户体验。它们是网络上最早最常用的客户端存储形式。
因为在那个年代，有许多问题——无论是从技术上的还是用户体验的角度——都是困扰着 cookies 的问题。这些问题非常重要，以至于当第一次访问一个网站时，欧洲居民会收到消息，告诉他们是否会使用 cookies 来存储关于他们的数据，而这是由一项被称为[欧盟 Cookie 条例](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies#欧盟cookie指令)的欧盟法律导致的。

![img](https://cdn.u1n1.com/img/picgo202204131633148.png)

由于这些原因，我们不会在本文中教你如何使用cookie。毕竟它过时、存在各种[安全问题](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies#安全)，而且无法存储复杂数据，而且有更好的、更现代的方法可以在用户的计算机上存储种类更广泛的数据。
cookie的唯一优势是它们得到了非常旧的浏览器的支持，所以如果您的项目需要支持已经过时的浏览器（比如 Internet Explorer 8 或更早的浏览器），cookie可能仍然有用，但是对于大多数项目（很明显不包括本站）来说，您不需要再使用它们了。其实cookie也没什么好说的，`document.cookie`一把梭就完事了。

为什么仍然有新创建的站点使用 cookies？这主要是因为开发人员的习惯，使用了仍然使用cookies的旧库，以及存在许多web站点，提供了过时的参考和培训材料来学习如何存储数据。

### [新流派：Web Storage 和 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#新流派：web_storage_和_indexeddb)

现代浏览器有比使用 cookies 更简单、更有效的存储客户端数据的 API。

- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) 提供了一种非常简单的语法，用于存储和检索较小的、由名称和相应值组成的数据项。当您只需要存储一些简单的数据时，比如用户的名字，用户是否登录，屏幕背景使用了什么颜色等等，这是非常有用的。
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 为浏览器提供了一个完整的数据库系统来存储复杂的数据。这可以用于存储从完整的用户记录到甚至是复杂的数据类型，如音频或视频文件。

您将在下面了解更多关于这些 API 的信息。

### [未来：Cache API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#未来：cache_api)

一些现代浏览器支持新的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) API。这个API是为存储特定HTTP请求的响应文件而设计的，它对于像存储离线网站文件这样的事情非常有用，这样网站就可以在没有网络连接的情况下使用。缓存通常与 [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 组合使用，尽管不一定非要这么做。
Cache 和 Service Workers 的使用是一个高级主题，我们不会在本文中详细讨论它，尽管我们将在下面的 [离线文件存储](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#离线文件存储) 一节中展示一个简单的例子。

## [存储简单数据 — web storage](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#存储简单数据_—_web_storage)

[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) 非常容易使用 — 你只需存储简单的 键名/键值 对数据 (限制为字符串、数字等类型) 并在需要的时候检索其值。

### [基本语法](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#基本语法)

让我们来告诉你怎么做：

1. 第一步，访问 GitHub 上的 [web storage blank template](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/web-storage/index.html) (在新标签页打开此[模板](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/web-storage/index.html))。

2. 打开你浏览器开发者工具的 JavaScript 控制台。

3. 你所有的 web storage 数据都包含在浏览器内两个类似于对象的结构中： [`sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage) 和 [`localStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)。 第一种方法，只要浏览器开着，数据就会一直保存 (关闭浏览器时数据会丢失) ，而第二种会一直保存数据，甚至到浏览器关闭又开启后也是这样。我们将在本文中使用第二种方法，因为它通常更有用。

4. [`Storage.setItem()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem) 方法允许您在存储中保存一个数据项——它接受两个参数：数据项的名字及其值。试着把它输入到你的JavaScript控制台（如果你愿意的话，可以把它的值改为你自己的名字！）

   ```
   localStorage.setItem('name','Chris');
   ```

   Copy to Clipboard

5. [`Storage.getItem()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/getItem) 方法接受一个参数——你想要检索的数据项的名称——并返回数据项的值。现在将这些代码输入到你的JavaScript控制台：

   ```
   var myName = localStorage.getItem('name');
   myName
   ```

   Copy to Clipboard

   在输入第二行时，您应该会看到 `myName`变量现在包含`name`数据项的值。

6. [`Storage.removeItem()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem) 方法接受一个参数——你想要删除的数据项的名称——并从 web storage 中删除该数据项。在您的JavaScript控制台中输入以下几行：

   ```
   localStorage.removeItem('name');
   var myName = localStorage.getItem('name');
   myName
   ```

   Copy to Clipboard

   第三行现在应该返回 `null` — `name` 项已经不存在于 web storage 中。

### [数据会一直存在!](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#数据会一直存在!)

web storage 的一个关键特性是，数据在不同页面加载时都存在（甚至是当浏览器关闭后，对localStorage的而言）。让我们来看看这个：

1. 再次打开我们的 Web Storage 空白模板，但是这次你要在不同的浏览器中打开这个教程！这样可以更容易处理。

2. 在浏览器的 JavaScript 控制台中输入这几行：

   ```
   localStorage.setItem('name','Chris');
   var myName = localStorage.getItem('name');
   myName
   ```

   Copy to Clipboard

   你应该看到 name 数据项返回。

3. 现在关掉浏览器再把它打开。

4. 再次输入下面几行：

   ```
   var myName = localStorage.getItem('name');
   myName
   ```

   Copy to Clipboard

   你应该看到，尽管浏览器已经关闭，然后再次打开，但仍然可以使用该值。

### [为每个域名分离储存](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#为每个域名分离储存)

每个域都有一个单独的数据存储区(每个单独的网址都在浏览器中加载). 你 会看到，如果你加载两个网站（例如google.com和amazon.com）并尝试将某个项目存储在一个网站上，该数据项将无法从另一个网站获取。

这是有道理的 - 你可以想象如果网站能够查看彼此的数据，就会出现安全问题！

## [存储复杂数据 — IndexedDB](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#存储复杂数据_—_indexeddb)

[IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)（有时简称 IDB ）是可以在浏览器中访问的一个完整的数据库系统，在这里，你可以存储复杂的关系数据。其种类不限于像字符串和数字这样的简单值。你可以在一个IndexedDB中存储视频，图像和许多其他的内容。

但是，这确实是有代价的：使用IndexedDB要比Web Storage API复杂得多。在本节中，我们仅仅只能浅尝辄止地一提它的能力，不过我们会给你足够基础知识以帮助你开始。

### [通过一个笔记存储示例演示](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#通过一个笔记存储示例演示)

在这里，我们将向您介绍一个示例，该示例允许您在浏览器中存储笔记并随时查看和删除它们，在我们进行时，我们将解释IDB的最基本部分并让您自己构建注释。

这个应用看起来像这样：

![img](https://cdn.u1n1.com/img/picgo202204131634798.png)

每个笔记都有一个标题和一些正文，每个都可以单独编辑。我们将在下面通过的JavaScript代码提供详细的注释，以帮助您了解正在发生的事情。

### [开始](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#开始)

1、首先，将 `index.html`, `style.css`, 和 `index-start.js` 文件的本地副本放入本地计算机上的新目录中。 

2、浏览这些文件。 您将看到HTML非常简单：具有页眉和页脚的网站，以及包含显示注释的位置的主内容区域，以及用于在数据库中输入新注释的表单。 CSS提供了一些简单的样式，使其更清晰。 JavaScript文件包含五个声明的常量，其中包含对将显示注释的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ul) 元素的引用，标题和正文 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input) 元素，[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)本身，以及[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。

3、将您的JavaScript文件重命名为 `index.js` 。 您现在可以开始向其添加代码了。

### [数据库初始设置](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#数据库初始设置)

现在让我们来看看为了建立数据库必须首先要做什么。

1. 在常量声明下，加入这几行:

   ```
   // Create an instance of a db object for us to store the open database in
   let db;
   ```

   Copy to Clipboard

   这里我们声明了一个叫 `db` 的变量 — 这将在之后被用来存储一个代表数据库的对象。我们将在几个地方使用它，所以我们为了方便使用而在这里把它声明为全局的。

2. 接着，在你的代码最后添加如下代码：

   ```
   window.onload = function() {
   
   };
   ```

   Copy to Clipboard

   我们将把所有的后续代码写在这个 `window.onload` 事件处理函数内，这个函数将在window的`load (en-US)`事件被触发时调用，为了确保我们没有在应用完整加载前试图使用IndexedDB功能（如果我们不这么做，它会失败）。

3. 在`window.onload`处理程序内，添加以下内容：

   ```
   // Open our database; it is created if it doesn't already exist
   // (see onupgradeneeded below)
   let request = window.indexedDB.open('notes', 1);
   ```

   Copy to Clipboard

   此行创建一个 `request` 变量，目的是打开 `notes`数据库的 `1`版本。如果`notes`数据库不存在，则后续代码将为您创建。您将在IndexedDB中经常看到此请求模式。数据库操作需要时间。您不希望在等待结果时挂起浏览器，因此数据库操作是[异步的](https://developer.mozilla.org/en-US/docs/Glossary/asynchronous)，这意味着它们不会立即发生，而是在将来的某个时刻发生，并且在完成后会收到通知。

   要在IndexedDB中处理此问题，您需要创建一个请求对象（可以随意命名 - 命名为`request`，可以表明它的用途）。然后，在请求完成或者失败时，使用事件处理程序来运行代码，您将在下面看到这些代码。

   **注意**：版本号很重要。如果要升级数据库（例如：更改表结构），则必须使用增加的版本号或者`onupgradeneeded`处理程序内指定的不同模式（请参阅下文）等再次运行代码。在这个简单教程中，我们不讨论数据库升级。

### [通过 IndexedDB 存储复杂数据](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#通过_indexeddb_存储复杂数据)

如上所述，IndexedDB可用于存储不仅仅是简单的文本字符串。您可以存储任何您想要的东西，包括复杂的对象，如视频或图像blob。并且它比任何其他类型的数据更难实现。

为了演示如何操作，我们编写了另一个名为[IndexedDB视频存储的](https://github.com/mdn/learning-area/tree/master/javascript/apis/client-side-storage/indexeddb/video-store)示例（请参阅[此处也可以在此处运行](https://mdn.github.io/learning-area/javascript/apis/client-side-storage/indexeddb/video-store/)）。首次运行示例时，它会从网络下载所有视频，将它们存储在IndexedDB数据库中，然后在UI内部[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)元素中显示视频。第二次运行它时，它会在数据库中找到视频并从那里获取它们而不是显示它们 - 这使得后续加载更快，占用空间更少。

让我们来看看这个例子中最有趣的部分。我们不会全部看 - 它的很多内容与上一个示例类似，代码注释得很好。

1. 对于这个简单的例子，我们已经存储了视频的名称以获取数组opf对象：

   ```
   const videos = [
     { 'name' : 'crystal' },
     { 'name' : 'elf' },
     { 'name' : 'frog' },
     { 'name' : 'monster' },
     { 'name' : 'pig' },
     { 'name' : 'rabbit' }
   ];
   ```

   Copy to Clipboard

2. 首先，一旦数据库成功打开，我们就运行一个`init()`函数。这会遍历不同的视频名称，尝试加载由`videos`数据库中的每个名称标识的记录。

   如果在数据库中找到每个视频（通过查看`request.result`评估是否容易检查`true`- 如果记录不存在，那么`undefined`），视频文件（存储为blob）和视频名称将直接传递给`displayVideo()`函数以放置它们在用户界面中。如果没有，视频名称将传递给`fetchVideoFromNetwork()`函数...你猜对了 - 从网络中获取视频。

   ```
   function init() {
     // Loop through the video names one by one
     for(let i = 0; i < videos.length; i++) {
       // Open transaction, get object store, and get() each video by name
       let objectStore = db.transaction('videos').objectStore('videos');
       let request = objectStore.get(videos[i].name);
       request.onsuccess = function() {
         // If the result exists in the database (is not undefined)
         if(request.result) {
           // Grab the videos from IDB and display them using displayVideo()
           console.log('taking videos from IDB');
           displayVideo(request.result.mp4, request.result.webm, request.result.name);
         } else {
           // Fetch the videos from the network
           fetchVideoFromNetwork(videos[i]);
         }
       };
     }
   }
   ```

   Copy to Clipboard

3. 以下片段是从内部`fetchVideoFromNetwork()`获取的 - 这里我们使用两个单独的[`WindowOrWorkerGlobalScope.fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch)请求获取视频的MP4和WebM版本。然后，我们使用该[`Body.blob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)方法将每个响应的主体提取为blob，为我们提供可以在以后存储和显示的视频的对象表示。

   我们在这里遇到了一个问题 - 这两个请求都是异步的，但我们只想在两个promises都满足时尝试显示或存储视频。幸运的是，有一种处理这种问题的内置方法 - [`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)。这需要一个参数 - 引用您要检查放置在数组中的履行的所有单个承诺 - 并且本身是基于承诺的。

   当所有这些承诺都履行完毕时，`all()`承诺将通过包含所有个人履行价值的数组来实现。在`all()`块中，您可以看到我们`displayVideo()`之前调用函数，就像在UI中显示视频一样，然后我们也调用`storeVideo()`函数将这些视频存储在数据库中。

   ```
   let mp4Blob = fetch('videos/' + video.name + '.mp4').then(response =>
     response.blob()
   );
   let webmBlob = fetch('videos/' + video.name + '.webm').then(response =>
     response.blob()
   );;
   
   // Only run the next code when both promises have fulfilled
   Promise.all([mp4Blob, webmBlob]).then(function(values) {
     // display the video fetched from the network with displayVideo()
     displayVideo(values[0], values[1], video.name);
     // store it in the IDB using storeVideo()
     storeVideo(values[0], values[1], video.name);
   });
   ```

   Copy to Clipboard

4. 我们`storeVideo()`先来看看吧。这与您在上一个示例中看到的用于向数据库添加数据的模式非常相似 - 我们打开一个`readwrite`事务并获取对象存储引用`videos`，创建一个表示要添加到数据库的记录的对象，然后使用它添加它[`IDBObjectStore.add()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore/add)。

   ```
   function storeVideo(mp4Blob, webmBlob, name) {
     // Open transaction, get object store; make it a readwrite so we can write to the IDB
     let objectStore = db.transaction(['videos'], 'readwrite').objectStore('videos');
     // Create a record to add to the IDB
     let record = {
       mp4 : mp4Blob,
       webm : webmBlob,
       name : name
     }
   
     // Add the record to the IDB using add()
     let request = objectStore.add(record);
   
     ...
   
   };
   ```

   Copy to Clipboard

5. 最后但并非最不重要的是，我们`displayVideo()`创建了在UI中插入视频然后将它们附加到页面所需的DOM元素。最有趣的部分如下所示 - 要在`<video>`元素中实际显示我们的视频blob ，我们需要使用该[`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)方法创建对象URL（指向存储在内存中的视频blob的内部URL）。完成后，我们可以将对象URL设置为[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)元素`src`属性的值，并且它可以正常工作。

   ```
   function displayVideo(mp4Blob, webmBlob, title) {
     // Create object URLs out of the blobs
     let mp4URL = URL.createObjectURL(mp4Blob);
     let webmURL = URL.createObjectURL(webmBlob);
   
     ...
   
     let video = document.createElement('video');
     video.controls = true;
     let source1 = document.createElement('source');
     source1.src = mp4URL;
     source1.type = 'video/mp4';
     let source2 = document.createElement('source');
     source2.src = webmURL;
     source2.type = 'video/webm';
   
     ...
   }
   ```

   Copy to Clipboard

## [离线文件存储](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage#离线文件存储)

上面的示例已经说明了如何创建一个将大型资产存储在IndexedDB数据库中的应用程序，从而无需多次下载它们。这已经是对用户体验的一个很大的改进，但仍然有一件事 - 每次访问网站时仍然需要下载主要的HTML，CSS和JavaScript文件，这意味着当没有网络连接时，它将无法工作。

![img](https://cdn.u1n1.com/img/picgo202204131635896.png)

这就是[服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)和密切相关的[Cache API的](https://developer.mozilla.org/en-US/docs/Web/API/Cache)用武之地。

服务工作者是一个JavaScript文件，简单地说，它是在浏览器访问时针对特定来源（网站或某个域的网站的一部分）进行注册的。注册后，它可以控制该来源的可用页面。它通过坐在加载的页面和网络之间以及拦截针对该来源的网络请求来实现这一点。

当它拦截一个请求时，它可以做任何你想做的事情（参见[用例思路](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#Other_use_case_ideas)），但经典的例子是离线保存网络响应，然后提供响应请求而不是来自网络的响应。实际上，它允许您使网站完全脱机工作。

Cache API是另一种客户端存储机制，略有不同 - 它旨在保存HTTP响应，因此与服务工作者一起工作得非常好。

**注意**：现在大多数现代浏览器都支持服务工作者和缓存。在撰写本文时，Safari仍在忙着实施它，但它应该很快就会存在。