import {ActionType} from '../../utils/interface'
const initVal = {
    categoryList: [],
    currentCategory:{}
}

function typeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TYPEDATA':
            return {...state,...action.payload}
        case 'GET_CLACCIFY':
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>typeReudcer(state, action)