import axios from '../utils/request'
export let GoodsDetail=(id:string)=>{
    return axios.get(`/goods/detail?id=${id}`)
}