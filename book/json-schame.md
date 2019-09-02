# JSONSchame

## 1. 定义
JSONSchema  是一种基于 JSON 格式定义 JSON 数据结构的规范
* 描述现有数据格式。
* 干净的人类和机器可读的文档。
* 完整的结构验证，有利于自动化测试。
* 完整的结构验证，可用于验证客户端提交的数据。

## 2. 优点
JSON Schema可以解决下列有关一致性验证的问题。
* 值的数据类型是否正确：可以具体规定一个值是数字、字符串等类型；
* 是否包含所需的数据：可以规定哪些数据是需要的，哪些是不需要的；
* 值的形式是不是我需要的：可以指定范围、最小值和最大值。

### 3.1 基础语法

>**$schema**

声明jsonschema架构关键字，指出此架是构根据标准的特定草稿编写的。
`"$schema": "http://json-schema.org/draft-07/schema#"`
>**$id** 

架构关键字，定义模式的URI，并解析模式中其他URI引用的基URI。
>**type** 

type 指定对象或属性的类型

type关键字|指定对象或属性的类型
:--:|:--:|
string|字符串
number|数字
integer|整型
boolean|布尔值
object|对象
array|列
array (with “uniqueItems”:true)| 唯一列
null|空
any|任意

>**title** 

title 关键字标题，可省略

>**description**

description关键字注释含义，可省略

>**required**

required关键字是一个字符串数组，验证必需包含的键。

##4. 示例

type | object、array、string、integer、number、boolean

### 4.1 **type|Object**
```
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a product",
            "type": "integer"
        },
        "name": {
            "description": "Name of the product",
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["id", "name", "price"]
}

```

关键字|描述
:--:|:--:
type|类型
properties|定义属性
required|必需属性
maxProperties|最大属性个数
minProperties|最小属性个数
additionalProperties|true or false or object	

>>备注

`additionalProperties`关键字用于控制额外内容的处理，即名称未在`properties`关键字中列出的属性 。默认情况下，允许任何其他属性。
`additionalProperties`关键字可以是一个布尔值或对象。如果`additionalProperties`是布尔值并设置为`false`，则不允许其他属性。

```
{
  "type": "object",
  "properties": {
    "number":      { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "type": "string",
                     "enum": ["Street", "Avenue", "Boulevard"]
                   }
  },
  "additionalProperties": false
}
```
`{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue" }` <span style="color: blue">√</span> <br/>
`{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue", "direction": "NW" }` <span style="color: red">×</span>

### 4.2 **type|Array**
```

{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "array",
    "items": {
        "type": "string"
     },
     "minItems": 1,
     "uniqueItems": true
}

```

