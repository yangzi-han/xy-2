var arr=[3,6,9,8,5,4,7]
//方法一
// arr.sort(function(a,b){
//     return a-b;
// }) 
// console.log(arr)
// console.log(arr[0]*arr[arr.length-1])


//方法二
function fn(arr){
    var max=arr[0];
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]>max)
        {
            max=arr[i]
        }
    }
    return max*arr[0]
}
console.log(fn(arr))