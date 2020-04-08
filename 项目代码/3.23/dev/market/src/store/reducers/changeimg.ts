import {ActionType} from '../../utils/interface'
let initval={
    info:{}

}
function changeimgReducer(state:any,action:ActionType){
    switch (action.type){
        case 'Changeimg':
            return {...state,...action.payload[0]}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>changeimgReducer(state,action)