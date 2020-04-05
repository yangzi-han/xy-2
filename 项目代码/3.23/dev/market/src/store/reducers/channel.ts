import {ActionType} from '../../utils/interface'
let initval={

}
function ChannelReducer(state:any,action:ActionType){
    switch (action.type){
        case 'CHANNEL_DETAIL':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=>ChannelReducer(state,action)