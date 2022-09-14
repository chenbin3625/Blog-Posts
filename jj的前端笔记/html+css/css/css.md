# 0、技巧



## 文字在父元素中垂直居中

```css
line-height : 44px;
height:44px;
```

## 水平居中

### 1、定宽

```css
w:100px;
margin: 0 auto;
```

### 2、利用flex

```css
 display:flex;
 justify-content: center; 
 align-items: center;
```

## 垂直居中方式

### 1、通过绝对定位

（缺点，只适用于宽高定了的元素）

```
position:absolute;
top:0;
bottom:0;
margin:auto;
```

### 2、用transform

```
.box3{
    background-color: orange;
    position: absolute;
    /* 
        这种居中方式，只适用于元素的大小确定
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto; */

    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  
}
```

## 可以利用浮动来设置文字环绕的图片效果

## 高度塌陷的最终解决方案

利用clear的本质（清除浮动影响，加上对应的外边距）来解决高度塌陷问题

![image-20210901171406690](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914.png)

# 1、css基础知识

## 1、使用css的三种方式以及基础的选择器

类选择器的话，多个class用空格隔开

        引入css的三种方式
            1：在标签内通过style属性来设置元素的样式（内联样式）
                style="样式名:样式值  ;  样式名：样式值;"
    
            2：在head的style标签里定义样式
                css选择器{
                    p{
                        所有p标签设置样式
                        color : red
                    }
                    .asd{
                        对class为asd的标签设置样式
                        color:green
                    }
                    #id{
                        对id为对应的值的设置样式
                    }
                    *{
                        通配选择器，为页面所有的标签设置css样式
                    }
                }
            3：外部样式表（在head里引入）
                <link rel="stylesheet" href="./style.css">
## 2、复合选择器

### 交集选择器

```
要把class为red的div组件设置字体大小为30px 
交集选择器（选择器连着写）
作用：选中同时符合多个条件的元素
语法：选择器1选择器2.....{

} 
注意点：如果有标签选择器，必须使用标签选择器为开头
         */

        div.red{
            
            font-size: 30px;
        }
```

### 并集选择器

```html
/* 并集选择器 
    语法：用逗号隔开
*/
h1,span{
    color: aqua;
}
```

## 3、关系选择器

### 子元素选择器⭐

```css
  /* 
    要求：为div直接包含的span设置一个字体颜色
    子元素选择器
        作用：选中指定父元素的指定子元素
        语法：父元素 > 子元素 
        可以指定某个父元素（根据class来指定）
        可以 div>p>span嵌套使用 
  */
  div > span{
        color: deeppink;
  }
  div.asd > span{
        color: blue;
  }
```

### 后代选择器

```css

  /* 
    后代选择器
    作用:选中指定元素内的指定后代（儿子，孙子。。。。）元素
    语法：祖先 空格 后代
  */
div span{
    font-size: 50px;
}
```

### 兄弟选择器⭐

```css
/* 
    兄弟选择器，
        选择下一个紧挨着的兄弟
        语法：前一个+下一个
        选择下面的所有兄弟（前面的不会被选中）
        语法：兄~弟

*/
p+span{
    /* 
    选择紧挨着的下一个指定兄弟，如果这里指定的是p+span而紧挨着的是div，那么就不会起效
    */
}
p~span{
    font-size: 90px;
}
```

## 4、属性选择器⭐

```css
/* 
[属性名]  选择含有指定属性的元素
[属性名=属性值] 选择含有指定属性和属性值的元素
[属性名^=属性值] 选择属性值以指定值开头的元素
[属性名$=属性值] 选择属性值以指定值结尾的元素
[属性名*=属性值] 选择属性值包含某值的元素

下面是交集选择器
*/

p[title]{
    color:red
}
p[title=q]
{
    color: aqua;
}
p[title^=a]
{
    color:blue
}
```

## 5、伪类选择器⭐

