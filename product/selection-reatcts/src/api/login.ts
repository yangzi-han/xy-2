import axios from '../utils/request'

// 登录接口
export let login = (mobile: string, password: string) =>{
    console.log(mobile,password)    
    return axios.post('/auth/loginByMobile', {
        mobile,
        password
    })
}