# 几种判断数据类型方法的区别

es5中的基本数据类型有：`undefined`、`Null`、`Boolean`、`Number`、`String`。
es6中新加一个数据类型 `Symbol`，复杂数据类型
`Object`、`Array`、`Function`

* `typeof`
* `instanceof`
* `Object.prototype.toString.call()`

## `typeof`

typeof 对于原始类型来说，除了 null 都可以显示正确的类型

```javascript
    typeof 1 // "number"
    typeof 'a' // "string"
    typeof true // "boolean"
    typeof undefined // "undefined"
    typeof Symbol(1) // "symbol"
    typeof null // "object"

```

typeof 对于对象来说，除了函数都会显示 `object`，所以说 `typeof`
并不能准确判断变量到底是什么类型

```javascript
    typeof (() => {}) // 'function'
    typeof [] // "object"
    typeof {} // "object"

```

## `instanceof`

`instanceof`
运算符用来判断一个构造函数的`prototype`属性所指向的对象是否存在另外一个要检测对象的原型链上
对于原始数据类型使用`instanceof`并不准确

```javascript
    const Persion = function () {};
    const persion = new Persion();
    persion instanceof Persion // true
    
    const str = 'a';
    str instanceof String // false  
    
    const str2 = new String('a');
    str2 instanceof String // true
```

实现 instanceof

```javascript
function myInstanceof (left, right) {
  if(typeof left !== 'object' || left === null) return false;
  let prot = Object.getPrototypeOf(left);
  while (true) {
    if (!prot) return false;
    if (prot === right.prototype) return true;
    prot = Object.getPrototypeOf(prot);
  }
}

```

## `Object.prototype.toString.call()`

通过`Object.prototype.toString`方法，判断某个对象之属于哪种内置类型。
分为`null`、`string`、`boolean`、`number`、`undefined`、`Symbol`、`array`、`function`、`object`、`date`、`math`。

```
    Object.prototype.toString.call(null); // "[object Null]"
    Object.prototype.toString.call(undefined); // "[object Undefined]"
    Object.prototype.toString.call('abc');// "[object String]"
    Object.prototype.toString.call(123);// "[object Number]"
    Object.prototype.toString.call(true);// "[object Boolean]"
    Object.prototype.toString.call(Symbol());// "[object Symbol]"
    
    **函数类型**
    function fn(){
      console.log("test");
    }
    Object.prototype.toString.call(fn); // "[object Function]"
    **日期类型**
    const date = new Date();
    Object.prototype.toString.call(date); // "[object Date]"
    **数组类型**
    const arr = [1,2,3];
    Object.prototype.toString.call(arr); // "[object Array]"
    **正则表达式**
    const reg = /[hbc]at/gi;
    Object.prototype.toString.call(reg); // "[object RegExp]"
    **自定义类型**
    function Person(name, age) { }
    var person = new Person();
    Object.prototype.toString.call(person); // "[object Object]"
    
```

## `==`和`===`的区别

`==`会进行类型转换，`===`强等不会进行类型转换必须类型和值都相同才相等  
`==`进行类型转换的规则如下

1. 判断等号两边类型是否一致，相同则直接比较返回结果
2. 判断是否是null和undifind是则返回true
3. 判断是否一方为`Number`另一方为`String`，将`String`转换为`Number`在进行比较
4. 判断是否一方为`Boolean`另一方为`Number`，将`Boolean`装换为`Number`在进行比较
5. 判断一方是否为复杂数据类型，另一方为`String``Number`或者`Symbol`，会将负责数据类型转换为字符串在进行比较
## 对象转原始类型数据如何进行的
对象转原始类型时会调用其内置的[ToPrimitive]函数，对于该函数其流程如下：

1. 如果存在Symbol.toPrimitive()方法，优先调用再返回
2. 调用valueOf()，如果转换为原始类型，则返回
3. 调用toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错

> 示例

如何让if(a == 1 && a == 2)条件成立？
```javascript
var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2);//true
```

