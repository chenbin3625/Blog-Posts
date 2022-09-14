//渲染部分实现
const h = (tags, props, children) => {
  //返回一个vnode，这个vnode就是一个javascript对象
  return {
    tags,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  //1、创建vnode对应的元素，并且在vnode对象中也保存一份，这是为了在patch的时候能访问原来的真实dom
  const el = (vnode.el = document.createElement(vnode.tags));

  //2、将vnode的属性添加到dom元素上
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  //3、处理children，将children中的一个个vnode挂载到el上
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }

  //4、将el挂载到container上
  container.appendChild(el);
};

//传入两个vnode进行diff算法
const patch = (n1, n2) => {
  //1、如果两个结点的tag都不一样的话，则直接用n2替换n1
  if (n1.tags !== n2.tags) {
    //获取n1的父节点，通过父节点移除掉n1的真实dom，并将n2这个vnode挂载到n1的父节点上
    const n1Parent = n1.el.parentNode;
    n1Parent.removeChild(n1.el);
    mount(n2, n1Parent);
  } else {
    //2、对props进行处理
    const n1Props = n1.props || {};
    const n2Props = n2.props || {};
    //因为节点类型一样，所以n2直接对n1的el进行复用
    const el = (n2.el = n1.el);

    //先将新的（n2）的props都添加到el中
    for (const key in n2Props) {
      const n2value = n2Props[key];
      const n1value = n1Props[key];
      //遍历n2中的key，如果n2中key的value和n1中key的value不一样，就将n2中的key-value加入到el中
      if (n2value !== n1value) {
          el.setAttribute(key, n2value);
      }
    }

    //再将旧的（n1）的props从el中移除
    for (const key in n1Props) {
      //如果这个key在n2中没有的话就移除
      if (!(key in n2Props)) {
        el.removeAttribute(key);
      }
    }

    //3、处理childrean
    const newChildren = n2.children;
    const oldChildren = n1.children;
    //情况一：如果newChildren是字符串类型
    if (typeof newChildren === "string") {
      //如果旧的children也是字符串类型的话，就比较，不一样的时候再替换
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
        //如果旧的children是数组类型（这里不判断是对象的情况），就直接替换
      } else {
        el.innerHTML = newChildren;
      }
      //情况二：如果newChildren是数组类型的话，进行判断
      //newChildren : [v1 , v2 , v4]
      //oldChildren : [v2 , v1 , v4, v5]
    } else {
      //先获取公共长度
      const commonlength = Math.min(newChildren.length, oldChildren.length);
      //遍历公共的部分，对公共的部分进行patch
      for (let i = 0; i < commonlength; i++) {
        patch(oldChildren[i], newChildren[i]);
      }

      //如果是old的长度更多，那么就是删除结点
      if (oldChildren.length > newChildren.length) {
        for (let i = commonlength; i < oldChildren.length; i++) {
          //因为旧节点是挂载过的，vnode对象中保存了el属性用于指向真实dom
          el.removeChild(oldChildren[i].el);
        }
      }

      //如果是new的长度更多，那么就是添加结点
      if (oldChildren.length < newChildren.length) {
        for (let i = commonlength; i < newChildren.length; i++) {
          //将childrean挂载到el上
          mount(el, newChildren[i]);
        }
      }
    }
  }
};


