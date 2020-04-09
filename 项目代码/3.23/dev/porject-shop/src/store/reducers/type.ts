import { ActionType } from '../../utils/interface'

const initVal = {
    type: [],
    typeList: [],
    typeNav:[],
    brotherCategory: [],
    currentCategoryTitle: [],
    classifyList: [],
    classifyDetail:[]
}

function topicReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_TYPE':
            return { ...state, type: action.payload }

        case 'GET_TYPE_LIST':
            return { ...state, typeList: action.payload }

        case 'GET_TYPE_NAV':
            return { 
                ...state,
                // typeNav: action.payload,
                brotherCategory: action.payload.brotherCategory,
                currentCategoryTitle: action.payload.currentCategory 
            }

        case 'GET_TYPE_CLASSIFY':
            return { ...state, classifyList: action.payload }

        case 'GET_TYPE_CLASSIFY_DETAIL':
            return { ...state, classifyDetail: action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => topicReudcer(state, action)