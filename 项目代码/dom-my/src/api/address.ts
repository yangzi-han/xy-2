import axios from '../utils/request'
export let getAddRessList=()=>{
    return axios.get('/address/list')
}
export let getAddRessDelet=(id:string)=>{
    return axios.post('/address/delete',{
        params:{
           id
        }
    })
}
export let getAddRessAdd=(id:string)=>{
    return axios.post('/address/save',{
        params:{
           id
        }
    })
}