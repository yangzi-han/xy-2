// let str1 = "abch6g5g6hcba";

// StringFun=(str)=>{
//     var a = str.split("")
//     console.log(a)
//     var b = a.reverse();
//     console.log(b)
//     for (var i = 0; i < str.length; i++) {
//         if (b[i] != str[i]) {
//             return false;
//         }
//     }
//     return true;

// }
// console.log(StringFun(str1))

let str = '123321'; 
StringFun=(strs)=> {  
  if (strs.length % 2 == 1) { //判断是不是单数
    return false; // 如果是，就返回false，停止执行
  } else { //如果不是单数就继续往下执行
    for (var i = 0; i < strs.length / 2; i++) { 
      if (strs.charAt(i) != strs.charAt(strs.length - i - 1)) { //根据下标所对应的元素判断前面
                                                                //的值 是否 与后面的值相同
        return false // 如果前面的值与后面的值不相同就返回false
      }
    }
  }
  return true // 如果前面的值与后面的值相同就返回true，说明是对称字符串
}
console.log(StringFun(str))//返回结果  true  false