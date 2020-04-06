import {ActionType} from '../../utils/interface'
const initVal = {
    //分类
    categoryList: [],
    currentCategory:{},
    //三级分类
    brotherCategory:[],
    currentCategoryData:[],
    parentCategory:[],
    //详情数据
    gallery:[],
    collectList:[]
}

function typeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TYPEDATA':
            return {...state,...action.payload}
        case 'GET_CLACCIFY':
            return {...state,...action.payload}
        case 'GET_SCROLLDATA':
            console.log(action.payload,'reducers...')            
            return{...state,brotherCategory:action.payload.brotherCategory,currentCategoryData:action.payload.currentCategory}
        case 'GET_GOODLIST':
            return {...state,parentCategory:action.payload.goodsList}
        case 'GET_DETAILLIST':
            return {...state,...action.payload,gallery:action.payload.gallery}
        case 'GET_DETLATE':
            return {...state,...action.payload}
        case 'GET_DETLATE':
            return {...state,...action.payload}
        case 'GET_COLLECT':
            return {...state,collectList:action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>typeReudcer(state, action)