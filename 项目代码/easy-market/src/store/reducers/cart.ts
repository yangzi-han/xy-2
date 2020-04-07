import {ActionType} from '../../untils/interface'
const initVal={
    cartList:[],
    cartTotal:{}
}
function CartReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_ADDCART_LIST':
            return {...state,...action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>CartReducer(state,action)