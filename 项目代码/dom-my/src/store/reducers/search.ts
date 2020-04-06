import {ActionType} from '../../utils/interface'
const initVal = {
    data:[]
}

function searchReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_SEARCHDELET':
            // state.homeDetail=action.payload
            return {...state,...action.payload}
        case 'GET_SEARCHLIST':
            // state.goodsDetail=action.payload
            return {...state,...action.payload}
        case 'GET_SEARCHHELPER':
            state.data=action.payload
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>searchReducer(state, action)