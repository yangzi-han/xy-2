import {ActionType} from '../../utils/interface'
let initVal={
    typeright:{}
}
function TypeRightReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TYPE_RIGHT':
            return {...action.payload}
    default:
        return state
    }

}
export default (state=initVal,action:ActionType)=>TypeRightReducer(state,action)