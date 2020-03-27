//50以内奇数的累加和
//第一种
for (var i = 0, sum = 0; i <= 50; i++) {
    if (i % 2 == 1) {
        sum += i;
    }
}
console.log(sum); 

//第二种
var i = 1;
var sum = 0;
do {
    if (i % 2 == 1) {
        sum += i;
    }
    i++;
} while (i <= 50)
console.log(sum);