//水仙花数
//第一种
for (var i = 100; i <= 999; i++) {
    var a = i % 10; //个位
    var b = parseInt(i / 10) % 10; //十位
    var c = parseInt(i / 100); //百位
    if (i == a * a * a + b * b * b + c * c * c) {
        console.log(i); 
    }
}
///第二种
var i = 100;
while (i <999) {
    var a = i % 10; //个位
    var b = parseInt(i / 10) % 10; //十位
    var c = parseInt(i / 100); //百位
    if (i == a * a * a + b * b * b + c * c * c) {
        console.log(i);
    }
    i++;
}