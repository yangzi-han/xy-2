import axios from '../untils/request';

export let getClassifyList=()=>{
    return axios.get('/catalog/index')
}
export let getClassifyCurrent=(id:string)=>{
    return axios.get('/catalog/current',{
        params:{
            id
        }
    })
}
export let getClassifyCategory=(id:string)=>{
    return axios.get('/goods/category',{
        params:{
            id
        }
    })
}
export let getClassifyGoodList=(id:string)=>{
    return axios.get(`/goods/list?categoryId=${id}&page=1&size=10`)
}