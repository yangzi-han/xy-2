import axios from '../utils/request'

export let TopiceDetail=(id:any)=>{
    return axios.get(`/topic/detail?id=${id}`)
}