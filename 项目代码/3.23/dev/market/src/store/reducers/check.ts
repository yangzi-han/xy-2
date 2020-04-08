import {ActionType} from '../../utils/interface'
let initval={

}
function CheckReducer(state:any,action:ActionType){
    switch (action.type){
        case "Check":
        return {...state,...action.payload}
        default :
        return state
    }

}
export default (state=initval,action:ActionType)=>CheckReducer(state,action)