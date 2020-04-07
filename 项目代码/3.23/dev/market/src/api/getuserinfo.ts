import axios from '../utils/request'
export let Getuserinfo=()=>{
    return axios.get("/user/info")
}