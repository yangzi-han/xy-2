import {ActionType} from '../../utils/interface'
let initVal={
    datas:{},
    data:[]
}
function TopiceDetailIDReducer(state:any,action:ActionType){
    switch(action.type){
        case "TOPICE_DETAIL_ID":
            return {...action.payload}
        default:
            return state
    }

}
export default (state=initVal,action:ActionType)=>TopiceDetailIDReducer(state,action)