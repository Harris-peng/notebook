# 类型转换

类型转换是将值从一种类型转换为另一种类型的过程（比如字符串转数字，对象转布尔值等）。
任何类型不论是原始类型还是对象类型都可以进行类型转换

## 显示转换和隐式转换

当开发人员通过编写适当的代码(如`Number(value)`)用于在类型之间进行转换时，就称为显式类型强制转换(或强制类型转换)。
然而 JavaScript 是弱类型语言，在某些操作下，值可以在两种类型之间自动的转换，这叫做隐式类型转换。
在对不同类型的值使用运算符时通常会发生隐式类型转换。比如 `1 == null`, `2 / "5"`, `null + new Date()`。
当值被 if 语句包裹时也有可能发生，比如 if(value) {} 会将 value 转换为 boolean类型。
严格相等运算符（===）不会触发类型隐式转换，所以它可以用来比较值和类型是否都相等。

## 类型转换的规则

类型转换一般经过3中类型转换，类型转换的逻辑在原始类型和对象类型上是不同的，但是他们都只会转换成下面 3 种类型之一
* to string
* to boolean
* to number

## `string` 类型转换

String() 方法可以用来显式将值转为字符串，隐式转换通常在有 + 运算符并且有一个操作数是 string 类型时被触发，如：
```
    String(123) //"123"
    1 + "" // "1"


```

## `Boolean` 类型转换

布尔类型的转换一般在有逻辑判断或逻辑操作符（ `|| && !` ）时触发 ，但是逻辑操作符（|| &&）内部做了隐士类型转换
返回值为原属操作值

```
    Boolean(2)    // 显示类型转换
    if(2) {}      // 逻辑判断触发隐式类型转换
    !!2           // true 逻辑运算符触发隐式类型转换
    2 || 'hello'  // 2 逻辑运算符触发隐式类型转换
    
    // 返回 number 类型 123，而不是 boolean 型 true
    // 'hello' 和 '123' 仍然在内部会转换成 boolean 型来计算表达式
    let x = 'hello' && 123  // x === 123
    
```
布尔类型只有转换为`true` 或 `false`

```
    Boolean('')           // false
    Boolean(0)            // false  
    Boolean(-0)           // false
    Boolean(NaN)          // false
    Boolean(null)         // false
    Boolean(undefined)     // false
    Boolean(false)        // false
    
    Boolean({})             // true
    Boolean([])             // true
    Boolean(Symbol())       // true
    !!Symbol()              // true
    Boolean(function() {})  // true

```

## `Number` 类型转换

`Number` 类型转换比较复杂，以下情况都会做类型转换

* 比较操作（>, <, <=, >=）
* 按位操作（| & ^ ~）
* 算数操作（- + * / %）， **注意**，当 `+`操作存在任意的操作数是
  `string` 类型时，不会触发 `number` 类型的隐式转换
* 一 元 + 操作
* 非严格相等操作（== 或者 != ），注意，== 操作两个操作数都是 string 类型时，不会发生 number 类型的隐式转换

```
    Number('123')    // 显示类型转换
    + '123'          //  隐式类型转换
    123 != "456"    //  隐式类型转换
    4 > "5"        //  隐式类型转换
    5 / null      //  隐式类型转换
    true | 0      //  隐式类型转换

```

当将一个字符串转换为一个数字时，引擎首先删除前尾空格、\n、\t
字符，如果被修剪的字符串不成为一个有效的数字，则返回
NaN。如果字符串为空，则返回 0。 Number() 方法对于 null 和 undefined
的处理是不同的， null 会转换为 0, undefined 会转换为 NaN 

不管是显式还是隐式转换都不能将 Symbol 类型转为 number 类型，当试图这样操作时，会抛出错误。

```
    Number('\n') // 0 
    Number('\naaa') // NaN
    Number(null) // 0
    Number(undefined) // NaN

    Number(Symbol('my symbol'))    // TypeError is thrown
    +Symbol('123')                 // TypeError is thrown

```
**注意**当将 == 应用于 null 或 undefined 时，不会发生数值转换。null
只等于 null 或 undefined，不等于其他任何值。

NaN 不等于任何值，包括它自己

```
    null == 0               // false, null is not converted to 0
    null == null            // true
    undefined == undefined  // true
    null == undefined       // true
    undefined == 0          // false
    NaN === NaN  // false
```


## 参考

(lvwxx)[https://juejin.im/post/5d4999fff265da038f47f5c7]