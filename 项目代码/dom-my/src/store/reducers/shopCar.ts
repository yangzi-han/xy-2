import {ActionType} from '../../utils/interface'
const initVal = {
     cartList:[],
     cartTotal:{}
}

function cartReducer(state: any, action: ActionType){
    switch (action.type) {
        //购物车列表
        case 'GET_CARTLIST':
            state.cartList=action.payload
            return {...state,...action.payload}
        //添加购物车
        case 'GET_CARTADD':
            // state.goodsDetail=action.payload
            return {...state,...action.payload}
        //购物车数量
        case 'GET_CARTNUM':
            // state.data=action.payload
            return {...state,...action.payload}
        //是否选中
        case 'GET_CARTCHECKED':
            // state.data=action.payload
            return {...state,...action.payload}
        //删除购物车
        case 'GET_CARTDELET':
        // state.data=action.payload
        return {...state,...action.payload} 
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>cartReducer(state, action)