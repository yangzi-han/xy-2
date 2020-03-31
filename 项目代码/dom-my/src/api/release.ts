import axios from '../utils/request'
export let getReleaseList = (page:number)=>{
    return axios.get(`/topic/list?page=${page}&size=10`)
}
export let getDetailList = (id:string)=>{
    return axios.get('/topic/detail/',{
        params:{
            id
        }
    })
}
export let getDetailRelated = (id:string)=>{
    return axios.get('/topic/related',{
        params:{
            id
        }
    })
}
