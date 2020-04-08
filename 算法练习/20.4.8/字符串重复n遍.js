// // 10、让字符串重复n遍，成为 str='abcabcabc'
var str = 'abc';

//第一种
function fn(str, n) {
    var str1 = '';
    for (var i = 0; i < n; i++) {
        str1 += str;
    } 
    return str1;
}
console.log(fn(str, 3));

//第二种
function f1(str,n){
    var newstr=''
    let i=0;
    while(i<n){
        newstr+=str
        i++
    }
    return newstr
}
console.log(f1(str,4))
