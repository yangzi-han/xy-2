import {ActionType} from '../../utils/interface'
const initVal = {
    info:{},
    uploadAvatar: ''
}

function loginReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_USERINFO':
            return {...state,info:action.payload}
        case 'UPLOAD_AVATAR':
            console.log(action.payload,'............')            
            return {...state, uploadAvatar: action.payload[0].path}
        case 'UPDATE_AVATAR':
            return {...state, uploadAvatar: '', info: {...state.info, avatar: action.payload}}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>loginReudcer(state, action)