# 地址
https://juejin.im/post/5e649edf6fb9a07cda097d0c

# 总结
1.函数作为参数
function evaluatesToFive(num, fn) {
  return fn(num) === 5;
}
function divideByTwo(num) {
  return num / 2;
}

evaluatesToFive(10, divideByTwo);
// true

evaluatesToFive(20, divideByTwo);
// false

2.返回函数
function multiplyBy(num1) {
  return function(num2) {
    return num1 * num2;
  };
}
const multiplyByThree = multiplyBy(3);
const multiplyByFive = multiplyBy(5);

multipyByThree(10); // 30

multiplyByFive(10); // 50
