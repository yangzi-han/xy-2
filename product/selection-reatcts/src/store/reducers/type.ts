import {ActionType} from '../../utils/interface'
const initVal = {
    //分类
    categoryList: [],
    currentCategory:{},
    //三级分类
    brotherCategory:[],
    currentCategoryData:[],
    parentCategory:[]
}

function typeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TYPEDATA':
            return {...state,...action.payload}
        case 'GET_CLACCIFY':
            return {...state,...action.payload}
        case 'GET_SCROLLDATA':
            return{...state,brotherCategory:action.payload.brotherCategory,currentCategoryData:action.payload.currentCategory}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>typeReudcer(state, action)