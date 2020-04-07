import axios from '../utils/request'

export let DeleteAddress=(id:string)=>{
    return axios.post("/address/delete",{
        id
    })
}