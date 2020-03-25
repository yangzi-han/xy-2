import axios from '../utils/request'

// 获取首页banner
export let getBanner = () =>{
    return axios.get('/')
}