import {ActionType} from '../../utils/interface'
import {setToken, removeToken} from '../../utils/index'
const initVal = {
    isLogin: false,
    info: {},
    uploadAvatar: ''
}

function loginReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'LOGIN':
            setToken(action.payload.sessionKey)
            return {...state, isLogin: !!action.payload.sessionKey}
        case 'LOGOUT':
            removeToken()
            return {...state, isLogin: false}
        case 'UPDATE_INFO':
            return {...state, info: action.payload}
        case 'UPLOAD_AVATAR':
            return {...state, uploadAvatar: action.payload[0].path}
        case 'UPDATE_AVATAR':
            return {...state, uploadAvatar: '', info: {...state.info, avatar: action.payload}}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>loginReducer(state, action)