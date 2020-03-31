import axios from '../utils/request'
export let getNav = (id:number)=>{
    return axios.get(`/goods/category/:${id}`)
}