import axios from '../utils/request'
export let getCollectAdd=(valueId:string)=>{
    return axios.post('/collect/addordelete',{
            valueId,
            typeId:0
    })
}
export let getCollectDelet=(valueId:number)=>{
    return axios.post('/collect/addordelete',{
            valueId,
            typeId:0
    })
}
export let getCollectList=()=>{
    return axios.get('/collect/list?typeId=0')
}