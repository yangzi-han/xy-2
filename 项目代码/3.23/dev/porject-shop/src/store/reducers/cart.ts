import { ActionType } from '../../utils/interface'

const initVal = {
    cartList: []
}

function cartReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_CART':
            return { ...state, ...action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => cartReudcer(state, action)