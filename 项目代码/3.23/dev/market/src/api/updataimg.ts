import axios from '../utils/request'

export let Updata=(avatar:string)=>{
    return axios.post("/user/updateInfo",{avatar})
}