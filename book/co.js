/**
 * Created by 70570 on 2020/2/19.
 * @param {Object}
 * @example
 *  insId: 组织结构id
 * @return{Object}
 *  name:70570
 * @example
 *
 */
function *gen() {
  yield thunk()
}
const g = gen();
function co(g) {
  const next = function (data) {
    const res = g.next;
    if (res.done) return;
    res.value.then(data => {
      next(data);
    })
  }
}
function thunk (fs) {
  return new Promise((resolve, reject) =>{
    fs.then((...arg) => {
      resolve(arg)
    }).catch((...err) => {
      reject(err)
    })
  })
}
