import axios from '../utils/request'
export let ADDaddress=(name:string,mobile:string,district_id:string,address:string)=>{
    return axios.post("/address/save",{
        name:name,
        address:address,
        mobile:mobile,
        district_id:district_id
    })
}