import {ActionType} from '../../utils/interface'
let initval={

}
function AddressReducer(state:any,action:ActionType){
    switch (action.type){
        case 'ADDRESS':
            return {address:action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>AddressReducer(state,action)