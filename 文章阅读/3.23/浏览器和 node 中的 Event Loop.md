# 地址
https://juejin.im/post/5e6f83a4e51d4527143e6629

# 总结
1.Event Loop
这种主线程不断地从任务队列中读取任务的机制称为 Event Loop（事件循环）
宏任务
包括 setTimeout、setInterval、setImmediate （浏览器仅 IE10 支持）、I/O、UI Rendering。
微任务
包括 process.nextTick（node 独有）、Promise、Object.observe（已废弃）、MutatinObserver。

2.浏览器中的Event Loop
开始执行主线程的任务
主线程的任务执行完毕之后去检查 microtask 队列，将已经到了触发时机的任务放进主线程。
主线程开始执行任务
主线程的任务执行完毕之后去检查 macrotask 队列，将已经到了触发时机的任务放进主线程。
主线程开始执行任务
轮询 microtask 和 microtask

3.node 中的 Event Loop
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘


Event Loop 的六个阶段。

timer：执行setTimeout和setInterval中到期的 callback。


pending callback：上一轮循环中少数的 callback 会放在这一阶段执行。


idle, prepare：仅在内部使用。


poll：最重要的阶段，执行 pending callback，在适当的情况下回阻塞在这个阶段。


check：执行setImmediate(setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数)的 callback。


close callbacks：执行 close 事件的 callback，例如socket.on('close'[,fn])或者http.server.on('close, fn)。

