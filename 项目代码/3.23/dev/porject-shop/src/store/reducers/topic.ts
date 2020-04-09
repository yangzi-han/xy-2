import { ActionType } from '../../utils/interface'

const initVal = {
    topiclist: [],
    topicDetail: {},
    topicDetailRelated: []
}

function topicReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_TOPIC':
            return { ...state, topiclist: action.payload }

        case 'GET_TOPIC_DETAIL':
            return { ...state, topicDetail: action.payload }

        // case 'GET_TOPIC_DETAIL_RELATED':
        //     return { ...state, topicDetailRelated: action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => topicReudcer(state, action)