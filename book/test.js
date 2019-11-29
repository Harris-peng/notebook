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
