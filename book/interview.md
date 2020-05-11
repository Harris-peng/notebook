#面试题

## 1. 数组和链表的区别

**数组：**
数组是将元素在内存中连续存放，由于每个元素占用内存相同，可以通过下标迅速访问数组中任何元素。
但是如果要在数组中增加一个元素，需要移动大量元素，在内存中空出一个元素的空间，然后将要增加的元素放在其中。
同样的道理，如果想删除一个元素，同样需要移动大量元素去填掉被移动的元素。如果应用需要快速访问数据，很少或不插入和删除元素，就应该用数组。

**链表:**
链表恰好相反，链表中的元素在内存中不是顺序存储的，而是通过存在元素中的指针联系到一起。
比如：上一个元素有个指针指到下一个元素，以此类推，直到最后一个元素。如果要访问链表中一个元素，
需要从第一个元素开始，一直找到需要的元素位置。但是增加和删除一个元素对于链表数据结构就非常简单了，
只要修改元素中的指针就可以了。如果应用需要经常插入和删除元素你就需要用链表数据结构了。

**对比:**
1. 数组静态分配内存，链表动态分配内存；
2. 数组在内存中连续，链表不连续；
3. 数组元素在栈区，链表元素在堆区；
4. 数组利用下标定位，时间复杂度为O(1)，链表定位元素时间复杂度O(n)；
5. 数组插入或删除元素的时间复杂度O(n)，链表的时间复杂度O(1)。<br/>

>参考

[ jianshu  ](https://www.jianshu.com/p/85fda79ee74d)<br/>
[ tencent  ](https://cloud.tencent.com/developer/article/1444059)<br/>

## 2. 浏览器中的 Event Loop

Event Loop 执行顺序如下所示：

* 首先执行同步代码，这属于宏任务
* 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
* 执行所有微任务
* 当执行完所有微任务后，如有必要会渲染页面
* 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

微任务包括 process.nextTick ，promise ，MutationObserver，其中 process.nextTick 为 Node 独有。

宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了
script
，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。
```
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// script start => 
// async2 end => 
// Promise =>  
// script end =>  
// promise1 =>  
// promise2 =>  
// async1 end =>  
// setTimeout
```


## 3. 类A继承类B实例化A a的原型链是怎样的

```javascript
class TESTB {
    constructor (name) {
        this.name = name;
    }
    name (name) {
        console.log(this.name);
    }
}

class TESTA extends TESTB{
    constructor (value, name) {
        super(name);
        this.value = value;
    }
    say () {
        console.log(this.value);
    }
}

const test = new TESTA(11,'t4es');
console.log(test);

```
## 4. 盒模型
盒模型分两种一种是标准盒模型，一种是ie盒模型
> 标准盒模型

标准盒模型元素的实际宽度为
content+padding+border,可以通过设置属性`box-sizing:content-box`
修改元素为标准盒模型

> ie盒模型

ie盒模型 padding和border被包含在定义的width和height之内。
对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，
即 ( Element width = width )此属性表现为怪异模式下的盒模型。
可以通过设置属性`box-sizing:border-box`修改元素为ie盒模型

## 5继承

> 组合继承

```javascript
function Parent() {
  this.name ='Parent';
}
Parent.prototype.say = function() {
  console.log(this.name)
}
function Child() {
  Parent.call(this);
}
Child.prototype = new Parent()

```
> 寄生式组合继承

```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

```

## 6 闭包
闭包产生的本质就是，当前环境中存在指向父级作用域的引用
>闭包的定义：
1. 闭包是指有权访问另外一个函数作用域中的变量的函数。
2. 闭包是指那些能够访问自由变量的函数。 （其中自由变量，指在函数中使用的，但既不是函数参数arguments也不是函数的局部变量的变量，其实就是另外一个函数作用域中的变量。）

**闭包的表现形式**返回一个函数。

```javascript
function f1() {
  var a = 2
  function f2() {
    console.log(a);//2
  }
  return f2;
}
var x = f1();
x();
```
**作为函数参数传递**

```javascript
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();

```
*在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。
IIFE(立即执行函数表达式)创建闭包, 保存了全局作用域window和当前函数的作用域，因此可以全局的变量*

```javascript
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```
## 参考：
[神三元](https://juejin.im/post/5dac5d82e51d45249850cd20)
