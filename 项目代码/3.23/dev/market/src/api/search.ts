import axios from '../utils/request'
export let Search=()=>{
    return axios.get("/search/index")
}