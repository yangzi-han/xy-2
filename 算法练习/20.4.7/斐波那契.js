// 最简单的做法：递归。

// function fibonacci(n){
// 　if (n <= 0) {
// 　　return 0; 
// 　}
// 　if (n == 0) {
// 　　return 1;
// 　}
// 　　return fibonacci(n-1) + fibonacci(n-2);
// }

function fibonacci(n){
　　let ori = [0,1];
　　if (n < 2) {
　　    return ori[n];
　　};
　　let fiboOne = 1,fiboTwo = 0,fiboSum = 0;
　　for (let i = 2; i <= n; i++) {
    　　fiboSum = fiboOne + fiboTwo;
    　　fiboTwo = fiboOne;
    　　fiboOne = fiboSum;
　　}
　　return fiboSum;
　}
    
console.log(fibonacci(5));