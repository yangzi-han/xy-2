import {ActionType} from '../../utils/interface'
let initVal={
    typedetail:[],
    brotherCategory:[],
    currentCategory:{}
}
function TypeDetailReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TYPE_DETAIL':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initVal,action:ActionType)=>TypeDetailReducer(state,action)