# ES6 基础入门笔记
## 字符串的扩展
### 二 字符串新增方法和作用
方法名|参数|作用|返回值
-|-|-|-
codePointAt() |（1）*位置* | 能够正确处理4个字节存储的字符|返回一个字符串对应位置的码点
String.fromCodePoint()|（0x20BB7）*码点*|从码点返回一个字符串|字符串
at()|（1）*位置*|可以识别Unicode编号大于0xFFFF的字符|字符
normalize()|('NFC')*NFC(默认参数)或 NFD或 NFKC 或NFKD*|Unicode正规化|字符
includes()|('o',2)*字符串* *开始搜索的位置*|表示是否找到参数字符串|布尔值
startsWith()|（'hello',2）*字符串* *开始搜索的位置*|表示参数字符串是否在源字符串的头部|布尔值
endsWith()|（'！',2）*字符串* *开始搜索的位置*|表示参数字符串是否在源字符串的尾部|布尔值
repeat()|（1）*次数*|将原字符串重复n次|字符串
padStart()|（5，'ab'）*最小长度* *补全的字符串*|会在头部补全给定字符串|补全的字符串
padEnd()|（5，'ab'）*最小长度* *补全的字符串*|会在尾部补全给定字符串|补全的字符串

> #### 示例

```javascript
    var s = '𠮷a';
    s.codePointAt(0)//134071
    s.codePointAt(1)//57271
    s.codePointAt(2)//97
    //codePointAt方法返回的是码点的十进制的值，如果想要十六进制的值，使用toString(16)
    s.codePointAt(0).toString(16)//"20BB7"
    //codePointAt方法的参数是字符在字符串中的位置（从0开始）
    //s中字符串"a"的位置序号应该为1，但是传入的确是2，解决这个问题是使用for...of循环
    var s = '𠮷a';
    for(let i of s){
        console.log(i.codePointAt(0).toString(16))
    }
    //"20bb7"
    //61
```

***

```javascript
    String.fromCodePoint(0x20bb7)
    //"𠮷"
    String.fromCodePoint(0x78,0x1F680,0x79) === 'x\ud83d\ude80y'
    //true
```

***

```javascript
    'abc'.at(0)//"a"
    "𠮷".at(0)//"𠮷"
    //at方法是ES7提供的可以识别Unicode大于0xffff的字符
```

***

```javascript
    '\u01d1'.normalize() == '\u004f\u030c'.normalize()
    //true
    //NFC,默认参数，表示*标准等价合成*，返回多个简单字符的合成字符，
    //NFD,表示*校准等价分解*，即在标准等价的前提下，返回合成字符分解的多个简单字符。
    //NFKC,表示*兼容等价合成*，返回合成字符，
    //NFKD,表示*兼容等价分解*，即在兼容等价的前提下，返回合成字符分解出的多个简单字符。
    '\u004f\u030c'.normalize('NFC').length //1
    '\u004f\u030c'.normalize('NFD').length //2
    //normalize目前不能识别3个或者3个以上的字符的合成。
```

***

```javascript
    var s = 'hello world';
    s.startsWith('hello')//true
    s.endsWith('!')//true
    s.includes('o')//true
    //他们都支持第二个参数
    s.startsWith('world',6)//true
    s.endsWith('hello',5)//true
    s.includes('hello',6)//false
```

***

```javascript
    'x'.repeat(3) //'xxx'
    'x'.repeat(3.4) //'xxx' 参数为小数是会被取整
    //参数为小数挥着*Infinity*,会报错，但如果参数在0到-1之间则等同于0，*NaN*等同于0
    //参数是字符串是会先转换成0
```

***

```javascript
    'x'.padStart(5,'ab') //'ababx'
    'x'.padEnd(5,'ab') //'xabab'
    'x'.padEnd(5) //'x    ' 如果省略最后一个参数则会用空格补全
```

### 二 字符串的*Unicode*表示法
* JavaScript允许采用\\uxxxx的形式表示字符串，超出这个范围的必须用2个双字符的形式来表示
* ES6对这一点进行了改进，只要将码点放在大括号内，就能正确的解析该字符串。

```javascript
    "\u0061"
    //a
    "\uD842\uDFB7"
    //𠮷
    "\u20BB7"
    //ES5中" 7"
    //ES6𠮷
```

### 三 字符串的便利器接口
* ES6为字符串添加了遍历器接口使用 `for...of` 循环能够正确的识别码点大于0xFFFF的字符串
> #### 示例
```javascript
    for(let i of 'fo𠮷'){
        console.log(i)
    }
    //"f"
    //"o"
    //"𠮷"
```

### 四 模板字符串
* 模板字符串是增强版的字符串适应反引号（ `  ）标识，它可以当做普通字符串模板使用，也可以用来定义多行字符串，或者嵌入变量。
* 大括号内可以放任意JavaScript表达式，甚至是函数。
> #### 示例
```javascript
    `这是一段普通字符串`
    
    `
    这是一段多行
    字符串
    `
    var a = '我是嵌入的变量'
    `Hello ${a} World```
    //"Hello 我是嵌入的变量 World"
        
    var [a,b]= [1,4];
    `${a} + ${b} = ${a+b} ` ;
    //1 + 4 = 5 

```

### 五 模板编译

* 模板字符串生成正式模板的实例

```javascript
      var template = `
        <ul>
            <% for(var i = 0;i<data.sup.length; i++){%>
            <li><%= data.sup[i] %></li>
            <% } %>
        <ul>
        `;//这是一个字符串模板
        function complie(template) {
            var evalExpr = /<%=(.+?)%>/g  ;
            var expr = /<%([\s\S]+?)%>/g ;
            template = template
                .replace(evalExpr,'`); \n echo($1); \n echo(`')
                .replace(expr,'`); \n  $1 \n echo(`')
             //使用正则替换模板内的数据生成如下
             /*
              "<ul>
                 `);
                for(var i = 0;i<data.sup.length; i++){
                  echo(`
                     <li>`);
                  echo( data.sup[i] );
                  echo(`</li>
                         `);
                    }
                  echo(`
                 <ul>
                 "
             */
            template = 'echo(`'+ template +'`)';
            var script =
                `(function parse(data){
                  var output = '';
                  function echo(html){
                    output +=html;
                  }
                  ${template}
                  return output ;
                })
                `;
            return script ;
        }
        var parse = eval(complie(template));
        //生成的一个script经过eval解析
        /*
        (function parse(data){
                var output = '';
                function echo(html){
                    output +=html;
                }
                echo(`
            <ul>
                `);
                for(var i = 0;i<data.sup.length; i++){
                    echo(`
                <li>`);
                    echo( data.sup[i] );
                    echo(`</li>
                `);
                }
                echo(`
            <ul>
            `)
                return output ;
            })*/
    
    var div= document.getElementById('div');
    div.innerHTML = parse({sup:["aa","bbb","ccc"]});//执行parse方法生成HTML
```