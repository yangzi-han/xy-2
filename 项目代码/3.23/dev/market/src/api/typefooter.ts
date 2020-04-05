import axios from '../utils/request'

export let TypeDetailFooter=(id:string,page:number)=>{
    return axios.get(`/goods/list?categoryId=${id}&page=${page}&size=10`)
}