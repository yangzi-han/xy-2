import React from 'react'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 引入子reducer
import home from './reducers/home'
import login from './reducers/login'
import topic from './reducers/topic'
import type from './reducers/type'
import my from './reducers/my'
import seach from './reducers/seach'
import address from './reducers/address'
import cart from './reducers/cart'

// 连接子reducer
let reducers = combineReducers({
    home,
    login,
    topic,
    type,
    seach,
    my,
    address,
    cart
})

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;