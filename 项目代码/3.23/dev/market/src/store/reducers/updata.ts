import {ActionType} from '../../utils/interface'
let initVal={
}
function TypeRightReducer(state:any,action:ActionType){
    switch(action.type){
        case 'UP_DATA':
            return {...action.payload}
    default:
        return state
    }

}
export default (state=initVal,action:ActionType)=>TypeRightReducer(state,action)