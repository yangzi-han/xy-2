import {ActionType} from '../../utils/interface'
let initval={

}
function ManufacturerReducer(state:any,action:ActionType){
    switch(action.type){
        case "Manufacturer":
            return {...state,...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>ManufacturerReducer(state,action)