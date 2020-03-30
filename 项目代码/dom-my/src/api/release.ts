import axios from '../utils/request'
export let getReleaseList = (page:number)=>{
    return axios.get(`/topic/list?page=${page}&size=5`)
}