关键字|描述|示例
:--:|:--:|:--:|
items|array 每个元素的类型|-
minItems|约束属性，数组最小的元素个数|-	 
maxItems|约束属性，数组最大的元素个数|-	 
uniqueItems|约束属性，每个元素都不相同	|- 
additionalProperties|约束items的类型，不建议使用|[示例](https://json-schema.org/understanding-json-schema/reference/array.html)
Dependencies|属性依赖|[示例](https://json-schema.org/understanding-json-schema/reference/object.html)
patternProperties|-|[示例](https://json-schema.org/understanding-json-schema/reference/array.html)


### 4.3 **type|String**
```
{
   "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "ip": {
            "mail": "string",
            "pattern":"w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*"
        },
        "host": {
            "type": "phoneNumber",
            "pattern":"((d{3,4})|d{3,4}-)?d{7,8}(-d{3})*"
        },
    },
    "required": ["ip", "host"]
}
```
关键字|描述
:--:|:--:|
maxLength|定义字符串的最大长度，>=0	
minLength|定义字符串的最小长度，>=0
pattern|用正则表达式约束字符串


### 4.4 **type|Integer**
```
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the product",
            "type": "string"
        },
        "price": {
            "type": "integer",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["id", "name", "price"]
}
```
关键字|描述
:--:|:--:|
minimum|最小值即大于等于
exclusiveMinimum|如果存在 "exclusiveMinimum" 并且具有布尔值 true，如果它严格意义上大于 "minimum" 的值则实例有效。	 
maximum|约束属性，最大值	 
exclusiveMaximum|如果存在 "exclusiveMinimum" 并且具有布尔值 true，如果它严格意义上小于 "maximum" 的值则实例有效。	 
multipleOf|是某数的倍数，必须大于0的整数

### 4.5 **type|Number**
```

{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "name": {
            "description": "Name of the product",
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["id", "name", "price"]
}
```
## 5. 逻辑组合

关键字：allOf, anyOf, oneOf, not

### 5.1 **allOf**
满足allOf数组中的所有Json Schema。
```
{
    "allOf" : [
        Schema_base
    ]
    "properties" : {
        "other_pro1" : {"type" : "string"},
        "other_pro2" : {"type" : "string"}
    },
    "required" : ["other_pro1", "other_pro2"]
}
```
Json数据既需要满足Schema_base，又要具备属性"other_pro1"、"other_pro2"。
> 示例
```
{
  "allOf": [
    { "type": "string" },
    { "maxLength": 5 }
  ]
}
"short" // √
"too long" //×
```

### 5.2 **anyOf**
满足anyOf数组中的任意个Schema。
```
{
    "anyOf" : [
        Schema1,
        Schema2,
        ...
    ]
}
```
### 5.3 **oneOf**
满足且仅满足oneOf数组中的一个Schema，这也是与anyOf的区别。
```
{
    "oneOf" : [
        Schema1,
        Schema2,
        ...
    ]
}
```
### 5.4 **not**
这个关键字不严格规定Json数据应满足什么要求，它告诉Json不能满足not所对应的Schema
```
{
    "not" : {"type" : "string"}
}
```

## 6. 复杂结构

### 6.1 通过`definitions`关键字

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city":           { "type": "string" },
        "state":          { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },
  "type": "object",
  "properties": {
    "billing_address": { "$ref": "#/definitions/address" },
    "shipping_address": { "$ref": "#/definitions/address" }
  }
}

{
  "shipping_address": {
    "street_address": "1600 Pennsylvania Avenue NW",
    "city": "Washington",
    "state": "DC"
  },
  "billing_address": {
    "street_address": "1st Street SE",
    "city": "Washington",
    "state": "DC"
  }
}
```
###  6.2 **$id**
它声明了Schame的唯一标识符。
它声明了一个用于$ref解析URI的基URI 。
```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "address": {
      "$id": "#address",
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city":           { "type": "string" },
        "state":          { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },
  "type": "object",
  "properties": {
    "billing_address": { "$ref": "#address" },
    "shipping_address": { "$ref": "#address" }
  }
}
```

## 7. 通用关键字
### 7.1 **enum**
可以在任何json schema中出现，其value是一个list，表示json数据的取值只能是list中的某个。
```
{
    "type": "string",
    "enum": ["red", "amber", "green"]
}
```
上例的schema规定数据只能是一个string，且只能是"red"、"amber"、"green"之一。

### 7.2 **metadata**
关键字：title，description，default，example
```
{
    "title" : "Match anything",
    "description" : "This is a schema that matches anything.",
    "default" : "Default value",
    "examples" : [
        "Anything",
        4035
    ]
}
```
只作为描述作用，不影响对数据的校验。

## 8. 参考

[http://json-schema.org](http://json-schema.org/learn/getting-started-step-by-step.html#starting)<br/>
[understanding-json-schema](https://s://blog.csdn.net/silence_xiao/article/details/81303935)<br/>
[苦力笨笨](https://json-schema.org/understanding-json-schema/index.html)<br/>
[silence_xiao](httpwww.cnblogs.com/terencezhou/p/10474617.html)<br/>
[47号公路](https://www.jianshu.com/p/ddf23d33f8a1)<br/>
[红无酒伤 ](https://www.cnblogs.com/huanghongbo/p/8628607.html)<br/>
[ Crazymagic  ](https://www.cnblogs.com/crazymagic/articles/10472318.html)<br/>