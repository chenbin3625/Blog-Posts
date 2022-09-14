import { effect, ReactiveEffect, trigger, track } from './effect'
import { TriggerOpTypes, TrackOpTypes } from './operations'
import { Ref } from './ref'
import { isFunction, NOOP } from '@vue/shared'
import { ReactiveFlags, toRaw } from './reactive'

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
}

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}

export type ComputedGetter<T> = (ctx?: any) => T
export type ComputedSetter<T> = (v: T) => void

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

class ComputedRefImpl<T> {
  private _value!: T
  private _dirty = true //判断是否是脏数据（内部依赖的响应式数据是否有改变）

  public readonly effect: ReactiveEffect<T> //副作用函数

  public readonly __v_isRef = true;
  public readonly [ReactiveFlags.IS_READONLY]: boolean

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean
  ) {
    // 收集getter函数内部的依赖
    this.effect = effect(getter, {
      lazy: true, //默认effect传入的函数是会立即执行的，lazy为true就不执行
      scheduler: () => {
        //如果effect的第二个参数传入了scheduler，那么会用scheduler的形式来触发响应式依赖
        if (!this._dirty) {
          this._dirty = true
          trigger(toRaw(this), TriggerOpTypes.SET, 'value') //解决嵌套effect无法收集lazy的effect的情况
        }
      }
    })

    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)

    // 判断是否是脏数据，如果是脏数据的话，就重新执行副作用函数（收集依赖）
    if (self._dirty) {
      self._value = this.effect() //这个effect其实就是传入的getter函数，调用getter函数获取返回值（操作后的响应式数据）。
      self._dirty = false // 重置dirty，直到用scheduler触发trigger的时候（响应式数据修改）,赋值dirty为true（标志已经改变）。
    }
    // 防止在effect中使用computed无法收集和触发依赖（因为computed传入的effect是lazy的，不会执行）
    // 我们需要手动的追踪和触发依赖
    track(self, TrackOpTypes.GET, 'value')
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}

export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>
export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  // 如果传入的是一个getter函数，那么就直接设置getter，setter设置为默认的
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    // 如果传入的是对象的话，就将getter和setter分别设置为对应的set和get
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new ComputedRefImpl(
    getter,
    setter,
    isFunction(getterOrOptions) || !getterOrOptions.set
  ) as any
}
