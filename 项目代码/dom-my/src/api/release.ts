import axios from '../utils/request'
export let getReleaseList = ()=>{
    return axios.get('/topic/list?page=1&size=100')
}