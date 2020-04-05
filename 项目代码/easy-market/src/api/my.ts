import axios from '../untils/request'
export let GetcollectList=()=>{
    return axios.get('/collect/list?typeId=0')
}
export let DeleteCollectList=(valueId:number)=>{
    return axios.post('/collect/addordelete',{
        valueId,
        typeId:0
    })
}