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

### 尾递归
正常的递归
```javascript
function fb (num) {
	if (num <= 2) return 1;
	return fb(num -1) + fb(num -2)
} 
```
尾递归实现的fb
```javascript
function fb (num,a=1,b=1) {
	if (num <=2) return b;
	return fb(num-1,b,a+b)
} 
```
###  this.length >>> 0
所有非数值转换成0，所有大于等于 0 等数取整数部分。
借助右移位运算符 用零填充 len 左边空出的位，这样做的好处是如果 length 未定义就取0
[参考知乎](https://www.zhihu.com/question/20693429)

### js垃圾回收机制
老版本的ie使用的*引用计数法*，现在一般的浏览器都是使用的*标记清除法*

> v8中的垃圾回收机制

在其他的后端语言中，如Java/Go, 对于内存的使用没有什么限制，但是JS不一样，V8只能使用系统的一部分内存，具体来说，  
在64位系统下，V8最多只能分配1.4G, 在 32 位系统中，最多只能分配0.7G。你想想在前端这样的大内存需求其实并不大，  
但对于后端而言，nodejs如果遇到一个2G多的文件，那么将无法全部将其读入内存进行各种操作了。
V8 把堆内存分成了两部分进行处理——新生代内存和老生代内存。顾名思义，新生代就是临时分配的内存，存活时间短，  
 老生代是常驻内存，存活的时间长。V8 的堆内存，也就是两个内存之和。

1. 新生代内存的回收

新生代的内存默在 64 位和 32 位系统下分别分配 32MB 和 16MB内存空间
在执行垃圾回收算法时，首先将新生代内存空间一分为二 From 和 To，其中From部分表示正在使用的内存，To 是目前闲置的内存
V8 将From部分的对象检查一遍，如果是存活对象那么复制到To内存中(在To内存中按照顺序从头放置的)，如果是非存活对象直接回收即可。
当所有的From中的存活对象按照顺序进入到To内存之后，From 和 To 两者的角色对调，From现在被闲置，To为正在使用，如此循环。
新生代中的变量如果经过多次回收后依然存在，那么就会被放入到老生代内存中，这种现象就叫晋升。新生代垃圾回收算法也叫Scavenge算法。
* 已经经历过一次 Scavenge 回收。
* （闲置）空间的内存占用超过25%。

2. 老生代内存的回收

第一步，进行标记-清除。这个过程在《JavaScript高级程序设计(第三版)》中有过详细的介绍，主要分成两个阶段，即标记阶段和清除阶段。  
首先会遍历堆中的所有对象，对它们做上标记，然后对于代码环境中使用的变量以及被强引用的变量取消标记，剩下的就是要删除的变量了，  
在随后的清除阶段对其进行空间的回收。当然这又会引发内存碎片的问题，存活对象的空间不连续对后续的空间分配造成障碍  
。老生代又是如何处理这个问题的呢？第二步，整理内存碎片。V8 的解决方式非常简单粗暴，在清除阶段结束后，把存活的对象全部往一端靠拢.  
由于是移动对象，它的执行速度不可能很快，事实上也是整个过程中最耗时间的部分。
由于JS的单线程机制，V8 在进行垃圾回收的时候，不可避免地会阻塞业务逻辑的执行，倘若老生代的垃圾回收任务很重，那么耗时会非常可怕，  
严重影响应用的性能。那这个时候为了避免这样问题，V8 采取了增量标记的方案，即将一口气完成的标记任务分为很多小的部分完成，  
每做完一个小的部分就"歇"一下，就js应用逻辑执行一会儿，然后再执行下面的部分，如果循环，直到标记阶段完成才进入内存碎片的整理上面来。

> 备注

使用webpack打包项目偶尔会遇到打包失败内存不够的情况，这个时候就可以通过调整内存空间的大小来使代码可以继续运行





