import {ActionType} from '../../utils/interface'
let initval={
    data:[],
    searchout:{}
}
function SearchHotReducer(state:any,action:ActionType){
    switch(action.type){
        case 'SEARCH_HOT':
            return {...state,...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>SearchHotReducer(state,action)