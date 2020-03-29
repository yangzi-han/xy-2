import axios from '../utils/request'
export let login = (mobile:string, password:string)=>{
    return axios.post('/auth/loginByMobile', {
        mobile,
        password
    })
}