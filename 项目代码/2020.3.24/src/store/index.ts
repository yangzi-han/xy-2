import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
// console.log(thunk,"thunk")
import reducers from './reducers/index'
const store:any = createStore(reducers,applyMiddleware(thunk))
export default store