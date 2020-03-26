//不考虑去重：
// var arr = [[1, 2], [0, 3, 5], [-1, 4]];
// arr = arr
// .reduce((a, b) => a.concat(b), [])
// .sort((a, b) => a - b); // 如果需要从小到大排序加上这个
 
// console.log(arr);   //  输出 [-1, 0, 1, 2, 3, 4, 5]
//考虑去重（数组转化为对象，利用对象键名唯一性，然后.keys一次性取键名）
var arr = [[1, 2], [0, 3, 5], [-1, 4]];
var obj = {};
 
arr = arr.forEach(item => item.forEach(function(num) {
        obj[num] = true;
    })); 
arr = Object.keys(obj)
    .map(num => +num) // 这行主要是将键名取出来之后，数组中全部是字符串，将其都转成数字，以便后面排序
    .sort((a, b) => a - b);
 
console.log(arr);