import React from 'react'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'//方便调试，实时触发，线下使用
import ReduxThunk from 'redux-thunk'
// 目的：异步解决方案
// 支持action的写法有对象变为函数
// 可以发送多个dispatch
// 改变action
// 同时会帮我们注入两个参数dispatch和getState
// 在异步操作完成之后再触发dispatch操作

//引入子reducer
import home from './reducers/home'

//连接子reducer
let reducers=combineReducers({
    home
})

let store=createStore(reducers,applyMiddleware(ReduxThunk,ReduxLogger))

export default store;