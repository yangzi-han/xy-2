import axios from '../utils/request'
export let Collect =()=>{
    return axios.get("/collect/list?typeId=0")
}