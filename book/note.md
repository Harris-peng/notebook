#笔记
## CSS
`-webkit-user-drag: element;` 和`draggable` 同时使用会导致 `draggable`失效

## JS

### 尾递归
正常的递归
```javascript
function fb (num) {
	if (num <= 2) return 1;
	return fb(num -1) + fb(num -2)
} 
```
尾递归实现的fb
```javascript
function fb (num,a=1,b=1) {
	if (num <=2) return b;
	return fb(num-1,b,a+b)
} 
```