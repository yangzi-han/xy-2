import {ActionType} from '../../utils/interface'

const initVal = {
    release:[]
}

function ReleaseReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_RELEASE':
            return {...state, release:action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>ReleaseReducer(state, action)