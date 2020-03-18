const mvvm = function () {

}
const Observe = function (obj) {
  Object.keys(obj).forEach(key => {
    if(!obj['__ob__']) {
      obj['__ob__'] = new Def(obj, key, obj[key]);
    }
    if (typeof obj[key] === 'object') Observe(obj[key]);
  })
}
const Def = function (obj, key, val) {
  const  dep =  Dep();
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get() {
      if(Dep.target) {
        dep.add();
        Dep.target = null;
      }
      return this.value;
    },
    set(v) {
      if (val === v) return;
      this.value = v;
      dep.notify();
    }
  })
}
class Dep {
  constructor() {
    this.list = [];
  }
  add () {
    this.list.push(Dep.target);
  }
  notify () {
    this.list.forEach(cb => cb());
  }
}
class Watcher {
  constructor() {
  }


}
class Compare {

}
