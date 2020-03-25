import {ActionType} from '../../utils/interface'
const initVal = {
    banner: []
}

function homeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_BANNER':
            return {...state, ...action.payload}
    
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>homeReudcer(state, action)