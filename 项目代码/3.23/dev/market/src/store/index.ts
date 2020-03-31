import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 引入子reducer
import home from './reducers/home'
import login from './reducers/login'
import topice from './reducers/topice'
import type from './reducers/type'
import topicedetail from './reducers/topicedetail'

// 连接子reducer
let reducers = combineReducers({
    home,
    login,
    topice,
    type,
    topicedetail
})

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;