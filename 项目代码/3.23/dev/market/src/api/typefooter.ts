import axios from '../utils/request'

export let TypeDetailFooter=(id:string)=>{
    return axios.get(`/goods/list?categoryId=${id}&page=1&size=100`)
}