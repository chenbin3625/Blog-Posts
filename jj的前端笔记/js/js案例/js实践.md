### 1.选中和非选中的切换

```js
    //动态加入class来控制样式
	function addClass(li,str){
        li.classList.add(str);
    }
    function removeClass(li,str){
        li.classList.remove(str);
    }
    var li = document.getElementsByTagName('li');
    for(var i = 0 ; i < li.length ; i++)
    {
        li[i].onclick = function(){
            for(var j = 0 ;j < li.length;j++)
            {   
                //点击的时候去除其他的样式，
                removeClass(li[j],'active')
                removeClass(li[j].getElementsByTagName('i')[0],'i-active')
            }
            //去除完之后加上自己的样式
            addClass(this,'active');
            addClass(this.getElementsByTagName('i')[0],'i-active')
        }
    }
```

```css
    .active{
        background-color: rgba(0, 0, 0, .5);
    }
    .i-active{
        width: 20px;
    }
```

### 2.循环绑定时获取不到     i

```html
<%可以设置对应元素的某个属性为你要获取的i%>
<li id="2">
    <a href="javascript:;">
        Import Book Info
        <i class="fa fa-book" aria-hidden="true"></i>
    </a>
</li>
```

```js
//取出我想要的i,this.id
document.getElementsByClassName('content'+this.id)[0].style.display = 'block'
```

