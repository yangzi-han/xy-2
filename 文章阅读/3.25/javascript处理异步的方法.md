# 地址
https://juejin.im/post/5e7ab8325188255e3629a161

# 总结
同步模式: 就是一个任务先执行，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；
异步模式: 每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。
1. 回调函数
回调是一个函数被作为一个参数传递到另一个函数里，在那个函数执行完后再执行。回调函数是异步编程最基本的方法，其优点是简单、容易理解和部署；缺点是容易产生回调地狱。
所谓的回调地狱，回调地狱带来的负面作用有以下几点：

代码臃肿，可读性差，可维护性差。
代码复用性差。
容易滋生 bug。
只能在回调里处理异常。
2. 事件监听
异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。
普通方式
f1.on('done', f2);
onclick方法

element.onclick=function(){
   //处理函数
}

element.onclick=handler1;
element.onclick=handler2;
element.onclick=handler3;
// 只有handler3会被添加执行
优点：写法兼容到主流浏览器;
缺点：当同一个element元素绑定多个事件时，只有最后一个事件会被添加

addEvenListener

elment.addEvenListener("click",handler1,false);
elment.addEvenListener("click",handler2,false);
elment.addEvenListener("click",handler3,false);

3. 发布/订阅模式

4. promise
Promise 对象有以下两个特点。

对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
一旦状态改变，就不会再变，任何时候都可以得到这个结果

