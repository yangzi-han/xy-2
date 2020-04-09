import {
    createStore, 
    combineReducers, 
    applyMiddleware
} from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxLogger from 'redux-logger'

// 引入子reducer
import login from './reducers/login'
import home from './reducers/home'
import topic from './reducers/topic'
import type from './reducers/type'
import search from './reducers/search'
import address from './reducers/address'
import favor from './reducers/favor'
import cart from './reducers/cart'

// 连接子reducer
let reducers = combineReducers({
    login,
    home,
    topic,
    type,
    search,
    address,
    favor,
    cart
})

//applyMiddleware方法的三个参数，就是三个中间件:applyMiddleware(thunk, promise, logger)
//logger就一定要放在最后，否则输出结果会不正确。

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;