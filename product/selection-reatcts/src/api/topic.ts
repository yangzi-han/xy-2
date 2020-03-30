import axios from '../utils/request'

// 专题接口
export let getTopicList = (page:number) =>{
    return axios.get(`/topic/list?page=${page}&size=5`)
}