# 地址
https://juejin.im/post/5e730ebce51d4526db7524ba

# 总结
1.中间件的用途
Redux中间件叫middleware，主要是在Redux发起一个Acttion还没到达Reducer之前或者Reducer执行之后做一些处理
import { createStore, combineReducers, applyMiddleware } from 'redux'

let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  // applyMiddleware() 告诉 createStore() 如何处理中间件
  applyMiddleware(logger, crashReporter)
)
在createStore时传入applyMiddleware函数，而applyMiddleware参数正是中间件，这样在每次diapatch的时候会先执行中间件的逻辑。
2.Redux-thunk源码解析
Redux-thunk是解决异步调用的一个中间件
function createThunkMiddleware(extraArgument) {
  // 这里才是真正的中间件
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

我们重点看action，我们一般dispatch(action)，action一般为普通对象，这里却判断action的类型如果是一个方法，就执行它。Redux-thunk的作用显而易见了，将action改写为一个函数，这里一般为异步函数，可以返回一个promsie，结束后在调用普通的dispath去更新数据。Redux-thunk虽然解决了异步调用的问题，但是同时也违背了只能dispatch一个action的原则，并且它不够强大，现在解决异步调用一般都是用Redux-saga
