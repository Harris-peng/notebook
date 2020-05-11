# 算法题
## 算法复杂度log(N)
[log(N)](https://blog.csdn.net/bengxu/article/details/80320546)
[log(N)推导](https://www.cnblogs.com/glzgc/p/10831877.html)
[log(N)推导](https://www.cnblogs.com/javawebsoa/archive/2013/05/19/3087209.html)
## 数组排序
```javascript
const swap = function (arr, i, j) {
    const val = arr[i]
    arr[i] = arr[j];
    arr[j] = val;
}
const sort = function sort(a,b) {
    return (a - b) > 0
}
const mid = function (a, b = 0) {
    return (a + b) >> 1
}
// 冒泡
function bubble(array = [], sort) {
    for (let i = array.length - 1; i > 0; i--) {
        // 从 0 到 `length - 1` 遍历
        for (let j = 0; j < i; j++) {
            if (sort(array[j], array[j + 1])) swap(array, j, j + 1)
        }
    }
    return array;
}
// 插入
function insert(array, sort) {
    const len = array.length;
    for (let i=1; i< len; i++) {
        for (let j=i; j>0; j--) {
            if(sort(array[j], array[j-1])){
                swap(array, j, j - 1)
            }
        }
    }
    return array;
}
// 选择
function selection (array, sort) {
    const len = array.length;
    for (let i=0; i< len; i++) {
        let index = i;
        for (let j=i+1; j<len; j++) {
            if (sort(array[index], array[j])) index = j;
        }
        swap(array, i, index)
    }
    return array;
}
// 归并
function mergeSort(arr) {
    merge(arr, 0, arr.length-1)
    return arr;
}
function merge(arr, L, R) {
    const M = mid(L, R);
    if (L === R) return
    merge(arr, L, M);
    merge(arr, M+1, R);
    mergeinto(arr, L, M , R)
    return arr;
}
function mergeinto(arr, L, M, R) {
    const temp = [];
    let i = L,j = M+1;
    while (i <= M && j<= R) {
        if (sort(arr[i], arr[j])) {
            temp.push(arr[i])
            i++;
        } else {
            temp.push(arr[j])
            j++;
        }
    }
    while (i<= M) {
        temp.push(arr[i])
        i++;
    }
    while (j<= R) {
        temp.push(arr[j])
        j++;
    }
    for (let n= 0;n<temp.length;n++) {
        arr[n+L] = temp[n]
    }
    return arr;
}

// 快排
function quckicSort(arr, L = 0, R = arr.length-1) {
    if (L >= R) return
    const value = arr[mid(L, R)];
    let i = L;
    let j = R;
    while (i <= j) {
        while (sort(arr[i], value)) {
            i++
        }
        while (sort(value, arr[j]) ) {
            j--
        }
        if (i <= j) {
            swap(arr, i++, j--);
        }
    }
    quckicSort(arr, L, i-1)
    quckicSort(arr, i, R)
    return arr;
}
```



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


```
16 * 1/2 8
 8 * 1/2 4
 4 * 1/2 2
 2 * 1/2 1

 16 * 1/2^4 = 1
 n * 1/2^k = 1
 n/2^k = 1
 n = 2^k
 k = log2(n)
```
