import {ActionType} from '../../utils/interface'
const initVal = {
    defaultKeyword:{},
    historyKeywordList:[],
    hotKeywordList:[],
    //查询回的数据
    goodsList:[],
    filterCategory:[]
}

function seachReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_INSTER':
            return {...state,...action.payload}
        case 'GET_GETSEACHDATA' :
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>seachReudcer(state, action)