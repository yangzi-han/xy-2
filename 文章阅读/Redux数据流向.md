## Redux的数据流向
#### Redux
图片连接：https://user-images.githubusercontent.com/20860159/29354186-429b4446-829f-11e7-9a2f-a15c97dafaa3.png

React Redux 数据流

通过这张流程图，我们可以更好的理解Redux和React直接数据如何流通，关系如何映射。

让我们一步步来了解图中的各个概念。

#### action & actionCreator
action creator 就是函数而已,负责构建一个 action （是的，action creator 这个名字已经很明显了）并返回它。通过几行简单的代码就可以解释清楚了！
```
const actionCreator = function () {
  return {
    type : 'AN_ACTION'
  }
}
```
一般约定 action 是一个拥有 type 属性的对象。
```
console.log(actionCreator())
//  { type: 'AN_ACTION' }
```
#### reducer
Reducer 函数只是一个纯函数，它接收应用程序的当前状态以及发生的 action，然后返回修改后的新状态（或者有人称之为归并后的状态）。Reducer 函数是 action 的订阅者。
```
const reducer = function (state = {}, action) {
  console.log('reducer was called with state', state, 'and action', action);

  return state;
}
```
#### Store
以上，action描述“发生了什么”，而reducer根据action来更新state。但是他们两者之间是如何关联的呢？

不用担心，Redux 会帮你把action和reducer连接起来。

我们把 Redux实例称为 store 并用以下方式创建：
```
import { createStore } from 'redux'

const store_0 = createStore(() => {})
```
注意：在createStore时，需要给它传入一个 reducer 函数。

每当一个action发生时，Redux都能调用这个函数。往 createStore 传 Reducer 的过程就是给 Redux绑定 action处理函数（也就是Reducer）的过程。

接下来，试着在 Reducer 中打印一些 log
```
const reducer = function (...args) {
  console.log('Reducer was called with args', args)
}

const store_1 = createStore(reducer)
```
我们没有dispatch(分发)任何action，但是reducer被调用了！这是由于初始化应用state的时候，Redux dispatch 了一个初始化的 action ({ type: '@@redux/INIT' })。reducer的入参为(state, action)。state还没有被初始化，自然为undefined。

如何读取store中的state?

Redux为我们提供了store.getState()方法。
```
import { createStore } from 'redux'

const reducer_2 = function (state = {}, action) {
  console.log('reducer_2 was called with state', state, 'and action', action)

  return state;
}

const store_2 = createStore(reducer_2)
// 输出: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// 输出: store_2 state after initialization: {}
```
如何dispatch action?

我们需要使用store.dispatch(action)方法。
```
// 接以上代码
const anAction = {
  type : 'AN_ACTION'
}
store_2.dispatch(anAction);
// 输出：reducer_2 was called with state {} and action { type: 'AN_ACTION' }
```
#### combineReducers
combineReducer用于合并Reducers，并且合并对应的State。
```
const userReducer  = function (state = {}, action) {
  console.log('userReducer was called with state', state, 'and action', action)

  switch (action.type) {
    // etc.
    default:
      return state;
  }
}
const itemsReducer = function (state = [], action) {
  console.log('itemsReducer was called with state', state, 'and action', action)

  switch (action.type) {
    // etc.
    default:
      return state;
  }
}
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
  user  : userReducer,
  items : itemsReducer
})

// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_9.r.k.r.i.c.n.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_4.f.i.z.l.3.7.s.y.v.i' }

var store_0 = createStore(reducer)

// 输出：
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

console.log('store_0 state after initialization:', store_0.getState())
// 输出：
// store_0 state after initialization: { user: {}, items: [] }
```
#### 回过头来看看文章开头的数据流向图
View组件通过click等事件，dispatch一个(actionCreator返回的)action，通过Store把当前状态state和action传递给订阅者reducer函数,reducer返回一个新的状态存储在Store中，Store又把新的State传递给View组件触发组件更新。

为了将Redux和React联系到一起。就需要用到React-Redux这个库。
```
import { connect } from 'react-redux'
const containerComponent = connect(mapStateToProps, mapDispatchToProps)(presentationalComponent)
```
简单来说，mapStateToProps和mapDispatchToProps就是分别把Redux的state,和dispatch(action)映射到React组件中作为props。connect将展示组件(presentationalComponent)封装成高阶的容器组件(containerComponent)。state的更新意味着props更新。