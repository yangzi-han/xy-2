/**
 * 判断一个整数是否是回文数。
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 */
var arr = function(num) {
    if(num<0) return false;
    let flag = true; 
    num = num.toString()
    for(let i=0, len=num.length; i<len/2; i++){
        if(num[i] !== num[len-1-i]){
            flag = false;
            break
        }
    }
    return flag
};

//利用使用while 结合x%10的余数，赋值给一个变量*10累加实现数组翻转
//值得注意的一点是要判断不断让x/10 取整数
var arr2 = function(num) {
    let s = 0;
    let sum = num;
    while (sum > 0) {
        s = s * 10 + sum % 10;
        sum = parseInt(sum / 10);
    }
    return s == num;
};