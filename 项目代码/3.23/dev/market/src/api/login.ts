import axios from '../utils/request'

//获取首页的banner
export let login = (mobile:string,password:string)=>{
    return axios.post("/auth/loginByMobile",{
        mobile,
        password
    })
}
