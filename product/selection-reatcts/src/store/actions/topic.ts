import {getTopicList} from '../../api'

// 获取专题列表
export let topicAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getTopicList();
        console.log(data,"data11111111111111")        
        dispatch({
            type: 'GET_TOPIC_LIST',
            payload: data.data
        })
    }
}