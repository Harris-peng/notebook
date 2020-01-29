# 几种判断数据类型方法的区别

es5中的基本数据类型有：`undefined`、`Null`、`Boolean`、`Number`、`String`。
es6中新加一个数据类型 `Symbol`，复杂数据类型
`Object`、`Array`、`Function`

* `typeof`
* `instanceof`
* `Object.prototype.toString.call()`

## `typeof`

typeof 对于原始类型来说，除了 null 都可以显示正确的类型

```
    typeof 1 // "number"
    typeof 'a' // "string"
    typeof true // "boolean"
    typeof undefined // "undefined"
    typeof Symbol(1) // "symbol"
    typeof null // "object"

```
typeof 对于对象来说，除了函数都会显示 `object`，所以说 `typeof` 并不能准确判断变量到底是什么类型

```
    typeof (() => {}) // 'function'
    typeof [] // "object"
    typeof {} // "object"

```

## `instanceof`

`instanceof` 运算符用来判断一个构造函数的`prototype`属性所指向的对象是否存在另外一个要检测对象的原型链上
对于原始数据类型使用`instanceof`并不准确
```
    const Persion = function () {};
    const persion = new Persion();
    persion instanceof Persion // true
    
    const str = 'a';
    str instanceof String // false  
    
    const str2 = new String('a');
    str2 instanceof String // true
    
    
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
