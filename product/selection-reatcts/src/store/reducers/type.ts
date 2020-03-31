import {ActionType} from '../../utils/interface'
const initVal = {
    typeData: {}
}

function typeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TYPEDATA':
            state.typeData = action.payload
            return {...state}
    
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>typeReudcer(state, action)