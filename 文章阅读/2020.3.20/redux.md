文章出处: https://www.jianshu.com/p/4840769debe3 
总结:redux
一.什么是Redux?
是数据状态管理模式
二.为什么要用Redux
在React中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过props）,所以，两个非父子组件之间通信就相对麻烦，redux的出现就是为了解决state里面的数据问题
三.Redux三大原则
 1 唯一数据源
  整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中
 2 保持只读状态
  state是只读的，唯一改变state的方法就是触发action，action是一个用于描述以发生时间的普   通对象
 3 数据改变只能通过纯函数来执行
  使用纯函数来执行修改，为了描述action如何改变state的，你需要编写reducers
四.Redux解析
 1.Store
  store就是保存数据的地方，你可以把它看成一个数据，整个应用智能有一个store
  Redux提供createStore这个函数，用来生成Store
 2.State
   state就是store里面存储的数据，store里面可以拥有多个state，Redux规定一个state对应一 个View,只要state相同，view就是一样的，反过来也是一样的，可以通过store.getState( )获取
 3.Action
   state的改变会导致View的变化，但是在redux中不能直接操作state也就是说不能使用this.setState来操作，用户只能接触到View。在Redux中提供了一个对象来告诉Store需要改变state。Action是一个对象其中type属性是必须的，表示Action的名称，其他的可以根据需求自由设置.
 4.store.dispatch( )
   store.dispatch( )是view发出Action的唯一办法
 5.Reducer
   Store收到Action以后，必须给出一个新的state，这样view才会发生变化。这种state的计算过程就叫做Reducer。
Reducer是一个纯函数，他接收Action和当前state作为参数，返回一个新的state
注意：Reducer必须是一个纯函数，也就是说函数返回的结果必须由参数state和action决定，而且不产生任何副作用也不能修改state和action对象
五.redux上手
  需要一个 store 来存储数据
  store 里的 reducer 初始化 state 并定义 state 修改规则
  通过 dispatch 一个 action 来提交对数据的修改
  action 提交到 reducer 函数里，根据传入的 action 的 type，返回新的 state。
  redux 是单项非响应式的
  1.createStore 创建 store
  2.reducer 初始化、修改状态函数
  3.getState 获取状态值
  4.dispatch 提交更新
  5.subscribe 变更订阅
 六.react-redux
   每次都重新调用 render 和 getState 太 low 了，想用更 react 的方式来写，需要 react-redux        的支持
   提供了两个 api
     1.Provider 为后代组件提供 store
     2.connect 为组件提供数据和变更方法

 







