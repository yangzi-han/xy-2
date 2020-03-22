//封装一个函数，将函数的内容反转
var arr = [1, 2, 3, 4, 5];
//第一种
function reverse(arr) {
    var arr1 = [];
    for (var i = 0; i < arr.length; i++) {
        arr1.unshift(arr[i]);
    } 
    return arr1;
}
console.log(reverse(arr));
//第二种
function strfz(arr){
    let newarr=[]
    for(let i=arr.length-1;i>=0;i--){
        newarr.push(arr[i])
    }
    return newarr
}
console.log(strfz(arr))
