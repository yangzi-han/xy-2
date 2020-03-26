import axios from '../untils/request';

export let login=(mobile:string,password:string)=>{
    return axios.post('/auth/loginByMobile',{
        mobile,
        password
    })
}
