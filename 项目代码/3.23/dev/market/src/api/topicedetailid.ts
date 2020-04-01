import axios from '../utils/request'

export let TopiceDetailId=(id:any)=>{
    return axios.get(`/comment/list?valueId=${id}&typeId=1`)
}