```html
<!-- 
    伪类（不存在的嘞，特殊的类—）
     -伪类用来描述一个元素的特殊状态
        比如：第一个子元素，被点击的元素，鼠标移入的元素...
     -伪类一般情况下都是使用：开头
        :first-child
        :last-child
        :nth-child() 选中第n个子元素
            热数值：
                n   全选
                2n  选中偶数位的元素
                2n+1 选中奇数位的元素
        以上这些伪类是根据所有的子元素进行排序的
        如果设置的是first-child，但是第一个孩子不是指定的类型的话，就不会起效

        如果要指定某个标签的排序而不是按全部的排序的话可以用:first-of-type
        这个伪类也有:nth-of-type(跟child类似)

        :not伪类将符合条件的元素从选择器中删除
 -->
<style>
    ul>li:first-child{
        /* 全部的第一个孩子如果是li就会生效 */
        color: brown;
    }
    ul>li:first-of-type{
        /* li类型的第一个type会生效 */
        color: aqua;
    }
    ul>li:not(:first-of-type)
    {
        color: blue;
    }
</style>
```

## 6、元素的伪类

```css
/* 
    这两个是a标签特有的
    :link用来表示没访问过的连接（正常的连接）
    :visited用来表示访问过的连接
    
    :hover用来表示鼠标移入的状态
    :active用来表示鼠标点击的状态（div实现button按下效果）
*/
a:link{
    color:red 
}
a:visited{
    /* 由于隐私的原因，这个伪类只能修改颜色 */
    font-size: 50px;
}
a:hover{
    font-size: 50px;
}
a:active{
    color: yellowgreen;
}
```

## 7、伪元素选择器

before、 after   用的比较多，在clearfix里用到

before和after+content  添加内容的位置

![image-20210831165149325](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-1.png)

```css
/* 
    伪元素：表示页面中一些特殊(位置，状态)的元素
    伪元素使用 ::开头

    ::first-letter 表示第一个字母
    ::first-line   表示第一行
    ::selection    表示选中的内容
    ::before        表示元素的开始
    ::after         元素的最后

    before 和 after要结合content属性来使用

*/
p{
    font-size: 20px;
}

p::first-letter{
    font-size: 50px;
}
p::selection{
    color: blueviolet;
}
p::first-line{
    font-size: 30px;
}
/*表示在p标签内容的开头添加上hahahaha的内容
*/
p::before{
    content:'hahahahaha';
    color: blue;
}
```

## 8、样式的继承

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        /* 
        样式的继承：我们给一个元素设置样式的同时也会应用到他的后代元素上
        
        继承是发生在祖先和后代之间的

        继承的设计是为了方便我们的开发，利用继承，我们可以将一些通用的样式统一设置到祖先元素上

        注意：并不是所有的样式都会被继承
            例如背景相关的，布局相关的样式都不会被继承
        */
        p{
            color: aqua;
        }
        div{
            color:cadetblue
        }
    </style>
</head>
<body>
    <p>
        我是一个p元素
        <span>我是p元素中的span</span>
    </p>

    <span>
        我是p元素外的span
    </span>

    <div>
        我是div
        <span>
            我是div中的span
        </span>
    </div>
</body>
```

## 9、选择器的权重

```css
    #box1{
        /* 优先级为100 */
        color:red;
    }
    div#box1{
        /* 优先级为110 */
        color:yellow
    }
    .red
    {
        /* 优先级为1 */
        color:orchid
    }
    .red1{
        /* 和上面的是同级的，这个覆盖掉上面的 */
        color:blue
    }
    div,p,span{
        /* 每种拆开  拆都计算 */
        color: #000;
    }
    /* 
        样式的冲突
            -当我们通过不同的选择器，选中相同的元素并且为相同的样式设置不同的值时，此时就发生了样式的冲突

            1：
            发生样式冲突的时候，应用哪个样式由选择器的权重决定
            （越上面优先级越高）
            内联样式：      1000
            id选择器：      100
            类和伪类选择器： 10
            元素选择器       1

            2：
            比较优先级时，需要将所有的选择器的优先级进行相加计算（但是加了十一个类选择器，他的理论上优先级也不会编程110），最后比较（并集选择器是单独运算，拆掉）


            3：
            同级别（如果两个都是类选择器并且都选中一个对应的标签）的话从上往下
            后面的覆盖前面的

            4：
            继承的样式没有优先级，会被其他的覆盖（如果有新的样式的话）

            5：
            在末尾加上！important就会升到最高优先级
    */
