import {ActionType} from '../../utils/interface'
let initVal={
}
function TypeDetailFooterReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TYPE_DETAIL_FOOTER':
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initVal,action:ActionType)=>TypeDetailFooterReducer(state,action)