# ES6 基础入门笔记
## let和const命令
### 一 let命令
* let声明的变量存在在块级作用域中。
* 在for循环中使用let每次循环都相当于生成一个新的变量。
* let声明的变量不存在变量提升。
* let不可以在在相同作用域进行重复的声明。
> #### 示例

```javascript

var a = [];
for(let i = 0; i<10; i++){
    a[i]= function(){
        console.log(i);
    };
}
a[6]();//6
```

***

```javascript
console.log(foo)//ReferenceError
let foo = 1;
```

***

```javascript
var tmp = 123 ;
if(true){
    tmp = 'abc'//ReferenceError
    let tmp ;
}
//从var声明这个变量到tmp赋值这段区域被称为暂时性死区。
//let和const命令在声明之前使用就会报错。
```

***

```javascript
if(true){
    let tmp = 1;
    if(true){
        let tmp = 2;
        let tmp2 = 3;
        console.log(tmp);//2
    }
    console.log(tmp);//1
    console.log(tmp2);//tmp2 is not defined
}
//在块级作用域中声明的变量只在当前块中生效。
//同时外层代码块不受内层代码块的影响.
//外层作用域无法读取内层作用域的变量
```
### 二 const命令
* const是用来声明常量的。一旦声明，其值就不能改变（*复合类型的变量指向数据的地址，保证数据的地址不变*）。
* const声明的常量同样只在当前块中生效
* const声明的常量也不能提升，同样存在暂时性死区，只能在声明后使用
> #### 示例

```javascript
    const PI = 3.1415;
    PI//3.1415

    PI = 3;
    //TypeError:"PI" is read-only

```

***

```javascript
    if(true){
        console.log(MAX);//ReferenceError
        const MAX = 5;
    }

```

***

```javascript
    const foo = { };
    foo.name = 'dang';
    foo.name //dang

    foo = {};//Type Error: 'foo' is read-only
```