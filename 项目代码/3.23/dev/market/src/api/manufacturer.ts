import axios from '../utils/request'

export let Manufacturer=(id:string)=>{
    return axios.get(`/brand/detail?id=${id}`)
}