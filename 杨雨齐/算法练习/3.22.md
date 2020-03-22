1.
//数组的去重(利用递归去重)

function num(arr){
​     var array=arr    //数组
​     var len=array.length    //数组的长度
​     array.sort(function(a,b){   //先排序后去重
​           return a-b      
​     })
​     function loop(index){
​           if(index>=1){
​                  if(array[index]===array[index-1]){
​                          array.splice(index,1)
​                   }
​                   loop(index-1)   //递归loop,数组去重
​            }
​      }
​       loop(len-1);
​       return array
}
var arr=[1,1,1,1,1,2,5,8,7,4,6,5,2,3,2,5,5,8,7]
console.log(num(arr))

2.
//数组中重复的数字
function num(arr){
  arr.sort(); //先排序;
  for(var i=0;i<arr.length;i++){
    if(arr[i]===arr[i-1]){ //如果元素相等,
       return arr[i]      //则返回重复值
    }
  }
}

3.
//判断整数是否是回文数
function num(arr){
   if(arr<0){
     return false
   }
   var arr=[]
   var i=0
   while(parseInt(arr/10)){
       arr[i]=arr-10*parseInt(arr/10)
       arr=parseInt(arr/10);
       i++;
   }
   var 1=i;
   arr[i]=x;
   for(;i>=1/2;i--) {
     if(arr[i]!=arr[1-i]){
        return false
     }
   }
   return true
}





