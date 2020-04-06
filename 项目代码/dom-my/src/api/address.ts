import axios from '../utils/request'
export let getAddRessList=()=>{
    return axios.get('/address/list?typeId=1')
}
export let getAddRessDelet=(id:string)=>{
    return axios.post('/address/delete',{
       id
    })
}
export let getAddRessAdd=(id:string)=>{
    return axios.post('/address/save',{
       id
    })
}