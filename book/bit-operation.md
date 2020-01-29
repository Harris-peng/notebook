# 位运算
  位运算是在数字底层（即表示数字的 32 个数位）进行运算的。
由于位运算是低级的运算操作，所以速度往往也是最快的（相对其它运算如加减乘除来说），
并且借助位运算有时我们还能实现更简单的程序逻辑,缺点是很不直观，
许多场合不能够使用。
  位运算只对整数起作用，如果一个运算子不是整数，会自动转为整数后再运行。
虽然在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，
是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数。
## 关于二进制
==以下来源于w3shool==:
ECMAScript 整数有两种类型，即有符号整数（允许用正数和负数）和无符号整数（
只允许用正数）。在 ECMAScript 中，所有整数字面量默认都是有符号整数，
这意味着什么呢？有符号整数使用 31 位表示整数的数值，用第 32 位表示整数的符号，
0 表示正数，1 表示负数。数值范围从 -2147483648 到 2147483647。

```javascript
// 十进制 => 二进制
let num = 10;
console.log(num.toString(2));
console.log(num.toString(8));
// 二进制 => 十进制
let num1 = 1001;
let num2 = 77;
console.log(parseInt(num1, 2)); //9
console.log(parseInt(num2, 8)); //63
```
## **|** 或
对于二进制中的每一位执行**或**操作，只要有一个为1，就为1.

值(二进制)/值(二进制)|4(100)|3(11)|2(10)
:-:|:-:|:-:|:-:
7(111)|7(111)|7(111)|7(111)
6(110)|6(110)|7(111)|6(110)
5(101)|5(101)|7(111)|7(111)

## **&** 与
对每对比特位执行与**AND**操作，只有都为1，才为1.

值(二进制)/值(二进制)|4(100)|3(11)|2(10)
:-:|:-:|:-:|:-:
7(111)|4(100)|3(11)|2(10)
6(110)|4(100)|2(10)|2(10)
5(101)|4(100)|1(1)|0(0)

> 应用场景

1.判断奇偶
我们知道奇数的二进制最后一位必然为1，所以任意一个奇数 & 1 一定等于1。
2.权限判断
我们把权限分为 0001、 0010、 0100、 1000分别对应 1、2、4、8

```javascript
// 0001 delete 
// 0010 add 
// 0100 update
// 1000 put
const identity = 8
identity & 8 // 8
identity & 4 // 0
const identity = 12
identity & 8 // 8
identity & 4 // 4
identity & 2 // 0

```
## **~** 非
对每一个比特位执行非（NOT）操作。NOT a 结果为 a 的反转（即反码）。

**~1的计算步骤：**

* 将1(这里叫：原码)转二进制 ＝ 00000001
* 按位取反 ＝ 11111110
* 发现符号位(即最高位)为1(表示负数)，将除符号位之外的其他数字取反 ＝ 10000001
* 末位加1取其补码 ＝ 10000010
* 转换回十进制 ＝ -2

对任一数值 x 进行按位非操作的结果为 -(x + 1)
> 应用场景

1 取整
`~~(-5.88) // -5`

## **^** 异或
对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。

值(二进制)/值(二进制)|4(100)|3(11)|2(10)
:-:|:-:|:-:|:-:
7(111)|3(11)|4(100)|5(101)
6(110)|2(10)|5(101)|4(100)
5(101)|1(1)|6(110)|7(111)

> 应用场景

1. 切换变量0和1
假如我们通过某个条件来切换一个值为0或者1

```javascript
function update(toggle) {
    num = toggle ? 1 : 0;
}
update(true);
// 通过异或我们可以这么写
num = num ^ 1;
```

2.交换两个变量的值(不用第三个变量)

```javascript
let a = 5,
    b = 6;

a = a ^ b;
b = a ^ b;
a = a ^ b;
```

原理剖析：a = a ^ b; b = a ^ b 相当与 b = a ^ b ^ b = a ^ (b ^ b) = a ^ 0 = a;

3.简单字符串加密

```javascript
const key = 313;
  function encryption(str) {
      let s = '';
      str.split('').map(item => {
        s += handle(item);
      })
      return s;
  }
  
  function decryption(str) {
    let s = '';
    str.split('').map(item => {
        s += handle(item);
    })
    return s;
  }
  
  function handle(str) {
      if (/\d/.test(str)) {
        return str ^ key;
      } else {
        let code = str.charCodeAt();
        let newCode = code ^ key;
        return String.fromCharCode(newCode);
      }
  }

  let init = 'hello world 位运算';
  let result = encryption(init);             
  let decodeResult = decryption(result);     // hello world 位运算
```

## **<<** 左移 
该操作符会将第一个操作数向左移动指定的位数。向左被移出的位被丢弃，右侧用 0 补充。

例如 3 << 2 的运算图示如下：
3 = 0000 0000 0000 0000 0000 0000 0000 0011
12 = 0000 0000 0000 0000 0000 0000 0000 1100
对任一数值 x 进行左移
`x * 2^n`
>应用场景：

```javascript
function RGBToHex(rgb){
    // 取出rgb中的数值
    let arr = rgb.match(/\d+/g);
    if (!arr || arr.length !== 3) {
        console.error('rgb数值不合法');
        return
    }
    let hex = (arr[0]<<16 | arr[1]<<8 | arr[2]).toString(16);
    // 自动补全第一位
    if (hex.length < 6) {
        hex = '0' + hex;
    }
    return `#${hex}`;
}
```
## **>>** 右移 
该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧。
由于新的最左侧的位总是和以前相同，符号位没有被改变。所以被称作“符号传播”。
对任一数值 x 进行右移n, 相当于十进制里的除以10的倍数，
在这里是指除以数之后取整
`x / 2^n`
>应用场景：

十六进制转RGB
```javascript
function hexToRGB(hex){
    if (!/^#([0-9a-fA-F]{3}){1,2}$/.test(hex)) {
        console.error('颜色不合法'); 
        return
    };
    // #f00 转为 #ff0000
    if (hex.length == 4) {
        hex = hex.replace(/([0-9a-fA-F])/g, '$1$1');
    };
    let num = hex.replace('#', '0x');
    let r = num >> 16;
    // 0xff = 255
    let g = num >> 8 & 0xff;
    let b = num  & 0xff;    
    return `rgb(${r},${g},${b})`;
}
```
## **>>>** 无符号右移
该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。
因为符号位变成了 0，所以结果总是非负的。（译注：即便右移 0 个比特，结果也是非负的。）

[参考](https://www.cnblogs.com/mopagunda/p/11221928.html)