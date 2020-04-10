// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"
//转数组 再转回 string
var arr = function(s) {
    return s.split(' ').join('%20')
}
//用正则写一个replaceAll的方法 替换掉所有空格
function arr2(str ,key , Val){ 
    var reg = new RegExp(key , 'g');//g就是代表全部
    return str.replace(reg , Val || '');
}
var num = function(s) {
    return s.replaceAll(' ', '%20')
}