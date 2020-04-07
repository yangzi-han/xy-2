import {ActionType} from '../../utils/interface'
const initVal = {
   addressList:[]
}

function addRessReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_ADDRESSLIST':
            state.addressList=action.payload
            return {...state,...action.payload}
        case 'GET_ADDRESSDELET':
            // state.goodsDetail=action.payload
            return {...state,...action.payload}
        case 'GET_ADDRESSADD':
            // state.goodsRelated=action.payload
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>addRessReducer(state, action)