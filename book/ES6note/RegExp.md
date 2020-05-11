# ES6 基础入门笔记
## 正则的扩展
* `RegRxp`构造函数新增接受正则表达式作为参数。
* 新增`u` `y`修饰符。
* 新增`sticky`属性，表示是否使用了y修饰符。
* 新增`flags`属性,会返回正则表达式的修饰符。
* 新增`RegExp.escape`将字符串转译，因为在将来的版本中，字符串必须转译之后才能作为正则模式
> ### 示例
```javascript
    var regex = new RegExp("xyz","i");
    var regex = /xyz/i;
    //在ES6中构造函数允许接受正则表达式作为参数。
    var regex = new RegExp(/xyz/i);
``` 

***

```javascript
    //u 修饰符能够正确识别码点大于0xffff的字符
    /^\ud83d/u.test('\ud83d\udc2a')
    //false
    /^\ud83d/.test('\ud83d\udc2a')
    //true
    //新增使用大括号表示`Unicode`字符的表示法
    /\u{61}/.test('a') //false
    /\u{61}/u.test('a') //true
    /\u{20bb7}/u.test('𠮷') //true
    
    //新增*y*修饰符作用与*g*类似也是全局匹配
    var s = "aaa_aa_a";
    var r1 = /a+/g;
    var r2 = /a+/y;
    r1.exec(s) //["aaa"]
    r2.exec(s) //["aaa"]
    
    r1.exec(s) //["aa"]
    r2.exec(s) //null
    /*
    g修饰符只要剩余的位置中存在匹配就行，而y修饰符会确保匹配必须
    从剩余的第一个位置开始
    上面的代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个
    正则表达式各执行了两次，第一次执行的结果相同，剩余的字符串都是'_aa_a'
    由于g修饰符没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配
    必须从头部开始，所以返回null。
    */
    
    //ES6新增正则对象sticky属性，表示是否设置了y修饰符
    var r = /hello/y;
    r.sticky //true 
    
    //ES6新增了flags属性，会返回正则表达式的修饰符
    /abc/gi.flags
    //gi 
    
    //字符串必须经过转译之后才能作为正则模式。
    var str = "hello. how are you?"
    RegExp.escape(str);
    //hello\. how are you\?"
    //实现方法
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
    }
    //已经有提议将这个需求标准化，作为RegExp对象的静态方法放入ES7
        
```
