import { ActionType } from '../../utils/interface'

const initVal = {
    addressList: []
}

function addressReudcer(state: any, action: ActionType) {
    switch (action.type) {
        case 'GET_ADDRESS':
            return { ...state, addressList: action.payload }

        default:
            return state;
    }
}

export default (state = initVal, action: ActionType) => addressReudcer(state, action)