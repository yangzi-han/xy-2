import {ActionType} from '../../untils/interface'
const initVal={
    TopList:[],
    TopicDetailList:{},
    TopicRelated:[],
    commentList:[],
}
function topicReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_TOPIC_LIST':
            console.log(action,'GET_TOPIC_LIST')
            if(action.page===1){
                state.TopList=(action.payload)
            }else{
                state.TopList=state.TopList.concat(action.payload)
            }
            return {...state}
        case 'GET_TOPIC_DETAIL':
            return {...state,TopicDetailList:action.payload}
        case 'GET_TOPIC_RELATED':
            return {...state,TopicRelated:action.payload}
        case 'GET_TOPIC_COMMENT':
            return {...state,commentList:action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>topicReducer(state,action)