import {ActionType} from '../../utils/interface'
const initVal={
    categoryList:[],
    currentCategory:{
        subCategoryList:[]
    }
}

function TypeReducer(state:any,action:ActionType){
    switch(action.type){
        case 'TYPE':
        return {...state,...action.payload}
        default:
            return state
    }

}
export default (state=initVal,action:ActionType)=>TypeReducer(state,action)