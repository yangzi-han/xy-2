import axios from '../utils/request'

export let Cartlist=()=>{
    return axios.get("/cart/index")
}