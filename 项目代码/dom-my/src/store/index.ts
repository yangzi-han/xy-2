// import React from 'react'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 引入子reducer
import home from './reducers/home'
import login from './reducers/login'
import release from './reducers/release'
import type from './reducers/type'
import detail from './reducers/detail'
import address from './reducers/address'
import search from './reducers/search'
import collect from './reducers/collect'
import shopCar from './reducers/shopCar'

// 连接子reducer
let reducers = combineReducers({
    home,
    login,
    release,
    type,
    detail,
    address,
    search,
    collect,
    shopCar
})

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;