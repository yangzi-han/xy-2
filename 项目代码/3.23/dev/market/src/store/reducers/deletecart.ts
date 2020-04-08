//删除购物车数据
import {ActionType} from '../../utils/interface'
let initval={

}
function DeletecartReducer(state:any,action:ActionType){
    switch (action.type){
        case 'Deletecart':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initval,action:ActionType)=> DeletecartReducer(state,action)