import {ActionType} from '../../utils/interface'
let initVal={
    datas:[]
}
function TypeDetailFooterReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TYPE_DETAIL_FOOTER':
            if(action.page===1){
                state.datas=action.payload.data
            }else{
                state.datas=state.datas.concat(action.payload.data)
            }
            return {...state,...action.payload}
        default:
            return state
    }

}
export default (state=initVal,action:ActionType)=>TypeDetailFooterReducer(state,action)