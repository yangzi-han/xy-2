import {ActionType} from '../../untils/interface'
const initVal={
    categoryList:[],//tab列表
    currentCategory:{},//左侧tab介绍
    brotherCategory:[],//横滚tab
    currentCategorylist:[],//介绍
    ClassifyGoodList:[],///对应商品
    info:{},//商品详情
    gallery:[],///商品详情轮播图
    attribute:[],//商品规格
    issue:[],//快递评论
    comment:{},//商品数量
    GoodsRelatedList:[],//相关商品
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
        case 'GET_GOODSDETAIL_LIST':
            return {...state,...action.payload}
        case 'GET_GOODS_RELATED':
                return {...state,GoodsRelatedList:action.payload.goodsList}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>ClassifyReducer(state,action)