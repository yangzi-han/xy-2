// // 4、编程实现IndexOf方法
var brr = [5, 9, 6, 3, 2, 8];
//第一种
function indexfun(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
    return -1;
}
console.log(indexfun(brr, 13));
 
//第二种
function indexof2(arr,index){
    let i=0
    while(i<arr.length){
        if(arr[i]==index){
            return i
        }
        i++
    }
    return -1
}
console.log(indexof2(brr,8))

