import {ActionType} from '../../untils/interface'
const initVal={
    categoryList:[],
    currentCategory:{}
}
function ClassifyReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_CLASSIFY_LIST':
            return {...state,...action.payload}
        case 'GET_CLASSIFY_CURRENT':
            return {...state,...action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>ClassifyReducer(state,action)