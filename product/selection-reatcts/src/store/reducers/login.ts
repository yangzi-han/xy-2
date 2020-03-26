import {ActionType} from '../../utils/interface'
import { setToken, removeToken } from '../../utils/index';
const initVal = {
    isLogin: false
}

function loginReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'POST_LOGIN':
            setToken(action.payload.sessionKey)
            console.log(!!action.payload.sessionKey,'1111111111')            
            return {...state, isLogin: !!action.payload.sessionKey}
        case 'LOGOUT':
            removeToken()
            return {...state, isLogin: false}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>loginReudcer(state, action)