import React from 'react'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'//方便调试，实时触发，线下使用 日志中间件
//redux-logger提供一个生成器createLogger，可以生成日志中间件logger
import ReduxThunk from 'redux-thunk'
// 目的：异步解决方案
// 支持action的写法有对象变为函数
// 可以发送多个dispatch
// 改变action
// 同时会帮我们注入两个参数dispatch和getState
// 在异步操作完成之后再触发dispatch操作

//引入子reducer
import home from './reducers/home'
import login from './reducers/login'
import topic from './reducers/topic'
import classify from './reducers/classify'
import search from './reducers/search'
import my from './reducers/my'
import cart from './reducers/cart'
//连接子reducer
let reducers=combineReducers({
    home,
    login,
    topic,
    classify,
    search,
    my,
    cart
})
//applyMiddleware方法的三个参数，就是三个中间件:applyMiddleware(thunk, promise, logger)
//logger就一定要放在最后，否则输出结果会不正确。
let store=createStore(reducers,applyMiddleware(ReduxThunk,ReduxLogger))

export default store;