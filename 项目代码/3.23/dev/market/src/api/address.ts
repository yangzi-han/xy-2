import axios from '../utils/request'

export let Address=()=>{
    return axios.get("/address/list")
}