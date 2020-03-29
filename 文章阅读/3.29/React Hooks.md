# 地址
https://juejin.im/post/5e7cd978e51d4546eb522d9b
# 总结
1.在react中引入hooks，hooks解决的问题
(1)组件复用逻辑难
(2)复杂组件状态逻辑多
(3)class学习成本高

2.mixin hoc render.props hooks

(1).mixin
vue和react中都用过mixin(react目前已经抛弃) mixin本质上是将对象复制到另一个对象上
存在的小问题
相关依赖，mixin有可能依赖其他mixin 其中一个修改时，其他的mixin也会被修改
命名冲突：不同的人在写的时候有可能命名会冲突
增加复杂性：当我们一个组件引入过多的mixin时，代码逻辑将会非常复杂，因为不停的在引入状态，
(2)HOC是React社区提出的新的方式用来取代mixin的。
高阶函数是函数式编程中一个基本的概念，它描述了一种这样的函数：接受函数作为输入，或是返回一个函数，比如 map, reduce等都是高阶函数。
高阶组件（ higher-order component），类似于高阶组件接受一个组件作为参数，返回另一个组件。
HOC的优点为：
不会影响组件内部的状态
HOC的问题是：
需要在原组件上进行包裹和嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这让调试变得非常困难
HOC可以劫持props，在不遵守约定的情况下也可能造成冲突
(3)render props: 通过props接受一个返回react element 的函数，来动态决定自己要渲染的结果
很容易造成“嵌套地狱”
(4)使用 hooks
具体实现就是通过一个函数来封装跟状态有关的逻辑，将这些逻辑从组件中抽取出来。
3.React Hooks原理
只在最顶层使用 Hook，不能在循环、条件判断或嵌套函数中调用hook。
只在 React 函数中调用 Hook，不能再普通函数中调用hook
React怎么知道哪个state对应哪个useState ...
React中是通过类似单链表的形式来实现的，通过 next 按顺序串联所有的 hook。
export type Hook = {|
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null, 
|};

export type Effect = {|
  tag: HookEffectTag,
  create: () => (() => void) | void,
  destroy: (() => void) | void,
  deps: Array<mixed> | null,
  next: Effect,
|};

4.Hooks中闭包的坑
在React的setState函数实现中，会根据一个变量isBatchingUpdates 判断是直接更新this.state还是放到 队列中回头再说。而isBatchingUpdates 默认是false,也就表示setState会同步更新this.state。但是，有一个函数 batchedUpdates， 这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理程序过程setState不会同步更新this.state。

