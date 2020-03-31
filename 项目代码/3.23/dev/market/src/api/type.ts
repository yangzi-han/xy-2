import axios from '../utils/request'

export let Type=()=>{
    return axios.get("/catalog/index")
}