import {ActionType} from '../../untils/interface'
import { setToken,removeToken } from '../../untils/index'
const initVal={
    isFlage:false
}
function loginReducer(state:any,action:ActionType){
    switch (action.type){
        case 'LOGIN':
            // console.log('loginreducer--',!!action.payload.sessionKey)
            setToken(action.payload.sessionKey)
            return {...state,isFlage:!!action.payload.sessionKey}
        case 'LOGOUT':
            removeToken()
            return {...state, isFlage: false}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>loginReducer(state,action)