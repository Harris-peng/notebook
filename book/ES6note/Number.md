# ES6 基础入门笔记
## 数值的扩展
### 一 新增的方法

|方法名|参数|返回值|作用|
|-|-|-|-|
|`Number.isFinite()`|数值|布尔值|用来检查一个值是否是非无穷|
|`Number.isNaN()`|数值|布尔值|用来检查一个值是否是`NaN`|
|`Number.parseInt()`|数值|整数|将浮点数取整|
|`Number.parseFloat()`|数值|浮点数|返回浮点数|
|`Number.isInteger`|数值|布尔值|用来检查一个值是否整数|
|`Number.EPSILON`|无|一个极小的常量|用来设置一个可以接受的误差范围|
|`Number.isSafeInteger()`|数值|布尔值|用来判断一个整数是否落在正负`Math.pow(2,53)`的范围内|

> #### 示例
```javascript
    Number.isFinite(15) //true
    Number.isFinite(0.8) //true
    Number.isFinite(NaN) //false
    Number.isFinite(Infinity) //false
    Number.isFinite('foo') //false
    Number.isFinite('15') //false
    
    Number.isNaN(NaN)//true
    Number.isNaN(15)//true
    Number.isNaN('15')//false
    Number.isNaN(true)//false
    Number.isNaN(9/NaN)//true
    Number.isNaN('true'/0)//true
    Number.isNaN('true'/'true')//true
    //Number.isNaN 和Number.isFinite 只对数值有效，对于非数值统一返回false.
    
    Number.parseInt(12.22)//12
    Number.parseInt('12.22')//12
    Number.parseFloat('12.22')//12.22
    Number.parseFloat('12.22%')//12.22
    //ES6 将这两个方法放到了Number对象上，减少了全局变量，使语言逐步模块化。
    
    Number.isInteger(23) //true
    Number.isInteger(23.0)//true
    Number.isInteger(23.1)//false
    Number.isInteger('15')//false
    Number.isInteger(true)//false
    //用来判断一个数是否为整数
    
    0.1+0.2-0.3<Number.EPSILON //true
    //Number.EPSILON 的实质是一个可以接受的误差范围
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER)//true
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER)//true
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER-1)//false
    Number.isSafeInteger(Math.pow(2,53))//true
    Number.isSafeInteger(Math.pow(2,53)+1)//false
    Number.isSafeInteger('a')//false
    Number.isSafeInteger(null)//false
    Number.isSafeInteger(Infinity)//false
    //ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量来表示Math.pow(2,53)的上下限。
    //Number.isSafeInteger()用来判断结果是否在安全整数范围。
    
    0b111110111 === 503 //true
    0o767 === 503//true
    //ES6新增了二进制和八进制的表示方法分别是前面加前缀0b(0B)和0o(0O)

```
### `Math`对象的扩张

|方法名|参数|返回值|作用|
|-|-|-|-|
|`Math.trunc()`|数值|整数|去除一个数的小数部分|
|`Math.sign()`|数值|`+1 -1 +0 -0 NaN`|判断一个数是正数还是负数还是0|
|`Math.cbrt()`|数值|数值|用于返回一个数的立方根|
|`Math.clz32()`|数值|数值|用于返回一个数的32位无符号整数形式有多少个前导0|
|`Math.imul(a,b)`|数值|数值|返回两个数以32位带符号整数形式相乘的结果|
|`Math.fround()`|数值|数值|返回一个数的单精度浮点数形式|
|`Math.hypoy(a,b,..)`|数值|数值|返回所有参数的平方和的平方根|
|`Math.expm1(x)`|数值|数值|返回`e^x-1`|
|`Math.log1p(x)`|数值|数值|返回`ln(1+x)`|
|`Math.log10(x)`|数值|数值|返回以10为底的x的对数|
|`Math.log2(x)`|数值|数值|返回以2为底的x的对数|
|`Math.sinh(x)`|数值|数值|返回x的双曲正弦|
|`Math.cosh(x)`|数值|数值|返回x的双曲余弦|
|`Math.tanh(x)`|数值|数值|返回x的双曲正切|
|`Math.asinh(x)`|数值|数值| 返回x的反双曲正弦|
|`Math.acosh(x)`|数值|数值|返回x的反双曲余弦|
|`Math.atanh(x)`|数值|数值|返回x的反双曲正切|

```javascript
    Math.trunc(4.1) //4
    Math.trunc(-4.1) //-4
    Math.trunc(-0.1234) //-0
    Math.trunc(NaN) //NaN
    Math.trunc('foo') //NaN
    
    Math.sign(-3) //-1
    Math.sign(3) //+1
    Math.sign(-0) //-0
    Math.sign(+0) //+0
    Math.sign(NaN) //NaN
    Math.sign('foo') //NaN
    
    Math.cbrt(-1) //-1
    Math.cbrt(0) //0
    Math.cbrt(8) //2
    Math.cbrt('aa') //NaN
    
    Math.clz32(0) //32
    Math.clz32(1) //31
    Math.clz32(1000) //22
    
    Math.imul(2,4) //8 
    Math.imul(2,-4) //-8
    
    (0x7fffffff*0x7fffffff)|0 //0 
    Math.imul(0x7fffffff*0x7fffffff) //1
    /*
    上面这个乘法算式，返回结果为0。但是由于这两个二进制数的最低位都是1，
    所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是1。
    这个错误就是因为它们的乘积超过了2的53次方，JavaScript无法保存额外的精度，
    就把低位的值都变成了0。Math.imul方法可以返回正确的值1。
    */
    
    Math.fround(0) //0 
    Math.fround(1) //1 
    Math.fround(1.337) //1.3370000123977661
    //对于整数来说，Math.fround方法返回的结果不会有任何的不同，当遇到那些无法用64
    //个二进制位精确表示的小数。这时该方法会返回最接近这个小数的单精度浮点数。
    
    Math.hypoy(3,4) //5
    Math.hypoy(NaN) //NaN
    Math.hypoy(3,4,'foo') //NaN
    //只要有一个参数无法转为整数，就会返回NaN
    
    2 ** 2 //4
    2 ** 3 //8
    let a = 3
    a **=3;
    //等同于 b = b*b*b ; 27