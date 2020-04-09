import axios from '../untils/request'
//获取首页banner
export let getBanner=()=>{
    return axios.get('/')
}