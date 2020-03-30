import axios from '../utils/request'

export let Topice = (page:number)=>{
    return axios.get(`/topic/list?page=${page}&size=10`)
}
