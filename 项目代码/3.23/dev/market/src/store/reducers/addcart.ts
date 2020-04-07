import {ActionType} from '../../utils/interface'
let initval={

}
function ADDCARTReducer(state:any,action:ActionType){
    switch (action.type){
        case 'ADDCART':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=> ADDCARTReducer(state,action)