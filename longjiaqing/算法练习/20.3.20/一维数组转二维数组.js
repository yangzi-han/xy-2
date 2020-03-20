/*  * 一维数组转二维数组
    *对arr这个一维数组做二维数组的转换，
    * 形成一个二维数组,最后一组不够时，只放剩余值。
    *如:数组   arr = [1,2,3,4,5,6,7,8,9,10];  
    *生成新数组 newArr = [[1,2],[3,4],[5,6],[7,8],[9,10]];
*/
//第一种  
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function fn( arr) {
    let newArr = [];
    while (arr.length > 0) {
        newArr.push(arr.splice(0, 2));
    }
    return newArr;
}
console.log(fn(arr));
//第二种
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function arrTrans(num, arr1) { // 一维数组转换为二维数组
    let newArr = []; // 声明数组
    arr1.forEach((item, index) => {
        let page = Math.floor(index / num); // 计算该元素为第几个素组内
        if (!newArr[page]) { // 判断是否存在
            newArr[page] = [];
        }
        newArr[page].push(item);
    });
    return newArr;
}
console.log(arrTrans(2, arr1))