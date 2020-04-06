import {ActionType} from '../../utils/interface'
const initVal = {
   collectData:[]
}

function collectReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_COLLECTADD':
            // state.homeDetail=action.payload
            return {...state,...action.payload}
        case 'GET_COLLECTLIST':
            state.collectData=action.payload
            return {...state,...action.payload}
        case 'GET_COLLECTDELET':
            return {...state,...action.payload}    
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>collectReducer(state, action)