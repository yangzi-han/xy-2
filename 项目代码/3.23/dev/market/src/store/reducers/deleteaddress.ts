import {ActionType} from '../../utils/interface'
let initval={

}
function DeleteAddressReducer(state:any,action:ActionType){
    switch (action.type){
        case "DeleteAddress":
        return {...state,...action.payload}
        default :
        return state
    }

}
export default (state=initval,action:ActionType)=>DeleteAddressReducer(state,action)