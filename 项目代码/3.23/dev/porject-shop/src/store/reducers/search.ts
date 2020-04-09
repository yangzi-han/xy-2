import { ActionType } from '../../utils/interface'

const initVal = {
    searchHot: {},
    searchData: {}
}

function searchReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_SEARCH':
            return { ...state, searchHot: action.payload }
        case 'GET_SEARCH_DATA':
            return { ...state, searchData: action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => searchReudcer(state, action)