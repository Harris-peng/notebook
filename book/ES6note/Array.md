# ES6 基础入门笔记
## 数组的扩展
### 一 新增的方法

|方法名|参数|返回值|作用|
|-|-|-|-|
|`Array.from()`|对象|数组|将类似数组的对象和可遍历的对象转为数组|
|`Array.of()`|a,b,...|数组|将给定的一组值转为数组|
> #### 示例
```javascript
    var obj = {
        '0':'a',
        '1':'b',
        '2':'c',
    }
    //ES5的写法
    [].slice.call(obj);//['a','b','c',]
    //ES6的写法
    Array.from(obj)//['a','b','c',]
    Array.from('abc')//['a','b','c',]

    Array.of('a','b',1)//['a','b',1]
    Array.of(3)//[3]
```

***

### 二 数组实例的`copyWithin(targer,start,end)`
* 在当前数组内部指定位置的成员复制到其他位置，返回当前数组。
* target(必选) 从该位置开始替换数据
* srart(可选) 从该位置开始读取数据，默认是0.如果是赋值则表示倒数。
* end(可选) 从该位置前停止读取数据，默认等于数组长度如果为负值，则表示倒数。

```javascript
    [1,2,3,4,5].copyWithin(0,3)//[4,5,3,4,5]
    //上面的代码表示从3号位置直到数组结束的成员（4,5），复制到0号位置开始的位置，覆盖（1,2）
    [1,2,3,4,5].copyWithin(1,3,4)//[1,4,3,4,5]

    [1,2,3,4,5].copyWithin(0,-2,-1)//[4,2,3,4,5]
```

### 三 数组实例 `find()` 和 `findIndex() `和 `fill()`

* `find()`用于找出第一个符合条件的数组成员,符合返回为true的成员 否则返回`undefined`
* `findIndex()` 与find方法类似，用于找出第一个符合条件的数组成员，符合返回为true的成员的位置 否则返回`-1`
* `fill()` 用于给定值填充数组。

> #### 实例

```javascript
    [1,2,-5,5].find((n)=> n<0) //-5

    [1,2,10,15].find((val,index,arr)=> val>10) //15
    [1,2,10,15].findIndex(function(val,index,arr){ return val>10} ) //3
    //find和findIndex都接受三个参数，分别是当前的值，当前的位置，原数组。

    ['a','b','c'].fill(7) //[7,7,7]
    ['a','b','c'].fill(7,1,2) //['a',7,'c']
    //fill方法第一个参数是填充的值，还可以接受第二个参数和第三个参数分别代表填充的起始位置和结束位置
```

### 四 数组实例 `entries()` `keys()` `values()`
* 这三个方法都是用于遍历数组的
* `keys()`是对键名的遍历。
* `values()`是对键值的遍历。
* `entries()`是对键值对的遍历。

```javascript
    for(let index of ['a','b'].keys()){
        console.log(index);
    }
    // 0   1
    for(let [index,elem] of ['a','b'].entries()){
        console.log(index,elem);
    }
    // 0 'a'  1 'b'
    for(let elem of ['a','b'].values()){
         console.log(elem);
     }
    // 'a'  'b'
```
### 五 数组的实例`includes()`

* `Array.prototype.includes()` 返回一个布尔值，表示某个数组是否包含给定的值
* 第一个参数是给定的值，第二个参数是搜索的起始位置，默认为0 ，负数表示倒数
```javascript
    [1,2,3].includes(2) ;//true
    [1,2,NaN].includes(NaN) ;//true
    [1,2,3].includes(3,3) ;//false
    [1,2,3].includes(3,-1) ;//true
```

### 六 数组的空位
* 数组的空位指的是某个位置没有任何值
* 空位不是`undefined`,一个位置的值等于undefined依然是有值的，空位是没有任何值
* `forEach() filter() every() some()`都会跳过空位。
* `map()` 会跳过空位，但会保留其值。
* `join()` 和 `toString()` 会将空位视为undefined，而undefined和null会被处理成空字符串。
* `Array.from()`方法会将数组的空位转为undefined。
* `...`扩展运算符会将数组的空位转为undefined。
* `copyWithin()` 会连空位一起复制。
* `fill()` 会将空位视为正常的数组位置。
* `entries()` `keys()` `values()``find()``findIndex()`会将空位处理成`undefined`

```javascript
    0 in [undefined,undefined,undefined] //true
    0 in [,] //false

    [,'a'].forEach((x,i)=> console.log(i)); //1
    ['a',,'b'].filter( x => true ); //['a','b']
    [,'a'].every( x => x==='a' ); //true
    [,'a'].some( x => x!=='a' ); //false

    [,'a'].map( x => 1 ); //[,1]

    [,'a',undefined,null].join('#') //"#a##"

    [,'a',undefined,null].toString() //",a,,"

    Array.from(['a',,'b']) //['a',undefined,'b']
    [...['a',,'b']] //['a',undefined,'b']
    [,'a','b',,].copyWithin(2,0) //[undefined, "a", undefined, "a"]
    new Array(3).fill(2) //[2,2,2]

    //for...of循环也会遍历空位
    for(let i of [,,]){
        console.log(1)
    }
    //1  //1

    // entries()
    [...[,'a'].entries()] // [[0,undefined], [1,"a"]]

    // keys()
    [...[,'a'].keys()] // [0,1]

    // values()
    [...[,'a'].values()] // [undefined,"a"]

    // find()
    [,'a'].find(x => true) // undefined

    // findIndex()
    [,'a'].findIndex(x => true) // 0




