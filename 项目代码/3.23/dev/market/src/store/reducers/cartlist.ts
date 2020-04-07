import {ActionType} from '../../utils/interface'
let initval={

}
function CartlistReducer(state:any,action:ActionType){
    switch (action.type){
        case 'Cartlist':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>CartlistReducer(state,action)