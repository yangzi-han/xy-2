import {ActionType} from '../../untils/interface'
const initVal={
    defaultKeyword:{},//默认keyword
    historyKeywordList:[],//历史记录
    hotKeywordList:[],//热门搜索
    SearchList:[],//模糊搜索数据
    filterCategory:[]//模糊搜索列表的分类
}
function SearchReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_SEARCH':
            return {...state,...action.payload}
        case 'GET_SEARCH_LIST':
            return {...state,SearchList:action.payload.data,filterCategory:action.payload.filterCategory}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>SearchReducer(state,action)