import axios from '../utils/request'

export let TypeRight=(id:number)=>{
    return axios.get(`/catalog/current?id=${id}`)
}