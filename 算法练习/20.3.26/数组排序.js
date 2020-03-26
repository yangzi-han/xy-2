//第一种
// var arr = [1,25,3,85,4,0]
// arr.sort((m,n)=>{
// if(m>n){
//      return 1       //顺序改变
//   }else{
//      return -1        //顺序不改变
//   }
// })
// console.log(arr)  // [0, 1, 3, 4, 25, 85]
//第二种
var arr = [1,25,3,85,4,0]
arr.sort((m,n)=>{
if(m>n){
     return m-n   // m若大于n，m-n则是正数，反正是负数  和上面一样道理
  }}) 
console.log(arr)  // [0, 1, 3, 4, 25, 85]