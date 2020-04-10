import axios from '../utils/request'
export let getType=()=>{
    return axios.get('/catalog/index')
}
export let getCurrent=(id:string)=>{
    return axios.get(`/catalog/current?id=${id}`)
}
export let getNav=(id:string)=>{
    return axios.get('/goods/category',{
        params:{
            id
        }
    })
}
export let getList=(categoryId:string)=>{
    return axios.get('/goods/list',{
        params:{
            categoryId
        }
    })
}
