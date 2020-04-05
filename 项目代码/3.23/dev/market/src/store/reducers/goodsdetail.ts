import {ActionType} from '../../utils/interface'
const initVal={
  
}
function loginReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GOODS_DETAIL':
            return {...state,...action.payload}
            
        default:
            return state;
    }

}
export default (state=initVal, action:ActionType)=>loginReducer(state,action)