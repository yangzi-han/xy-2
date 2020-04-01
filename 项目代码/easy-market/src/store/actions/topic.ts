import {getTopicList,getTopicDetail,getTopicRelated,getTopicComment} from '../../api'

export let TopicAction = (page:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTopicList(page);
        // console.log('getTopicListdata...', data);
        if (data){
            dispatch({
                type: 'GET_TOPIC_LIST',
                payload: data.data,
                page:page
            })
        }
    }
}
export let TopicDetailAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getTopicDetail(id);
        // console.log('TopicDetailAction...', data);
        dispatch({
            type: 'GET_TOPIC_DETAIL',
            payload: data
        })
    }
}
export let TopicRelatedAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getTopicRelated(id);
        console.log('TopicRelatedAction...', data);
        dispatch({
            type: 'GET_TOPIC_RELATED',
            payload: data
        })
    }
}
export let TopicCommentAction=(valueId:string)=>{
    return async (dispatch:Function)=>{
        let data=await getTopicComment(valueId);
        // console.log('TopicCommentAction...', data)
        dispatch({
            type: 'GET_TOPIC_COMMENT',
            payload: data.data
        })
    }
}