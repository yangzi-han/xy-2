import axios from '../utils/request'

// 登录接口
export let getTopicList = () =>{
    return axios.get('/topic/list?page=1&size=100')
}