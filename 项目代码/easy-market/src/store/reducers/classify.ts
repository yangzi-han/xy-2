import {ActionType} from '../../untils/interface'
const initVal={
    categoryList:[],//tab列表
    currentCategory:{},//左侧tab介绍
    brotherCategory:[],//横滚tab
    currentCategorylist:[],//介绍
    ClassifyGoodList:[]///对应商品
}
function ClassifyReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_CLASSIFY_LIST':
            return {...state,...action.payload}
        case 'GET_CLASSIFY_CURRENT':
            return {...state,...action.payload}
        case 'GET_CLASSIFY_CATEGORY':
            return {...state,brotherCategory:action.payload.brotherCategory,currentCategorylist:action.payload.currentCategory}
        case 'GET_CLASSIFY_GOODSLIST':
            return {...state,ClassifyGoodList:action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>ClassifyReducer(state,action)