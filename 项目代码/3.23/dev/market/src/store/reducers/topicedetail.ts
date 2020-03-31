import {ActionType} from '../../utils/interface'
let initVel={
    data:{}
}
function TopiceDetailReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TOPIC_DETAIL':
            return {...state,...action.payload}
        default:
        return {...state}
    }

}
export default (state=initVel,action:ActionType)=>TopiceDetailReducer(state,action)