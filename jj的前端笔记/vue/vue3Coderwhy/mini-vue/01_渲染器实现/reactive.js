//响应式实现
let activeReactiveFn = null
class Depend{
  constructor() {
    this.reactiveFns = []
  }

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

//通过Object.defineProperty来实现响应式
function reactive(obj){

  return new Proxy(obj,{
      set(target,key,value){
        Reflect.set(target,key,value)
        getDepend(target,key).notify()
      },
      get(target,key){
        const depend = getDepend(obj,key)
        depend.depend()
        return target[key]
      }
  })
}

function watchEffect(fn){
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}
