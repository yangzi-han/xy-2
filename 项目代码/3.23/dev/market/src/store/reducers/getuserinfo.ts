import {ActionType} from '../../utils/interface'
let initval={
    info:{}
}
function ADDCARTReducer(state:any,action:ActionType){
    switch (action.type){
        case 'Getuserinfo':
            return {...state,...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=> ADDCARTReducer(state,action)