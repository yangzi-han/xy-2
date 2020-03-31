import {ActionType} from '../../utils/interface'

const initVal = {
    navList:[]
}

function ClassReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_NAV':
            return {...state}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>ClassReducer(state, action)