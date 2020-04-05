import {ActionType} from '../../utils/interface'
const initVal = {
    homeDetail:[],
    goodsDetail:[],
    goodsRelated:[]
}

function homeDetailReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_HOMEDETAIL':
            state.homeDetail=action.payload
            return {...state}
        case 'GET_GOODSDETAIL':
            state.goodsDetail=action.payload
            return {...state}
        case 'GET_GOODSRELATED':
            state.goodsRelated=action.payload
            return {...state}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>homeDetailReducer(state, action)