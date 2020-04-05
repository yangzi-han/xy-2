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
export let GoodsDetailList=(id:string)=>{
    return axios.get(`/goods/detail?id=${id}`)
}
export let getGoodsRelated=(id:string)=>{
    return axios.get('/goods/related',{
        params:{
            id
        }
    })
}
export let addCollectList=(valueId:string)=>{
    return axios.post('/collect/addordelete',{
        valueId,
        typeId:0
    })
}
