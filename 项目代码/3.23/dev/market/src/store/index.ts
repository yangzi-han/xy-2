import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// 引入子reducer
import home from './reducers/home'
import login from './reducers/login'
import topice from './reducers/topice'
import type from './reducers/type'
import topicedetail from './reducers/topicedetail'
import topicedetailid from './reducers/topicedetailid'
import typeright from './reducers/typeright'
import typedetail from './reducers/typedetail'
import typedetailfooter from './reducers/typedetailfooter'

// 连接子reducer
let reducers = combineReducers({
    home,
    login,
    topice,
    type,
    topicedetail,
    topicedetailid,
    typeright,
    typedetail,
    typedetailfooter

})

let store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxLogger))

export default store;