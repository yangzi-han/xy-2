var n = parseInt(prompt("请输入一个数","2"));
var sum =0;

for(var i = 1; i <= n; i++){
    var x = 1;
    for(var j = 1; j <= i; j++){
        console.log(x);
        
        x *= j;
    }
    console.log(sum);
    
    sum += x;
}
console.log(sum);


