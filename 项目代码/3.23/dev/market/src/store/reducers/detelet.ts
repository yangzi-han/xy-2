import {ActionType} from '../../utils/interface'
let initval={

}
function DeleteReducer(state:any,action:ActionType){
    switch (action.type){
        case 'DETELT':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>DeleteReducer(state,action)