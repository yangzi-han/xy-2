import axios from '../utils/request'

export let Channel=(id:string)=>{
    return axios.get(`/goods/list?page=1&size=300&categoryId=${id}`)
}