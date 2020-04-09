import { ActionType } from '../../utils/interface'

const initVal = {
    collect: [],
    // deleteCollect: [],
}

function collectReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_COLLECT':
            return { ...state, collect:action.payload }

        // case 'GET_DELETE_COLLECT':
        //     return { ...state, deleteCollect: action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => collectReudcer(state, action)