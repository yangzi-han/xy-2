import {ActionType} from '../../untils/interface'
import { setToken,removeToken } from '../../untils/index'
const initVal={
    isFlage:false,
    info:{},
    uploadAvatar: ''
}
function loginReducer(state:any,action:ActionType){
    switch (action.type){
        case 'LOGIN':
            // console.log('loginreducer--',!!action.payload.sessionKey)
            setToken(action.payload.sessionKey)
            return {...state,isFlage:!!action.payload.sessionKey}
        case 'LOGOUT':
            removeToken()
            return {...state,isFlage: false}
        case 'UPDATE_INFO':
            return {...state,info:action.payload}
        case 'UPLOAD_AVATAR':
            return {...state,uploadAvatar:action.payload[0].path}
        case 'UPDATE_AVATAR':
            return {...state,uploadAvatar:'',info:{...state.info, avatar: action.payload}}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>loginReducer(state,action)