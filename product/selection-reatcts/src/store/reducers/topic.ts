import {ActionType} from '../../utils/interface'
const initVal = {
    list: [],
    DetaileData:{}
}

function topicReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TOPIC_LIST':
            if(action.page === 1){
                state.list=(action.payload)
            }else{
                state.list = state.list.concat(action.payload)
            }
            return {...state}
        case 'GET_DET':
            state.DetaileData = action.payload
            return {...state}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>topicReudcer(state, action)