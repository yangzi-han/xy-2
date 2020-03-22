/*案例2：封装一个函数，对二维数组求和*/
var arr1 = [
    [1, 2, 3],
    [4, 5, 6]
]; 
//第一种
function fn(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            sum += arr[i][j];
        }
    }
    return sum;
}

var res = fn(arr1);
console.log(res);

// 第二种
function fn2(arr) {
    var sum = 0;
    arr.map((item)=>{
        item.map(itemr=>{
            return sum+=itemr
        })
    })
    return sum
}

console.log(fn2(arr1));