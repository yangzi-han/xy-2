//实现字符串反转以数组形式返回
//第一种
var str='anfaoraw'
function strf(str){
    let arr=str.split('')
    return arr.reverse()
}
console.log(strf(str))
  
//第二种
var str1='lkhdarg'
function strfz(str){
    let newstr=[]
    for(let i=str.length-1;i>=0;i--){
        newstr.push(str[i])
    }
    return newstr
}
console.log(strfz(str1))