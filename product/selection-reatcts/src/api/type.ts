import axios from '../utils/request'

// 获取首页banner
export let getType = () =>{
    return axios.get('/catalog/index')
}