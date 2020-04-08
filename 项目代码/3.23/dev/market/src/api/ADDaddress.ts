import axios from '../utils/request'
export let ADDaddress=(name:string,mobile:string,district_id:string,address:string)=>{

    return axios.post("/address/save",{
        name,
        address,
        mobile,
        district_id
    })
}