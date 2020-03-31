import {ActionType} from '../../utils/interface'
const initVal={
    data:[]
}
function TopiceReducer(state:any,action:ActionType){
    switch (action.type){
        case 'TOPICE':
        if(action.page===1){
            state.data=action.payload
        }else{
            state.data.data=state.data.concat(action.payload.data)
        }
        return {...state.data}
             
        default:
            return state;
    }

}
export default (state=initVal,action:ActionType)=>TopiceReducer(state,action)