/**
 * Created by dangpenghao on 2019/11/19.
 * @param {Object}
 * @example
 *  insId: 组织结构id
 * @return{Object}
 *  name:dangpenghao
 * @example
 *
 */
/*中位数*/

function midNum(nums1, nums2) {
  const len = nums1.length + nums2.length;
  const mid = Math.floor(len/2);
  const isold = !(len%2);
  let [index1, index2] = [0, 0];
  let res;

  /*for(let i = 0; i<=mid; i++) {
    const val1 = nums1[index1];
    const val2 = nums2[index2];
    if (val1 > val2) {
      res = val2;
      if(nums2[index2]) {
        index2++
      } else {
        index1++
      }
    } else {
      res = val1;
      if(nums1[index1]) {
        index1++
      } else {
        index2++
      }
    }
  }
  if (isold) {
    let next;
    if (nums1[index1]&&nums2[index2]) {
      next = nums1[index1] > nums2[index2] ? nums2[index2] : nums1[index1];
    } else if (nums1[index1]) {
      next = nums1[index1]
    }else {
      next = nums2[index2]
    }
    return  (next + res )/2
  } else {
    return res;
  }*/
}
midNum([1,2],[3,4]);

const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';
function Promise(handel) {
  this.status = PENDING;
  this.successList = [];
  this.catchList = [];
  this.val = [];
  if (typeof handel === 'function') {
    handel(resolve, reject)
  }
  this.then = function (success, reject) {
    return new Promise(function (fulResolve, fulReject) {
      const wrapSuccess= function () {
        if (typeof success === 'function') {
          success();
        }
        fulResolve(this.val);
      }
      const wrapCatch= function () {
        if (typeof reject === 'function') {
          reject();
        }
        fulReject(this.val);
      }
      this.successList.push(wrapSuccess);
      this.catchList.push(wrapCatch);
    })
  }
  this.resove = function (data) {
    if (this.status !== PENDING) {
      return
    }
    this.status = RESOLVE;
    if (data && data instanceof Promise) {
      data.then(res => {
        this.val = res;
        excSuccess();
      }).catch(res => {
        this.val = res;
        excCatch()
      })
    } else {
      excSuccess();
    }
    function excSuccess() {
      while (this.successList.length > 0) {
        this.successList.shift()(this.val);
      }
    }
    function excCatch() {
      while (this.successList.length > 0) {
        this.catchList.shift()(this.val);
      }
    }
  }
}