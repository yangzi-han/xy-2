// //求出一组数中的最大值
//第一种
var arr=[45,234,24,34,35,4,6,57,65];
function maxValue(arr){
    var max=0
    for(var i=0; i<arr.length; i++){
        if(max<arr[i]){
            max=arr[i];  
        }
    }
    return max               
}
console.log(maxValue(arr));	
//第二种
var arr=[45,234,24,34,35,4,6,57,65];
function max(arr){
    var max=0
    arr.sort((a,b)=>{
        return a-b
    })
    return arr[arr.length-1]
}
console.log(max(arr))