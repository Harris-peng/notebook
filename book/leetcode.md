# 算法题

## 1. 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}" 输出: true 

```javascript
var isValid = function(s) {
    if(s.length % 2 !== 0) return false;
    const map = {
        '(': -1,
        ')': 1,
        '{': -2,
        '}': 2,
        '[': -3,
        ']': 3,
    }
    let stark = [];
    for(let i = 0; i < s.length; i++) {
        const cur =  map[s[i]];
        if (cur < 0) {
            stark.push(cur);
        } else {
            const val = stark.pop();
            if (cur + val !== 0) return false;
        }
        
    }
    if (stark.length !== 0) return false;
    return true;
};

// 另一种思路
var isValid = function(s) {
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    let stark = [];
    for(let i = 0; i < s.length; i++) {
        const cur =  s[i];
        if (cur in map) {
            stark.push(map[cur]);
        } else {
            const val = stark.pop();
            if (cur!== val) return false;
        }
        
    }
    return !Boolean(stark.length);
};
```
function test (arr, target) { 
    let map
 }

```