import axios from '../untils/request';

export let getTopicList=(page:number)=>{
    return axios.get(`/topic/list?page=${page}&size=10`)
}
export let getTopicDetail=(id:string)=>{
    return axios.get('/topic/detail',{
        params:{
            id
        }
    })
}
export let getTopicRelated=(id:string)=>{
    return axios.get('/topic/related',{
        params:{
            id
        }
    })
}
export let getTopicComment=(valueId:string)=>{
    return axios.get('/comment/list',{
        params:{
            valueId,
            typeId:1,
            page:1,
            size:5
        }
    })
}