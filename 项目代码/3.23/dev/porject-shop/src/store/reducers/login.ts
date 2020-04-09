import { ActionType } from '../../utils/interface'
import { setToken, removeToken } from '../../utils/index'

const initVal = {
    login: false,
    info: {},
    uploadAvatar: ''
}

function loginReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_LOGIN':
            setToken(action.payload.sessionKey)
            return { ...state, isLogin: !!action.payload.sessionKey }

        case 'GET_LOGOUT':
            removeToken()
            return { ...state, isLogin: false }

        case 'UPDATE_INFO':
            return { ...state, info: action.payload }

        case 'UPLOAD_AVATAR':
            return { ...state, uploadAvatar: action.payload[0].path }
            
        case 'UPDATE_AVATAR':
            return { ...state, uploadAvatar: '', info: { ...state.info, avatar: action.payload } }
        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => loginReudcer(state, action)