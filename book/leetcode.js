var findMedianSortedArrays = function(nums1, nums2) {
    const nums = nums1.concat(nums2).sort((a, b) => a-b);
    const len = nums.length;
    let res;
    let mid = ~~(len/2);
    if (len%2) {
        res = nums[mid];
    } else {
        res = (nums[mid - 1] + nums[mid])/2;
    }
    return res
};
var findMedianSortedArrays = function(nums1, nums2) {
    debugger;
    let sort_list = [];
    let long,short;
    if (nums1.length > nums2.length) {
        long = nums1;
        short = nums2;
    } else {
        long = nums2;
        short = nums1;
    }
    const long_len = long.length;
    const short_len = short.length;
    const mid = ~~((short_len + long_len)/2);
    // 判断临界情况
    if ((short[short_len - 1] || -Infinity) <= long[0]) {
        sort_list = short.concat(long);
    } else if (short[0] >= long[long_len -1 ]){
        sort_list = long.concat(short);
    } else {
        let index = 0;
        const short_max = short[short_len - 1];
        // 排序
        for(let i = 0; i < long_len; i++ ) {
            index = i;
            if (long[i] > short_max) {
                break;
            }
        }
        index++;
        sort_list = short.concat(long.slice(0, index)).sort( (a, b) => a - b ).concat(long.slice(index))
    }

    if ((short_len + long_len)%2) {
        return sort_list[mid];
    } else {
        return (sort_list[mid - 1] + sort_list[mid])/2;
    }
};
var lengthOfLongestSubstring = function(s) {
    var i=0, res=0, n=0;
    debugger;
    for (var j = 0; j < s.length; j++){
        n = s.slice(i,j).indexOf(s[j])
        if (n == -1){
            res = Math.max(res,j+1-i);
        }else{
            i += n+1;
        }
    }
    return res;

};
/*
var lengthOfLongestSubstring = function(s) {
    const map = new Set();
    const len = s.length;
    let num = 0;
    let his = '';
    debugger;
    for(let i =0 ;i < len; i++ ) {
        const val = s[i];
        if (map.has(val)) {
            const size = map.size;
            num > size ? num : num = size;
            clear(val);
        }
        his += val;
        map.add(val);
    }
    function clear (val) {
        const len = his.length;
        for (let i = 0; i < len; i++) {
            if (his[i] === val) {
                his = his.slice(i + 1);
                map.delete(val);
                break;
            }
            map.delete(his[i]);
        }
    }
    return num > map.size ? num : map.size
};

*/




/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let res = new ListNode();
    let bit = 0;
    let pointer = res;
    let flag = true;
    while (flag) {
        const all = l1.val + l2.val + bit;
        bit = ~~(all/10);
        pointer.val = all%10;
        l1 = l1.next;
        l2 = l2.next;
        if (!l1) {
            pointer.next = l2;
            flag = false;
        } else if (!l2) {
            pointer.next = l1;
            flag = false;
        } else {
            pointer.next = new ListNode();
            pointer = pointer.next;
        }
    }
    while (bit) {
        if (pointer.next) {
            pointer = pointer.next;
            const all = pointer.val + bit;
            bit = ~~(all/10);
            pointer.val = all%10;
        } else {
            pointer.next = new ListNode(bit);
            bit = 0;
        }
    }
    return res;
};

// 1. 两数之和
function test(arr, target) {
    let map = new Map();
    let len = arr.length;
    for (let i = 0 ; i < len ; i++) {
        const val = target - arr[i];
        if (map.has(val)) {
            return [map.get(val), i];
        } else {
            map.set(arr[i], i);
        }
    }
    return [];
}
const sort = (arr, comparefn) => {
    let array = Object(arr);
    let length = array.length >>> 0;
    return InnerArraySort(array, length, comparefn);
}

const InnerArraySort = (array, length, comparefn) => {
    // 比较函数未传入
    if (Object.prototype.toString.call(comparefn) !== "[object Function]") {
        comparefn = function (x, y) {
            if (x === y) return 0;
            x = x.toString();
            y = y.toString();
            if (x == y) return 0;
            else return x < y ? -1 : 1;
        };
    }
    const insertSort = (arr, start = 0, end) => {
        end = end || arr.length;
        for (let i = start; i < end; i++) {
            let e = arr[i];
            let j;
            for (j = i; j > start && comparefn(arr[j - 1], e) > 0; j--)
                arr[j] = arr[j - 1];
            arr[j] = e;
        }
        return;
    }
    const getThirdIndex = (a, from, to) => {
        let tmpArr = [];
        // 递增量，200~215 之间，因为任何正数和15做与操作，不会超过15，当然是大于0的
        let increment = 200 + ((to - from) & 15);
        let j = 0;
        from += 1;
        to -= 1;
        for (let i = from; i < to; i += increment) {
            tmpArr[j] = [i, a[i]];
            j++;
        }
        // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
        tmpArr.sort(function (a, b) {
            return comparefn(a[1], b[1]);
        });
        let thirdIndex = tmpArr[tmpArr.length >> 1][0];
        return thirdIndex;
    };

    const _sort = (a, b, c) => {
        let arr = [];
        arr.push(a, b, c);
        insertSort(arr, 0, 3);
        return arr;
    }

    const quickSort = (a, from, to) => {
        //哨兵位置
        let thirdIndex = 0;
        while (true) {
            if (to - from <= 10) {
                insertSort(a, from, to);
                return;
            }
            if (to - from > 1000) {
                thirdIndex = getThirdIndex(a, from, to);
            } else {
                // 小于1000 直接取中点
                thirdIndex = from + ((to - from) >> 2);
            }
            let tmpArr = _sort(a[from], a[thirdIndex], a[to - 1]);
            a[from] = tmpArr[0]; a[thirdIndex] = tmpArr[1]; a[to - 1] = tmpArr[2];
            // 现在正式把 thirdIndex 作为哨兵
            let pivot = a[thirdIndex];
            [a[from], a[thirdIndex]] = [a[thirdIndex], a[from]];
            // 正式进入快排
            let lowEnd = from + 1;
            let highStart = to - 1;
            a[thirdIndex] = a[lowEnd];
            a[lowEnd] = pivot;
            // [lowEnd, i)的元素是和pivot相等的
            // [i, highStart) 的元素是需要处理的
            for (let i = lowEnd + 1; i < highStart; i++) {
                let element = a[i];
                let order = comparefn(element, pivot);
                if (order < 0) {
                    a[i] = a[lowEnd];
                    a[lowEnd] = element;
                    lowEnd++;
                } else if (order > 0) {
                    do{
                        highStart--;
                        if (highStart === i) break;
                        order = comparefn(a[highStart], pivot);
                    }while (order > 0) ;
                    // 现在 a[highStart] <= pivot
                    // a[i] > pivot
                    // 两者交换
                    a[i] = a[highStart];
                    a[highStart] = element;
                    if (order < 0) {
                        // a[i] 和 a[lowEnd] 交换
                        element = a[i];
                        a[i] = a[lowEnd];
                        a[lowEnd] = element;
                        lowEnd++;
                    }
                }
            }
            // 永远切分大区间
            if (lowEnd - from > to - highStart) {
                // 单独处理小区间
                quickSort(a, highStart, to);
                // 继续切分lowEnd ~ from 这个区间
                to = lowEnd;
            } else if (lowEnd - from <= to - highStart) {
                quickSort(a, from, lowEnd);
                from = highStart;
            }
        }
    }
    quickSort(array, 0, length);
}