</style>
```

## 10、颜色、长度单位

rem在移动端需要用到

```
长度单位：
    像素（px）
    
    百分比（将属性值设置为相对于父元素属性值的百分比
        设置百分比可以使子元素随着父元素的大小改变而改变）

    em(em是相对于父元素的字体大小来计算的)
        1em=1font-size
        em会根据字体大小的改变而改变
    
    rem(是相对于根元素的字体大小来计算的)
  
    
    
```

```
颜色单位：
    1：直接写名称（不方便）
    2：rgb值
    3：rgba值（a是不透明度）
    4：十六进制的rgb：#ff0000(每两位代表一个rgb)
        如果每两位重复可以简写：#f00
    5：hsl值  hsla值
        h色相（0-360）、
        s饱和度（0-100%）
        l亮度（0-100%）

    可以用编辑器的调色板选颜色
```

# 2、layout

## 1、文档流以及元素在文档流中的特征

```
文档流（nromal flow）
   -网页是一个多层的结构，一层摞着一层
   -通过css可以分别为每一层来设置样式
   -作为用户来讲只能看到最顶上一层
   -这些层中，最底下的一层称为文档流，文档流是网页的基础
    我们所创建的元素默认都是在文档流中进行排列
    
    -对于我们来元素主要有两个状态
    在文档流中
    不在文档流中（脱离文档流)

    -元素在文档流中有什么特点;
        -块元素
            -块元素会在页面中独占一行(自上向下垂直排列)
            -默认宽度是父元素的全部（会把父元素撑满)
            -默认高度是被内容撑开（子元素)
        
        -行内元素
            -行内元素不会独占页面的一行，只占自身的大小
            -行内元素在页面中左向右水平排列，如果一行之中不能填满
                 则元素会换到第二行继续自左向右排列(书写习惯）
            -行内元素的默认宽度和高度都是被内容撑开
```

## 2、盒子模型

```
盒子模型
    -css将页面中的所有元素都设置为了一个矩形的盒子
    -将元素设置为矩形的盒子后，对页面的布局就变成将不同的盒子摆放到不同的位置
    -每一个盒子都由以下几个部分组成
        内容区（content）   放内容的
        内边距（padding）   内容区和边框的距离
        边框（border）      轮廓
        外边距（margin）     盒子之间的举例
```

## 3、border

![image-20211015205405841](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-2.png)

![image-20211015205228008](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-3.png)

![image-20210831172141475](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-4.png)

```css
/* 
    border-width一般有默认值,不设置也可以显示出边框
        可以设多个值,上开始顺时针设置每边的宽度

    也可以通过border-xxx-width来设置某一边的宽度
    xxx可以是top,left...
    
 */
border-width: 10px 20px 30px 40px;
 /* 
    border-color也有默认值(color是啥就是傻)
    border-color也可以和上面一样设置四个放心
 */
border-color: aqua red olivedrab salmon;

/* 
    这个也可以给四个方向设置不同的样式
    默认值是none,表示没有边框
 */
border-style: solid double; 

/* 
    border简写属性,可以通过该属性同时设置边框的所有相关样式，并且没有顺序要求
    border:solid 10px orange
    
    除了border之外还有border-xxx(top,left....)
    
 */
```

## 4、padding

```css
.red{
    width: 200px;
    height: 200px;
    background-color: #bfa;
    border: 10px solid orange;
    /* 
        内边距（padding填充）
            -内容区和边框之间的距离是内边距
            -一共有四个方向的内边距
                padding-top
                padding-left
                ...
            
            -内边距的设置会影响到盒子的大小
            -背景颜色会延伸到内边距上


        盒子的可见框的大小，由内容区，内边距，边框共同决定，
            计算大小的时候都要算上
     */
     /* padding-top: 100px; */
     padding: 100px;
}
```

## 5、margin

```css
    <style>
        .red{
            width: 200px;
            height: 200px;
            background-color: #bfa;
            border: 10px solid orange;
            /* 
                外边距（margin）
                    -外边距不会影响盒子可见框的大小，但是会影响到盒子占网页的实际大小
                    -但是外边距会影响盒子的位置
                    -一共有四个方向的外边距
                    margin-top
                        上外边距，设置一个正值，元素会向下移动
                    margin-left
                        左外边距，设置一个正值，元素会向右移动
                    
                    设置这两个属性会影响到右边和下边的盒子
                    margin-right
                    margin-buttom
                    
             */
            
            margin-top: 100px;
        }
    </style>
```

## 6、盒子的水平布局⭐

没有auto会默认给margin-right补充剩下的值(超出的时候margin-right可以是负值)

```
一个元素在其**父元素**中，水平布局**必须**要满足以下等式

ml+bl+pl+w+pr+br+mr = 父元素内容区的宽度
 
 .outer{
     width: 800px;
     height: 200px;
     border: 10px red solid;
 }
 .inner{
     width: 200px;
     height: 200px;
     background-color: #bfa;
 } 
0+0+0+200+0+0+0 = 800 ❌
0+0+0+200+0+0+600 = 800 √
所以为了满足等式，在七个属性中没有设置auto的情况下，会默认给margin-right补充剩下的值
```

有auto（auto只能给width和两个margin设置）的情况

**特殊情况，如果将一个width和margin（两个中任意个）同时设置为auto，则width设置为最大，设置auto的那个margin为0**

```
 .outer{
     width: 800px;
     height: 200px;
     border: 10px red solid;
 }
 .inner{
     width: auto;
     height: 200px;
     background-color: #bfa;
     margin-right:200px;
 } 
 
 0+0+0+auto+0+0+200 = 800  ==> auto = 600 
```

**如果width固定，但是两个margin设置为auto，那么这两个auto会平均分（水平居中）**

```
width:xxxpx;
margin: 0 auto;
```

## 7、垂直布局以及overflow

```css
<style>
    .outer{
        background-color: #bfa;
        /* 
            高度默认情况下会被子元素的内容撑开
            宽度默认占满

            设置了的话，该是多少就是多少
         */
    }
    .inner{
        width: 100px;
        height: 100px;
        background-color: yellow;
        margin-bottom: 100px;
    }


    .box1{
        width: 200px;
        height: 200px;
        background-color: #bfa;
        /* 
            子元素是在父元素的内容区中排列的
                如果子元素的打小抄好过了父元素，那么子元素会从父元素中溢出
                使用overflow属性设置父元素如何处理溢出的子元素
                可选值：
                    visible，默认值 子元素会从父元素中溢出，跟没设一样
                    hidden 溢出内容会被隐藏
                    scroll 生成水平和数值两个滚动条，通过滚动条来查看玩着内容
                    auto 根据需要生成滚动条
         */
        overflow: auto;
    }
    .box2{
        width:  100px;
        height: 400px;
        background-color: orange;
    }
</style>
```

## 8、外边距折叠问题⭐

兄弟元素的外边距重叠

```
.box1,.box2{
    width: 200px;
    height: 200px;
    font-size: 100px;
}
.box1{
    background-color: #bfa;
    margin-bottom: 100px;
}
.box2{
    background-color: orange;
    margin-top: 100px;
}

会发现，两个紧挨着的兄弟，他们的上下边距重叠了
垂直外边距的重叠
    -相邻的垂直方向外边距会发生重叠现象
    -兄弟元素
        取较大值（都是正值）
        取和（一正一副）
        取绝对值较大的（都是负值）
    
    兄弟元素垂直外边距重叠基本上是不需要进行处理
```

### 父子元素外边距重叠（必须处理）

![image-20210831180211351](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-5.png)

```
.box3{
    width: 200px;
    height: 200px;
    background-color: #bfa;
}
.box4{
    width: 100px;
    height: 100px;
    background-color: red;
    margin-top: 100px;
}
```

#### 处理方法1

父元素加一个border-top让子元素与父元素不是紧挨着的（要同时改border的颜色、父元素的高度，以及子元素的margin-top）

![image-20210831180535746](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-6.png)

#### 处理方法2

父元素开启BFC

```
1.设置元素的浮动（不推荐）
2.将元素设置为行内块元素（不推荐）
3.overflow设置为一个非visible的值
-常用方式：设置为hidden
```

#### 处理方法3

clearfix

```css
/* 
    这个样式可以同时解决高度塌陷和外边距重叠的问题
    给对应的标签加上这个类名就可以了
 */
.clearfix::before,{
    content: '';
    display: table;
}
```



## 9、行内元素的盒子模型以及display⭐

```css
span.s1{
    background-color:yellow;
    /* 
        行内元素的盒模型
            -行内元素不支持宽度和高度（只能设置content的高度，但是不能设置内容的宽高）
            -行内元素可以设置padding，margin，border，但是垂直方向不会影响页面的布局
     */
    width: 100px;
    height: 100px;
    
     /* padding:100px; */
    
     /* border:100px solid blue; */
     margin: 100px;
}
```

display：none 与 visibility：hidden的区别

```css
a{
    /* 
        由于行内元素是不能修改宽高的，但是有时候又一定需要修改，那么可以用display来设置
            display是用来设置元素显示的类型
            可选值：
                inline 将元素设置为行内元素
                block 将元素设置为块元素
                inline-block 将元素设置为行内块元素（既可以设置高度和宽度又不会独占一行）
                table  将元素设置为一个表格
                none  不显示（不占据位置）

            visibility设置显示状态
                可选值：visible  正常显示
                       hidden   隐藏（但是仍占据位置）
     */
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: orange;
}
```

## 10、清除默认样式

![image-20210831181455889](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-7.png)

```css
/* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   font: inherit;
   vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
   display: block;
}
body {
   line-height: 1;
}
ol, ul {
   list-style: none;
}
blockquote, q {
   quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
   content: '';
   content: none;
}
table {
   border-collapse: collapse;
   border-spacing: 0;
}
```

## 11、盒子大小计算（box-sizing)⭐

```css
<style>
    /*
        默认情况下，盒子可见框的大小由content，padding，border共同决定

        box-sizing用来设置盒子尺寸的计算方式
            可选值：content-box 默认值，虚高度和宽度用来设置内容区的大小
                    border-box 高度和宽度用来设置整个可见框的大小（边框不进入计算）
        
    */

    .box1{
        width: 100px;
        height: 100px;
        background-color: #bfa;
        padding: 10px;
        border: 10px red solid;
    }

</style>
```

## 12、轮廓、阴影和圆角⭐

### 轮廓

```
outline用来设置元素的轮廓线，用法和border一模一样
    轮廓和边框不同的点，就是轮廓不会影响页面布局

outline: 10px red solid; 
```

### 阴影

```
box-shadow
用来设置元素的阴影效果，阴影不会影响页面布局
    前两个值代表水平和数值偏移量（第一个是x轴向右，第二个是y轴向下）
    第三个值 阴影的模糊半径
    第四个值 阴影的颜色（一般用rgba）
```

### 圆角

```css
/* 
    圆角：border-radius 
 */
border-radius: 10px 20px 30px 40px;
 /*圆圈*/
border-radius: 50%; 
```

# 3、浮动

## 1、浮动简介

```
通过浮动可以使一个元素向其父元素的左侧或右侧移动
    使用float属性来设置元素的浮动
        可选值
            none：默认值 元素不浮动
            left：元素向左移动
            right：元素向右移动
    
    注意：设置浮动之后，水平布局的等式便不需要强制成立，
          并且div右边默认的外边距消失，可以水平叠加放置
          元素会完全从文档流脱离，不再占用文档流的位置
          所以元素下边的还在文档流中的元素会向上移动

    浮动的特点：
        1：浮动元素会完全脱离文档流，不占据文档流中的位置
        2：浮动元素默认不会从父元素中移出
        3：浮动元素向左或向右移动时，不会超过它前边的其他浮动元素
        4：如果浮动的上边是一个没有浮动的“块元素”，则浮动元素无法上移
        5：浮动元素不会超过它上边的浮动的兄弟元素，最多就是和他一样高

    简单总结：主要作用就是让界面中的元素可以水平排列
```

## 2、浮动元素的特点

``` 
浮动的元素不会覆盖住文字，文字会自动环绕在浮动元素的周围，可以利用浮动来设置文字环绕的图片效果

设置文档流之后，一些元素的特点也会发生变化
块元素
    1：块元素不在独占一行
    2：块元素的宽高默认都被内容撑开
行内元素
    行内元素脱离文档流之后会变成块元素，特点和块元素一样，可
    以设置宽高（content）会被撑开

也就是说，浮动之后，行内和块元素的特点就一样了
```

## 3、浮动的高度塌陷问题⭐

```css
.outer{
    border : 10px red solid;
}
.inner{
    width: 100px;
    height:100px;
    background-color: #bfa;
     float: left;
}
```

```
高度塌陷的问题：
    在水平布局中，父元素的高度是默认被子元素撑开的（父元素没设宽高的时候）
        当子元素浮动后，其会完全脱离文档流，
        将无法程其父元素的高度，导致父元素高度丢失

    父元素高度丢失以后，下面的元素会自动上移，导致页面的布局混乱
```

## 4、BFC⭐

```
BFC块级格式化环境
    -BFC是CSS中的一个隐含的属性，可以为一个元素开启BFC
        开启BFC的元素会变成一个独立的布局区域
    -BFC开启后的特点：
        1.开启BFC的元素不会被浮动元素覆盖
        2.开启BFC的元素，父元素和子元素外边距不会重叠
        3.开启BFC的元素可以包含浮动的子元素

可以通过一些方式开启BFC：
        1.设置元素的浮动（不推荐）
        2.将元素设置为行内块元素（不推荐）
        3.overflow设置为一个非visible的值
            -常用方式：设置为hidden
```

## 5、clear属性⭐

![image-20210901170956349](https://ypyun-cdn.u1n1.com/img/picgo/2022/04/16/20220416230914-8.png)

## 6、clearfix⭐

```css
/* 
    这个样式可以同时解决高度塌陷和外边距重叠的问题
    给对应的标签加上这个类名就可以了
 */
.clearfix::before,
.clearfix::after{
    content: '';
    display: table;
    clear: both;
}

/*本质上就是这两段*/

/*解决外边距重叠问题*/
.clearfix::before,{
    content: '';
    display: table;
}

/*解决高度塌陷问题*/
.clearfix::after{
    content: '';
    display: table;
    clear: both;
}
```

# 4、position

## 1、定位简介

```
定位（position）
    定位是一种更加高级的布局手段
    通过定位可以将元素摆放到界面的任意位置
    使用position属性来设置定位
        -可选值：
            static 默认值，元素是静止的，没有开启定位
            relative 开启元素的相对定位
            absolute 开启元素的绝对定位
            fixed 开启元素的固定定位
            sticky 开启元素的粘滞定位

        -偏移量（offset）
            -当元素开启了定位以后，可以通过偏移量来设置元素的位置
            top  buttom  (二选一)
            left  right     
```

## 2、relative

```
-相对定位的特点
    1：开启相对定位以后，如果不设置偏移量，元素不会发生任何的变化
    2：相对定位是参照于元素在文档流中的位置定位的
    3：相对定位会提升元素的层级（覆盖）
    4：相对定位不会改变元素的性质（快还是块，只是改变了显示位置，原来块独占一行的效果还在）
```

## 3、absolute

子绝父相

```css
绝对定位的特点
    1：开启绝对定位后不设置偏移量，元素的"位置"不会发生变化
    2：元素会从文档流中脱离
    3：绝对定位会改变元素的性质，行内变成块，块的宽高被内容撑开
    4：绝对定位会使元素提升一个层级
    5：绝对元素是相对于其包含块进行定位的

    -包含块
        正常情况下 包含块就是父元素

        绝对定位情况下，包含块就是离他最近的开了定位的祖先元素
            如果所有的祖先都没有开启定位，则相对于根元素（html）进行定位
```

## 4、fixed

```css
.box2{
    width: 200px;
    height: 200px;
    background-color: yellow;
    
    /* 
        固定定位（fixed）
            -固定定位也是一种绝对定位，所以固定定位的大部分特点和绝对定位一样
    
            -唯一不同的是固定定位永远参照与浏览器的视口（可视窗口）进行定位（不会参考祖先的定位）
            -固定定位的元素不会随着网页的滚动条滚动
     */
     position:fixed;

}   
```

## 5、sticky+top(兼容性不好）⭐

```css
.nav{
    width: 1208px;
    height: 48px;
    background-color: #E8E7E3;

    margin: 50px auto;
    position: sticky;
    /* 
        粘滞定位
            -和相对定位的特点基本一致，不同的是粘滞定位在元素达到某个位置(设置）的时候将其固定
     */
    top: 10px;
}
```

## 6、绝对定位的水平垂直布局⭐

```css
.box1{
    width: 500px;
    height: 500px;
    background-color: #bfa;
    /* 
        开启了绝对定位之后，
        1：水平方向的布局等式就需要在左右添加left和right
            此时规律和之前一样，只是多添加了两个值
                当发生过度约束：
                    如果9个值中没有auto则自动设置right以使等式满足
                    如果有auto，则自动调整auto

                可以设置auto的值
                    margin width left right
        
        2：垂直方向布局的等式也必须满足

     */

     position: relative;
}
.box2{
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    
    margin: auto;

    /* 
        因为left和right的值默认是auto，所以不知道left和right的值
        ，要和以前一样设置居中的话，需要把left和right设置为0
    	
    	垂直居中也是同样
     */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
```

## 7、z-index

```css
/* 
    对于开启了定位的元素，可以通过z-index属性来指定元素的层级
        z-index需要一个整数作为参数，值越大 元素的层级越高越优先显示
        不设置或者三个值都一样的话，优先显示代码靠下的元素

        祖先元素的层级再高也不会盖住后代元素(如果祖先高了，那么孙子也高了，就矛盾了)
 */
```

# 5、font&bgc

## 1、图标字体

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./fontawesome-free-5.15.2-web//fontawesome-free-5.15.2-web/css/all.css">
    <style>

    </style>
</head>
<body>
    <!-- 
        图标字体（iconfont）
            -在网页中经常需要使用一些图标，可以通过图片来引入图标
                但是图片大小本身比较大，并且非常的不灵活
            -所以在使用图标时，可以将 图标直接设置为字体
                然后通过font-face的形式来对字体进行引入
            
            1:下载：http://fontawesome.com/
            2:解压，将css和webfonts移动到项目中
            3：将all.css引入到网页中
        
            一般用i表示图标（虽然i本意是斜体）
            1:直接通过类名来使用图标字体
            格式：class="fas 对应图标名称"
                  class="fab 对应图标名称"

            2:通过实体来使用（&开头;结尾，中间是代数）
                  <i class="fas">&#xf0f3;</i>
                  class="fab 对应图标名称"

                  这样的好处是可以修改大小和颜色

            3:通过伪元素来设置图标字体
        -->
     
     <i class="fas fa-bell" style="font-size: 16px;color: red;"></i>
     <i class="fas">&#xf0f3;</i>
</body>
</html>
```

## 2、line-height

```html
font-size: 50px;

/* 可以将行高设置为和高度一样的值，使一行文字居中显示 */
height: 200px;
line-height: 4;
line-height: 200px;

    行高（line-height)
        -行高指的是文字占有的实际高度
        -可以通过line-height设置行高
        值可以是长度，也可以是具体的数字，代表了行高是fontsize的几倍

        
        -行高经常迎来设置文字的行间距
            行间距=行高 -字体大小
    

    字体框
        字体狂就是字体存在的各自，设置font-size实际上就是在设置字体框的高度
    
    行高会在字体框的上下平均分配
```

## 3、文本样式（被p，div，span包裹的图片对齐要用vertical-align）⭐

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            font-size: 50px;
            width: 900px;
            border: 1px red solid;
            /* 
                text-align文本的水平对齐
                    可选值：
                        left
                        right
                        center
                        justify（两端对齐）
             */
             text-align: center;
        }
        span{
            font-size: 20px;
            border: 1px blue solid;

            /* 
                vertical-align设置元素垂直对齐的方式
                    可选值
                    baseline 默认值，基线对齐
                    top middle bottom
             */
             vertical-align: bottom;
        }
        p{
            border: 1px red solid;
            /* 
                默认基线对齐，图片底部有一部分是空出来的
                可以设置图片的vertical-align:top或者bottom来消除这个空出来的部分
             */
        }
        img{
            vertical-align: bottom;
        }
    </style>
</head>
<body>
    <div>
        AAAAAAAAAAAAAAAAAAAA
        <span>
            真不错
        </span>
    </div>


    <p>
        <img src="../source/hdImg_ab7962e7fbb9b61fe82e91bb2c2bd6ca16163112352.jpg" style="width: 200px;height: 200px;"alt="">
    </p>
</body>
</html>
```

## 4、其他文本样式

```css
.box1{
    font-size: 50px;
    
    /* 
        text-decoration 设置文本修饰
            可选值：
            none  underline line-through overline
     */
     text-decoration: underline red;
}
.box2{
    /* 
        实现显示指定长度的文本,超出的内容显示省略号
        以下设置缺一不可

        white-space 设置网页如何处理空白
            可选值:
                normal 正常
                nowrap  不换行
                pre 保留空白(完全保留,包括换行的空格)
     */
     width: 200px;
     white-space: nowrap;
     overflow: hidden;
     /* 设置省略号 */
     text-overflow: ellipsis;
}
```

## 5、背景

```css
<style>
    .box1{
        width: 500px;
        height: 500px;
        background-color: #bfa;
        
        /* 
         background-image: url();               
            可以同时设置背景图片和背景颜色，背景颜色会填充到背景图片的像素部分
                1：如果背景图片小于元素的大小，图片会铺满元素
                2；如果图片大于元素，那么会有一部分无法显示
                3：一样大就会正常显示 

         */

         background-image: url(/css/source/hdImg_ab7962e7fbb9b61fe82e91bb2c2bd6ca16163112352.jpg);

        /* 
          ackground-repeat用来设置背景的重复方式
            可选值：
                repeat-x  x轴方向重复
                repeat-y  y方向重复
                no-repeat 不重复 只显示一张 
         */
         background-repeat: no-repeat;


        /* 
            用来设置背景图片的位置
            设置方式：
                -通过top left right bottom center 几个表示方位的词
                -使用方位词时必须要同时指定两个值，如果只写一个，默认y方向的方位是center

                -通过偏移量来设置
         */
         background-position: -50px -50px;
    }
</style>
```

## 6、背景2⭐

```css
<style>
    .box1{
        width: 500px;
        height:500px;
        background-color: #bfa;
        background-image: url(/css/source/hdImg_ab7962e7fbb9b61fe82e91bb2c2bd6ca16163112352.jpg);
        outline: 1px double red;
        background-position: 0 0 ;
        padding: 10px;

        /* 
            设置背景图的范围
                backgroud-clip
                    可选值：
                        border-box  默认值，背景会出现在边框的下边
                        padding-box  北京不会出现在内边框，只出现在内容区和内边距
                        content-box  背景只会出现在内容区

                background-origin   背景图片的偏移量计算的原点
                        padding-box  默认值，偏移量相对于padding的左上角
                        content-box  背景图片的偏移量相对于content的左上角
                        border-box   背景图片的便宜量从边框开始计算

                用小图片来演示
                    
         */
        background-origin: border-box;


        /* 
            backgroud-size 设置背景图片的大小
                第一个值表示宽度
                第二个值表示高度
                如果只写第一个值，第二个值默认是auto（这样可以设置按x或者y轴填充满）

                cover 图片的比例不变，将元素铺满
                contain 图片比例不变，图片完整展示
         */
        background-size: auto 100%;
        

        /* 
            简写的时候，size的内容要放到位置的后面（加斜杠）
            因为origin和clip的值一样  规定是线origin后clip
         */
        background: url(/css/source/hdImg_ab7962e7fbb9b61fe82e91bb2c2bd6ca16163112352.jpg) 
        #bbffaa center center/contain border-box  border-box no-repeat;
    }
</style>
```

## 7、渐变只做了解

