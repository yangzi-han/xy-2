import {ActionType} from '../../utils/interface'
const initVal = {
    list: []
}

function topicReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TOPIC_LIST':
            return {...state, list:action.payload}
    
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>topicReudcer(state, action)