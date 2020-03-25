import React from 'react'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 引入子reducer
import home from './reducers/home'

// 连接子reducer
let reducers = combineReducers({
    home
})

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;