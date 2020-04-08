**知识点笔记**

 首先，js任务执行的是单线程的，干啥都得按顺序来，后边的任务得等排队等着。但是任务分为同步和异步。

   当一个任务块代码执行时，

- 遇到同步任务，就会进入主线程，
- 遇到异步任务会进入Event Table中注册函数，之后将函数移入到 Event Queue。
- 主线程内任务执行完毕，会去Event Queue 读取异步函数，按照顺序执行异步函数。

   待这个代码块的同步任务执行完，Event Table会将的异步任务，也是按照顺序执行的。

![img](https://img2018.cnblogs.com/i-beta/1838437/202001/1838437-20200111110643043-1105349166.png)

 

 

​           图源来自https://juejin.im/post/59e85eebf265da430d571f89 大佬的

​    不过还是有问题的，Event Queue 里，需要先执行微任务

**四、js事件循环、宏任务微任务**

  js事件还可以分为宏任务微任务

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
- micro-task(微任务)：Promise，process.nextTick

  当一个宏任务进入主线程

- 判断这个任务是同步异步，同步执行
- 异步宏任务，放在 Event Queue ， 异步微任务，放在 Event Queue
- 当主线程任务执行完毕，去Event Queue
- 进入Event Queue，判断是微任务还是宏任务，先执行微任务，再执行宏任务

![img](https://img2018.cnblogs.com/i-beta/1838437/202001/1838437-20200111153300214-1886955058.png)

 

​    图源来自大佬 https://juejin.im/post/59e85eebf265da430d571f89

 

五、ook，学习完事件循环，接下来咱们来解决开头的问题吧。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
// macro1,同步执行，打印1
console.log(1);    

// macro2，异步宏任务放到 Event Queue ，我们标记为callback1（macro）
setTimeout(() => {
  // 同步任务
  console.log(2);
  // 异步微任务，我们标记为callback4（micro）
  Promise.resolve().then(() => {
    console.log(3)
  });
});

// macro3 同步宏任务
new Promise((resolve, reject) => {
  // 同步执行，打印4
  console.log(4)
  resolve(5)
  // micro1，异步微任务放到 Event Queue，我们标记为callback2（micro）
}).then((data) => {
  // 同步，打印5
  console.log(data);  
  // 异步微任务，放到 Event Queue，我们标记为callback5（micro）
  Promise.resolve().then(() => {
    console.log(6)
  // 异步微任务，放到 Event Queue，我们标记为callback6（micro）
  }).then(() => {
    console.log(7)
  // 异步宏任务，放到 Event Queue,我们标记为callback7（macro）
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

// macro4，异步宏任务放到 Event Queue ，我们标记为callback3（macro）
setTimeout(() => {
  console.log(9);
})

// macro5，同步任务打印10
console.log(10);


// 分析：
// *** 进入主线程，主线程的宏任务块有5个，先执行同步任务

// 1. 【执行同步任务】
//     (1).打印1，4，10


// 2. Event Queue 的函数有 ：callback1（macro）、callback2（micro）、callback3（macro）

// 3. 【先执行微任务 callback2（micro）】
//     (1).执行同步任务，打印 5 ，打印console.log(data)，结果是5，data是 resolve的结果
//     (2).callback5（micro）
//     (3).callback6（micro）
//     (4).callback7（macro）

// *** 此时已经打印出：1，4，10，5
// *** Event Queue 的函数依次是：callback1（macro）、callback3（macro）、callback5（micro）、callback6（micro）、callback7（macro）
// *** 微任务有两个，依次执行微任务

// 4.【微任务】
//     （1).callback5（micro）打印6
//     （2).callback6（micro）打印7

// *** 此时已经打印出：1，4，10，5，6，7
// *** Event Queue 的函数依次是：callback1（macro）、callback3（macro）、callback7（macro）
// *** 接下来依次执行

// 5. 【宏任务callback1（macro）】
//     (1).执行同步，打印2
//     (2).callback4（micro）

// *** 此时已经打印出：1，4，10，5，6，7，2
// *** Event Queue 的函数依次是：callback3（macro）、callback7（macro）、callback4（micro）
// *** 接下来先执行微任务

// 6. 【微任务callback4（micro）】
//     (1).打印3

// *** 此时已经打印出：1，4，10，5，6，7，2，3
// *** Event Queue 的函数依次是：callback3（macro）、callback7（macro）
// *** 宏任务剩下两个，接下来依次执行

// 7. 【宏任务callback3（macro）、callback7（macro）】
//     (1).打印9
//     (1).打印8

// *** 此时已经打印出：1，4，10，5，6，7，2，3，9，8
// *** 任务执行完毕，所有数字均已打印出来
```