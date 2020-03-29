function reverse(str) {
    let resStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        resStr += str[i];
    }
    return resStr;
} 
console.log(reverse("ABCDEFG"));



方法2

function reverse2(str) {
    if (!str || str.length < 2 || typeof str != "string") {
        return str;
    };
    let res = [];
    for (let i = str.length - 1; i >= 0; i--) {
        res.push(str[i]);
    }
   return res.join("");
}
console.log(reverse2("Hello"));