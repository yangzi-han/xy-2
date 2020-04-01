import axios from '../utils/request'
export let getType=()=>{
    return axios.get('/catalog/index')
}
export let getCurrent=(id:string)=>{
    return axios.get(`/catalog/current?id=${id}`)
}