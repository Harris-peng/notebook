#面试题

## 1. 数组和链表的区别

**数组：**
数组是将元素在内存中连续存放，由于每个元素占用内存相同，可以通过下标迅速访问数组中任何元素。
但是如果要在数组中增加一个元素，需要移动大量元素，在内存中空出一个元素的空间，然后将要增加的元素放在其中。
同样的道理，如果想删除一个元素，同样需要移动大量元素去填掉被移动的元素。如果应用需要快速访问数据，很少或不插入和删除元素，就应该用数组。

**链表:**
链表恰好相反，链表中的元素在内存中不是顺序存储的，而是通过存在元素中的指针联系到一起。
比如：上一个元素有个指针指到下一个元素，以此类推，直到最后一个元素。如果要访问链表中一个元素，
需要从第一个元素开始，一直找到需要的元素位置。但是增加和删除一个元素对于链表数据结构就非常简单了，
只要修改元素中的指针就可以了。如果应用需要经常插入和删除元素你就需要用链表数据结构了。

**对比:**
1. 数组静态分配内存，链表动态分配内存；

2. 数组在内存中连续，链表不连续；

3.数组元素在栈区，链表元素在堆区；

4. 数组利用下标定位，时间复杂度为O(1)，链表定位元素时间复杂度O(n)；

5. 数组插入或删除元素的时间复杂度O(n)，链表的时间复杂度O(1)。
[ jianshu  ](https://www.jianshu.com/p/85fda79ee74d)<br/>
[ tencent  ](https://cloud.tencent.com/developer/article/1444059)<br/>

## 2. js的事件处理机制

## 3. 类A继承类B实例化A a的原型链是怎样的

```javascript
class TESTB {
    constructor (name) {
        this.name = name;
    }
    name (name) {
        console.log(this.name);
    }
}

class TESTA extends TESTB{
    constructor (value, name) {
        super(name);
        this.value = value;
    }
    say () {
        console.log(this.value);
    }
}

const test = new TESTA(11,'t4es');
console.log(test);

```