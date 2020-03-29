import {ActionType} from '../../utils/interface'
const initVal = {
    banner: [],
    channel:[],
    brandList:[],
    newGoodsList:[],
    hotGoodsList:[],
    topicList:[],
    categoryList:[]
}

function homeReudcer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_BANNER':
            return {...state, ...action.payload}
        case 'GET_CHANNEL':
            return {...state,...action.payload}
        case 'GET_BRANDLIST':
            return {...state,...action.payload} 
        case 'GET_NEWGOODSLIST':
            return {...state,...action.payload}
        case 'GET_HOTGOODSLIST':
            return {...state,...action.payload}  
        case 'GET_TOPICLIST':
            return {...state,...action.payload} 
        case 'GET_CATEGORYLIST':
            return {...state,...action.payload}    
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>homeReudcer(state, action)