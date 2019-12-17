#笔记
## CSS
`-webkit-user-drag: element;` 和`draggable` 同时使用会导致 `draggable`失效

## JavaScript

### 函数声明与函数表达式的区别 
```javascript
// 函数声明
fun1();
function fun1() {
  
}
fun2() // 报错
// 函数表达式
var fun2 = function() {
  
}
```
js中存在变量提升，在编译代码阶段，会优先定义好变量，在执行代码阶段`fun1`已经定义，所以可以直接调用
而fun2 还是空所以会报错

### bind apply call
其中call apply
中call的参数是支持多个的，除了第一位是需要绑定的作用域，而apply中第一位是作作用域，第二位是参数数组，
bind是先指定需要绑定的作用域，返回新的方法，然后调用新的方法，参数在第一次绑定作用域的时候和第二次执行的时候都可以传入

> call 
```javascript
Function.prototype.myCall = function (context = window) {
  if (typeof context !== 'function') {
      throw new Error('');
  }
  context.fn = this;
  const arg = [...arguments].slice(1);
  const res = context.fn(...arg);
  delete context.fn;
  return res;
}

```
> apply
```javascript
Function.prototype.myApply = function (context = window, params = []) {
  if (typeof context !== 'function') {
      throw new Error('');
  }
  context.fn = this;
  const res = context.fn(params);
  delete context.fn;
  return res;
}

```
> bind
```javascript
Function.prototype.myBind = function (context = window) {
  if (typeof context !== 'function') {
      throw new Error('');
  }
  const _this = this;
  const args = [...arguments].slice(1);
 // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

```
### new 操作符都做了什么东西

    * 新生成了一个对象
    * 链接到原型
    * 绑定 this
    * 返回新对象
> 代码实现

```javascript
function create () {
  let obj = {};
  let fun = [].shift.call(arguments);
  obj.__proro__ = fun.prototype;
  let res = fun.apply(obj, arguments);
  return res instanceof Object ? res : obj;
}
```
    * 创建一个空对象
    * 获取构造函数
    * 设置空对象的原型
    * 绑定 this 并执行构造函数
    * 确保返回值为对象
    
### instanceof实现

```javascript
function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}
```
1、instanceof 的作用
用于判断一个引用类型是否属于某构造函数；

还可以在继承关系中用来判断一个实例是否属于它的父类型。

2、和typeof的区别：
typeof在对值类型number、string、boolean 、null 、 undefined、 以及引用类型的function的反应是精准的；但是，对于对象{ } 、数组[ ] 、null 都会返回object

为了弥补这一点，instanceof 从原型的角度，来判断某引用属于哪个构造函数，从而判定它的数据类型。
