# ES6 基础入门笔记
## 变量的解构赋值
### 一 数组的解构赋值
* 数组的解构赋值会按照对应的关系进行变量的赋值，这种写法属于*模式匹配* 只要等号两边的模式相同，左边的变量就会被赋予对应的值
* 变量如果解构不成功就会等于*undefined*
* 如果左边的模式职匹配右边的模式的一部分，解构依旧可以成功
* 如果等号的右边不是数组或者说不是可遍历的解构则会报错，只要某种数据解构具有*Iterator*接口，都可以采用数组的解构赋值
* 解构赋值允许指定默认值
* 如果一个数组成员不严格等于*undefined*,默认值是不会生效的。
* 默认值如果是一个表达式，那么这个表达式是惰性求值的。
```javascript
    let [foo,[[bar],[baz]]] = [1,[[2],[3]]];
    foo//1
    bar//2
    baz//3
```

***

```javascript
    var [foo] = [,2,3]
    foo//undifind
```

***

```javascript
    let  [a,[b],c] = [1,[2,3],4];
    a//1
    b//2
    c//4
```

***

```javascript
    let [foo] =1
    //上述表达式会报错因为等号右边的的值不具备*Iterator*接口
```

***

```javascript
    function* fibs(){
        var a = 0;
        var b = 1 ;
        while(true){
            yield a ;
            [a,b] = [b, a+b];
        }
    }
    let  [a,b,c,d,e,f,g]  = fibs();
    g//8
```

***

```javascript
    let [x=1,y=2] = [undefined,null] ;
    x//1
    y//null
```

***

### 二 对象的解构赋值
* 数组的解构是按次序的而对象的解构赋值是变量必须同属性同名
* 对象的解构赋值同样可以用于嵌套的数据解构
* 对象的解构赋值可以指定默认值
* 如果解构赋值中子对象所在的父属性不存在，那么将会报错
> #### 示例
```javascript
    let {foo,bar} = {foo:1,bar:2};
    foo//1
    bar//2
```

***

```javascript
    let obj = {
          p:[
            1,
            {y:2}
          ]
       }
    let {p:[x,{y}]} = obj
    x//2
    y//2
```

***

```javascript
    let {x,y=5} = {x:1}
    x//1
    y//5
```

***

```javascript
    let {foo:{baz}} = {baz:1};
    baz//报错 子对象的父属性不存在
```

***

```javascript
    var x ;
    {x} = {x:1};
    //这样写会报错，因为解析引擎会将*{x}*理解成一个代码块
    //正确的写法
    ({x}= {x:1});
```

***

### 三 字符串、数值、布尔值的解构赋值
* 字符串会将每个字符赋予给变量
* 解构赋值时数值和布尔值会先转换成对象，在进行解构赋值
> #### 示例

```javascript
    const [a,b,c,d,e,f] = 'hellow';
    a//"h"
    f//"w"
```

***

```javascript
    let {toString:s} = 123;
    s === Number.prototype.toString //true
    let {toString:s} = true  ;
    s === Boolean.prototype.toString //true
```

### 四 函数参数的解构赋值
* 函数的参数为数组或者对象，但实际上它会通过解构得到对应的变量
* 函数参数的解构赋值可以使用默认值
> #### 示例

```javascript
    function add ([x,y]){
        return x+y;
    }
    add([1,2])//3
```

***

```javascript
    function move({x=0,y=0}){
        return [x,y]
    }
    move({x:3,y:5})//[3,5]
    move()//[0,0]
```

***

```javascript
    function move({x,y} = {x:0,y:0}){
        return [x,y]
    }
    move({x:3,y:5})//[3,5]
    move({x:3})//[3,undefined]
    move({})//[undefined,undefined]
    move()//[0,0]
    //上述这种写法视为函数的参数指定默认值，只有当函数的参数不存在的时候才会生效。
```

### 五 解构赋值的用途
* 交换变量的值
* 函数返回多个值时方便取用
* 方便函数参数的定义
* 提取JSON数据
* 方便遍历Map解构的数据
> #### 示例
```javascript
    let x = 1;
    let y = 2;
    [x,y] = [y,x];
```

***

```javascript
    function exp(){
        return [1,2,3];
    }
    let [a,b,c] = exp();

    function f({x,y,z}){...}
    f({x:1,y:2,z:3});

    let jsonData = {
        id:42,
        status:"ok",
        data:[1,2]
    }
    let {id,status,data:number} = jsonData ;
    console.log(id,status,number) //42,ok,[1,2]
```

***

```javascript
    let map = new Map();
    map.set('first','hello');
    map.set('second','world');
    for(let [key,value] of map){
        console.log(key+'is'+value);
    }
    //first is hello
    // second is world
```