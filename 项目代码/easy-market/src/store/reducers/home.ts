import {ActionType} from '../../untils/interface'
const initVal={
    banner:[],
    channel:[],
    newGoodsList:[],
    hotGoodsList:[],
    brandList:[],
    topicList:[],
    categoryList:[]
}

function homeReudcer(state:any,action:ActionType){
    // console.log('reducer',action)
    switch(action.type){
        case 'GET_BANNER':
            return {...state,...action.payload}
        default:
            return state
    }
}   
export default (state=initVal,action:ActionType)=>homeReudcer(state,action)