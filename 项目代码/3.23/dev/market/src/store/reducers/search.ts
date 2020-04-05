import {ActionType} from '../../utils/interface'
let initVal={
}
function SearchReducer(state:any,action:ActionType){
    switch(action.type){
        case 'SEARCH':
            return {...state,...action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>SearchReducer(state,action)