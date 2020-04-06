import {ActionType} from '../../utils/interface'
let initval={

}
function ADDAddressReducer(state:any,action:ActionType){
    switch (action.type){
        case 'ADDADDRESS':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>ADDAddressReducer(state,action)