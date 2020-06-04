#笔记
## CSS
`-webkit-user-drag: element;` 和`draggable` 同时使用会导致 `draggable`失效
### BFC
[bfc](https://my.oschina.net/u/2612473/blog/2221555)

## DOM

### <!DOCTYPE>的作用
1 定义：

<!DOCTYPE>标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。
<!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。 <br>

2 作用：

声明文档的解析类型(document.compatMode)，避免浏览器的怪异模式。

* document.compatMode：
* BackCompat：怪异模式，浏览器使用自己的怪异模式解析渲染页面。
* CSS1Compat：标准模式，浏览器使用W3C的标准解析渲染页面。

> 这个属性会被浏览器识别并使用，但是如果你的页面没有DOCTYPE的声明，那么compatMode默认就是BackCompat，
浏览器按照自己的方式解析渲染页面，那么，在不同的浏览器就会显示不同的样式。
如果你的页面添加了<!DOCTYPE html>那么，那么就等同于开启了标准模式
那么浏览器就得老老实实的按照W3C的标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了。
这就是<!DOCTYPE html>的作用。

[归来仍是你的少年](https://www.jianshu.com/p/74689f390878)

### herf 和 src的区别

我们在开发页面的时候，有时候需要需要引用一些外部的资源，经常分不清href与src，下面我们就来谈谈它们之间到底分别是什么，这样使用的时候就做到心中有数。
1. href：Hypertext Reference的缩写，超文本引用，它指向一些网络资源，建立和当前元素或者说是本文档的链接关系。  
在加载它的时候，不会停止对当前文档的处理，浏览器会继续往下走。常用在a、link等标签。
```javascript
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css">
```
 如上面所显示的那样，当浏览器加载到link标签时，会识别这是CSS文档，并行下载该CSS文档，但并不会停止对当前页面后续内容的加载。这也是不建议使用@import加载CSS的原因。

2. src：source的所写，表示的是对资源的引用，它指向的内容会嵌入到当前标签所在的位置。由于src的内容是页面必不可少的一部分，
因此浏览器在解析src时会停下来对后续文档的处理，直到src的内容加载完毕。常用在script、img、iframe标签中，我们建议js文件放在HTML文档的最后面。
```js
<img src="img/girl.jpg">
<frame src="top.html">
<iframe src="top.html">
<script src="show.js">
```
> 总结：href用于建立当前页面与引用资源之间的关系（链接），而src则会替换当前标签。  
> 遇到href，页面会并行加载后续内容；而src则不同，浏览器需要加载完毕src的内容才会继续往下走。

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

**call**

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
**apply**
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
**bind**
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
function create(ctor, ...args) {
    if(typeof ctor !== 'function'){
      throw 'newOperator function the first param must be a function';
    }
    let obj = Object.create(ctor.prototype);
    let res = ctor.apply(obj, args);
    
    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typoof res === 'function';
    return isObect || isFunction ? res : obj;
};
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
**instanceof 的作用**
用于判断一个引用类型是否属于某构造函数；

还可以在继承关系中用来判断一个实例是否属于它的父类型。

**和typeof的区别：**
typeof在对值类型number、string、boolean 、null 、 undefined、 以及引用类型的function的反应是精准的；但是，对于对象{ } 、数组[ ] 、null 都会返回object

为了弥补这一点，instanceof 从原型的角度，来判断某引用属于哪个构造函数，从而判定它的数据类型。

### 尾递归
**正常的递归**
```javascript
function fb (num) {
	if (num <= 2) return 1;
	return fb(num -1) + fb(num -2)
} 
```
**尾递归实现的fb**
```javascript
function fb (num,a=1,b=1) {
	if (num <=2) return b;
	return fb(num-1,b,a+b)
} 
```
###  this.length >>> 0

所有非数值转换成0，所有大于等于 0 等数取整数部分。
借助右移位运算符 用零填充 len 左边空出的位，这样做的好处是如果 length 未定义就取0
```javscript
null >>> 0  //0

undefined >>> 0  //0

void(0) >>> 0  //0

function a (){};  a >>> 0  //0

[] >>> 0  //0

var a = {}; a >>> 0  //0

123123 >>> 0  //123123

45.2 >>> 0  //45

0 >>> 0  //0

-0 >>> 0  //0

-1 >>> 0  //4294967295

-1212 >>> 0  //4294966084
```
[参考知乎](https://www.zhihu.com/question/20693429)

### js垃圾回收机制
老版本的ie使用的*引用计数法*，现在一般的浏览器都是使用的*标记清除法*

> v8中的垃圾回收机制

在其他的后端语言中，如Java/Go, 对于内存的使用没有什么限制，但是JS不一样，V8只能使用系统的一部分内存，具体来说，  
在64位系统下，V8最多只能分配1.4G, 在 32 位系统中，最多只能分配0.7G。你想想在前端这样的大内存需求其实并不大，  
但对于后端而言，nodejs如果遇到一个2G多的文件，那么将无法全部将其读入内存进行各种操作了。
V8 把堆内存分成了两部分进行处理——新生代内存和老生代内存。顾名思义，新生代就是临时分配的内存，存活时间短，  
 老生代是常驻内存，存活的时间长。V8 的堆内存，也就是两个内存之和。

**新生代内存的回收**

新生代的内存默在 64 位和 32 位系统下分别分配 32MB 和 16MB内存空间
在执行垃圾回收算法时，首先将新生代内存空间一分为二 From 和 To，其中From部分表示正在使用的内存，To 是目前闲置的内存
V8 将From部分的对象检查一遍，如果是存活对象那么复制到To内存中(在To内存中按照顺序从头放置的)，如果是非存活对象直接回收即可。
当所有的From中的存活对象按照顺序进入到To内存之后，From 和 To 两者的角色对调，From现在被闲置，To为正在使用，如此循环。
新生代中的变量如果经过多次回收后依然存在，那么就会被放入到老生代内存中，这种现象就叫晋升。新生代垃圾回收算法也叫Scavenge算法。
* 已经经历过一次 Scavenge 回收。
* （闲置）空间的内存占用超过25%。

**老生代内存的回收**

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

### thunk函数

Thunk函数早在上个世纪60年代就诞生了。
那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是"求值策略"，即函数的参数到底应该何时求值。
```javascript
var x = 1;
function f(m){
  return m * 2;     
}
f(x + 5)
```
一种意见是"传值调用"（call by value），即在进入函数体之前，就计算 x + 5 的值（等于6），再将这个值传入函数 f 。C语言就采用这种策略。
```javascript
f(x + 5)
// 传值调用时，等同于
f(6)
```
另一种意见是"传名调用"（call by name），即直接将表达式 x + 5 传入函数体，只在用到它的时候求值。Hskell语言采用这种策略。
```
f(x + 5)
// 传名调用时，等同于
(x + 5) * 2
```
编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
```javascript
function f(m){
  return m * 2;     
}
f(x + 5);
// 等同于
var thunk = function () {
  return x + 5;
};
function f(thunk){
  return thunk() * 2;
}
```
JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，  
将其替换成单参数的版本，且只接受回调函数作为参数。
```javascript
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```
参考：  
[ruanyifeng](http://www.ruanyifeng.com/blog/2015/05/thunk.html)

### Promise
```javascript
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor (handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING
        // 添加状态
        this._value = undefined
        // 添加成功回调函数队列
        this._fulfilledQueues = []
        // 添加失败回调函数队列
        this._rejectedQueues = []
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
        const run = () => {
            if (this._status !== PENDING) return
            this._status = FULFILLED
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error)
                }
            }
            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
              当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
            */
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    runRejected(err)
                })
            } else {
                this._value = val
                runFulfilled(val)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) {
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
        const { _value, _status } = this
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res =  onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }
    // 添加catch方法
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
        return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }
    // 添加静态race方法
    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    finally (cb) {
        return this.then(
            value  => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    }
}

```

### co
```javascript
function co(gen) {
  gen = gen();
  return new Promise((resolve, reject) => {
    const next = function(val) {
      const res = gen.next(val);
      if (res.done) return resolve(res.value);
      res.value.then((res) => {
        next(res)
      }, e => {
        reject(e)
      })
    }
    next();
  })
}
```
### async
```javascript
function spawn(gen) {
  gen = gen();
  return new Promise((resolve, reject) => {
    const step = function (fn) {
        try {
          const res = fn();
          if (res.done) return resolve(res.value);
          Promise.resolve(res.value).then(function(value) {
              step(function() {
                return gen.next(value);
              })
          },function(e) {
              step(function() {
                return gen.throw(e);
              })
          })
        } catch (e) {
          reject(e);
        } 
    }
    step(function() {
      return gen.next(undefined);
    })
  })
  
}

```



