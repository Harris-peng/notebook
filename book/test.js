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
