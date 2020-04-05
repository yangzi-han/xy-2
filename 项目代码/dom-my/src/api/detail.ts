import axios from '../utils/request'
export let getHomeDetail=(id:string)=>{
    return axios.get('/brand/detail',{
        params:{
            id
        }
    })
}
export let getGoodsDetail=(id:string)=>{
    return axios.get('/goods/detail',{
        params:{
            id
        }
    })
}
export let getGoodsRelated=(id:string)=>{
    return axios.get('/goods/related',{
        params:{
            id
        }
    })
}