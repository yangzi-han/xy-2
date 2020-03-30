import {getTopicList, getdetaile} from '../../api'


// 获取专题列表
export let topicAction = (page:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTopicList(page);
        if(data){
            dispatch({
                type: 'GET_TOPIC_LIST',
                payload: data.data,
                page:page
            })
        }
    }
}
// 获取专题列表详情
export let topicDetaileAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getdetaile(id);
        console.log(data,id)
        if(data){
            dispatch({
                type: 'GET_DET',
                payload: data,
            })
        }
    }
}