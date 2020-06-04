const isObject = function (val) {
  return Object.prototype.toString.call(val) === "[object Object]";
};
const processKey = function (key) {
  return key.replace(/(_)(.)/g, function (match,$1, $2) {
    return  $2.toUpperCase()
  })
};
const needReplace = function (key) {
  return /_./.test(key);
};
function converter(obj) {
  let res = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (needReplace) {
      res[processKey(key)] = isObject(val) ? converter(val): val
    }
  })
  return res;
}
function sort(a, b) {
  return (a - b) > 0
}
function swap (list, i , j) {
  let a = list[i]
  list[i] = list[j];
  list[j] = a;
  return list
}
function maopao(list, sort) {
  for (let i = 0; i<list.length; i++) {
    for(let j = i + 1;  j < list.length; j++ ) {
      if (sort(list[i], list[j])) swap(list, i, j);
    }
  }
  return list;
}
function quicksort(arr = [], L = 0, R = arr.length-1) {
  if (L>=R) return
  const val = arr[~~((L+R)/2)];
  let i = L,j = R;
  while (i <= j) {
    while (sort(arr[i], val) && i <= j) {
      i++
    }
    while (sort(val, arr[j]) && j >i) {
      j--
    }
    if (i <= j) {
      swap(arr, i++, j--)
    }
  }
  quicksort(arr, L, i-1)
  quicksort(arr, i, R)
  return arr;
}
function co(gen) {
  gen = gen();
  return new Promise((resolve, reject) => {
    function next(val = undefined) {
       const res  = gen.next(val)
      if (res.done) return resolve(res.value);
      res.value.then(res => {
        next(res)
      }, reject)
    }
    next(undefined);
  })

}
