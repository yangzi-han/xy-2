# 地址
https://juejin.im/post/5e842da76fb9a03c854610c7

# 总结
1.第二个参数（数组）
stringify 函数也可以有第二个参数。它是要在控制台中打印的对象的键数组。看起来很简单？让我们更深入一点。我们有一个对象 product 并且我们想知道 product 的 name 属性值

2.第二个参数（函数）
我们还可以传入函数作为第二个参数。它根据函数中写入的逻辑来计算每个键值对。如果返回 undefined，则不会打印键值对。请参考示例以获得更好的理解。

3: 第三个参数为数字

JSON.stringify(user, null, 2);
//{
//--"name": "Prateek Singh",
//--"age": 26,
//--"country": "India"
//}

4: 第三个参数为字符串
如果第三个参数是 string，那么将使用它来代替上面显示的空格字符。
JSON.stringify(user, null,'**');
//{
//**"name": "Prateek Singh",
//**"age": 26,
//**"country": "India"
//}
// 这里 * 取代了空格字符



5: toJSON 方法
const user = {
 firstName : "Prateek",
 lastName : "Singh",
 age : 26,
 toJSON() {
    return { 
      fullName: `${this.firstName} + ${this.lastName}`
    };
 }
}

console.log(JSON.stringify(user));

// 结果
// "{ "fullName" : "Prateek Singh"}"
