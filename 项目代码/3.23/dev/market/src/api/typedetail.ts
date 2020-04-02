import axios from '../utils/request'

export let TypeDetail=(id:string)=>{
    return axios.get(`/goods/category?id=${id}`)
}