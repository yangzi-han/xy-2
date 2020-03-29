// 　　如果 b数组已经遍历完，a数组还有值 或 a[i] 的值 小于等于 b[i] 的值，则将 a[i] 添加进数组res，并 i++;
function mergeSortedArr(a, b) {
    if (!a || !b) {
        return;
    }; 
    let aEle = a[0], bEle = b[0], i = 1, j = 1, res = [];
    while (aEle || bEle) {
        if ((aEle && !bEle) || aEle <= bEle) {
            res.push(aEle);
            aEle = a[i++];
        }
        else {
            res.push(bEle);
            bEle = b[j++];
        }
    }
    return res;
}
console.log(mergeSortedArr([2, 5, 6, 9], [1, 2, 3, 29])) 